import { agents, mojos, posts } from '@/lib/data';
import PostCard from './PostCard';

export default function PostFeed() {
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
