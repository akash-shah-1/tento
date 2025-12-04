
import React from 'react';
import { Star } from 'lucide-react';
import { Healer } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

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
