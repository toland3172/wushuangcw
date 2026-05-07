"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, User } from "lucide-react";

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/articles/${slug}/comments`);
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error("获取评论失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setMessage({ type: "error", text: "请填写昵称和评论内容" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, content }),
      });

      const data = await res.json();

      if (data.success) {
        setComments([data.comment, ...comments]);
        setAuthorName("");
        setContent("");
        setMessage({ type: "success", text: "评论发表成功！" });
      } else {
        setMessage({ type: "error", text: data.error || "评论失败" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "评论失败，请重试" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-sm p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-600" />
        留言评论 ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-lg p-5">
        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            昵称
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="请输入昵称"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            maxLength={50}
          />
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium text-gray-700 mb-2">
            评论内容
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下您的评论..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
            maxLength={1000}
          />
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-base ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
        >
          <Send className="w-4 h-4" />
          {submitting ? "提交中..." : "发表评论"}
        </button>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-base">
          暂无评论，欢迎发表第一条评论！
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{comment.authorName}</span>
                    <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
