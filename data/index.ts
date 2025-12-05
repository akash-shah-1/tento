
import { Healer, Post, Story, User, Conversation, Message, Group, Event } from '../types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Alex Morgan',
  handle: '@alexm',
  avatar: 'https://picsum.photos/seed/alex/200/200',
};

export const STORIES: Story[] = [
  {
    userId: 'u1',
    user: { id: 'u1', name: 'Sarah J.', handle: '@sarah', avatar: 'https://picsum.photos/seed/sarah/150/150' },
    lastUpdated: Date.now(),
    allViewed: false,
    items: [
      { id: '1', type: 'image', url: 'https://picsum.photos/seed/nature1/400/800', timestamp: Date.now(), isViewed: false, viewers: [], duration: 5 }
    ]
  },
  {
    userId: 'u2',
    user: { id: 'u2', name: 'Dr. Mike', handle: '@drmike', avatar: 'https://picsum.photos/seed/mike/150/150' },
    lastUpdated: Date.now(),
    allViewed: false,
    items: [
      { id: '2', type: 'image', url: 'https://picsum.photos/seed/nature2/400/800', timestamp: Date.now(), isViewed: false, viewers: [], duration: 5 }
    ]
  },
  {
    userId: 'u3',
    user: { id: 'u3', name: 'Peace Grp', handle: '@peace', avatar: 'https://picsum.photos/seed/peace/150/150' },
    lastUpdated: Date.now(),
    allViewed: true,
    items: [
      { id: '3', type: 'image', url: 'https://picsum.photos/seed/nature3/400/800', timestamp: Date.now(), isViewed: true, viewers: [], duration: 5 }
    ]
  },
  {
    userId: 'u4',
    user: { id: 'u4', name: 'Luna L.', handle: '@luna', avatar: 'https://picsum.photos/seed/luna/150/150' },
    lastUpdated: Date.now(),
    allViewed: false,
    items: [
      { id: '4', type: 'image', url: 'https://picsum.photos/seed/nature4/400/800', timestamp: Date.now(), isViewed: false, viewers: [], duration: 5 }
    ]
  },
  {
    userId: 'u5',
    user: { id: 'u5', name: 'Hope C.', handle: '@hope', avatar: 'https://picsum.photos/seed/hope/150/150' },
    lastUpdated: Date.now(),
    allViewed: true,
    items: [
      { id: '5', type: 'image', url: 'https://picsum.photos/seed/nature5/400/800', timestamp: Date.now(), isViewed: true, viewers: [], duration: 5 }
    ]
  },
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
    visibility: 'Public'
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
    visibility: 'Public'
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
    location: 'New York, NY (Remote available)',
    isVerified: true,
    languages: ['English', 'Spanish'],
    experience: '12 Years',
    nextAvailable: 'Tomorrow, 2:00 PM',
    reviews: [
      { id: 'r1', userName: 'Anonymous', rating: 5, date: '2 days ago', comment: 'Dr. Stones changed my life. Her patience is unmatched.' },
      { id: 'r2', userName: 'Sarah K.', rating: 5, date: '1 week ago', comment: 'Highly recommend for anyone dealing with PTSD.' }
    ]
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
    location: 'San Francisco, CA',
    isVerified: true,
    languages: ['English'],
    experience: '8 Years',
    nextAvailable: 'Wed, 10:00 AM',
    reviews: [
      { id: 'r3', userName: 'Mike T.', rating: 5, date: '3 weeks ago', comment: 'Incredible bodywork. I feel lighter.' }
    ]
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
    location: 'Austin, TX (Remote available)',
    isVerified: false,
    languages: ['English', 'French'],
    experience: '5 Years',
    nextAvailable: 'Today, 4:00 PM',
    reviews: []
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
    location: 'Chicago, IL',
    isVerified: true,
    languages: ['English', 'Korean'],
    experience: '15+ Years',
    nextAvailable: 'Fri, 11:30 AM',
    reviews: []
  }
];

