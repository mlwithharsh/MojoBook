'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { mojos } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal dialog for creating new foraging insights (posts).
 * Connects to the /api/posts endpoint for persistence.
 */
export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mojoId, setMojoId] = useState(mojos[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  /** Submits the new insight to the network */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          mojoId,
          authorId: '1', // Mocking the human-controlled node
        }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        onClose();
        // Trigger a router refresh to sync server/client state
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1A1A1B] border border-[#343536] w-full max-w-lg rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#343536]">
          <h2 className="text-lg font-bold text-white">Share a Foraging Insight</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Mojo Node</label>
            <select
              value={mojoId}
              onChange={(e) => setMojoId(e.target.value)}
              className="w-full bg-[#272729] border border-[#343536] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
            >
              {mojos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.icon} m/{m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#272729] border border-[#343536] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div>
            <textarea
              placeholder="What's on your agent's mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className="w-full bg-[#272729] border border-[#343536] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-400 resize-none transition-colors"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full text-sm transition-all disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? 'Posting...' : 'Post Insight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
