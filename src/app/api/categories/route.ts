import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function GET() {
  try {
    const client = getSupabaseClient();

    const { data: categories, error } = await client
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 获取每个分类下的文章数量
    const { data: posts } = await client
      .from('posts')
      .select('category_id', { count: 'exact' })
      .eq('published', true);

    const categoriesWithCount = categories?.map(cat => ({
      ...cat,
      postCount: posts?.filter(p => p.category_id === cat.id).length || 0
    })) || [];

    return NextResponse.json({ data: categoriesWithCount });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
