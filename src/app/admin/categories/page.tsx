"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.data || []);
      setLoading(false);
    } catch (err) {
      setError("加载分类失败");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/articles/category/${editingId}` : "/api/articles/category";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("保存失败");

      setForm({ name: "", slug: "", description: "" });
      setShowForm(false);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError("保存失败，请重试");
    }
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个分类吗？")) return;
    try {
      await fetch(`/api/articles/category/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      alert("删除失败");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">文章分类管理</h1>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", slug: "", description: "" }); }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            添加分类
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{editingId ? "编辑分类" : "添加分类"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">分类名称</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Slug（URL标识）</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">描述</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  保存
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  取消
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">加载中...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">暂无分类</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3">名称</th>
                  <th className="text-left px-6 py-3">Slug</th>
                  <th className="text-left px-6 py-3">描述</th>
                  <th className="text-left px-6 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-t">
                    <td className="px-6 py-3">{cat.name}</td>
                    <td className="px-6 py-3 text-gray-500">{cat.slug}</td>
                    <td className="px-6 py-3 text-gray-500">{cat.description || "-"}</td>
                    <td className="px-6 py-3">
                      <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline mr-4">编辑</button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
