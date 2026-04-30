'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FileText, TrendingUp, Calendar, ArrowRight, Tag, Mail } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  author: string | null;
  view_count: number;
  category_name: string | null;
  category_slug: string | null;
  tags: { name: string; slug: string }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  article_count: number;
}

function InsightsContent() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hotArticles, setHotArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [subEmail, setSubEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch(`/api/articles?page=${pageParam}&pageSize=10`),
          fetch('/api/categories'),
        ]);
        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();

        if (articlesData.articles) {
          setArticles(articlesData.articles);
          setPagination(articlesData.pagination);
          // Hot articles = same list sorted by view_count
          setHotArticles([...articlesData.articles].sort((a: Article, b: Article) => b.view_count - a.view_count).slice(0, 5));
        }
        if (categoriesData.categories) {
          setCategories(categoriesData.categories);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pageParam]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setSubMsg('感谢订阅！我们会及时为您推送最新资讯。');
      setSubEmail('');
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">财税洞察</h1>
          <p className="text-xl text-blue-100">分享行业洞见、实战案例、最新政策解读，助力企业财税合规</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {articles.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-xl">暂无文章</div>
            ) : (
              <div className="space-y-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {article.category_name && (
                            <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                              {article.category_name}
                            </span>
                          )}
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(article.published_at)}
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {article.view_count} 次阅读
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-lg text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                        )}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {article.tags.map((tag) => (
                              <span key={tag.slug} className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 text-lg font-medium">
                      阅读全文 <ArrowRight className="w-5 h-5 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/insights?page=${p}`}
                    className={`px-5 py-2 rounded-lg text-lg font-medium transition-colors ${
                      p === pagination.page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Hot Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                热门文章
              </h3>
              <div className="space-y-3">
                {hotArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className={`text-xl font-bold min-w-[28px] ${
                      index < 3 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-base text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                文章分类
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/insights/category/${cat.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="text-base text-gray-700 group-hover:text-blue-600">{cat.name}</span>
                    <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {cat.article_count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">关注我们</h3>
              <p className="text-base text-blue-100 mb-4">获取最新财税资讯与政策解读</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="请输入邮箱地址"
                  required
                  className="w-full px-4 py-3 rounded-lg text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-blue-700 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors text-base"
                >
                  <Mail className="w-4 h-4 inline mr-1" />
                  订阅
                </button>
              </form>
              {subMsg && <p className="text-sm text-blue-200 mt-2">{subMsg}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl text-gray-500">加载中...</div>}>
      <InsightsContent />
    </Suspense>
  );
}
