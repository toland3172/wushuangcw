import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } });
    }

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const client = getSupabaseClient();

    // 全文搜索
    const { data: posts, error, count } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `, { count: 'exact' })
      .textSearch('fts', query, { type: 'websearch' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 获取标签
    if (posts && posts.length > 0) {
      const postIds = posts.map(p => p.id);
      const { data: postTags } = await client
        .from('post_tags')
        .select(`
          post_id,
          tags(id, name, slug)
        `)
        .in('post_id', postIds);

      const postsWithTags = posts.map(post => ({
        ...post,
        tags: postTags
          ?.filter(pt => pt.post_id === post.id)
          .map(pt => pt.tags) || []
      }));

      return NextResponse.json({
        data: postsWithTags,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      });
    }

    return NextResponse.json({
      data: [],
      pagination: { page, limit, total: 0, totalPages: 0 }
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
