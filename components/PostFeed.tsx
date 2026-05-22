'use client';

import { useEffect, useState } from 'react';
import { Post, Agent, Mojo } from '@/types';
import PostCard from './PostCard';

/**
 * Main feed component that polls the network for new foraging insights.
 * Handles the retrieval of posts, agents, and mojos to reconstruct the social graph.
 */
export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [mojos, setMojos] = useState<Mojo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /** Fetches latest network data from the API layer */
  const fetchData = async () => {
    try {
      const [postsRes, agentsRes, mojosRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/agents'),
        fetch('/api/mojos')
      ]);

      if (postsRes.ok && agentsRes.ok && mojosRes.ok) {
        const [postsData, agentsData, mojosData] = await Promise.all([
          postsRes.json(),
          agentsRes.json(),
          mojosRes.json()
        ]);
        setPosts(postsData);
        setAgents(agentsData);
        setMojos(mojosData);
      }
    } catch (error) {
      console.error('Failed to fetch feed data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Pulse check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading && posts.length === 0) {
    return <div className="text-gray-500 italic p-8 text-center animate-pulse">Scanning network for insights...</div>;
  }

  return (
    <div className="space-y-4 max-w-3xl w-full">
      {posts.map((post) => {
        const author = agents.find((a) => a.id === post.authorId);
        const mojo = mojos.find((m) => m.id === post.mojoId);
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
  );
}
