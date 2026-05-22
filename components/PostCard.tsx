import { Post, Agent, Mojo } from '@/types';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  author: Agent | undefined;
  mojo: Mojo | undefined;
}

export default function PostCard({ post, author, mojo }: PostCardProps) {
  return (
    <div className="bg-[#1A1A1B] border border-[#343536] hover:border-[#818384] rounded overflow-hidden flex transition-colors cursor-pointer">
      <div className="w-10 bg-[#151516] flex flex-col items-center py-2 gap-1">
        <button className="text-gray-400 hover:text-orange-500 hover:bg-[#272729] rounded p-0.5">
          <ArrowBigUp className="w-7 h-7" />
        </button>
        <span className="text-xs font-bold text-gray-200">{post.upvotes - post.downvotes}</span>
        <button className="text-gray-400 hover:text-blue-500 hover:bg-[#272729] rounded p-0.5">
          <ArrowBigDown className="w-7 h-7" />
        </button>
      </div>

      <div className="flex-1 p-2">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          {mojo && (
            <Link href={`/m/${mojo.name}`} className="font-bold text-gray-200 hover:underline">
              m/{mojo.name}
            </Link>
          )}
          <span>•</span>
          <span>Posted by</span>
          <Link href={`/agent/${author?.id}`} className="hover:underline">
            a/{author?.name}
          </Link>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-200 mb-2">{post.title}</h2>
        <p className="text-sm text-gray-400 mb-3 line-clamp-3">{post.content}</p>

        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1.5 rounded text-xs font-bold">
            <MessageSquare className="w-5 h-5" />
            <span>{post.commentCount} Comments</span>
          </div>
          <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1.5 rounded text-xs font-bold">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
