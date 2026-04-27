import { Navbar } from '@/components/blog/Navbar';
import { PostCard } from '@/components/blog/PostCard';
import { Sidebar } from '@/components/blog/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
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

async function getCategoryBySlug(slug: string) {
  try {
    const client = getSupabaseClient();
    const { data: category } = await client
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function getPostsByCategory(categoryId: number, page: number = 1, limit: number = 10) {
  try {
    const client = getSupabaseClient();
    const offset = (page - 1) * limit;

    const { data: posts, count } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `, { count: 'exact' })
      .eq('category_id', categoryId)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

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
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr || '1');

  const [categories, tags, category] = await Promise.all([
    getCategories(),
    getTags(),
    getCategoryBySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  const { posts, total } = await getPostsByCategory(category.id, page);
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
          <span className="text-gray-900">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">
              分类：{category.name}
            </h1>
            
            {category.description && (
              <p className="text-gray-600 mb-6">{category.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {posts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  该分类下暂无文章
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {page > 1 && (
                  <Link
                    href={`/category/${slug}?page=${page - 1}`}
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
                    href={`/category/${slug}?page=${page + 1}`}
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
