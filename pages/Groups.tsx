
import React, { useState } from 'react';
import { Search, Users, ChevronLeft, MoreHorizontal, Share2 } from 'lucide-react';
import { GROUPS, POSTS, CURRENT_USER } from '../data/index';
import { Group } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PostCard } from '../components/feed/PostCard';
import { Avatar } from '../components/common/Avatar';

export const Groups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  if (selectedGroup) {
    return (
      <div className="animate-in fade-in pb-20 md:pb-0">
        <button onClick={() => setSelectedGroup(null)} className="flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Groups
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-48 md:h-64 relative">
            <img src={selectedGroup.image} alt={selectedGroup.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 md:left-8 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{selectedGroup.name}</h1>
              <p className="text-white/90 font-medium">{selectedGroup.members.toLocaleString()} members • {selectedGroup.category}</p>
            </div>
          </div>
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
             <div className="flex-1">
               <h2 className="text-lg font-bold text-gray-900 mb-1">About</h2>
               <p className="text-gray-600 text-sm">{selectedGroup.description}</p>
             </div>
             <div className="flex space-x-2 w-full md:w-auto">
               <Button variant={selectedGroup.isJoined ? "outline" : "primary"} fullWidth className="md:w-auto">
                 {selectedGroup.isJoined ? "Joined" : "Join Group"}
               </Button>
               <Button variant="ghost" icon={Share2} />
               <Button variant="ghost" icon={MoreHorizontal} />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
             <Card className="p-4 mb-4">
                <div className="flex space-x-3">
                  <Avatar src={CURRENT_USER.avatar} alt="Me" size="md" />
                  <input type="text" placeholder="Write something..." className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
             </Card>
             {POSTS.map(post => (
               <PostCard key={post.id} post={{...post, visibility: 'Public'}} />
             ))}
          </div>
          <div className="space-y-4">
             <Card className="p-4">
               <h3 className="font-bold text-gray-900 mb-3">Admins</h3>
               <div className="flex items-center space-x-2">
                 <Avatar src="https://picsum.photos/seed/admin1/100/100" alt="Admin" size="sm" />
                 <span className="text-sm font-medium">Sarah J.</span>
               </div>
             </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <p className="text-gray-500">Find your community</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search groups..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 w-full md:w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GROUPS.map(group => (
          <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedGroup(group)}>
            <div className="h-32 bg-gray-200 relative">
              <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{group.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{group.members.toLocaleString()} members • {group.category}</p>
              <Button fullWidth variant={group.isJoined ? "outline" : "primary"} onClick={(e) => { e.stopPropagation(); }}>
                {group.isJoined ? "Visit" : "Join"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
