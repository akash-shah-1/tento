
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isAnonymous?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  visibility: 'Public' | 'Private' | 'Friends';
  userReaction?: string;
  feeling?: string;
}

export interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  userId: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  reactions: Record<string, number>; // Breakdown
  userReaction?: string;
  replies?: Comment[]; // For UI structure
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video' | 'text';
  url?: string; // For image/video
  text?: string; // For text stories
  background?: string; // CSS gradient for text stories
  timestamp: number; // Unix timestamp
  isViewed: boolean;
  viewers: { userId: string; name: string; avatar: string; reaction?: string }[];
  duration: number; // seconds
}

export interface Story {
  userId: string;
  user: User;
  items: StoryItem[];
  lastUpdated: number;
  allViewed: boolean;
}

export interface Healer {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  rating: number;
  reviewCount: number;
  rate: number;
  avatar: string;
  coverImage: string;
  about: string;
  credentials: string[];
  location: string;
}

export interface Group {
  id: string;
  name: string;
  image: string;
  members: number;
  category: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
}

export type ViewState = 'feed' | 'healers' | 'messages' | 'profile';
