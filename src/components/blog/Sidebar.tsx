'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
}

interface SidebarProps {
  categories: Category[];
  tags: Tag[];
}

export function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">分类</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center justify-between py-2 hover:text-primary transition-colors"
              >
                <span className="text-sm">{cat.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {cat.postCount}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
