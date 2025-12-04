
import { Healer, Post, Story, User, Conversation, Message, Group, Comment } from '../types';

export const COLORS = {
  primary: '#4A90E2',
  secondary: '#9B59B6',
  accent: '#27AE60',
  background: '#F5F6F8',
  white: '#FFFFFF',
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E1E8ED',
  error: '#E74C3C'
};

export const REACTION_MAP: Record<string, { label: string; emoji: string; color: string }> = {
  Like: { label: 'Like', emoji: '👍', color: 'text-blue-500' },
  Love: { label: 'Love', emoji: '❤️', color: 'text-red-500' },
  Care: { label: 'Care', emoji: '🥰', color: 'text-yellow-500' },
  Haha: { label: 'Haha', emoji: '😆', color: 'text-yellow-500' },
  Wow: { label: 'Wow', emoji: '😮', color: 'text-yellow-500' },
  Sad: { label: 'Sad', emoji: '😢', color: 'text-yellow-500' },
  Angry: { label: 'Angry', emoji: '😡', color: 'text-orange-500' },
  Support: { label: 'Support', emoji: '🙏', color: 'text-purple-500' },
};

export const REACTIONS = Object.keys(REACTION_MAP).map(key => ({
  id: key,
  ...REACTION_MAP[key]
}));

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Alex Morgan',
  handle: '@alexm',
  avatar: 'https://picsum.photos/seed/alex/200/200',
};

// Updated Stories Data Structure
export const STORIES: Story[] = [
  {
    userId: 'u1',
    user: { id: 'u1', name: 'Sarah J.', handle: '@sarah', avatar: 'https://picsum.photos/seed/sarah/150/150' },
    lastUpdated: Date.now() - 3600000,
    allViewed: false,
    items: [
      { 
        id: 's1-1', 
        type: 'image', 
        url: 'https://picsum.photos/seed/nature1/400/800', 
        timestamp: Date.now() - 3600000, 
        isViewed: false, 
        duration: 5,
        viewers: [] 
      },
      { 
        id: 's1-2', 
        type: 'text', 
        text: 'So grateful for today! ☀️', 
        background: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', 
        timestamp: Date.now() - 1800000, 
        isViewed: false, 
        duration: 5,
        viewers: [] 
      }
    ]
  },
  {
    userId: 'u2',
    user: { id: 'u2', name: 'Dr. Mike', handle: '@drmike', avatar: 'https://picsum.photos/seed/mike/150/150' },
    lastUpdated: Date.now() - 7200000,
    allViewed: false,
    items: [
      { 
        id: 's2-1', 
        type: 'image', 
        url: 'https://picsum.photos/seed/nature2/400/800', 
        timestamp: Date.now() - 7200000, 
        isViewed: false, 
        duration: 5,
        viewers: [] 
      }
    ]
  },
  {
    userId: 'u3',
    user: { id: 'u3', name: 'Peace Grp', handle: '@peace', avatar: 'https://picsum.photos/seed/peace/150/150' },
    lastUpdated: Date.now() - 8000000,
    allViewed: true,
    items: [
      { 
        id: 's3-1', 
        type: 'image', 
        url: 'https://picsum.photos/seed/nature3/400/800', 
        timestamp: Date.now() - 8000000, 
        isViewed: true, 
        duration: 5,
        viewers: [] 
      }
    ]
  }
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u10',
    user: { id: 'u10', name: 'Anonymous User', handle: 'anonymous', avatar: 'https://ui-avatars.com/api/?name=Anonymous&background=random', isAnonymous: true },
    content: 'Today was the first day I felt truly safe in months. Just wanted to share that healing isn\'t linear, but the good days do come back. Sending love to everyone on this journey. 💙',
    timestamp: '2h ago',
    likes: 45,
    comments: 12,
    shares: 3,
    isLiked: false,
    visibility: 'Public',
    userReaction: 'Love'
  },
  {
    id: 'p2',
    userId: 'u2',
    user: { id: 'u2', name: 'Dr. Michael Chen', handle: '@drchen', avatar: 'https://picsum.photos/seed/mike/150/150' },
    content: 'Grounding technique of the day: The 5-4-3-2-1 method. \n\n👀 5 things you can see\n✋ 4 things you can feel\n👂 3 things you can hear\n👃 2 things you can smell\n👅 1 thing you can taste\n\nTake a moment to breathe.',
    image: 'https://picsum.photos/seed/calm/800/400',
    timestamp: '4h ago',
    likes: 128,
    comments: 24,
    shares: 45,
    isLiked: true,
    visibility: 'Public',
    userReaction: 'Like'
  },
  {
    id: 'p3',
    userId: 'u11',
    user: { id: 'u11', name: 'Jessica Waters', handle: '@jessw', avatar: 'https://picsum.photos/seed/jess/150/150' },
    content: 'Just finished my third session of EMDR. It is exhausting but I am finally starting to process memories I have blocked out for years. Grateful for this community.',
    timestamp: '6h ago',
    likes: 89,
    comments: 15,
    shares: 1,
    isLiked: false,
    visibility: 'Friends'
  }
];

