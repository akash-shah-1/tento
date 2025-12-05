
import React, { useState } from 'react';
import { 
  DollarSign, Users, Calendar, Video, Mic, MicOff, VideoOff, 
  PhoneOff, MessageSquare, Clock, Plus, ChevronRight, MoreVertical 
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';

type Tab = 'overview' | 'calendar' | 'clients' | 'earnings';

export const HealerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  // Mock Video Call Interface
  if (isVideoCallActive) {
    return (
      <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col animate-in fade-in">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
              <span className="font-bold">AS</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">Alex Smith</h3>
              <p className="text-xs opacity-70 flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div> 04:23</p>
            </div>
          </div>
          <button onClick={() => setIsVideoCallActive(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <img 
            src="https://picsum.photos/seed/clientface/800/800" 
            alt="Client Video" 
            className="w-full h-full object-cover opacity-90" 
          />
          
          {/* Self View (Draggable-ish look) */}
          <div className="absolute bottom-24 right-4 w-32 h-48 bg-gray-800 rounded-xl border-2 border-gray-700 overflow-hidden shadow-2xl">
             {videoOn ? (
               <img src="https://picsum.photos/seed/me/300/400" className="w-full h-full object-cover transform scale-x-[-1]" alt="Self" />
             ) : (
               <div className="w-full h-full flex items-center justify-center">
                 <VideoOff className="w-8 h-8 text-gray-500" />
               </div>
             )}
             {!micOn && (
               <div className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
                 <MicOff className="w-3 h-3 text-white" />
               </div>
             )}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 p-6 flex justify-center items-center space-x-4 md:space-x-8 pb-10 rounded-t-3xl border-t border-gray-800">
           <button 
             onClick={() => setMicOn(!micOn)}
             className={`p-4 rounded-full transition-all ${micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900'}`}
           >
             {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
           </button>
           
           <button 
             onClick={() => setVideoOn(!videoOn)}
             className={`p-4 rounded-full transition-all ${videoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900'}`}
           >
             {videoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
           </button>
           
           <button 
             onClick={() => setIsVideoCallActive(false)}
             className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-transform active:scale-95"
           >
             <PhoneOff className="w-8 h-8 fill-current" />
           </button>
           
           <button className="p-4 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700">
             <MessageSquare className="w-6 h-6" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Dashboard Nav */}
      <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex overflow-x-auto no-scrollbar space-x-1">
        {['Overview', 'Calendar', 'Clients', 'Earnings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase() as Tab)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center ${
              activeTab === tab.toLowerCase() 
                ? 'bg-primary-50 text-primary-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Stats Row */}
           <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={DollarSign} label="Revenue" value="$4.2k" trend="+12%" color="green" />
              <StatCard icon={Users} label="Clients" value="24" trend="+3" color="blue" />
              <StatCard icon={Calendar} label="Sessions" value="18" trend="Busy" color="purple" />
              <StatCard icon={Clock} label="Hours" value="32" trend="Avg" color="orange" />
           </div>

           {/* Upcoming Session */}
           <div className="lg:col-span-2 space-y-6">
             <Card className="p-6 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Next Session</h3>
                  <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full animate-pulse">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Live in 10m
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                   <div className="flex items-center space-x-4">
                     <Avatar src="https://picsum.photos/seed/client1/100/100" alt="Client" size="lg" />
                     <div>
                       <h4 className="font-bold text-gray-900 text-lg">Alex Smith</h4>
                       <p className="text-sm text-gray-600 flex items-center"><Video className="w-3 h-3 mr-1" /> Video Call • Trauma Recovery</p>
                     </div>
                   </div>
                   <div className="md:ml-auto w-full md:w-auto">
                     <Button fullWidth onClick={() => setIsVideoCallActive(true)} icon={Video} className="shadow-md">Join Room</Button>
                   </div>
                </div>
             </Card>

             <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-0">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-6 px-6 transition-colors cursor-pointer">
                       <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                         {i === 1 ? <CheckCircle className="w-5 h-5" /> : i === 2 ? <Calendar className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                       </div>
                       <div>
                         <p className="text-sm font-medium text-gray-900">
                           {i === 1 ? 'Completed session with Sarah J.' : i === 2 ? 'New booking from Mike T.' : 'Payout processed ($450.00)'}
                         </p>
                         <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                       </div>
                    </div>
                  ))}
                </div>
             </Card>
           </div>

           {/* Quick Actions Sidebar */}
           <div className="space-y-4">
              <Card className="p-5">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button fullWidth variant="outline" icon={Plus} className="justify-start h-10">Add Availability</Button>
                  <Button fullWidth variant="outline" icon={MessageSquare} className="justify-start h-10">Message Client</Button>
                  <Button fullWidth variant="outline" icon={Calendar} className="justify-start h-10">Block Time</Button>
                </div>
              </Card>
              
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-5 text-white shadow-lg">
                <h3 className="font-bold mb-1">Healer Pro</h3>
                <p className="text-xs opacity-90 mb-3">Unlock advanced analytics and lower fees.</p>
                <button className="text-xs bg-white text-primary-600 font-bold px-3 py-1.5 rounded-lg shadow-sm w-full">Upgrade</button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <Card className="p-4 md:p-6 min-h-[500px]">
           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
             <h2 className="text-lg font-bold">Schedule</h2>
             <div className="flex bg-gray-100 rounded-lg p-1">
               <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600">Day</button>
               <button className="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-gray-900">Week</button>
               <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600">Month</button>
             </div>
           </div>
           
           {/* Mock Calendar Grid */}
           <div className="border border-gray-200 rounded-lg overflow-hidden">
             <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                <div className="p-3 text-xs font-semibold text-gray-400 text-center border-r border-gray-200">Time</div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="p-3 text-center font-bold text-sm text-gray-700 border-r border-gray-200 last:border-0">{day}</div>
                ))}
             </div>
             <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'].map(time => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-100 min-h-[60px]">
                    <div className="p-2 text-xs text-gray-400 text-right pr-3 border-r border-gray-100 bg-white sticky left-0">{time}</div>
                    {[1,2,3,4,5,6,7].map(d => (
                      <div key={d} className="border-r border-gray-100 relative hover:bg-gray-50 transition-colors group">
                         {/* Random Event */}
                         {Math.random() > 0.85 && (
                           <div className="absolute inset-1 mx-1 bg-blue-100 border-l-2 border-blue-500 rounded-r text-[10px] p-1 text-blue-800 font-medium truncate cursor-pointer hover:bg-blue-200 shadow-sm">
                             Session w/ Alex
                           </div>
                         )}
                         <div className="hidden group-hover:flex absolute inset-0 items-center justify-center bg-gray-50/50">
                           <Plus className="w-4 h-4 text-gray-400" />
                         </div>
                      </div>
                    ))}
                  </div>
                ))}
             </div>
           </div>
        </Card>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-4">
           <div className="flex justify-between items-center mb-2">
             <h2 className="text-lg font-bold">My Clients (24)</h2>
             <Button size="sm" icon={Plus}>Add Client</Button>
           </div>
           <Card className="divide-y divide-gray-100">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <Avatar src={`https://picsum.photos/seed/c${i}/100/100`} alt="Client" size="md" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Client Name {i}</h4>
                      <p className="text-xs text-gray-500">Last seen: {i} days ago • 5 Sessions</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="text-xs">Notes</Button>
                    <Button size="sm" variant="outline" className="text-xs">History</Button>
                    <button className="p-2 hover:bg-gray-200 rounded-full"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
                  </div>
               </div>
             ))}
           </Card>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="p-6 bg-green-50 border-green-100">
               <p className="text-sm font-bold text-green-800 mb-1">Available for Payout</p>
               <h2 className="text-3xl font-bold text-gray-900">$1,250.00</h2>
               <Button size="sm" className="mt-4 bg-green-600 hover:bg-green-700 border-none text-white">Withdraw Funds</Button>
             </Card>
             <Card className="p-6">
                <p className="text-sm font-bold text-gray-500 mb-1">Total Earned (YTD)</p>
                <h2 className="text-3xl font-bold text-gray-900">$18,450.00</h2>
             </Card>
           </div>

           <Card className="p-6">
             <h2 className="text-lg font-bold mb-6">Earnings History</h2>
             <div className="h-48 flex items-end space-x-2 md:space-x-4 border-b border-gray-200 pb-2">
                {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 75].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-primary-200 rounded-t-sm group-hover:bg-primary-500 transition-colors" 
                      style={{ height: `${h}%` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h * 10}
                    </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
               <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
           </Card>
           
           <Card className="p-0 overflow-hidden">
             <h3 className="font-bold p-4 border-b border-gray-100">Recent Payouts</h3>
             <div className="divide-y divide-gray-100">
               {[1,2,3].map(i => (
                 <div key={i} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">Stripe Transfer</p>
                        <p className="text-xs text-gray-500">Aug {15-i}, 2024</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600 text-sm">+$450.00</span>
                 </div>
               ))}
             </div>
           </Card>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => {
  const colors: any = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  
  return (
    <Card className="p-4 flex flex-col justify-between h-28 relative overflow-hidden group hover:shadow-md transition-shadow">
       <div className="flex justify-between items-start z-10">
         <div className={`p-2 rounded-lg ${colors[color]} bg-opacity-50`}>
           <Icon className="w-5 h-5" />
         </div>
         <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">{trend}</span>
       </div>
       <div className="z-10">
         <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
       </div>
       <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 ${colors[color].split(' ')[0]}`}></div>
    </Card>
  );
};

import { CheckCircle } from 'lucide-react';
