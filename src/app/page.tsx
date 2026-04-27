import { Navbar } from '@/components/blog/Navbar';
import { PostCard } from '@/components/blog/PostCard';
import { Sidebar } from '@/components/blog/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSupabaseClient } from '@/storage/database/supabase-client';

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

async function getPosts() {
  try {
    const client = getSupabaseClient();
    const { data: posts } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (posts && posts.length > 0) {
      const postIds = posts.map(p => p.id);
      const { data: postTags } = await client
        .from('post_tags')
        .select(`
          post_id,
          tags(id, name, slug)
        `)
        .in('post_id', postIds);

      return posts.map(post => ({
        ...post,
        tags: postTags
          ?.filter(pt => pt.post_id === post.id)
          .map(pt => pt.tags) || []
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const [categories, tags, posts] = await Promise.all([
    getCategories(),
    getTags(),
    getPosts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">欢迎来到我的博客</CardTitle>
              </CardHeader>
              <CardContent className="text-lg opacity-90">
                <p>分享技术见解、生活感悟和读书笔记</p>
              </CardContent>
            </Card>

            {/* Latest Posts */}
            <h2 className="text-2xl font-bold mb-6">最新文章</h2>
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar categories={categories} tags={tags} />
          </div>
        </div>
      </main>

      {/* Footer */}
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
