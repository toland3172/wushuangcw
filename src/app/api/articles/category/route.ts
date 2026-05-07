import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories } from "@/storage/database/shared/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "名称和slug必填" }, { status: 400 });
    }

    const [result] = await db.insert(categories).values({ name, slug, description }).returning();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("创建分类失败:", error);
    return NextResponse.json({ error: "创建分类失败" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const id = parseInt(pathParts[pathParts.length - 2]);

    if (isNaN(id)) {
      return NextResponse.json({ error: "无效的ID" }, { status: 400 });
    }

    const [result] = await db.update(categories).set({ name, slug, description }).where(eq(categories.id, id)).returning();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("更新分类失败:", error);
    return NextResponse.json({ error: "更新分类失败" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (isNaN(id)) {
      return NextResponse.json({ error: "无效的ID" }, { status: 400 });
    }

    await db.delete(categories).where(eq(categories.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("删除分类失败:", error);
    return NextResponse.json({ error: "删除分类失败" }, { status: 500 });
  }
}
