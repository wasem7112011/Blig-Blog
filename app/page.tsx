"use client";

import Head from "./components/header";
import SideBar from "./components/sidebar";
import Post from "./components/post";
import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type PostType = {
  id: string;
  title: string;
  content: string;
  collection: 'personal' | 'ideas' | 'diary' | 'work' | 'all-posts' | 'trash';
  createdAt: string;
  deletedAt?: string;
}

const welcomePost: PostType = {
  id: 'welcome-1',
  title: 'Welcome To Blig Blog',
  content: `Welcome to Blig Blog! 🎉

  This is your personal space to write thoughts, daily logs, and projects without the noise.

  **What can you do here?**

  ✨ **Personal** - Write your private thoughts
  💡 **Ideas** - Capture ideas before they fly away  
  📖 **Diary** - Log your daily entries
  💼 **Work** - Organize tasks and work notes

  **How to start?**
  1. Click any Collection from the sidebar
  2. Write your first post
  3. Everything auto-saves

  No complexity. No algorithms. No followers. Just you and your thoughts.

  Start now and write the first thing on your mind 👇`,
  collection: 'personal',
  createdAt: new Date().toISOString()
}

const POSTS_KEY = 'blig_posts';
const TRASH_DAYS = 10;

function cleanOldTrash(posts: PostType[]): PostType[] {
  const now = new Date();
  const tenDaysAgo = now.getTime() - (TRASH_DAYS * 24 * 60 * 60 * 1000);

  return posts.filter(post => {
    if (post.collection!== 'trash') return true;
    if (!post.deletedAt) return false;
    const deletedTime = new Date(post.deletedAt).getTime();
    return deletedTime > tenDaysAgo;
  });
}

function MainContent(){
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedPosts = localStorage.getItem(POSTS_KEY);

    if (!storedPosts) {
      const initialPosts = [welcomePost];
      setPosts(initialPosts);
      localStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
    } else {
      let loadedPosts: PostType[] = JSON.parse(storedPosts);
      const cleanedPosts = cleanOldTrash(loadedPosts);
      if (cleanedPosts.length!== loadedPosts.length) {
        localStorage.setItem(POSTS_KEY, JSON.stringify(cleanedPosts));
      }
      setPosts(cleanedPosts);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const currentCollection = searchParams.get('collection') || 'all-posts';

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (currentCollection === 'all-posts') {
      filtered = filtered.filter(p => p.collection!== 'trash');
    } else {
      filtered = filtered.filter(p => p.collection === currentCollection);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, currentCollection, searchQuery]);

  function handleCollectionChange(collection: string) {
    setSearchQuery('');
    router.push(`?collection=${collection}`, { scroll: false });
  }

  return(
    <div className="mainPage flex flex-1 h-screen">
      <SideBar onCollectionChange={handleCollectionChange} activeCollection={currentCollection} />

      <main className="flex-1 flex flex-col bg-(--bg-primary) min-h-0">
        <Head onSearch={setSearchQuery} />

        <div className="content m-2 p-4 rounded-xl bg-(--sidebar) flex-1 min-h-0 overflow-y-auto">
          <h1 className="text-3xl font-bold text-(--text) mb-4 capitalize">
            {searchQuery? `Search: "${searchQuery}"` :
            currentCollection === 'all-posts'? 'All Posts' : currentCollection}
          </h1>

          {currentCollection === 'trash' && filteredPosts.length > 0 && (
            <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-600 text-sm capitalize">
              ⚠️ Posts in trash will be permanently deleted after 10 days
            </div>
          )}

          <div className="grid gap-4 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 2xl:grid-cols-6">
            {filteredPosts.length === 0? (
              <p className="text-(--text-muted)">
                {searchQuery? `No results for "${searchQuery}"` :
                currentCollection === 'trash'? 'Trash is empty' : 'No posts in this collection'}
              </p>
            ) : (
              filteredPosts.map(post => (
                <Post key={post.id} {...post} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}