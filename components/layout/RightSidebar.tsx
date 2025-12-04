import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { HEALERS, TRENDING_TOPICS, UPCOMING_SESSIONS, CONVERSATIONS } from '../../data/index';

export const RightSidebar: React.FC<{ setSelectedHealer: (h: any) => void, setView: (v: any) => void }> = ({ setSelectedHealer, setView }) => {
  return (
    <div className="hidden lg:block">
      {/* Top is relative to the scroll container, not viewport */}
      <div className="sticky top-6 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pl-2 space-y-6">
         
         {/* Upcoming Sessions */}
         <div className="pr-2">
           <div className="flex justify-between items-center mb-3 text-gray-500">
             <h3 className="font-semibold text-base">Upcoming Sessions</h3>
             <span className="text-xs hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">See all</span>
           </div>
           {UPCOMING_SESSIONS.map(session => (
             <div key={session.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary-50 rounded-lg text-primary-600 border border-primary-100">
                  <span className="text-xs font-bold uppercase">Tom</span>
                  <span className="text-lg font-bold leading-none">14</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{session.type}</p>
                  <p className="text-xs text-gray-500">with {session.healerName}</p>
                  <p className="text-xs text-primary-600 font-medium mt-0.5">2:00 PM</p>
                </div>
             </div>
           ))}
         </div>

         <div className="border-b border-gray-300 mx-2"></div>

         {/* Suggested Healers */}
         <div className="pr-2">
           <div className="flex justify-between items-center mb-3 text-gray-500">
             <h3 className="font-semibold text-base">Suggested Healers</h3>
             <span className="text-xs hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">See all</span>
           </div>
           <div className="space-y-3">
             {HEALERS.slice(0, 3).map(healer => (
               <div key={healer.id} className="flex items-start space-x-3 group cursor-pointer" onClick={() => { setSelectedHealer(healer); setView('healers'); }}>
                 <Avatar src={healer.avatar} alt={healer.name} size="md" className="rounded-lg" />
                 <div className="flex-1 min-w-0">
                   <h4 className="text-sm font-semibold text-gray-900 truncate">{healer.name}</h4>
                   <p className="text-xs text-gray-500 truncate mb-1">{healer.title}</p>
                   <Button size="sm" variant="secondary" className="w-full h-7 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">Book</Button>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="border-b border-gray-300 mx-2"></div>

         {/* Trending Topics */}
         <div className="pr-2">
            <h3 className="font-semibold text-gray-500 text-base mb-3">Trending for you</h3>
            {TRENDING_TOPICS.map((topic, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-gray-200 cursor-pointer -mx-2 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{topic.tag}</p>
                  <p className="text-xs text-gray-500">{topic.posts}</p>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </div>
            ))}
         </div>
         
         <div className="border-b border-gray-300 mx-2"></div>

         {/* Quick Links */}
         <div className="pr-2">
           <h3 className="font-semibold text-gray-500 text-base mb-3">Contacts</h3>
           {CONVERSATIONS.map(c => (
             <div key={c.id} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer -mx-2 transition-colors">
               <Avatar src={c.user.avatar} alt={c.user.name} size="sm" status />
               <span className="text-sm font-semibold text-gray-900">{c.user.name}</span>
             </div>
           ))}
         </div>

      </div>
    </div>
  );
};