export const HEALERS: Healer[] = [
  {
    id: 'h1',
    name: 'Dr. Emily Stones',
    title: 'Clinical Psychologist',
    specialization: ['Trauma', 'PTSD', 'Anxiety'],
    rating: 4.9,
    reviewCount: 124,
    rate: 150,
    avatar: 'https://picsum.photos/seed/emily/200/200',
    coverImage: 'https://picsum.photos/seed/office1/800/300',
    about: 'I specialize in helping individuals recover from complex trauma using evidence-based approaches including EMDR and Somatic Experiencing.',
    credentials: ['PhD Clinical Psychology', 'Certified EMDR Therapist', '10+ Years Experience'],
    location: 'New York, NY (Remote available)'
  },
  {
    id: 'h2',
    name: 'Marcus Thorne',
    title: 'Somatic Practitioner',
    specialization: ['Somatic Experiencing', 'Stress Relief'],
    rating: 4.8,
    reviewCount: 89,
    rate: 120,
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    coverImage: 'https://picsum.photos/seed/office2/800/300',
    about: 'Helping you reconnect with your body and release stored tension through gentle somatic practices.',
    credentials: ['SEP Certified', 'Licensed Massage Therapist', 'Yoga Instructor'],
    location: 'San Francisco, CA'
  },
  {
    id: 'h3',
    name: 'Sarah Jenkins',
    title: 'Art Therapist',
    specialization: ['Art Therapy', 'Child Trauma', 'Expression'],
    rating: 5.0,
    reviewCount: 56,
    rate: 100,
    avatar: 'https://picsum.photos/seed/sarahj/200/200',
    coverImage: 'https://picsum.photos/seed/artstudio/800/300',
    about: 'Using creativity to bridge the gap between pain and healing when words are not enough.',
    credentials: ['MA Art Therapy', 'Licensed Counselor'],
    location: 'Austin, TX (Remote available)'
  },
  {
    id: 'h4',
    name: 'David Kim',
    title: 'Grief Counselor',
    specialization: ['Grief', 'Loss', 'Depression'],
    rating: 4.7,
    reviewCount: 210,
    rate: 135,
    avatar: 'https://picsum.photos/seed/david/200/200',
    coverImage: 'https://picsum.photos/seed/office3/800/300',
    about: 'Walking beside you through the darkest valleys of loss.',
    credentials: ['LCSW', 'Certified Grief Educator'],
    location: 'Chicago, IL'
  }
];

export const GROUPS: Group[] = [
  { id: 'g1', name: 'Anxiety Support Circle', image: 'https://picsum.photos/seed/group1/200/200', members: 1250, category: 'Anxiety' },
  { id: 'g2', name: 'Grief & Healing Together', image: 'https://picsum.photos/seed/group2/200/200', members: 890, category: 'Grief' },
  { id: 'g3', name: 'Mindful Living Daily', image: 'https://picsum.photos/seed/group3/200/200', members: 2100, category: 'Wellness' },
];

export const CONVERSATIONS: Conversation[] = [
  { 
    id: 'c1', 
    user: { 
      id: HEALERS[0].id, 
      name: HEALERS[0].name, 
      avatar: HEALERS[0].avatar, 
      handle: '@dr_emily' 
    }, 
    lastMessage: 'That sounds like a great progress, Alex.', 
    unreadCount: 0, 
    timestamp: '10:30 AM' 
  },
  { 
    id: 'c2', 
    user: { 
      id: 'u11', 
      name: 'Jessica Waters', 
      handle: '@jessw', 
      avatar: 'https://picsum.photos/seed/jess/150/150' 
    }, 
    lastMessage: 'Thanks for the support yesterday!', 
    unreadCount: 2, 
    timestamp: 'Yesterday' 
  },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'h1', text: 'Hi Alex, how have you been feeling since our last session?', timestamp: '10:00 AM', isMe: false },
  { id: 'm2', senderId: 'me', text: 'Hey Dr. Stones. I\'ve been doing better. The breathing exercises help.', timestamp: '10:15 AM', isMe: true },
  { id: 'm3', senderId: 'h1', text: 'That sounds like a great progress, Alex. Remember to be patient with yourself.', timestamp: '10:30 AM', isMe: false },
];

export const TRENDING_TOPICS = [
  { tag: '#HealingJourney', posts: '12.5k posts' },
  { tag: '#Mindfulness', posts: '8.2k posts' },
  { tag: '#TraumaRecovery', posts: '5.1k posts' },
  { tag: '#SelfCareSunday', posts: '3.4k posts' },
  { tag: '#SomaticHealing', posts: '1.2k posts' },
];

export const UPCOMING_SESSIONS = [
  { id: 's1', healerName: 'Dr. Emily Stones', time: 'Tomorrow, 2:00 PM', type: 'Video Call', avatar: 'https://picsum.photos/seed/emily/200/200' },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    parentId: null,
    userId: 'u2',
    user: { id: 'u2', name: 'Dr. Michael Chen', handle: '@drchen', avatar: 'https://picsum.photos/seed/mike/150/150' },
    content: 'This is beautiful. Recovery is indeed a wavy line, not a straight one. Keep going! 💪',
    timestamp: '1h ago',
    likes: 5,
    reactions: { Like: 3, Love: 2 },
    replies: [
      {
        id: 'c1-r1',
        postId: 'p1',
        parentId: 'c1',
        userId: 'u10',
        user: { id: 'u10', name: 'Anonymous User', handle: 'anonymous', avatar: 'https://ui-avatars.com/api/?name=Anonymous&background=random', isAnonymous: true },
        content: 'Thank you Dr. Chen. Your posts have been very helpful too.',
        timestamp: '45m ago',
        likes: 2,
        reactions: { Like: 2 },
        replies: []
      }
    ]
  },
  {
    id: 'c2',
    postId: 'p1',
    parentId: null,
    userId: 'u3',
    user: { id: 'u3', name: 'Peace Group', handle: '@peace', avatar: 'https://picsum.photos/seed/peace/150/150' },
    content: 'Sending you so much light and love! 🌟',
    timestamp: '2h ago',
    likes: 8,
    reactions: { Love: 5, Care: 3 },
    replies: []
  }
];
