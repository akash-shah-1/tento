
import React, { useState } from 'react';
import { Smile, Frown, Meh, ThumbsUp, CloudRain, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journal, setJournal] = useState('');

  const moods = [
    { label: 'Happy', icon: Smile, color: 'text-yellow-500 bg-yellow-50', barColor: 'bg-yellow-400' },
    { label: 'Calm', icon: ThumbsUp, color: 'text-green-500 bg-green-50', barColor: 'bg-green-400' },
    { label: 'Neutral', icon: Meh, color: 'text-gray-500 bg-gray-50', barColor: 'bg-gray-300' },
    { label: 'Sad', icon: CloudRain, color: 'text-blue-500 bg-blue-50', barColor: 'bg-blue-400' },
    { label: 'Anxious', icon: Frown, color: 'text-purple-500 bg-purple-50', barColor: 'bg-purple-400' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
        <p className="text-gray-500">Track your emotional well-being over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Check-in */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">How are you feeling today?</h2>
            <div className="grid grid-cols-5 gap-2 md:gap-4 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                    selectedMood === mood.label 
                      ? 'ring-2 ring-primary-500 scale-105 bg-gray-50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${mood.color}`}>
                    <mood.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Journal Entry (Optional)</label>
              <textarea 
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="What's on your mind? Writing it down can help..."
                className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button disabled={!selectedMood} onClick={() => alert('Mood Saved!')}>
                Save Check-in
              </Button>
            </div>
          </Card>

          {/* History Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Weekly History</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" /> Last 7 Days
              </div>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2 md:gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                // Mock data heights
                const height = [40, 60, 30, 80, 50, 90, 70][i];
                const moodIndex = Math.floor(Math.random() * 5);
                const color = moods[moodIndex].barColor;
                
                return (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 hover:opacity-80 ${color}`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2 font-medium">{day}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-none">
            <h3 className="font-bold text-lg mb-2">Weekly Insight</h3>
            <p className="text-white/90 text-sm mb-4">You've been feeling mostly <span className="font-bold">Calm</span> this week. Great job maintaining balance!</p>
            <div className="flex items-center text-xs bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>Mood up 15% vs last week</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Entries</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-yellow-50 p-2 rounded-full text-yellow-600">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm font-semibold text-gray-900">Feeling Happy</span>
                      <span className="text-[10px] text-gray-400">2d ago</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">Had a really good session with my therapist today. Feeling much lighter.</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-primary-600 text-sm font-medium mt-4 hover:underline flex items-center justify-center">
              View All History <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
