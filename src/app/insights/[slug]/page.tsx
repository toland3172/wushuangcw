'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight, Phone, MessageCircle, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published_at: string | null;
  author: string | null;
  view_count: number;
  category_name: string | null;
  category_slug: string | null;
  tags: { name: string; slug: string }[];
  prev_article: { title: string; slug: string } | null;
  next_article: { title: string; slug: string } | null;
  related_articles: { id: number; title: string; slug: string; excerpt: string | null }[];
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();
        if (data.article) {
          setArticle(data.article);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticle();
  }, [slug]);

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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <Link href="/insights" className="text-blue-600 text-lg hover:underline">返回财税洞察</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/insights" className="text-blue-200 hover:text-white text-base mb-4 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> 返回财税洞察
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-base text-blue-200">
            {article.category_name && (
              <Link href={`/insights/category/${article.category_slug}`} className="bg-blue-700/50 text-white px-3 py-1 rounded-full hover:bg-blue-700">
                {article.category_name}
              </Link>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author || 'wushuang'}
            </span>
            <span>{article.view_count} 次阅读</span>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Tag className="w-4 h-4 text-blue-300" />
              {article.tags.map((tag) => (
                <span key={tag.slug} className="text-sm text-blue-200 bg-blue-700/40 px-2 py-0.5 rounded">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <article
          className="prose prose-lg max-w-none bg-white rounded-xl shadow-sm p-8 md:p-12
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700
            prose-li:text-lg prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">如果您有财税疑问，欢迎联系我获取免费诊断</h3>
          <p className="text-lg text-blue-100 mb-6">专业、高效、诚信，为您的企业保驾护航</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:13517401680" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors text-lg">
              <Phone className="w-5 h-5" />
              13517401680
            </a>
            <a href="https://wushuangcw.top/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors text-lg">
              <MessageCircle className="w-5 h-5" />
              在线咨询
            </a>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {article.prev_article ? (
            <Link
              href={`/insights/${article.prev_article.slug}`}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-400">上一篇</span>
                <p className="text-base font-medium text-gray-900 line-clamp-2">{article.prev_article.title}</p>
              </div>
            </Link>
          ) : <div />}
          {article.next_article ? (
            <Link
              href={`/insights/${article.next_article.slug}`}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3 text-right"
            >
              <div>
                <span className="text-sm text-gray-400">下一篇</span>
                <p className="text-base font-medium text-gray-900 line-clamp-2">{article.next_article.title}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Related Articles */}
        {article.related_articles && article.related_articles.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">相关推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {article.related_articles.map((related) => (
                <Link
                  key={related.id}
                  href={`/insights/${related.slug}`}
                  className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{related.title}</h4>
                  {related.excerpt && (
                    <p className="text-base text-gray-500 line-clamp-2">{related.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
