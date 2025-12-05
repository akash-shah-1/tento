
import React, { useState } from 'react';
import { Edit2, PlusSquare, ChevronDown, MapPin, Heart, Clock, Calendar, DollarSign, TrendingUp, Users, Star, Settings as SettingsIcon, LayoutGrid, List, Image as ImageIcon, Video, Filter } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { BecomeHealerModal } from '../components/healers/BecomeHealerModal';
import { CURRENT_USER, POSTS, HEALERS } from '../data/index';
import { usePosts } from '../hooks/usePosts';
import { Session, ViewState } from '../types';

// Mock Sessions Data
const SESSIONS: Session[] = [
  { id: '1', healerId: 'h1', healerName: 'Dr. Emily Stones', healerAvatar: HEALERS[0].avatar, date: 'Aug 14, 2024', time: '2:00 PM', duration: 50, type: 'Video Call', status: 'Upcoming', price: 150 },
  { id: '2', healerId: 'h2', healerName: 'Marcus Thorne', healerAvatar: HEALERS[1].avatar, date: 'Aug 02, 2024', time: '10:00 AM', duration: 60, type: 'Video Call', status: 'Completed', price: 120 },
];

export const Profile: React.FC<{ showToast?: (msg: string) => void; setView?: (view: ViewState) => void }> = ({ showToast, setView }) => {
  const { addPost } = usePosts(CURRENT_USER);
  const [activeTab, setActiveTab] = useState<'posts'|'stories'|'sessions'|'saved'|'dashboard'>('posts');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHealerModalOpen, setIsHealerModalOpen] = useState(false);
  const [user, setUser] = useState(CURRENT_USER);
  
  // Post Filters
  const [postFilter, setPostFilter] = useState<'All' | 'Photos' | 'Videos'>('All');
  const [viewMode, setViewMode] = useState<'List' | 'Grid'>('List');

  // Healer status mock (In real app, comes from user profile)
  const [isHealer, setIsHealer] = useState(false); 

  return (
    <div className="pb-20 md:pb-0 animate-in fade-in duration-300">
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
         <div className="h-48 md:h-64 bg-gradient-to-r from-gray-700 to-gray-900 relative group">
           <img src="https://picsum.photos/seed/cover/1200/400" className="w-full h-full object-cover opacity-60" alt="Cover" />
           <Button variant="ghost" className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" icon={Edit2}>Edit Cover</Button>
         </div>
         <div className="px-4 md:px-8 pb-6 relative">
           <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-10 mb-4 md:mb-0">
              <div className="relative">
                 <div className="p-1 bg-white rounded-full">
                   <Avatar src={user.avatar} alt="Me" size="xl" className="border-4 border-white" />
                 </div>
                 <button onClick={() => setIsEditOpen(true)} className="absolute bottom-2 right-2 p-1.5 bg-gray-200 rounded-full border-2 border-white text-gray-800 hover:bg-gray-300 transition-colors">
                   <Edit2 className="w-4 h-4" />
                 </button>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                 <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                 <p className="text-gray-500 font-semibold text-lg">{user.handle} • Joined Jan 2023</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-0 md:mb-4">
                <Button variant="primary" icon={PlusSquare}>Add Story</Button>
                <Button variant="secondary" icon={Edit2} onClick={() => setIsEditOpen(true)}>Edit Profile</Button>
                {/* Settings Button for Mobile/Tablet convenience */}
                {setView && (
                  <Button variant="outline" className="px-3" onClick={() => setView('settings')}>
                    <SettingsIcon className="w-5 h-5 text-gray-600" />
                  </Button>
                )}
              </div>
           </div>
           
           <div className="border-t border-gray-200 mt-6 pt-1">
             <div className="flex space-x-1 overflow-x-auto no-scrollbar">
               <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>Posts</TabButton>
               <TabButton active={activeTab === 'stories'} onClick={() => setActiveTab('stories')}>Stories</TabButton>
               <TabButton active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>Saved</TabButton>
               <TabButton active={activeTab === 'sessions'} onClick={() => setActiveTab('sessions')}>Sessions</TabButton>
               {isHealer && <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>Dashboard</TabButton>}
             </div>
           </div>
         </div>
       </div>

       {activeTab === 'posts' && (
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Intro</h3>
                <div className="text-center mb-6">
                  <p className="text-gray-800 text-sm">"Healing is a journey, not a destination. 🌱"</p>
                </div>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-gray-400" /> Seattle, Washington</div>
                  <div className="flex items-center"><Clock className="w-5 h-5 mr-3 text-gray-400" /> Joined January 2023</div>
                </div>
                
                {/* Become a Healer CTA if not healer */}
                {!isHealer && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white text-center">
                      <p className="font-bold text-sm mb-2">Are you a Healer?</p>
                      <Button size="sm" className="bg-white text-primary-600 w-full hover:bg-gray-50" onClick={() => setIsHealerModalOpen(true)}>
                        Become a Healer
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
              <Card className="p-4">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-lg text-gray-900">Photos</h3>
                   <span className="text-primary-600 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">See all</span>
                 </div>
                 <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:opacity-90">
                        <img src={`https://picsum.photos/seed/photo${i}/200/200`} alt="Gallery" className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
              </Card>
            </div>
            
            <div className="lg:col-span-3 space-y-4">
               <CreatePost onPostCreate={addPost} />
               
               {/* Filters & Toggles */}
               <Card className="p-3 flex justify-between items-center sticky top-16 z-20">
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => setPostFilter('All')} 
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${postFilter === 'All' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      All Posts
                    </button>
                    <button 
                      onClick={() => setPostFilter('Photos')} 
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center ${postFilter === 'Photos' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <ImageIcon className="w-4 h-4 mr-1.5" /> Photos
                    </button>
                    <button 
                      onClick={() => setPostFilter('Videos')} 
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center ${postFilter === 'Videos' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Video className="w-4 h-4 mr-1.5" /> Videos
                    </button>
                  </div>
                  <div className="flex space-x-2 border-l border-gray-200 pl-3">
                     <button onClick={() => setViewMode('List')} className={`p-1.5 rounded hover:bg-gray-100 ${viewMode === 'List' ? 'text-primary-500' : 'text-gray-400'}`}>
                       <List className="w-5 h-5" />
                     </button>
                     <button onClick={() => setViewMode('Grid')} className={`p-1.5 rounded hover:bg-gray-100 ${viewMode === 'Grid' ? 'text-primary-500' : 'text-gray-400'}`}>
                       <LayoutGrid className="w-5 h-5" />
                     </button>
                  </div>
               </Card>

               {/* Grid View Logic (Simple Mock) */}
               {viewMode === 'Grid' ? (
                 <div className="grid grid-cols-2 gap-4">
                   {POSTS.map(post => (
                     <div key={post.id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group cursor-pointer">
                        {post.image ? (
                          <img src={post.image} className="w-full h-full object-cover" alt="Post" />
                        ) : (
                          <div className="p-4 text-xs text-gray-500 h-full flex items-center justify-center text-center">{post.content.slice(0,50)}...</div>
                        )}
                     </div>
                   ))}
                 </div>
               ) : (
                 // List View
                 POSTS.map(post => <PostCard key={post.id} post={{...post, user: CURRENT_USER, visibility: 'Public'}} />)
               )}
            </div>
         </div>
       )}

       {activeTab === 'sessions' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
           <div className="space-y-4">
             <h3 className="font-bold text-lg text-gray-900">Upcoming Sessions</h3>
             {SESSIONS.filter(s => s.status === 'Upcoming').map(s => (
               <Card key={s.id} className="p-5 border-l-4 border-l-primary-500">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center space-x-3">
                     <Avatar src={s.healerAvatar} alt={s.healerName} size="md" />
                     <div>
                       <h4 className="font-bold text-gray-900">{s.healerName}</h4>
                       <p className="text-xs text-gray-500">{s.type}</p>
                     </div>
                   </div>
                   <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded">Upcoming</span>
                 </div>
                 <div className="flex items-center space-x-4 text-sm text-gray-700 mb-4">
                   <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> {s.date}</div>
                   <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> {s.time} ({s.duration}m)</div>
                 </div>
                 <div className="flex space-x-3">
                   <Button size="sm" fullWidth>Join Call</Button>
                   <Button size="sm" variant="outline" fullWidth>Reschedule</Button>
                 </div>
               </Card>
             ))}
             {SESSIONS.filter(s => s.status === 'Upcoming').length === 0 && (
               <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                 <p className="text-gray-500">No upcoming sessions.</p>
                 <Button variant="outline" className="mt-4">Find a Healer</Button>
               </div>
             )}
           </div>

           <div className="space-y-4">
             <h3 className="font-bold text-lg text-gray-900">Past History</h3>
             {SESSIONS.filter(s => s.status === 'Completed').map(s => (
               <Card key={s.id} className="p-5 opacity-80 hover:opacity-100 transition-opacity">
                 <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center space-x-3">
                     <Avatar src={s.healerAvatar} alt={s.healerName} size="sm" />
                     <div>
                       <h4 className="font-semibold text-gray-900">{s.healerName}</h4>
                       <p className="text-xs text-gray-500">{s.date}</p>
                     </div>
                   </div>
                   <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded">Completed</span>
                 </div>
                 <Button size="sm" variant="outline" fullWidth>Book Again</Button>
               </Card>
             ))}
           </div>
         </div>
       )}

       {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard icon={DollarSign} label="Total Earnings" value="$1,240" color="bg-green-100 text-green-600" />
                <StatCard icon={Users} label="Total Clients" value="18" color="bg-blue-100 text-blue-600" />
                <StatCard icon={Calendar} label="Sessions" value="42" color="bg-purple-100 text-purple-600" />
                <StatCard icon={Star} label="Rating" value="4.9" color="bg-yellow-100 text-yellow-600" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="md:col-span-2 p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900">Weekly Availability</h3>
                    <Button size="sm" variant="outline">Edit Hours</Button>
                 </div>
                 <div className="grid grid-cols-7 gap-2 text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="space-y-2">
                        <div className="text-xs font-bold text-gray-500 uppercase">{day}</div>
                        <div className={`h-24 rounded-lg flex items-center justify-center text-xs ${day === 'Sat' || day === 'Sun' ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                          {day === 'Sat' || day === 'Sun' ? 'Off' : '9am - 5pm'}
                        </div>
                      </div>
                    ))}
                 </div>
               </Card>
               <Card className="p-6">
                 <h3 className="font-bold text-gray-900 mb-4">Pending Requests</h3>
                 <div className="space-y-4">
                    {[1,2].map(i => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                           <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                           <div>
                             <p className="text-sm font-semibold">New Client</p>
                             <p className="text-xs text-gray-500">Video Call • 50m</p>
                           </div>
                         </div>
                         <div className="flex space-x-1">
                           <button className="p-1 bg-green-100 text-green-600 rounded">✓</button>
                           <button className="p-1 bg-red-100 text-red-600 rounded">✕</button>
                         </div>
                      </div>
                    ))}
                 </div>
               </Card>
             </div>
          </div>
       )}

       {/* Edit Modal */}
       <EditProfileModal 
         isOpen={isEditOpen} 
         onClose={() => setIsEditOpen(false)} 
         user={user} 
         onSave={(data) => {
            setUser(prev => ({ ...prev, ...data }));
            showToast?.('Profile updated successfully');
         }}
       />

       {/* Become Healer Modal */}
       <BecomeHealerModal 
         isOpen={isHealerModalOpen}
         onClose={() => setIsHealerModalOpen(false)}
       />
    </div>
  );
};

const TabButton: React.FC<{ active?: boolean; children: React.ReactNode; onClick: () => void }> = ({ active, children, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3 text-sm font-semibold flex items-center transition-colors ${active ? 'text-primary-600 border-b-[3px] border-primary-500' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}`}
  >
    {children}
  </button>
);

const StatCard: React.FC<{ icon: any; label: string; value: string; color: string }> = ({ icon: Icon, label, value, color }) => (
  <Card className="p-4 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </Card>
);
