
import React, { useState } from 'react';
import { Calendar, MapPin, Star, ChevronLeft, Clock, Share2, MoreHorizontal, User } from 'lucide-react';
import { EVENTS } from '../data/index';
import { Event } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (selectedEvent) {
    return (
      <div className="animate-in fade-in pb-20 md:pb-0">
        <button onClick={() => setSelectedEvent(null)} className="flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-48 md:h-80 relative">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-gray-900 border border-white/50">
              {selectedEvent.category}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
               <div>
                 <h1 className="text-xl md:text-2xl font-bold text-red-600 mb-1">{selectedEvent.date} @ {selectedEvent.time}</h1>
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                 <div className="flex items-center text-gray-600 text-sm">
                   <MapPin className="w-4 h-4 mr-1" /> {selectedEvent.location}
                 </div>
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                 <Button variant={selectedEvent.isInterested ? "secondary" : "primary"} icon={Star} fullWidth>
                   {selectedEvent.isInterested ? "Interested" : "Interested"}
                 </Button>
                 <Button variant="ghost" icon={Share2} />
                 <Button variant="ghost" icon={MoreHorizontal} />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Details</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedEvent.description}</p>
                
                <h3 className="font-bold text-lg text-gray-900 mt-8 mb-3">Meet Your Host</h3>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                   <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                     <User className="w-6 h-6 text-gray-600" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900">{selectedEvent.host}</p>
                     <p className="text-sm text-gray-500">Organizer</p>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Interested</span>
                    <span className="font-bold text-gray-900">{selectedEvent.interestedCount} people</span>
                  </div>
                  <div className="flex -space-x-2 overflow-hidden mb-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200" />
                    ))}
                  </div>
                  <Button fullWidth variant="outline">Invite Friends</Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
        <Button variant="outline" size="sm">Filter</Button>
      </div>

      <div className="space-y-4">
        {EVENTS.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <div className="md:w-48 h-32 md:h-auto bg-gray-200 relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-white rounded-lg p-2 text-center shadow-sm min-w-[50px]">
                <span className="block text-xs font-bold text-red-500 uppercase">{event.month}</span>
                <span className="block text-xl font-bold text-gray-900 leading-none">{event.day}</span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <p className="text-xs font-bold text-red-600 mb-1">{event.date} • {event.time}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{event.location}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-400">{event.interestedCount} interested</span>
                <Button size="sm" variant={event.isInterested ? "secondary" : "outline"} icon={Star} onClick={(e) => e.stopPropagation()}>
                  {event.isInterested ? "Interested" : "Interested"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