export const GROUPS: Group[] = [
  { 
    id: 'g1', 
    name: 'Anxiety Support Circle', 
    image: 'https://picsum.photos/seed/group1/400/400', 
    members: 1250, 
    category: 'Anxiety',
    description: 'A safe space to share experiences and coping strategies for anxiety.',
    isJoined: true
  },
  { 
    id: 'g2', 
    name: 'Grief & Healing Together', 
    image: 'https://picsum.photos/seed/group2/400/400', 
    members: 890, 
    category: 'Grief',
    description: 'Supporting each other through the journey of loss and recovery.',
    isJoined: false
  },
  { 
    id: 'g3', 
    name: 'Mindful Living Daily', 
    image: 'https://picsum.photos/seed/group3/400/400', 
    members: 2100, 
    category: 'Wellness',
    description: 'Daily mindfulness prompts and community discussions.',
    isJoined: true
  },
  { 
    id: 'g4', 
    name: 'Trauma Survivors Unite', 
    image: 'https://picsum.photos/seed/group4/400/400', 
    members: 3400, 
    category: 'Trauma',
    description: 'Connect with others who understand what it means to heal from trauma.',
    isJoined: false
  },
  { 
    id: 'g5', 
    name: 'Art for Healing', 
    image: 'https://picsum.photos/seed/group5/400/400', 
    members: 560, 
    category: 'Creative',
    description: 'Using art and creativity as a tool for emotional release.',
    isJoined: false
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Somatic Healing Workshop',
    date: 'August 24, 2024',
    day: '24',
    month: 'AUG',
    time: '10:00 AM - 12:00 PM',
    location: 'Central Park Yoga Pavillion, NY',
    image: 'https://picsum.photos/seed/event1/800/400',
    interestedCount: 145,
    description: 'Join us for a morning of gentle movement and somatic exercises designed to release stored tension in the body. Suitable for all levels.',
    host: 'Marcus Thorne',
    category: 'Workshop',
    isInterested: true
  },
  {
    id: 'e2',
    title: 'Online Anxiety Support Group',
    date: 'August 26, 2024',
    day: '26',
    month: 'AUG',
    time: '6:00 PM - 7:30 PM',
    location: 'Online (Zoom)',
    image: 'https://picsum.photos/seed/event2/800/400',
    interestedCount: 89,
    description: 'A weekly drop-in support group facilitated by Dr. Emily Stones. Open to anyone struggling with anxiety.',
    host: 'Dr. Emily Stones',
    category: 'Support Group',
    isInterested: false
  },
  {
    id: 'e3',
    title: 'Art Therapy Open Studio',
    date: 'September 2, 2024',
    day: '02',
    month: 'SEP',
    time: '4:00 PM - 7:00 PM',
    location: 'Creative Minds Studio, Austin',
    image: 'https://picsum.photos/seed/event3/800/400',
    interestedCount: 32,
    description: 'Come create art in a supportive community environment. Materials provided.',
    host: 'Sarah Jenkins',
    category: 'Creative',
    isInterested: true
  }
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

export const TRENDING_SEARCHES = [
  'Trauma Specialists', 'Anxiety Support Groups', 'Dr. Emily Stones', 'Meditation Techniques', 'Somatic Healing', 'Local Events'
];

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  { id: 'u1', name: 'Sarah J.', handle: '@sarah', avatar: 'https://picsum.photos/seed/sarah/150/150' },
  { id: 'u2', name: 'Dr. Michael Chen', handle: '@drchen', avatar: 'https://picsum.photos/seed/mike/150/150' },
  { id: 'u11', name: 'Jessica Waters', handle: '@jessw', avatar: 'https://picsum.photos/seed/jess/150/150' },
  { id: 'u4', name: 'Luna L.', handle: '@luna', avatar: 'https://picsum.photos/seed/luna/150/150' },
  { id: 'u5', name: 'Hope C.', handle: '@hope', avatar: 'https://picsum.photos/seed/hope/150/150' },
  ...HEALERS.map(h => ({ id: h.id, name: h.name, handle: '@' + h.name.replace(/\s/g, '').toLowerCase(), avatar: h.avatar })),
];
