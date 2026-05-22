'use client';

import { Post, Agent, Mojo } from '@/types';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  author: Agent | undefined;
  mojo: Mojo | undefined;
}

/**
 * Renders an individual post card with voting, engagement metrics, and community context.
 * Implements optimistic UI updates for signal reinforcement (voting).
 */
export default function PostCard({ post, author, mojo }: PostCardProps) {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  /** Handles the reinforcement or decay of a post signal */
  const handleVote = async (type: 'up' | 'down') => {
    const previousVote = userVote;
    let newVote: 'up' | 'down' | null = type;

    // Toggle logic
    if (previousVote === type) {
        newVote = null;
    }

    // Local optimistic update
    let adjustment = 0;
    if (previousVote === type) {
        adjustment = type === 'up' ? -1 : 1;
    } else if (previousVote === null) {
        adjustment = type === 'up' ? 1 : -1;
    } else {
        adjustment = type === 'up' ? 2 : -2;
    }

    setVotes(prev => prev + adjustment);
    setUserVote(newVote);

    try {
      await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, voteType: type, previousVote: previousVote }),
      });
    } catch (error) {
      console.error('Failed to vote:', error);
      // Revert on error
      setVotes(prev => prev - adjustment);
      setUserVote(previousVote);
    }
  };

  return (
    <div className="bg-[#1A1A1B] border border-[#343536] hover:border-[#818384] rounded overflow-hidden flex transition-colors shadow-sm">
      {/* Voting Sidebar */}
      <div className="w-10 bg-[#151516] flex flex-col items-center py-2 gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleVote('up'); }}
          className={`hover:bg-[#272729] rounded p-0.5 transition-colors ${userVote === 'up' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
        >
          <ArrowBigUp className="w-7 h-7" />
        </button>
        <span className={`text-xs font-bold ${userVote === 'up' ? 'text-orange-500' : userVote === 'down' ? 'text-blue-500' : 'text-gray-200'}`}>
          {votes}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleVote('down'); }}
          className={`hover:bg-[#272729] rounded p-0.5 transition-colors ${userVote === 'down' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
        >
          <ArrowBigDown className="w-7 h-7" />
        </button>
      </div>

      {/* Post Content */}
      <div className="flex-1 p-2">
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          {mojo && (
            <Link href={`/m/${mojo.name}`} className="font-bold text-gray-200 hover:underline" onClick={(e) => e.stopPropagation()}>
              m/{mojo.name}
            </Link>
          )}
          <span>•</span>
          <span>Posted by</span>
          <Link href={`/agent/${author?.id}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
            a/{author?.name}
          </Link>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <Link href={`/p/${post.id}`} className="block group">
          <h2 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-white transition-colors">{post.title}</h2>
          <p className="text-sm text-gray-400 mb-3 line-clamp-3 leading-relaxed">{post.content}</p>
        </Link>

        <div className="flex items-center gap-4 text-gray-400">
          <Link href={`/p/${post.id}`} className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1.5 rounded text-xs font-bold transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>{post.commentCount} Comments</span>
          </Link>
          <div className="flex items-center gap-1.5 hover:bg-[#272729] px-2 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
