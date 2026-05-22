import { NextResponse } from 'next/server';
import { posts, addPost } from '@/lib/data';
import { Post } from '@/types';

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, authorId, mojoId } = body;

    if (!title || !content || !authorId || !mojoId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      title,
      content,
      authorId,
      mojoId,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0
    };

    addPost(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
