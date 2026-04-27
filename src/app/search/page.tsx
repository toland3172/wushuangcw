import { Navbar } from '@/components/blog/Navbar';
import { PostCard } from '@/components/blog/PostCard';
import { Sidebar } from '@/components/blog/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import Link from 'next/link';
import { ChevronRight, Search as SearchIcon } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function getCategories() {
  try {
    const client = getSupabaseClient();
    const { data: categories } = await client
      .from('categories')
      .select('*')
      .order('name');
    
    const { data: posts } = await client
      .from('posts')
      .select('category_id')
      .eq('published', true);

    return categories?.map(cat => ({
      ...cat,
      postCount: posts?.filter(p => p.category_id === cat.id).length || 0
    })) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getTags() {
  try {
    const client = getSupabaseClient();
    const { data: tags } = await client
      .from('tags')
      .select('*')
      .order('name');
    
    const { data: postTags } = await client
      .from('post_tags')
      .select('tag_id');

    return tags?.map(tag => ({
      ...tag,
      postCount: postTags?.filter(pt => pt.tag_id === tag.id).length || 0
    })) || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

async function searchPosts(query: string, page: number = 1, limit: number = 10) {
  try {
    const client = getSupabaseClient();
    const offset = (page - 1) * limit;

    const { data: posts, count, error } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `, { count: 'exact' })
      .textSearch('fts', query, { type: 'websearch' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Search error:', error);
      return { posts: [], total: 0 };
    }

    if (posts && posts.length > 0) {
      const postIds = posts.map(p => p.id);
      const { data: postTags } = await client
        .from('post_tags')
        .select(`
          post_id,
          tags(id, name, slug)
        `)
        .in('post_id', postIds);

      return {
        posts: posts.map(post => ({
          ...post,
          tags: postTags
            ?.filter(pt => pt.post_id === post.id)
            .map(pt => pt.tags) || []
        })),
        total: count || 0
      };
    }

    return { posts: [], total: 0 };
  } catch (error) {
    console.error('Error searching posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: query, page: pageStr } = await searchParams;
  const page = parseInt(pageStr || '1');

  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags(),
  ]);

  const { posts, total } = query ? await searchPosts(query, page) : { posts: [], total: 0 };
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">首页</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-primary">博客</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">搜索结果</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <SearchIcon className="h-6 w-6" />
              {query ? (
                <>搜索关键词：<span className="text-blue-600">"{query}"</span></>
              ) : (
                '请输入搜索关键词'
              )}
            </h1>

            {query && (
              <p className="text-gray-600 mb-6">
                找到 {total} 个相关结果
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {!query && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  请输入搜索关键词
                </CardContent>
              </Card>
            )}

            {query && posts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  未找到相关文章，请尝试其他关键词
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query || '')}&page=${page - 1}`}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    上一页
                  </Link>
                )}
                <span className="px-4 py-2">
                  第 {page} / {totalPages} 页
                </span>
                {page < totalPages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query || '')}&page=${page + 1}`}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    下一页
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar categories={categories} tags={tags} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} 我的博客. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
