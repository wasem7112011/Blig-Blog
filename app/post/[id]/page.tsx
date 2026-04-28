"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

type PostType = {
  id: string;
  title: string;
  content: string;
  collection: 'personal' | 'ideas' | 'diary' | 'work' | 'all-posts' | 'trash';
  createdAt: string;
}

const POSTS_KEY = 'blig_posts';

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts = localStorage.getItem(POSTS_KEY);
    if (storedPosts) {
      const posts: PostType[] = JSON.parse(storedPosts);
      const foundPost = posts.find(p => p.id === params.id);
      setPost(foundPost || null);
    }
    setLoading(false);
  }, [params.id]);

  function handleDelete() {
  if (!post) return;

  const storedPosts = localStorage.getItem(POSTS_KEY);
    if (storedPosts) {
      const posts: PostType[] = JSON.parse(storedPosts);
      const updatedPosts = posts.map(p =>
        p.id === post.id? {
        ...p,
          collection: 'trash' as const,
          deletedAt: new Date().toISOString()
        } : p
      );
      localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
      router.push('/');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center">
        <p className="text-(--text)">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-(--text) mb-4">Post not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-primary) w-full">
      <div className="max-w-full mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-500 hover:text-(--text) transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        <div className="bg-(--sidebar) rounded-xl p-8 border border-(--line)">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-500 capitalize px-3 py-1 bg-blue-500/10 rounded-full text-sm">
              {post.collection}
            </span>
            <span className="text-(--text) text-sm font-bold">
              {new Date(post.createdAt).toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-(--text) mb-6">
            {post.title}
          </h1>

          <div className="text-(--text) whitespace-pre-wrap leading-relaxed text-lg">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}