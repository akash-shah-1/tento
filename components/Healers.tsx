import React, { useState } from 'react';
import { Star, MapPin, Clock, Calendar, CheckCircle, ChevronLeft, MessageCircle } from 'lucide-react';
import { Healer } from '../types';
import { Card, Avatar, Badge, Button, Modal } from './Shared';

// --- Healer Card ---
export const HealerCard: React.FC<{ healer: Healer; onSelect: (h: Healer) => void }> = ({ healer, onSelect }) => {
  return (
    <Card className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300" onClick={() => onSelect(healer)}>
      <div className="relative h-24 bg-gray-200 rounded-t-xl overflow-hidden">
        <img src={healer.coverImage} alt="Cover" className="w-full h-full object-cover" />
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="relative -mt-10 mb-3 flex justify-between items-end">
          <img src={healer.avatar} alt={healer.name} className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover bg-white" />
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-xs font-bold text-yellow-700">{healer.rating}</span>
            <span className="text-[10px] text-yellow-600 ml-1">({healer.reviewCount})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{healer.name}</h3>
        <p className="text-sm text-primary-600 font-medium mb-2">{healer.title}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {healer.specialization.slice(0, 3).map(spec => (
            <Badge key={spec} variant="blue">{spec}</Badge>
          ))}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{healer.about}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-sm font-semibold text-gray-900">${healer.rate}<span className="text-gray-400 font-normal">/hr</span></span>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onSelect(healer); }}>Profile</Button>
        </div>
      </div>
    </Card>
  );
};

// --- Healer Profile View ---
export const HealerProfile: React.FC<{ healer: Healer; onBack: () => void; onBook: () => void }> = ({ healer, onBack, onBook }) => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 mb-4 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Directory
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Cover */}
        <div className="h-48 md:h-64 bg-gray-200 relative">
          <img src={healer.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Info */}
        <div className="px-6 md:px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex items-end">
              <img src={healer.avatar} alt={healer.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white" />
              <div className="mb-4 ml-4 md:mb-1">
                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-white md:text-gray-900 drop-shadow-md md:drop-shadow-none">{healer.name}</h1>
                 <p className="text-white/90 md:text-primary-600 font-medium text-lg drop-shadow-md md:drop-shadow-none">{healer.title}</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
               <Button variant="outline" icon={MessageCircle}>Message</Button>
               <Button onClick={onBook}>Book Session</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{healer.about}</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {healer.specialization.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100">
                      {spec}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Reviews</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                   <div className="flex items-center mb-2">
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
                     <span className="ml-2 font-semibold text-sm">Anonymous User</span>
                   </div>
                   <p className="text-sm text-gray-600 italic">"Truly compassionate and skilled. I felt heard for the first time."</p>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="p-5 bg-gray-50/50">
                <h4 className="font-semibold text-gray-900 mb-4">Credentials</h4>
                <ul className="space-y-3">
                  {healer.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5">
                <h4 className="font-semibold text-gray-900 mb-4">Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                    {healer.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    50 min sessions
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-4 h-4 flex items-center justify-center mr-3 font-bold text-gray-400">$</div>
                    ${healer.rate} per session
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Booking Modal ---
export const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void; healer: Healer | null }> = ({ isOpen, onClose, healer }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>('');

  if (!healer) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); setStep(1); }} title={step === 1 ? "Select a Time" : "Confirm Booking"}>
      {step === 1 ? (
        <div className="space-y-6">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <Avatar src={healer.avatar} alt={healer.name} size="md" />
            <div className="ml-3">
              <p className="font-semibold text-sm text-gray-900">{healer.name}</p>
              <p className="text-xs text-gray-500">{healer.title}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <div className="grid grid-cols-4 gap-2">
              {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15'].map((d, i) => (
                <button 
                  key={d} 
                  onClick={() => setDate(d)}
                  className={`py-2 px-1 rounded-lg text-sm text-center border transition-all ${date === d ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Available Slots</label>
             <div className="grid grid-cols-3 gap-2">
               {['9:00 AM', '11:00 AM', '2:00 PM', '3:30 PM'].map(time => (
                 <button key={time} className="py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
                   {time}
                 </button>
               ))}
             </div>
          </div>

          <Button fullWidth onClick={() => setStep(2)} disabled={!date}>Continue</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Session Summary</h3>
            <p className="text-sm text-gray-500">Please review your booking details</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Healer</span>
              <span className="font-medium text-gray-900">{healer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium text-gray-900">{date}, 2:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium text-gray-900">50 mins</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-primary-600">${healer.rate}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button fullWidth onClick={onClose} variant="primary">Confirm & Pay</Button>
            <Button fullWidth onClick={() => setStep(1)} variant="ghost">Back</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
