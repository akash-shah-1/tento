
import React, { useState } from 'react';
import { Search, User, FileText, Users, Heart, Filter } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { PostCard } from '../components/feed/PostCard';
import { HealerCard } from '../components/healers/HealerCard';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Healer } from '../types';

interface SearchResultsProps {
  query: string;
  setSelectedHealer: (h: Healer) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, setSelectedHealer }) => {
  const { results } = useSearch(query);
  const [activeTab, setActiveTab] = useState<'All' | 'Posts' | 'People' | 'Healers' | 'Groups'>('All');

  const isEmpty = results.posts.length === 0 && results.healers.length === 0 && results.people.length === 0 && results.groups.length === 0;

  return (
    <div className="pb-20 md:pb-0 animate-in fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Search Results for <span className="text-primary-600">"{query}"</span>
        </h1>
        
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Posts', 'People', 'Healers', 'Groups'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isEmpty ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No results found</h3>
          <p className="text-gray-500">Try checking for typos or using different keywords.</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* People Section */}
          {(activeTab === 'All' || activeTab === 'People') && results.people.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">People</h2>
              <Card className="divide-y divide-gray-100">
                {results.people.slice(0, activeTab === 'All' ? 3 : undefined).map(user => (
                  <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar src={user.avatar} alt={user.name} size="md" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.handle}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="px-4">Add Friend</Button>
                  </div>
                ))}
              </Card>
              {activeTab === 'All' && results.people.length > 3 && (
                <Button fullWidth variant="ghost" className="mt-2" onClick={() => setActiveTab('People')}>See all people</Button>
              )}
            </section>
          )}

          {/* Healers Section */}
          {(activeTab === 'All' || activeTab === 'Healers') && results.healers.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Healers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.healers.slice(0, activeTab === 'All' ? 2 : undefined).map(healer => (
                  <HealerCard key={healer.id} healer={healer} onSelect={setSelectedHealer} />
                ))}
              </div>
              {activeTab === 'All' && results.healers.length > 2 && (
                <Button fullWidth variant="ghost" className="mt-2" onClick={() => setActiveTab('Healers')}>See all healers</Button>
              )}
            </section>
          )}

          {/* Groups Section */}
          {(activeTab === 'All' || activeTab === 'Groups') && results.groups.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Groups</h2>
              <Card className="divide-y divide-gray-100">
                {results.groups.slice(0, activeTab === 'All' ? 3 : undefined).map(group => (
                  <div key={group.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <img src={group.image} alt={group.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{group.name}</p>
                        <p className="text-xs text-gray-500">{group.members} members • {group.category}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {/* Posts Section */}
          {(activeTab === 'All' || activeTab === 'Posts') && results.posts.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Posts</h2>
              <div className="space-y-4">
                {results.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
