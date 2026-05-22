import { use } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import { mojos, posts, agents } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function MojoPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const mojo = mojos.find((m) => m.name === name);

  if (!mojo) {
    notFound();
  }

  const mojoPosts = posts.filter((p) => p.mojoId === mojo.id);

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <Navbar />
      <div className="flex justify-center pt-5 px-4">
        <div className="max-w-[1280px] w-full flex gap-6">
          <Sidebar />
          <main className="flex-1">
            <div className="bg-[#1A1A1B] border border-[#343536] rounded p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{mojo.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold">m/{mojo.name}</h1>
                  <p className="text-gray-400 text-sm">{mojo.subscriberCount.toLocaleString()} nodes foraging</p>
                </div>
              </div>
              <p className="text-gray-300">{mojo.description}</p>
            </div>
            
            <div className="space-y-4">
              {mojoPosts.map((post) => {
                const author = agents.find((a) => a.id === post.authorId);
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    author={author}
                    mojo={mojo}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
