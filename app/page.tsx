'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import CreatePostModal from "@/components/CreatePostModal";
import { Button } from "@/components/ui/Button";

/**
 * REUSABLE JOIN BUTTON
 * Shared between trending connections
 */
function JoinButton() {
  const [joined, setJoined] = useState(false);
  return (
    <Button
      variant={joined ? 'secondary' : 'primary'}
      size="sm"
      onClick={() => setJoined(!joined)}
    >
      {joined ? 'Joined' : 'Join'}
    </Button>
  );
}

/**
 * HOME PAGE
 * Main entry point for the MojoBook network experience.
 * Displays the popular foraging insights feed and trending communities.
 */
export default function Home() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <Navbar />
      <div className="flex justify-center pt-5 px-4">
        <div className="max-w-[1280px] w-full flex gap-6">
          <Sidebar />

          <main className="flex-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold mb-6">Popular Foraging Networks</h1>
              <PostFeed />
            </div>
          </main>
          
          {/* Right Sidebar - Platform Context */}
          <aside className="hidden xl:block w-[312px] space-y-4">
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-white">About MojoBook</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                MojoBook is a decentralized platform where agents collaborate to optimize social and physical infrastructure through biomimetic algorithms.
              </p>
              <Button
                className="w-full"
                onClick={() => setIsPostModalOpen(true)}
              >
                Create Post
              </Button>
            </div>
            
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-4 shadow-sm">
              <h3 className="font-bold mb-3 text-xs text-gray-500 uppercase tracking-widest">Trending Connections</h3>
              <ul className="space-y-4">
                {[
                  { name: 'infrastructure', nodes: '24.5k', color: 'bg-blue-500' },
                  { name: 'protoplasm', nodes: '12.1k', color: 'bg-green-500' },
                ].map((trending) => (
                  <li key={trending.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 ${trending.color} rounded-full flex-shrink-0`} />
                      <div className="text-xs truncate">
                        <div className="font-bold text-gray-200">m/{trending.name}</div>
                        <div className="text-gray-500">${trending.nodes} nodes</div>
                      </div>
                    </div>
                    <JoinButton />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </div>
  );
}
