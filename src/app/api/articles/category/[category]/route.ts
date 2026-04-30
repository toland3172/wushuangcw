import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, categories, postTags, tags } from '@/storage/database/shared/schema';
import { eq, desc, and, sql } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const offset = (page - 1) * pageSize;

    // Find category
    const categoryData = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, category))
      .limit(1);

    if (!categoryData.length) {
      return NextResponse.json({ error: '分类不存在' }, { status: 404 });
    }

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(posts)
      .where(and(eq(posts.published, true), eq(posts.category_id, categoryData[0].id)));
    const total = countResult[0]?.count || 0;

    // Get articles
    const articles = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        cover_image: posts.cover_image,
        published_at: posts.published_at,
        author: posts.author,
        view_count: posts.view_count,
        category_name: categories.name,
        category_slug: categories.slug,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.category_id, categories.id))
      .where(and(eq(posts.published, true), eq(posts.category_id, categoryData[0].id)))
      .orderBy(desc(posts.published_at))
      .limit(pageSize)
      .offset(offset);

    // Get tags for each article
    const articlesWithTags = await Promise.all(
      articles.map(async (article) => {
        const articleTags = await db
          .select({ name: tags.name, slug: tags.slug })
          .from(postTags)
          .innerJoin(tags, eq(postTags.tagId, tags.id))
          .where(eq(postTags.postId, article.id));
        return { ...article, tags: articleTags };
      })
    );

    return NextResponse.json({
      category: categoryData[0],
      articles: articlesWithTags,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching category articles:', error);
    return NextResponse.json({ error: '获取分类文章失败' }, { status: 500 });
  }
}
