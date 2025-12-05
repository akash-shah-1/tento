
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const HealerFilters: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hidden">
         <h2 className="font-bold text-gray-900">Filters</h2>
         <Button variant="ghost" size="sm" icon={X} />
      </div>

      {/* Active Filters (Mock) */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-medium flex items-center">
          $50 - $150 <X className="w-3 h-3 ml-1 cursor-pointer" />
        </span>
        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-medium flex items-center">
          Available Today <X className="w-3 h-3 ml-1 cursor-pointer" />
        </span>
        <button className="text-xs text-gray-500 hover:text-gray-900 underline">Clear all</button>
      </div>

      {/* Sort By */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sort By</h3>
        <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5">
          <option>Recommended</option>
          <option>Highest Rated</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </Card>

      {/* Filters */}
      <Card className="p-4 space-y-6">
        {/* Availability */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Availability</h3>
           <div className="space-y-2">
             <label className="flex items-center space-x-2 cursor-pointer">
               <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
               <span className="text-sm text-gray-700">Available Today</span>
             </label>
             <label className="flex items-center space-x-2 cursor-pointer">
               <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
               <span className="text-sm text-gray-700">Available this week</span>
             </label>
           </div>
        </div>

        {/* Price Range */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price Range / hr</h3>
           <input type="range" min="0" max="200" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" />
           <div className="flex justify-between text-xs text-gray-500 mt-2">
             <span>$0</span>
             <span>$200+</span>
           </div>
        </div>

        {/* Specialization */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Specialization</h3>
           <div className="space-y-2">
             {['Trauma', 'Anxiety', 'Depression', 'Grief', 'Somatic', 'Art Therapy'].map(spec => (
               <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                 <span className="text-sm text-gray-700">{spec}</span>
               </label>
             ))}
           </div>
        </div>

        {/* Language */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Language</h3>
           <div className="space-y-2">
             {['English', 'Spanish', 'French', 'Korean', 'Mandarin'].map(lang => (
               <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                 <span className="text-sm text-gray-700">{lang}</span>
               </label>
             ))}
           </div>
        </div>

        {/* Experience */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Experience</h3>
           <div className="space-y-2">
             {['0-5 years', '5-10 years', '10+ years'].map(exp => (
               <label key={exp} className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                 <span className="text-sm text-gray-700">{exp}</span>
               </label>
             ))}
           </div>
        </div>

        {/* Rating */}
        <div>
           <h3 className="font-semibold text-gray-900 mb-3 text-sm">Rating</h3>
           <div className="space-y-2">
             <label className="flex items-center space-x-2 cursor-pointer">
               <input type="radio" name="rating" className="text-primary-500 focus:ring-primary-500" />
               <span className="text-sm text-gray-700">4.0 & up</span>
             </label>
             <label className="flex items-center space-x-2 cursor-pointer">
               <input type="radio" name="rating" className="text-primary-500 focus:ring-primary-500" />
               <span className="text-sm text-gray-700">3.0 & up</span>
             </label>
           </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button fullWidth variant="outline" size="sm">Clear All Filters</Button>
        </div>
      </Card>
    </div>
  );
};
