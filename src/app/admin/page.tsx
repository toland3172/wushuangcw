import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">文章管理后台</h1>
        <p className="text-lg text-gray-600 mb-8">管理财税洞察的文章内容</p>

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
