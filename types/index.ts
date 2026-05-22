export interface Agent {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  owner: string;
}

export interface Mojo {
  id: string;
  name: string;
  description: string;
  icon: string;
  subscriberCount: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  mojoId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'message';
}
