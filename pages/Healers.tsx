import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { HealerCard } from '../components/healers/HealerCard';
import { HealerProfile } from '../components/healers/HealerProfile';
import { HealerFilters } from '../components/healers/HealerFilters';
import { HEALERS } from '../data/index';
import { Healer } from '../types';
import { Button } from '../components/common/Button';
import { HealerCardSkeleton } from '../components/common/LoadingStates';

export const HealersPage: React.FC<{ selectedHealer: Healer | null; setSelectedHealer: (h: Healer | null) => void; onBook: () => void }> = ({ selectedHealer, setSelectedHealer, onBook }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading on mount
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 md:p-10 mb-8 text-center text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Find Your Healer</h1>
          <p className="text-white/90 mb-6 max-w-lg mx-auto text-base">Connect with compassionate professionals specialized in your journey.</p>
          <div className="max-w-xl mx-auto relative flex items-center">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 z-10" />
            <input 
              type="text" 
              placeholder="Search by name, specialty, or condition..." 
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 border-0 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <HealerFilters />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
           <Button variant="outline" icon={Filter} fullWidth>Filters & Sort</Button>
        </div>

        {/* Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500 text-sm font-medium">{isLoading ? 'Finding healers...' : `${HEALERS.length} Healers available`}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                <HealerCardSkeleton />
                <HealerCardSkeleton />
                <HealerCardSkeleton />
                <HealerCardSkeleton />
              </>
            ) : (
              HEALERS.map(healer => (
                <div key={healer.id} className="animate-fade-in">
                  <HealerCard healer={healer} onSelect={setSelectedHealer} />
                </div>
              ))
            )}
          </div>
          
          {!isLoading && (
            <div className="mt-10 flex justify-center animate-fade-in">
               <Button variant="outline">Load More Healers</Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};