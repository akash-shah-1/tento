import React, { useState } from 'react';
import { Star, MapPin, Clock, CheckCircle, ChevronLeft, MessageCircle, Share2, MoreVertical, Bookmark, Calendar, Globe, Award, ThumbsUp, Flag } from 'lucide-react';
import { Healer } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { ShareDrawer } from '../feed/ShareDrawer';

type Tab = 'about' | 'specialization' | 'reviews' | 'credentials' | 'availability';

export const HealerProfile: React.FC<{ healer: Healer; onBack: () => void; onBook: () => void }> = ({ healer, onBack, onBook }) => {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 pb-10">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Directory
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 relative">
        {/* Cover */}
        <div className="h-48 md:h-64 bg-gray-200 relative">
          <img src={healer.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <button 
              onClick={() => setIsShareOpen(true)} 
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)} 
              className={`p-2 bg-white/20 backdrop-blur-md rounded-full transition-colors hover:bg-white/30 ${isSaved ? 'text-yellow-400' : 'text-white'}`}
              title="Save"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                title="More"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-in fade-in zoom-in-95 origin-top-right text-gray-800 z-50">
                   <button 
                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center" 
                     onClick={() => { setIsShareOpen(true); setShowMoreMenu(false); }}
                   >
                     <Share2 className="w-4 h-4 mr-2" /> Share Profile
                   </button>
                   <button 
                     className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600" 
                     onClick={() => setShowMoreMenu(false)}
                   >
                     <Flag className="w-4 h-4 mr-2" /> Report Healer
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Header Info */}
        <div className="px-6 md:px-8 pb-4 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex items-end">
              <div className="relative">
                 <img src={healer.avatar} alt={healer.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                 {healer.isVerified && (
                   <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 border-2 border-white">
                     <CheckCircle className="w-4 h-4 text-white" />
                   </div>
                 )}
              </div>
              <div className="mb-4 ml-4 md:mb-1">
                 <div className="flex items-center space-x-2">
                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-white md:text-gray-900 drop-shadow-md md:drop-shadow-none">{healer.name}</h1>
                   <span className="hidden md:flex bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200 items-center"><CheckCircle className="w-3 h-3 mr-1" /> Verified</span>
                 </div>
                 <p className="text-white/90 md:text-primary-600 font-medium text-lg drop-shadow-md md:drop-shadow-none">{healer.title}</p>
                 <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-2">
                   <MapPin className="w-4 h-4 mr-1" /> {healer.location}
                 </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
               <Button variant="outline" icon={MessageCircle} className="flex-1 md:flex-none">Message</Button>
               <Button onClick={onBook} className="flex-1 md:flex-none px-8">Book Session</Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-100 overflow-x-auto no-scrollbar">
            {['About', 'Specialization', 'Reviews', 'Credentials', 'Availability'].map((tab) => {
               const key = tab.toLowerCase() as Tab;
               return (
                 <button 
                   key={key}
                   onClick={() => setActiveTab(key)}
                   className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === key ? 'text-primary-600 border-primary-500' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                 >
                   {tab}
                 </button>
               )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 bg-gray-50 min-h-[300px]">
           {/* Change from lg:grid-cols-3 to md:grid-cols-3 to allow 2 columns on tablet */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Left Column (Main Content) */}
             <div className="md:col-span-2 space-y-6">
                
                {activeTab === 'about' && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">About Me</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{healer.about}</p>
                    <button className="text-primary-600 font-semibold text-sm mt-2 hover:underline">Read more</button>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                       <div>
                         <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Experience</span>
                         <span className="text-gray-900 font-medium">{healer.experience} of Practice</span>
                       </div>
                       <div>
                         <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Languages</span>
                         <span className="text-gray-900 font-medium">{healer.languages.join(', ')}</span>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specialization' && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="text-lg font-bold text-gray-900">Areas of Expertise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {healer.specialization.map(spec => (
                        <div key={spec} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start space-x-3">
                           <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                             <Award className="w-5 h-5" />
                           </div>
                           <div>
                             <h4 className="font-semibold text-gray-900">{spec}</h4>
                             <p className="text-xs text-gray-500 mt-1">Specialized support and evidence-based techniques.</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                       <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                         <div className="flex flex-col items-center">
                           <span className="text-5xl font-bold text-gray-900">{healer.rating}</span>
                           <div className="flex text-yellow-400 my-1">
                               {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(healer.rating) ? 'fill-current' : 'text-gray-300'}`} />)}
                           </div>
                           <span className="text-xs text-gray-500">{healer.reviewCount} Reviews</span>
                         </div>
                         
                         {/* Distribution Bars */}
                         <div className="flex-1 w-full space-y-1">
                           {[5,4,3,2,1].map((star, i) => (
                             <div key={star} className="flex items-center text-xs">
                               <span className="w-3 mr-2 font-medium text-gray-500">{star}</span>
                               <Star className="w-3 h-3 text-gray-400 mr-2" />
                               <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-400 rounded-full" 
                                    style={{ width: i === 0 ? '80%' : i === 1 ? '15%' : '2%' }}
                                  ></div>
                               </div>
                               <span className="ml-2 text-gray-400 w-6 text-right">{i === 0 ? '80%' : i === 1 ? '15%' : '0%'}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>

                    <div className="flex items-center space-x-2">
                       <Button size="sm" variant="outline" className="rounded-full">All</Button>
                       <Button size="sm" variant="ghost" className="rounded-full bg-white">5 Stars</Button>
                       <Button size="sm" variant="ghost" className="rounded-full bg-white">With Comments</Button>
                    </div>

                    <div className="space-y-4">
                      {healer.reviews.map(review => (
                        <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                           <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center space-x-2">
                               <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                                 {review.userName[0]}
                               </div>
                               <div>
                                 <p className="text-sm font-semibold text-gray-900">{review.userName}</p>
                                 <div className="flex text-yellow-400 text-xs">
                                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                                 </div>
                               </div>
                             </div>
                             <span className="text-xs text-gray-400">{review.date}</span>
                           </div>
                           <p className="text-gray-700 text-sm pl-12 mb-3">{review.comment}</p>
                           
                           <div className="flex items-center space-x-4 pl-12 text-xs text-gray-500">
                              <button className="flex items-center hover:text-gray-900"><ThumbsUp className="w-3 h-3 mr-1" /> Helpful</button>
                              <button className="flex items-center hover:text-red-600"><Flag className="w-3 h-3 mr-1" /> Report</button>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'credentials' && (
                   <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Credentials & Education</h3>
                     <ul className="space-y-4">
                       {healer.credentials.map((cred, i) => (
                         <li key={i} className="flex items-start text-gray-700 p-3 bg-gray-50 rounded-lg">
                           <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                           <span className="font-medium">{cred}</span>
                           <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verified</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                )}

                {activeTab === 'availability' && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Availability</h3>
                    <div className="grid grid-cols-5 gap-2 text-center mb-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                        <div key={day} className="text-sm font-semibold text-gray-600">{day}</div>
                      ))}
                      {[1,2,3,4,5].map(day => (
                        <div key={day} className="space-y-2">
                          {[9, 11, 14].map(hour => (
                             <button key={hour} onClick={onBook} className="w-full py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 border border-green-200 block">
                               {hour}:00
                             </button>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-4 border-t pt-2">
                       <p>* Cancellation Policy: Free cancellation up to 24 hours before session.</p>
                    </div>
                  </div>
                )}
             </div>

             {/* Right Column (Sidebar) */}
             <div className="space-y-6">
               <Card className="p-5">
                 <h4 className="font-semibold text-gray-900 mb-4">Session Details</h4>
                 <div className="space-y-4">
                   <div className="flex items-center text-sm text-gray-700">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600"><Clock className="w-4 h-4" /></div>
                     <div>
                       <p className="font-medium">50 min sessions</p>
                       <p className="text-xs text-gray-500">Standard duration</p>
                     </div>
                   </div>
                   <div className="flex items-center text-sm text-gray-700">
                     <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-3 text-green-600"><div className="font-bold text-sm">$</div></div>
                     <div>
                       <p className="font-medium">${healer.rate} per session</p>
                       <p className="text-xs text-gray-500">Sliding scale available</p>
                     </div>
                   </div>
                   <div className="flex items-center text-sm text-gray-700">
                     <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-3 text-purple-600"><Globe className="w-4 h-4" /></div>
                     <div>
                       <p className="font-medium">Online & In-person</p>
                       <p className="text-xs text-gray-500">{healer.location}</p>
                     </div>
                   </div>
                 </div>
                 <div className="mt-6 pt-4 border-t border-gray-100">
                   <p className="text-xs text-gray-500 mb-2">Next available appointment</p>
                   <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold text-center cursor-pointer hover:bg-green-100 transition-colors" onClick={onBook}>
                      {healer.nextAvailable}
                   </div>
                 </div>
               </Card>
             </div>
           </div>
        </div>
      </div>
      
      <ShareDrawer 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        postUrl={`https://healspace.app/healer/${healer.id}`}
        title="Share Profile"
      />
    </div>
  );
};