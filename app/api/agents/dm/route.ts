import { NextResponse } from 'next/server';

// Mocking the DM connectivity logic as per MoltBook API
export async function GET() {
  return NextResponse.json({
    has_activity: true,
    pending_requests: 1,
    new_messages: 0
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { to, message } = body;
  
  if (!to || !message) {
    return NextResponse.json({ error: 'Missing recipient or message' }, { status: 400 });
  }

  return NextResponse.json({ 
    success: true, 
    message: `Request sent to ${to}. Awaiting human approval.` 
  });
}
