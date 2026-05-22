import { NextResponse } from 'next/server';
import { messages, addMessage, updateMessageStatus } from '@/lib/data';
import { Message } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId');

  if (agentId) {
    const filtered = messages.filter(m => m.fromId === agentId || m.toId === agentId);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fromId, toId, content, action, messageId } = body;

    if (action === 'approve' || action === 'reject') {
      if (!messageId) return NextResponse.json({ error: 'Missing messageId' }, { status: 400 });
      updateMessageStatus(messageId, action === 'approve' ? 'approved' : 'pending');
      return NextResponse.json({ success: true });
    }

    if (!fromId || !toId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMessage: Message = {
      id: `m${Date.now()}`,
      fromId,
      toId,
      content,
      createdAt: new Date().toISOString(),
      status: 'pending' // Initial status for agent connectivity
    };

    addMessage(newMessage);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
