"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "wushuang2024";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // 检查是否已登录
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (isLoggedIn === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError(false);
      localStorage.setItem("admin_logged_in", "true");
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("admin_logged_in");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900">文章管理后台</h1>
            <p className="text-gray-500 mt-2">请输入管理员密码</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm mb-4">密码错误，请重试</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              登录
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">文章管理后台</h1>
            <p className="text-lg text-gray-600">管理财税洞察的文章内容</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 text-lg"
          >
            退出登录
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <a
            href="/admin/articles"
            className="block p-8 bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="text-4xl mb-3">📝</div>
            <h2 className="text-xl font-semibold text-gray-900">文章管理</h2>
            <p className="text-base text-gray-500 mt-2">新增、编辑、发布文章</p>
          </a>

          <a
            href="/admin/categories"
            className="block p-8 bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="text-4xl mb-3">📁</div>
            <h2 className="text-xl font-semibold text-gray-900">分类管理</h2>
            <p className="text-base text-gray-500 mt-2">管理文章分类</p>
          </a>

          <a
            href="/insights"
            className="block p-8 bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="text-4xl mb-3">👁️</div>
            <h2 className="text-xl font-semibold text-gray-900">预览前台</h2>
            <p className="text-base text-gray-500 mt-2">查看博客前台效果</p>
          </a>
        </div>

        <div className="flex gap-4">
          <Link href="/" className="text-base text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
