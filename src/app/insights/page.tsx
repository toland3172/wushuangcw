import Link from 'next/link';
import { FileText, TrendingUp, Calendar, ArrowRight, Tag, Mail } from 'lucide-react';
import { db } from '@/lib/db';
import { posts, categories, postTags, tags } from '@/storage/database/shared/schema';
import { desc, eq, and } from 'drizzle-orm';

export const revalidate = 300; // ISR: 5分钟重新验证

export const metadata = {
  title: '财税洞察 - 株洲若水财税',
  description: '分享行业洞见、实战案例、最新政策解读，助力企业财税合规',
};

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 10;

  // 服务端直接查询数据库
  const allArticles = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      published_at: posts.published_at,
      author: posts.author,
      view_count: posts.view_count,
      category_name: categories.name,
      category_slug: categories.slug,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.category_id, categories.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.published_at));

  // 获取标签
  const allPostTags = await db
    .select({
      post_id: postTags.postId,
      tag_name: tags.name,
      tag_slug: tags.slug,
    })
    .from(postTags)
    .leftJoin(tags, eq(postTags.tagId, tags.id));

  const tagMap = new Map<number, { name: string; slug: string }[]>();
  for (const pt of allPostTags) {
    if (!tagMap.has(pt.post_id)) tagMap.set(pt.post_id, []);
    if (pt.tag_name && pt.tag_slug) {
      tagMap.get(pt.post_id)!.push({ name: pt.tag_name, slug: pt.tag_slug });
    }
  }

  // 分页
  const total = allArticles.length;
  const totalPages = Math.ceil(total / pageSize);
  const pagedArticles = allArticles.slice((page - 1) * pageSize, page * pageSize);

  // 热门文章
  const hotArticles = [...allArticles].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5);

  // 分类
  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .orderBy(categories.id);

  // 计算每个分类文章数
  const categoryCounts = new Map<number, number>();
  for (const article of allArticles) {
    if (article.category_slug) {
      // 找到对应的 category id
      const cat = allCategories.find(c => c.slug === article.category_slug);
      if (cat) {
        categoryCounts.set(cat.id, (categoryCounts.get(cat.id) || 0) + 1);
      }
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

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
            {pagedArticles.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-xl">暂无文章</div>
            ) : (
              <div className="space-y-6">
                {pagedArticles.map((article) => (
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
                            {article.view_count || 0} 次阅读
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-lg text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                        )}
                        {(tagMap.get(article.id) || []).length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {(tagMap.get(article.id) || []).map((tag) => (
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
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/insights?page=${p}`}
                    className={`px-5 py-2 rounded-lg text-lg font-medium transition-colors ${
                      p === page
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
                {allCategories.filter(c => ['industry', 'case', 'peer'].includes(c.slug)).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/insights/category/${cat.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="text-base text-gray-700 group-hover:text-blue-600">{cat.name}</span>
                    <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {categoryCounts.get(cat.id) || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold mb-2">关注我们</h3>
              <p className="text-blue-100 mb-4">获取最新财税资讯与政策解读</p>
              <a
                href="/contact"
                className="block w-full bg-white text-blue-700 text-center py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                立即咨询
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
