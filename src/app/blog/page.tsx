import { Navbar } from '@/components/blog/Navbar';
import { PostCard } from '@/components/blog/PostCard';
import { Sidebar } from '@/components/blog/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; tag?: string }>;
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

async function getPosts(page: number = 1, limit: number = 10, categorySlug?: string, tagSlug?: string) {
  try {
    const client = getSupabaseClient();
    const offset = (page - 1) * limit;

    let query = client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `, { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug);
    }

    const { data: posts, count } = await query;

    if (posts && posts.length > 0) {
      const postIds = posts.map(p => p.id);
      
      let tagsQuery = client
        .from('post_tags')
        .select(`
          post_id,
          tags(id, name, slug)
        `)
        .in('post_id', postIds);

      if (tagSlug) {
        const { data: tagData } = await client
          .from('tags')
          .select('id')
          .eq('slug', tagSlug)
          .maybeSingle();
        
        if (tagData) {
          const { data: taggedPosts } = await client
            .from('post_tags')
            .select('post_id')
            .eq('tag_id', tagData.id);
          
          const taggedPostIds = taggedPosts?.map(tp => tp.post_id) || [];
          const filteredPosts = posts.filter(p => taggedPostIds.includes(p.id));
          
          return {
            posts: filteredPosts.map(post => ({
              ...post,
              tags: []
            })),
            total: count || 0
          };
        }
      }

      const { data: postTags } = await tagsQuery;

      const postsWithTags = posts.map(post => ({
        ...post,
        tags: postTags
          ?.filter(pt => pt.post_id === post.id)
          .map(pt => pt.tags) || []
      }));

      return { posts: postsWithTags, total: count || 0 };
    }

    return { posts: [], total: 0 };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categorySlug = params.category;
  const tagSlug = params.tag;

  const [categories, tags, { posts, total }] = await Promise.all([
    getCategories(),
    getTags(),
    getPosts(page, 10, categorySlug, tagSlug),
  ]);

  const totalPages = Math.ceil(total / 10);

  // Get current category/tag name
  let currentFilter = '';
  if (categorySlug) {
    const cat = categories.find(c => c.slug === categorySlug);
    currentFilter = cat?.name || categorySlug;
  } else if (tagSlug) {
    const tag = tags.find(t => t.slug === tagSlug);
    currentFilter = tag?.name || tagSlug;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">首页</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{currentFilter || '博客'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">
              {currentFilter ? `${currentFilter}下的文章` : '全部文章'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {posts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  暂无文章
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {page > 1 && (
                  <Link
                    href={`?page=${page - 1}${categorySlug ? `&category=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}`}
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
                    href={`?page=${page + 1}${categorySlug ? `&category=${categorySlug}` : ''}${tagSlug ? `&tag=${tagSlug}` : ''}`}
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
