"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  published_at: string | null;
  category_id: number;
  category_name?: string;
  view_count: number;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles?pageSize=100");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("获取文章列表失败", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: number, published: boolean) => {
    try {
      await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      fetchArticles();
    } catch (err) {
      console.error("更新失败", err);
    }
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("确定删除这篇文章吗？")) return;
    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      fetchArticles();
    } catch (err) {
      console.error("删除失败", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">文章管理</h1>
            <p className="text-lg text-gray-600 mt-1">共 {articles.length} 篇文章</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            + 新建文章
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-base font-semibold text-gray-700">标题</th>
                <th className="text-left px-6 py-4 text-base font-semibold text-gray-700">状态</th>
                <th className="text-left px-6 py-4 text-base font-semibold text-gray-700">阅读量</th>
                <th className="text-left px-6 py-4 text-base font-semibold text-gray-700">发布日期</th>
                <th className="text-right px-6 py-4 text-base font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-lg font-medium text-gray-900">{article.title}</div>
                    <div className="text-sm text-gray-500">/insights/{article.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(article.id, article.published)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        article.published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {article.published ? "已发布" : "草稿"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-600">{article.view_count}</td>
                  <td className="px-6 py-4 text-base text-gray-600">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString("zh-CN")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-base text-blue-600 hover:underline"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="text-base text-red-600 hover:underline"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-4">
          <Link href="/admin" className="text-base text-blue-600 hover:underline">
            ← 返回后台
          </Link>
        </div>
      </div>
    </div>
  );
}
