import Link from 'next/link';
import { Calendar, User, ArrowLeft, ArrowRight, Phone, Tag } from 'lucide-react';
import { db } from '@/lib/db';
import { posts, categories, postTags, tags } from '@/storage/database/shared/schema';
import { desc, eq, and, lt, gt, inArray } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const result = await db.select().from(posts).where(and(eq(posts.slug, slug), eq(posts.published, true))).limit(1);
    if (result.length === 0) return { title: '文章未找到 - 株洲若水财税' };
    return {
      title: `${result[0].title} - 株洲若水财税`,
      description: result[0].excerpt || undefined,
    };
  } catch {
    return { title: '财税洞察 - 株洲若水财税' };
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 查询文章
  const articleRows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .limit(1);

  if (articleRows.length === 0) notFound();

  const article = articleRows[0];

  // 查询分类
  let categoryName: string | null = null;
  let categorySlug: string | null = null;
  if (article.category_id) {
    const catRows = await db.select().from(categories).where(eq(categories.id, article.category_id)).limit(1);
    if (catRows.length > 0) {
      categoryName = catRows[0].name;
      categorySlug = catRows[0].slug;
    }
  }

  // 查询标签
  const articleTags = await db
    .select({ name: tags.name, slug: tags.slug })
    .from(postTags)
    .leftJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, article.id));

  // 查询上一篇/下一篇
  const publishedAt = article.published_at || new Date().toISOString();

  const prevRows = await db
    .select({ title: posts.title, slug: posts.slug })
    .from(posts)
    .where(and(eq(posts.published, true), lt(posts.published_at, publishedAt)))
    .orderBy(desc(posts.published_at))
    .limit(1);

  const nextRows = await db
    .select({ title: posts.title, slug: posts.slug })
    .from(posts)
    .where(and(eq(posts.published, true), gt(posts.published_at, publishedAt)))
    .orderBy(posts.published_at)
    .limit(1);

  const prevArticle = prevRows.length > 0 ? prevRows[0] : null;
  const nextArticle = nextRows.length > 0 ? nextRows[0] : null;

  // 相关推荐：同分类的其他文章
  let relatedArticles: { id: number; title: string; slug: string; excerpt: string | null }[] = [];
  if (article.category_id) {
    relatedArticles = await db
      .select({ id: posts.id, title: posts.title, slug: posts.slug, excerpt: posts.excerpt })
      .from(posts)
      .where(and(eq(posts.published, true), eq(posts.category_id, article.category_id)))
      .orderBy(desc(posts.published_at))
      .limit(4);
    // 排除当前文章
    relatedArticles = relatedArticles.filter(r => r.id !== article.id).slice(0, 3);
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

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
            {categoryName && (
              <Link href={`/insights/category/${categorySlug}`} className="bg-blue-700/50 text-white px-3 py-1 rounded-full hover:bg-blue-700">
                {categoryName}
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
          {articleTags.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Tag className="w-4 h-4 text-blue-300" />
              {articleTags.map((tag) => (
                tag.name && <span key={tag.slug} className="text-sm text-blue-200 bg-blue-700/40 px-2 py-0.5 rounded">
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
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
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
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/insights/${prevArticle.slug}`}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <span className="text-sm text-gray-400">上一篇</span>
                <p className="text-base font-medium text-gray-900 line-clamp-2">{prevArticle.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link
              href={`/insights/${nextArticle.slug}`}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-3 text-right"
            >
              <div>
                <span className="text-sm text-gray-400">下一篇</span>
                <p className="text-base font-medium text-gray-900 line-clamp-2">{nextArticle.title}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">相关推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
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
