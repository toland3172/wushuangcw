import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, categories, postTags, tags } from '@/storage/database/shared/schema';
import { eq, desc, and, sql, inArray } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const offset = (page - 1) * pageSize;

    // Only show finance-related categories
    const financeCategoryIds = await db
      .select({ id: categories.id })
      .from(categories)
      .where(inArray(categories.slug, ['industry', 'case', 'peer']));
    const allowedIds = financeCategoryIds.map(c => c.id);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(posts)
      .where(and(eq(posts.published, true), inArray(posts.category_id, allowedIds)));
    const total = countResult[0]?.count || 0;

    // Get articles with category
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
        category_id: posts.category_id,
        category_name: categories.name,
        category_slug: categories.slug,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.category_id, categories.id))
      .where(and(eq(posts.published, true), inArray(posts.category_id, allowedIds)))
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
      articles: articlesWithTags,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: '获取文章列表失败' }, { status: 500 });
  }
}

// POST: Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, category_id, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: '标题、slug和内容不能为空' }, { status: 400 });
    }

    const result = await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      category_id: category_id || null,
      published: published || false,
      author: 'wushuang',
      view_count: 0,
      published_at: published ? new Date().toISOString() : null,
    }).returning();

    return NextResponse.json({ article: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
  }
}
