
import React from 'react';
import { Edit2, PlusSquare, ChevronDown, MapPin, Heart, Clock } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { CURRENT_USER, POSTS } from '../data/index';
import { usePosts } from '../hooks/usePosts';

export const Profile: React.FC = () => {
  const { addPost } = usePosts(CURRENT_USER);

  return (
    <div className="pb-20 md:pb-0 animate-in fade-in duration-300">
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
         <div className="h-48 md:h-64 bg-gradient-to-r from-gray-700 to-gray-900 relative">
           <img src="https://picsum.photos/seed/cover/1200/400" className="w-full h-full object-cover opacity-60" alt="Cover" />
           <Button variant="ghost" className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md" icon={Edit2}>Edit Cover Photo</Button>
         </div>
         <div className="px-4 md:px-8 pb-6 relative">
           <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-10 mb-4 md:mb-0">
              <div className="relative">
                 <div className="p-1 bg-white rounded-full">
                   <Avatar src={CURRENT_USER.avatar} alt="Me" size="xl" className="border-4 border-white" />
                 </div>
                 <button className="absolute bottom-2 right-2 p-1.5 bg-gray-200 rounded-full border-2 border-white text-gray-800 hover:bg-gray-300 transition-colors">
                   <Edit2 className="w-4 h-4" />
                 </button>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                 <h1 className="text-3xl font-bold text-gray-900">{CURRENT_USER.name}</h1>
                 <p className="text-gray-500 font-semibold text-lg">1.2k Friends</p>
                 <div className="flex -space-x-2 justify-center md:justify-start mt-2">
                   {[1,2,3,4,5].map(i => (
                     <img key={i} src={`https://picsum.photos/seed/${i}/100`} className="w-8 h-8 rounded-full border-2 border-white" alt="Friend" />
                   ))}
                 </div>
              </div>
              <div className="flex space-x-3 mt-6 md:mt-0 md:mb-4">
                <Button variant="primary" icon={PlusSquare}>Add to Story</Button>
                <Button variant="secondary" icon={Edit2}>Edit Profile</Button>
              </div>
           </div>
           
           <div className="border-t border-gray-200 mt-6 pt-1">
             <div className="flex space-x-1 overflow-x-auto no-scrollbar">
               <TabButton active>Posts</TabButton>
               <TabButton>About</TabButton>
               <TabButton>Friends</TabButton>
               <TabButton>Photos</TabButton>
               <TabButton>Videos</TabButton>
               <TabButton>More <ChevronDown className="w-4 h-4 ml-1" /></TabButton>
             </div>
           </div>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Intro</h3>
              <div className="text-center mb-6">
                <p className="text-gray-800 text-sm">"Healing is a journey, not a destination. 🌱"</p>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-gray-400" /> Lives in <span className="font-semibold ml-1">Seattle, Washington</span></div>
                <div className="flex items-center"><Heart className="w-5 h-5 mr-3 text-gray-400" /> Single</div>
                <div className="flex items-center"><Clock className="w-5 h-5 mr-3 text-gray-400" /> Joined January 2023</div>
              </div>
              <Button fullWidth variant="secondary" className="mt-4 bg-gray-100 text-gray-800 hover:bg-gray-200">Edit Details</Button>
              <Button fullWidth variant="secondary" className="mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200">Add Hobbies</Button>
            </Card>
            
            <Card className="p-4">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg text-gray-900">Photos</h3>
                 <span className="text-primary-600 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">See all photos</span>
               </div>
               <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                  {[1,2,3,4,5,6,7,8,9].map(i => (
                    <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:opacity-90">
                      <img src={`https://picsum.photos/seed/photo${i}/200/200`} alt="Gallery" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-4">
             <CreatePost onPostCreate={addPost} />
             {POSTS.map(post => <PostCard key={post.id} post={{...post, user: CURRENT_USER, visibility: 'Public'}} />)}
          </div>
       </div>
    </div>
  );
};

const TabButton: React.FC<{ active?: boolean; children: React.ReactNode }> = ({ active, children }) => (
  <button className={`px-4 py-3 text-sm font-semibold flex items-center transition-colors ${active ? 'text-primary-600 border-b-[3px] border-primary-500' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}`}>
    {children}
  </button>
);
