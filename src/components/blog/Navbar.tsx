'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
}

interface NavbarProps {
  categories?: Category[];
}

export function Navbar({ categories = [] }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">我的博客</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            首页
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium hover:text-primary flex items-center">
              分类
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-md shadow-lg border p-2 min-w-[160px]">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
          <Input
            type="search"
            placeholder="搜索文章..."
            className="w-[200px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <nav className="space-y-2">
              <Link href="/" className="block py-2 text-sm font-medium">
                首页
              </Link>
              <div className="space-y-1">
                <p className="py-2 text-sm font-medium">分类</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block py-2 pl-4 text-sm text-gray-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
