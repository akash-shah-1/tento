
import React from 'react';
import { Search, Phone, Video, MoreVertical, Image as ImageIcon, Smile, Send } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { CONVERSATIONS, MOCK_MESSAGES, HEALERS } from '../data/index';

export const Messages: React.FC = () => {
  return (
    <div className="h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
      {/* Conversation List */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Chats</h2>
          <div className="relative">
            <input type="text" placeholder="Search Messenger" className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm border-none focus:ring-2 focus:ring-primary-100 transition-all" />
            <Search className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(conv => (
            <div key={conv.id} className="p-3 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer rounded-lg mx-2 my-1 transition-colors">
              <div className="relative">
                <Avatar src={conv.user.avatar} alt={conv.user.name} size="md" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>{conv.user.name}</h4>
                <div className="flex justify-between items-center">
                   <p className={`text-xs truncate max-w-[140px] ${conv.unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>{conv.lastMessage}</p>
                   <span className="text-[10px] text-gray-400">{conv.timestamp}</span>
                </div>
              </div>
              {conv.unreadCount > 0 && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-white">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center space-x-3">
            <Avatar src={HEALERS[0].avatar} alt="Chat" size="sm" status />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{HEALERS[0].name}</h3>
              <span className="text-xs text-green-600 font-medium">Active now</span>
            </div>
          </div>
          <div className="flex space-x-2 text-primary-500">
             <Button variant="ghost" size="sm" icon={Phone} />
             <Button variant="ghost" size="sm" icon={Video} />
             <Button variant="ghost" size="sm" icon={MoreVertical} className="text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {MOCK_MESSAGES.map(msg => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               {!msg.isMe && <Avatar src={HEALERS[0].avatar} alt="Sender" size="xs" className="mr-2 mt-auto" />}
               <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                 msg.isMe 
                   ? 'bg-primary-500 text-white' 
                   : 'bg-gray-100 text-gray-800'
               }`}>
                 {msg.text}
               </div>
             </div>
          ))}
        </div>

        <div className="p-3">
           <div className="flex items-center space-x-2">
             <Button variant="ghost" icon={ImageIcon} className="text-primary-500" />
             <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2">
               <input type="text" placeholder="Aa" className="bg-transparent border-none w-full text-sm focus:ring-0 outline-none" />
               <Smile className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
             </div>
             <Button variant="ghost" icon={Send} className="text-primary-500" />
           </div>
        </div>
      </div>
    </div>
  );
};
