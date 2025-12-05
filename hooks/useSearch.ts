
import { useState, useEffect } from 'react';
import { Post, Healer, User, Group } from '../types';
import { POSTS, HEALERS, MOCK_USERS, GROUPS } from '../data/index';
import { getFromStorage, saveToStorage } from '../utils/storage';

export const useSearch = (query: string) => {
  const [results, setResults] = useState<{
    posts: Post[];
    healers: Healer[];
    people: User[];
    groups: Group[];
  }>({ posts: [], healers: [], people: [], groups: [] });
  
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = getFromStorage<string[]>('search_history', []);
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], healers: [], people: [], groups: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Mock Search Logic
    const matchedPosts = POSTS.filter(p => p.content.toLowerCase().includes(lowerQuery));
    const matchedHealers = HEALERS.filter(h => 
      h.name.toLowerCase().includes(lowerQuery) || 
      h.title.toLowerCase().includes(lowerQuery) || 
      h.specialization.some(s => s.toLowerCase().includes(lowerQuery))
    );
    const matchedPeople = MOCK_USERS.filter(u => u.name.toLowerCase().includes(lowerQuery) || u.handle.toLowerCase().includes(lowerQuery));
    const matchedGroups = GROUPS.filter(g => g.name.toLowerCase().includes(lowerQuery) || g.category.toLowerCase().includes(lowerQuery));

    setResults({
      posts: matchedPosts,
      healers: matchedHealers,
      people: matchedPeople,
      groups: matchedGroups
    });

  }, [query]);

  const addToHistory = (term: string) => {
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 8);
    setHistory(newHistory);
    saveToStorage('search_history', newHistory);
  };

  const removeFromHistory = (term: string) => {
    const newHistory = history.filter(h => h !== term);
    setHistory(newHistory);
    saveToStorage('search_history', newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    saveToStorage('search_history', []);
  };

  return { results, history, addToHistory, removeFromHistory, clearHistory };
};
