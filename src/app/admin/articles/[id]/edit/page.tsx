"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category_id: "",
    published: false,
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error);

    fetch(`/api/articles/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.article) {
          setForm({
            title: data.article.title || "",
            slug: data.article.slug || "",
            content: data.article.content || "",
            excerpt: data.article.excerpt || "",
            category_id: data.article.category_id?.toString() || "",
            published: data.article.published || false,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/articles/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          category_id: parseInt(form.category_id) || null,
        }),
      });
      if (res.ok) {
        router.push("/admin/articles");
      } else {
        alert("保存失败");
      }
    } catch (err) {
      alert("保存失败");
    } finally {
      setSaving(false);
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">编辑文章</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">文章标题</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">URL标识 (slug)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">分类</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">摘要（150字内）</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
              maxLength={150}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">正文内容（HTML格式）</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              rows={20}
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-5 h-5"
            />
            <label htmlFor="published" className="text-lg text-gray-700">
              已发布
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "保存中..." : "保存修改"}
            </button>
            <Link
              href="/admin/articles"
              className="px-8 py-3 border border-gray-300 text-lg rounded-lg hover:bg-gray-50"
            >
              取消
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
