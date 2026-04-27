import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  try {
    const client = getSupabaseClient();

    const { data: tags, error } = await client
      .from('tags')
      .select('*')
      .order('name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 获取每个标签下的文章数量
    const { data: postTags } = await client
      .from('post_tags')
      .select('tag_id');

    const tagsWithCount = tags?.map(tag => ({
      ...tag,
      postCount: postTags?.filter(pt => pt.tag_id === tag.id).length || 0
    })) || [];

    return NextResponse.json({ data: tagsWithCount });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
