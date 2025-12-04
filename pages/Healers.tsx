
import React from 'react';
import { Search } from 'lucide-react';
import { HealerCard } from '../components/healers/HealerCard';
import { HealerProfile } from '../components/healers/HealerProfile';
import { HEALERS } from '../data/index';
import { Healer } from '../types';

export const HealersPage: React.FC<{ selectedHealer: Healer | null; setSelectedHealer: (h: Healer | null) => void; onBook: () => void }> = ({ selectedHealer, setSelectedHealer, onBook }) => {
  if (selectedHealer) {
    return (
      <HealerProfile 
        healer={selectedHealer} 
        onBack={() => setSelectedHealer(null)} 
        onBook={onBook}
      />
    );
  }
  return (
    <div className="pb-20 md:pb-0">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 md:p-10 mb-8 text-center text-white shadow-lg shadow-primary-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Find Your Guide</h1>
          <p className="text-white/90 mb-6 max-w-lg mx-auto text-base">Connect with compassionate professionals specialized in trauma recovery.</p>
          <div className="max-w-lg mx-auto relative">
            <input 
              type="text" 
              placeholder="Search healers, specialties..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 border-0 shadow-lg"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {HEALERS.map(healer => (
          <HealerCard key={healer.id} healer={healer} onSelect={setSelectedHealer} />
        ))}
      </div>
    </div>
  );
};
