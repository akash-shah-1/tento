
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isAnonymous?: boolean;
}

export interface UserSettings {
  email: string;
  phone: string;
  twoFactor: boolean;
  visibility: 'Public' | 'Community' | 'Private';
  activityStatus: boolean;
  notifications: {
    push: boolean;
    email: boolean;
    messages: boolean;
    comments: boolean;
    reactions: boolean;
    sessions: boolean;
  };
  theme: 'Light' | 'Dark' | 'Auto';
}

export interface Session {
  id: string;
  healerId: string;
  healerName: string;
  healerAvatar: string;
  date: string;
  time: string;
  duration: number;
  type: 'Video Call' | 'Audio Only';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: number;
  notes?: string;
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
  reactions: Record<string, number>;
  userReaction?: string;
  replies?: Comment[];
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video' | 'text';
  url?: string;
  text?: string;
  background?: string;
  timestamp: number;
  isViewed: boolean;
  viewers: { userId: string; name: string; avatar: string; reaction?: string }[];
  duration: number;
  font?: string;
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
  isVerified: boolean;
  languages: string[];
  experience: string;
  nextAvailable: string;
  reviews: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
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

export type ViewState = 'feed' | 'healers' | 'messages' | 'profile' | 'settings' | 'mood';
