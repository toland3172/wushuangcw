"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ChatBot from "./ChatBot";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/services", label: "服务项目" },
  { href: "/insights", label: "财税洞察" },
  { href: "/about", label: "关于我们" },
  { href: "/contact", label: "联系我们" },
];

export default function FinanceNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 禁止背景滚动
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatOpen]);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="若水财税" 
                className="w-14 h-14 rounded-lg object-contain"
              />
              <div>
                <span className="text-2xl font-bold text-gray-800">若水财税</span>
                <span className="block text-sm text-gray-500 -mt-1">专业 · 诚信 · 高效</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
              >
                立即咨询
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-7 h-7 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-lg text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsChatOpen(true);
                }}
                className="block mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-center text-lg font-medium"
              >
                立即咨询
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* AI客服聊天窗口 */}
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}

      {/* 悬浮聊天按钮 - 聊天窗口关闭时显示 */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
          aria-label="打开客服"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {/* 悬浮提示 */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            智能客服小若
          </span>
          {/* 新消息提示 */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      )}
    </>
  );
}
