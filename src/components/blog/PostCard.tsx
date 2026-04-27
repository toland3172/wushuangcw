'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
  categories: Category | null;
  tags: Tag[];
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: zhCN,
  });

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      {post.cover_image && (
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {post.categories && (
            <Badge variant="secondary" className="text-xs">
              {post.categories.name}
            </Badge>
          )}
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.excerpt || '暂无摘要'}
        </p>
      </CardContent>
      <CardFooter>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
