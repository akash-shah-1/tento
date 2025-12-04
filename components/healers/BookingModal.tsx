
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Healer } from '../../types';
import { Modal } from '../common/Modal';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';

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
