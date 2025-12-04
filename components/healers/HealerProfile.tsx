
import React from 'react';
import { Star, MapPin, Clock, CheckCircle, ChevronLeft, MessageCircle } from 'lucide-react';
import { Healer } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

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
