
import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, Video, Mic, ArrowLeft, Download, MessageSquare } from 'lucide-react';
import { Healer } from '../../types';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';

export const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void; healer: Healer | null }> = ({ isOpen, onClose, healer }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'video' | 'audio'>('video');

  if (!healer) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDate('');
      setTime('');
    }, 300);
  };

  const steps = [
    { num: 1, label: 'Date' },
    { num: 2, label: 'Time' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Pay' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 5 ? "Booking Confirmed" : "Book Session"}>
      {/* Progress Bar (Hidden on Success Step) */}
      {step < 5 && (
        <div className="flex items-center justify-between mb-8 px-2">
           {steps.map((s) => (
             <div key={s.num} className="flex flex-col items-center relative z-10">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${step >= s.num ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                 {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
               </div>
               <span className={`text-[10px] mt-1 font-medium ${step >= s.num ? 'text-primary-600' : 'text-gray-400'}`}>{s.label}</span>
             </div>
           ))}
           <div className="absolute left-6 right-6 h-[2px] bg-gray-100 top-16 -z-0 hidden md:block" style={{ width: 'calc(100% - 48px)' }}></div> 
        </div>
      )}

      <div className="min-h-[300px] flex flex-col">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
             <h3 className="text-lg font-bold text-gray-900">Select a Date</h3>
             <div className="grid grid-cols-4 gap-2">
               {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17'].map((d) => (
                 <button 
                   key={d} 
                   onClick={() => setDate(d)}
                   className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center ${date === d ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500' : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}
                 >
                   <span className="text-xs text-gray-500">{d.split(' ')[0]}</span>
                   <span className="text-lg font-bold">{d.split(' ')[1]}</span>
                 </button>
               ))}
             </div>
             <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
               <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
               <p>Healer is in <strong>New York (EST)</strong>. Times are converted to your local timezone.</p>
             </div>
          </div>
        )}

        {step === 2 && (
           <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
             <h3 className="text-lg font-bold text-gray-900">Select Time</h3>
             <div className="grid grid-cols-3 gap-3">
               {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:30 PM', '4:30 PM'].map(t => (
                 <button 
                    key={t} 
                    onClick={() => setTime(t)}
                    className={`py-3 text-sm font-medium border rounded-lg hover:shadow-sm transition-all ${time === t ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                 >
                   {t}
                 </button>
               ))}
             </div>
           </div>
        )}

        {step === 3 && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             <h3 className="text-lg font-bold text-gray-900">Session Details</h3>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
               <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => setSessionType('video')}
                   className={`p-4 border rounded-xl flex flex-col items-center space-y-2 ${sessionType === 'video' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}
                 >
                   <Video className="w-6 h-6" />
                   <span className="font-semibold text-sm">Video Call</span>
                 </button>
                 <button 
                   onClick={() => setSessionType('audio')}
                   className={`p-4 border rounded-xl flex flex-col items-center space-y-2 ${sessionType === 'audio' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}
                 >
                   <Mic className="w-6 h-6" />
                   <span className="font-semibold text-sm">Audio Only</span>
                 </button>
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Note for {healer.name} (Optional)</label>
               <textarea className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-primary-500 focus:border-primary-500" rows={3} placeholder="Briefly describe what you'd like to discuss..."></textarea>
             </div>
           </div>
        )}

        {step === 4 && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4 border-b border-gray-200 pb-4">
                   <Avatar src={healer.avatar} alt={healer.name} size="md" />
                   <div>
                     <p className="font-bold text-gray-900">{healer.name}</p>
                     <p className="text-xs text-gray-500">{healer.title}</p>
                   </div>
                </div>
                <div className="space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="text-gray-500">Date</span>
                     <span className="font-medium">{date}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Time</span>
                     <span className="font-medium">{time}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Duration</span>
                     <span className="font-medium">50 Minutes</span>
                   </div>
                   <div className="flex justify-between pt-2 text-lg">
                     <span className="font-bold text-gray-900">Total</span>
                     <span className="font-bold text-primary-600">${healer.rate}</span>
                   </div>
                </div>
              </div>

              {/* Mock Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">•••• •••• •••• 4242</span>
                  <span className="ml-auto text-xs text-blue-600 font-semibold cursor-pointer">Change</span>
                </div>
              </div>
           </div>
        )}

        {step === 5 && (
           <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in-95 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 mb-8 max-w-xs">Your session with {healer.name} is scheduled for <strong>{date} at {time}</strong>.</p>
              
              <div className="w-full space-y-3">
                <Button fullWidth icon={Download} variant="outline">Add to Calendar</Button>
                <Button fullWidth icon={MessageSquare} variant="secondary">Message Healer</Button>
                <Button fullWidth onClick={handleClose}>Done</Button>
              </div>
           </div>
        )}
        
        {/* Footer Actions */}
        {step < 5 && (
          <div className="mt-auto pt-6 flex space-x-3">
             {step > 1 && (
               <Button variant="ghost" onClick={() => setStep(s => s - 1)} icon={ArrowLeft}>Back</Button>
             )}
             <Button 
               fullWidth 
               onClick={() => {
                 if (step < 4) setStep(s => s + 1);
                 else setStep(5); // Move to success step
               }}
               disabled={step === 1 && !date || step === 2 && !time}
             >
               {step === 4 ? `Pay $${healer.rate} & Book` : 'Continue'}
             </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
