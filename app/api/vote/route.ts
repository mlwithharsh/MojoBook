import { NextResponse } from 'next/server';
import { updatePostVotes } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, voteType } = body;

    if (!postId || !voteType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const delta = voteType === 'up' ? 1 : -1;
    updatePostVotes(postId, delta);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
