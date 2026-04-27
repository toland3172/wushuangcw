import { Navbar } from '@/components/blog/Navbar';
import { Sidebar } from '@/components/blog/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
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

async function getPost(slug: string) {
  try {
    const client = getSupabaseClient();

    const { data: post, error } = await client
      .from('posts')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }

    if (!post) {
      return null;
    }

    const { data: postTags } = await client
      .from('post_tags')
      .select(`
        tags(id, name, slug)
      `)
      .eq('post_id', post.id);

    return {
      ...post,
      tags: postTags?.map(pt => pt.tags) || []
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const [categories, tags, post] = await Promise.all([
    getCategories(),
    getTags(),
    getPost(slug),
  ]);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.created_at), 'yyyy年MM月dd日', {
    locale: zhCN,
  });

  // Simple markdown-like rendering for demo
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
        }
        if (line.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{line.slice(2)}</blockquote>;
        }
        if (line.startsWith('```')) {
          if (line === '```') {
            return null;
          }
          return <code key={index} className="block bg-gray-100 rounded p-4 my-4 overflow-x-auto text-sm">{line.slice(3)}</code>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 list-disc">{line.slice(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/g);
        return (
          <p key={index} className="my-4 leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-gray-100 px-1 rounded text-sm">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </p>
        );
      });
  };

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
          <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {/* Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    {post.categories && (
                      <Badge variant="secondary">
                        <Link href={`/category/${post.categories.slug}`} className="hover:underline">
                          {post.categories.name}
                        </Link>
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {formattedDate}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: Tag) => (
                        <Link key={tag.id} href={`/tag/${tag.slug}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                            {tag.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                </header>

                {/* Cover Image */}
                {post.cover_image && (
                  <div className="mb-8 rounded-lg overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {renderContent(post.content)}
                </div>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">博主</span>
                    </div>
                    <Link
                      href="/blog"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      返回列表
                    </Link>
                  </div>
                </footer>
              </CardContent>
            </Card>
          </article>

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
