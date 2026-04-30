import Link from 'next/link';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { posts, categories } from '@/storage/database/shared/schema';
import { desc, eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export const revalidate = 300;

const CATEGORY_NAMES: Record<string, string> = {
  industry: '行业动态',
  case: '成功案例',
  peer: '同业交流',
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = CATEGORY_NAMES[category] || category;
  return {
    title: `${categoryName} - 财税洞察 - 株洲若水财税`,
    description: `浏览${categoryName}分类下的所有文章`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = CATEGORY_NAMES[category];

  if (!categoryName) notFound();

  // 查询分类ID
  const catRows = await db.select().from(categories).where(eq(categories.slug, category)).limit(1);
  if (catRows.length === 0) notFound();
  const categoryId = catRows[0].id;

  // 查询文章
  const articleRows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      published_at: posts.published_at,
      view_count: posts.view_count,
    })
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.category_id, categoryId)))
    .orderBy(desc(posts.published_at));

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

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
        {articleRows.length === 0 ? (
          <div className="text-center text-xl text-gray-500 py-20">暂无文章</div>
        ) : (
          <div className="space-y-6">
            {articleRows.map((article) => (
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

