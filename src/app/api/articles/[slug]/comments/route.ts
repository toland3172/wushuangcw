import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments, posts } from "@/storage/database/shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 获取文章ID
    const postResult = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (postResult.length === 0) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    const postId = postResult[0].id;

    // 获取评论列表
    const commentsList = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));

    return NextResponse.json({ comments: commentsList });
  } catch (error) {
    console.error("获取评论失败:", error);
    return NextResponse.json(
      { error: "获取评论失败" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { authorName, content } = body;

    if (!authorName || !content) {
      return NextResponse.json(
        { error: "请填写昵称和评论内容" },
        { status: 400 }
      );
    }

    // 获取文章ID
    const postResult = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (postResult.length === 0) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    const postId = postResult[0].id;

    // 插入评论
    const result = await db
      .insert(comments)
      .values({
        postId: postId,
        authorName: authorName.trim(),
        content: content.trim(),
      })
      .returning();

    return NextResponse.json({ comment: result[0], success: true });
  } catch (error) {
    console.error("发表评论失败:", error);
    return NextResponse.json(
      { error: "发表评论失败" },
      { status: 500 }
    );
  }
}
