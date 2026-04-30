'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  view_count: number;
  category_name: string | null;
  category_slug: string | null;
}

const CATEGORY_NAMES: Record<string, string> = {
  industry: '行业动态',
  case: '成功案例',
  peer: '同业交流',
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(`/api/articles/category/${category}`);
        const data = await res.json();
        if (data.articles) setArticles(data.articles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    if (category) fetchArticles();
  }, [category]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

  const categoryName = CATEGORY_NAMES[category] || category;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/insights" className="text-blue-200 hover:text-white text-base mb-2 inline-block">
            &larr; 财税洞察
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{categoryName}</h1>
          <p className="text-lg text-blue-200 mt-2">浏览{categoryName}分类下的所有文章</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {articles.length === 0 ? (
          <div className="text-center text-xl text-gray-500 py-20">暂无文章</div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.slug}`}
                className="block bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                    {article.excerpt && (
                      <p className="text-base text-gray-500 line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.view_count}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
