
import React from 'react';
import { Star, CheckCircle, Clock, Bookmark } from 'lucide-react';
import { Healer } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const HealerCard: React.FC<{ healer: Healer; onSelect: (h: Healer) => void }> = ({ healer, onSelect }) => {
  return (
    <Card className="flex flex-col h-full hover:-translate-y-1 transition-all duration-300 group relative" onClick={() => onSelect(healer)}>
      
      {/* Save Button */}
      <button 
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-primary-500 hover:bg-white transition-colors shadow-sm"
        onClick={(e) => { e.stopPropagation(); /* Add save logic */ }}
      >
        <Bookmark className="w-4 h-4" />
      </button>

      <div className="relative h-28 bg-gray-200 rounded-t-xl overflow-hidden">
        <img src={healer.coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="relative -mt-10 mb-3 flex justify-between items-end">
          <div className="relative">
             <img src={healer.avatar} alt={healer.name} className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover bg-white" />
             {healer.isVerified && (
               <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                 <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
               </div>
             )}
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
            <span className="text-xs font-bold text-yellow-700">{healer.rating}</span>
            <span className="text-[10px] text-yellow-600 ml-1">({healer.reviewCount})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight flex items-center">
          {healer.name}
        </h3>
        <p className="text-sm text-primary-600 font-medium mb-3">{healer.title}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {healer.specialization.slice(0, 3).map(spec => (
            <Badge key={spec} variant="blue">{spec}</Badge>
          ))}
        </div>
        
        {/* Next Available Slot */}
        <div className="flex items-center text-xs text-green-700 bg-green-50 p-2 rounded-lg mb-4">
           <Clock className="w-3.5 h-3.5 mr-2" />
           Next available: <span className="font-semibold ml-1">{healer.nextAvailable}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div>
            <span className="text-sm font-bold text-gray-900">${healer.rate}</span>
            <span className="text-xs text-gray-500 font-normal">/hr</span>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
             <Button size="sm" variant="ghost" className="text-xs px-2" onClick={(e) => { e.stopPropagation(); onSelect(healer); }}>Profile</Button>
             <Button size="sm" variant="primary" className="text-xs px-3 shadow-md" onClick={(e) => { e.stopPropagation(); onSelect(healer); }}>Book</Button>
          </div>
          <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-200 absolute right-5 bottom-5">
             <Button size="sm" variant="outline" className="text-xs">View</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
