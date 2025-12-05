
import React from 'react';
import { MoreVertical, Search, Video } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { HEALERS, TRENDING_TOPICS, UPCOMING_SESSIONS, CONVERSATIONS } from '../../data/index';
import { RightSidebarSkeleton } from '../common/LoadingStates';

export const RightSidebar: React.FC<{ setSelectedHealer: (h: any) => void, setView: (v: any) => void, isLoading?: boolean }> = ({ setSelectedHealer, setView, isLoading }) => {
  if (isLoading) {
    return (
      <div className="hidden lg:block pr-2">
        <div className="sticky top-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pl-2 pb-6">
          <RightSidebarSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block pr-2">
      <div className="sticky top-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pl-2 pb-6 space-y-5">
         
         {/* Upcoming Sessions Widget */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
           <div className="flex justify-between items-center mb-3">
             <h3 className="font-semibold text-gray-600 text-sm">Upcoming Session</h3>
             <span className="text-xs text-primary-500 hover:bg-primary-50 px-2 py-1 rounded cursor-pointer transition-colors">See all</span>
           </div>
           {UPCOMING_SESSIONS.length > 0 ? UPCOMING_SESSIONS.map(session => (
             <div key={session.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors -mx-2">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 rounded-xl text-blue-600 border border-blue-100 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Tom</span>
                  <span className="text-lg font-bold leading-none">14</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{session.type}</p>
                  <p className="text-xs text-gray-500 truncate">w/ {session.healerName}</p>
                  <div className="flex items-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                    <p className="text-xs text-green-700 font-medium">2:00 PM</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <Video className="w-4 h-4 text-gray-400" />
                </Button>
             </div>
           )) : (
             <p className="text-xs text-gray-400 text-center py-2">No upcoming sessions</p>
           )}
         </div>

         {/* Suggested Healers Widget */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-gray-600 text-sm">Suggested Healers</h3>
             <span className="text-xs text-primary-500 hover:bg-primary-50 px-2 py-1 rounded cursor-pointer transition-colors">See all</span>
           </div>
           <div className="space-y-4">
             {HEALERS.slice(0, 2).map(healer => (
               <div key={healer.id} className="flex items-start space-x-3 group cursor-pointer" onClick={() => { setSelectedHealer(healer); setView('healers'); }}>
                 <Avatar src={healer.avatar} alt={healer.name} size="md" className="rounded-xl shadow-sm" />
                 <div className="flex-1 min-w-0">
                   <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors">{healer.name}</h4>
                   <p className="text-xs text-gray-500 truncate mb-2">{healer.title}</p>
                   <Button size="sm" variant="outline" className="w-full h-7 text-xs border-gray-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600">
                     View Profile
                   </Button>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Trending Topics Widget */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-600 text-sm mb-3">Trending for you</h3>
            <div className="space-y-1">
              {TRENDING_TOPICS.slice(0, 4).map((topic, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-gray-50 cursor-pointer -mx-2 transition-colors group">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{topic.tag}</p>
                    <p className="text-xs text-gray-400">{topic.posts}</p>
                  </div>
                  <MoreVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                </div>
              ))}
            </div>
         </div>
         
         {/* Contacts List */}
         <div>
           <div className="flex justify-between items-center px-1 mb-2">
             <h3 className="font-semibold text-gray-500 text-sm">Contacts</h3>
             <div className="flex space-x-2">
                <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
             </div>
           </div>
           {CONVERSATIONS.map(c => (
             <div key={c.id} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer -mx-2 transition-colors group">
               <div className="relative">
                 <Avatar src={c.user.avatar} alt={c.user.name} size="sm" />
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-50 border-2 border-[#F0F2F5] group-hover:border-gray-200 rounded-full"></div>
               </div>
               <span className="text-sm font-medium text-gray-900">{c.user.name}</span>
             </div>
           ))}
         </div>

      </div>
    </div>
  );
};
