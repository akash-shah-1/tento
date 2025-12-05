
import { useState, useEffect } from 'react';
import { Story, StoryItem, User } from '../types';
import { STORIES, CURRENT_USER } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../utils/storage';

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  useEffect(() => {
    // Changed key to v2 to force load new mock data for demonstration
    const stored = getFromStorage<Story[]>('healspace_stories_v2', STORIES);
    const now = Date.now();
    const validStories = stored.map(s => ({
      ...s,
      items: s.items.filter(i => (now - i.timestamp) < 24 * 60 * 60 * 1000)
    })).filter(s => s.items.length > 0);
    
    setStories(validStories);
  }, []);

  const viewStory = (userIndex: number) => {
    setActiveStoryIndex(userIndex);
    const story = stories[userIndex];
    const firstUnviewed = story.items.findIndex(i => !i.isViewed);
    setActiveItemIndex(firstUnviewed === -1 ? 0 : firstUnviewed);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setActiveItemIndex(0);
  };

  const nextStoryItem = () => {
    if (activeStoryIndex === null) return;
    
    const currentStory = stories[activeStoryIndex];
    
    // Mark as viewed
    const updatedStories = [...stories];
    updatedStories[activeStoryIndex].items[activeItemIndex].isViewed = true;
    
    if (updatedStories[activeStoryIndex].items.every(i => i.isViewed)) {
        updatedStories[activeStoryIndex].allViewed = true;
    }
    setStories(updatedStories);
    saveToStorage('healspace_stories_v2', updatedStories);

    if (activeItemIndex < currentStory.items.length - 1) {
      setActiveItemIndex(prev => prev + 1);
    } else {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex(prev => (prev !== null ? prev + 1 : null));
        setActiveItemIndex(0);
      } else {
        closeStory();
      }
    }
  };

  const prevStoryItem = () => {
    if (activeStoryIndex === null) return;

    if (activeItemIndex > 0) {
      setActiveItemIndex(prev => prev - 1);
    } else {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(prev => (prev !== null ? prev - 1 : null));
        setActiveItemIndex(stories[activeStoryIndex - 1].items.length - 1);
      }
    }
  };

  const addStory = (item: Omit<StoryItem, 'id' | 'timestamp' | 'isViewed' | 'viewers'>) => {
    const newItem: StoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      isViewed: false,
      viewers: [],
      ...item
    };

    let updatedStories = [...stories];
    const myStoryIndex = updatedStories.findIndex(s => s.userId === CURRENT_USER.id);

    if (myStoryIndex > -1) {
      updatedStories[myStoryIndex].items.push(newItem);
      updatedStories[myStoryIndex].lastUpdated = Date.now();
      updatedStories[myStoryIndex].allViewed = false;
    } else {
      const newStory: Story = {
        userId: CURRENT_USER.id,
        user: CURRENT_USER,
        items: [newItem],
        lastUpdated: Date.now(),
        allViewed: false
      };
      updatedStories = [newStory, ...updatedStories];
    }

    setStories(updatedStories);
    saveToStorage('healspace_stories_v2', updatedStories);
  };

  const reactToStory = (reaction: string) => {
    console.log(`Reacted ${reaction} to story`);
    // Logic to add to viewer list for owner would go here in a real backend scenario
  };

  return {
    stories,
    activeStoryIndex,
    activeItemIndex,
    viewStory,
    closeStory,
    nextStoryItem,
    prevStoryItem,
    addStory,
    reactToStory
  };
};
