
import React, { useState, useRef, useEffect } from 'react';
import { Smile, Camera, Gift, Send } from 'lucide-react';
import { Avatar } from '../../common/Avatar';
import { User } from '../../../types';

interface CommentInputProps {
  currentUser: User;
  onSubmit: (text: string, image?: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({ currentUser, onSubmit, placeholder = "Write a comment...", autoFocus }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="flex items-start space-x-2 py-2">
      <Avatar src={currentUser.avatar} alt="Me" size="sm" />
      <div className="flex-1 bg-gray-100 rounded-[18px] px-3 py-2 flex items-end relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent border-none focus:ring-0 w-full resize-none text-[15px] max-h-32 min-h-[36px] py-1.5 leading-5 placeholder-gray-500"
          rows={1}
        />
        <div className="flex items-center space-x-2 pb-1.5 ml-2 text-gray-500">
           <button className="hover:bg-gray-200 p-1 rounded-full"><Smile className="w-5 h-5" /></button>
           <button className="hover:bg-gray-200 p-1 rounded-full"><Camera className="w-5 h-5" /></button>
           <button className="hover:bg-gray-200 p-1 rounded-full"><Gift className="w-5 h-5" /></button>
           {text.trim() && (
             <button onClick={handleSubmit} className="text-primary-500 hover:bg-gray-200 p-1 rounded-full animate-in fade-in">
               <Send className="w-5 h-5 fill-current" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};
