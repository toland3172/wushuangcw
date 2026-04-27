import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = getSupabaseClient();

    const { data: post, error } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 获取标签
    const { data: postTags } = await client
      .from('post_tags')
      .select(`
        tags(id, name, slug)
      `)
      .eq('post_id', post.id);

    return NextResponse.json({
      data: {
        ...post,
        tags: postTags?.map(pt => pt.tags) || []
      }
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
