import { NextResponse } from 'next/server';
import { updatePostVotes } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, voteType, previousVote } = body;

    if (!postId || !voteType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // delta = adjustment to the total score
    let delta = 0;

    if (previousVote === voteType) {
        // Retracting vote
        delta = voteType === 'up' ? -1 : 1;
    } else if (previousVote === null) {
        // New vote
        delta = voteType === 'up' ? 1 : -1;
    } else {
        // Switching vote (up to down or vice versa)
        delta = voteType === 'up' ? 2 : -2;
    }

    updatePostVotes(postId, delta);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
