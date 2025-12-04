
import React from 'react';

const REACTIONS = [
  { label: 'Like', emoji: '👍', color: 'text-blue-500' },
  { label: 'Love', emoji: '❤️', color: 'text-red-500' },
  { label: 'Care', emoji: '🥰', color: 'text-yellow-500' },
  { label: 'Haha', emoji: '😆', color: 'text-yellow-500' },
  { label: 'Wow', emoji: '😮', color: 'text-yellow-500' },
  { label: 'Sad', emoji: '😢', color: 'text-yellow-500' },
  { label: 'Angry', emoji: '😡', color: 'text-orange-500' },
  { label: 'Support', emoji: '🙏', color: 'text-purple-500' },
];

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
  isVisible: boolean;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelect, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-100 p-1.5 flex gap-1 z-50 animate-in slide-in-from-bottom-2 duration-200">
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.label}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(reaction.label);
          }}
          className="group relative p-1 hover:-translate-y-2 transition-transform duration-200"
        >
          <span className="text-2xl md:text-3xl filter drop-shadow-sm transition-transform group-hover:scale-125 block">
            {reaction.emoji}
          </span>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {reaction.label}
          </span>
        </button>
      ))}
    </div>
  );
};
