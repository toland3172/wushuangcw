import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/storage/database/shared/schema';
import { sql } from 'drizzle-orm';
import { posts } from '@/storage/database/shared/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const categoryList = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        article_count: sql<number>`(
          SELECT count(*)::int FROM ${posts} 
          WHERE ${posts.category_id} = ${categories.id} AND ${posts.published} = true
        )`,
      })
      .from(categories);

    return NextResponse.json({ categories: categoryList });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: '获取分类列表失败' }, { status: 500 });
  }
}
