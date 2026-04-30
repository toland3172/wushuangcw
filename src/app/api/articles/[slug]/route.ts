import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, categories, postTags, tags } from '@/storage/database/shared/schema';
import { eq, desc, sql, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get article
    const article = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        content: posts.content,
        excerpt: posts.excerpt,
        cover_image: posts.cover_image,
        published_at: posts.published_at,
        author: posts.author,
        view_count: posts.view_count,
        category_id: posts.category_id,
        category_name: categories.name,
        category_slug: categories.slug,
        created_at: posts.createdAt,
        updated_at: posts.updatedAt,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.category_id, categories.id))
      .where(and(eq(posts.slug, slug), eq(posts.published, true)))
      .limit(1);

    if (!article.length) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    // Increment view count
    await db
      .update(posts)
      .set({ view_count: sql`${posts.view_count} + 1` })
      .where(eq(posts.id, article[0].id));

    // Get tags
    const articleTags = await db
      .select({ name: tags.name, slug: tags.slug })
      .from(postTags)
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, article[0].id));

    // Get previous and next articles
    const prevArticle = await db
      .select({ title: posts.title, slug: posts.slug })
      .from(posts)
      .where(
        sql`${posts.published_at} < ${article[0].published_at} AND ${posts.published} = true`
      )
      .orderBy(desc(posts.published_at))
      .limit(1);

    const nextArticle = await db
      .select({ title: posts.title, slug: posts.slug })
      .from(posts)
      .where(
        sql`${posts.published_at} > ${article[0].published_at} AND ${posts.published} = true`
      )
      .orderBy(posts.published_at)
      .limit(1);

    // Get related articles (same category)
    const relatedArticles = article[0].category_id
      ? await db
          .select({ title: posts.title, slug: posts.slug, published_at: posts.published_at })
          .from(posts)
          .where(
            sql`${posts.category_id} = ${article[0].category_id} AND ${posts.id} != ${article[0].id} AND ${posts.published} = true`
          )
          .orderBy(desc(posts.published_at))
          .limit(3)
      : [];

    return NextResponse.json({
      article: {
        ...article[0],
        view_count: article[0].view_count + 1,
        tags: articleTags,
      },
      prev: prevArticle[0] || null,
      next: nextArticle[0] || null,
      related: relatedArticles,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 });
  }
}

// PATCH: Update article (for admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.category_id !== undefined) updateData.category_id = body.category_id;
    if (body.published !== undefined) {
      updateData.published = body.published;
      if (body.published && !body.was_published) {
        updateData.published_at = new Date();
      }
    }

    const result = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.slug, slug))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json({ article: result[0] });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 });
  }
}

// DELETE: Delete article (for admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // First delete post_tags
    const article = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, slug)).limit(1);
    if (article.length) {
      await db.delete(postTags).where(eq(postTags.postId, article[0].id));
      await db.delete(posts).where(eq(posts.id, article[0].id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 });
  }
}
