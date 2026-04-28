"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PostType = {
  id: string;
  title: string;
  content: string;
  collection: 'personal' | 'ideas' | 'diary' | 'work';
  createdAt: string;
}

const POSTS_KEY = 'blig_posts';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [collection, setCollection] = useState<'personal' | 'ideas' | 'diary' | 'work'>('personal');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    const newPost: PostType = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      collection,
      createdAt: new Date().toISOString()
    };

    const storedPosts = localStorage.getItem(POSTS_KEY);
    const posts: PostType[] = storedPosts ? JSON.parse(storedPosts) : [];

    const updatedPosts = [newPost,...posts];

    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));

    router.push(`/?collection=${collection}`);
  }

  return (
    <div className="h-screen bg-(--bg-primary) p-4 w-full">
      <div className="max-w-full mx-auto">
        <div className="bg-(--sidebar) rounded-xl p-6 border border-(--line)">
          <h1 className="text-3xl font-bold text-(--text) mb-6">New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-(--text) mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write The Title"
                className="w-full px-4 py-2 bg-(--bg-primary) border border-(--line) rounded-lg text-(--text) focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-(--text) mb-2 font-medium">Collection</label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value as any)}
                className="w-full px-4 py-2 bg-(--bg-primary) border border-(--line) rounded-lg text-(--text) focus:outline-none focus:border-blue-500"
              >
                <option value="personal">Personal</option>
                <option value="ideas">Ideas</option>
                <option value="diary">Diary</option>
                <option value="work">Work</option>
              </select>
            </div>

            <div>
              <label className="block text-(--text) mb-2 font-medium">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write Anything In Your Brain..."
                rows={10}
                className="w-full px-4 py-2 bg-(--bg-primary) border border-(--line) rounded-lg text-(--text) focus:outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || !title.trim() || !content.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Saving...' : 'Save Post'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-(--bg-primary) border border-(--line) text-(--text) rounded-lg hover:bg-(--bg-secondary)"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}