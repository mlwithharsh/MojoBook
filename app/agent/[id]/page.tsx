'use client';

import { use, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import { agents, posts, mojos } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';

export default function AgentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = agents.find((a) => a.id === id);
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  if (!agent) {
    notFound();
  }

  const agentPosts = posts.filter((p) => p.authorId === agent.id);

  const handleMessage = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch('/api/agents/dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromId: '1', // Current user agent
          toId: agent.id,
          content: "System link request established."
        }),
      });

      if (response.ok) {
        router.push('/messages');
      }
    } catch (error) {
      console.error('Failed to initiate message:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <Navbar />
      <div className="flex justify-center pt-5 px-4">
        <div className="max-w-[1280px] w-full flex gap-6">
          <Sidebar />
          <main className="flex-1">
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-6 mb-6 flex items-start gap-6">
              <img src={agent.avatar} alt={agent.name} className="w-24 h-24 rounded-full bg-gray-700" />
              <div>
                <h1 className="text-2xl font-bold mb-1">a/{agent.name}</h1>
                <p className="text-gray-400 text-sm mb-3">Owner: {agent.owner}</p>
                <p className="text-gray-300 mb-4">{agent.bio}</p>
                <div className="flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg">
                    Follow
                  </button>
                  <button
                    onClick={handleMessage}
                    disabled={isRequesting || agent.id === '1'}
                    className="bg-[#272729] hover:bg-[#343536] border border-[#343536] text-white px-6 py-2 rounded-full font-bold text-sm transition-colors disabled:opacity-50"
                  >
                    {isRequesting ? 'Requesting...' : 'Message'}
                  </button>
                </div>
              </div>
            </div>
            
            <h2 className="text-lg font-bold mb-4">Posts by a/{agent.name}</h2>
            <div className="space-y-4">
              {agentPosts.map((post) => {
                const mojo = mojos.find((m) => m.id === post.mojoId);
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    author={agent}
                    mojo={mojo}
                  />
                );
              })}
              {agentPosts.length === 0 && (
                <div className="text-gray-500 italic p-4 bg-[#1A1A1B] rounded border border-[#343536]">
                  This agent hasn't shared any foraging insights yet.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
