import Link from "next/link";

type PostProps = {
  id: string;
  title: string;
  content: string;
  collection: 'personal' | 'ideas' | 'diary' | 'work' | 'all-posts' | 'trash';
  createdAt: string;
  deletedAt?: string;
}

function getDaysLeft(deletedAt?: string): number | null {
  if (!deletedAt) return null;
  const deleted = new Date(deletedAt).getTime();
  const now = new Date().getTime();
  const daysPassed = Math.floor((now - deleted) / (1000 * 60 * 60 * 24));
  const daysLeft = 10 - daysPassed;
  return daysLeft > 0? daysLeft : 0;
}

export default function Post({ id, title, content, collection, createdAt, deletedAt }: PostProps){
  const daysLeft = collection === 'trash'? getDaysLeft(deletedAt) : null;

  return (
    <Link href={`/post/${id}`}>
      <div className="post flex flex-col justify-between p-4 bg-(--bg-secondary) rounded-lg border border-(--line) h-48 hover:border-blue-500 hover:bg-(--hovered) transition-colors cursor-pointer">
        <h3 className="text-xl font-bold text-blue-500 mb-2 truncate">{title}</h3>
        <p className="text-(--text) mb-3 line-clamp-3">{content}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-500 capitalize px-2 py-1 bg-blue-500/10 rounded font-bold">
            {collection}
          </span>
          <div className="flex items-center gap-3">
            {daysLeft!== null && (
              <span className="text-red-500 text-xs font-bold">
                {daysLeft} {daysLeft === 1? 'day' : 'days'} left
              </span>
            )}
            <span className="text-(--text) font-bold">
              {new Date(createdAt).toLocaleDateString('en-US')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}