
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Smile, MapPin, UserPlus, Globe, Lock, Users, EyeOff, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { FileUpload } from '../common/FileUpload';
import { User } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSubmit: (content: string, image: string | undefined, visibility: 'Public' | 'Private' | 'Friends', isAnonymous: boolean) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, currentUser, onSubmit }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [visibility, setVisibility] = useState<'Public' | 'Private' | 'Friends'>('Public');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!content.trim() && !image) return;
    onSubmit(content, image || undefined, visibility, isAnonymous);
    // Reset state
    setContent('');
    setImage(null);
    setIsAnonymous(false);
    setShowUpload(false);
    onClose();
  };

  const VisibilityIcon = {
    'Public': Globe,
    'Friends': Users,
    'Private': Lock
  }[visibility];

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-4 py-4 border-b border-gray-100 flex items-center justify-center">
          <h2 className="text-lg font-bold text-gray-900">Create Post</h2>
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* User Profile Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar 
              src={isAnonymous ? "https://ui-avatars.com/api/?name=Anonymous&background=random" : currentUser.avatar} 
              alt="User" 
              size="md" 
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {isAnonymous ? 'Anonymous Member' : currentUser.name}
              </h3>
              <div className="flex space-x-2 mt-1">
                <button 
                  onClick={() => {
                    const next = visibility === 'Public' ? 'Friends' : visibility === 'Friends' ? 'Private' : 'Public';
                    setVisibility(next);
                  }}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-xs font-medium text-gray-700 transition-colors"
                >
                  <VisibilityIcon className="w-3 h-3" />
                  <span>{visibility}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${isAnonymous ? 'Friend' : currentUser.name.split(' ')[0]}?`}
            className="w-full min-h-[120px] text-lg md:text-xl placeholder-gray-400 border-none focus:ring-0 resize-none p-0"
            autoFocus
          />

          {/* File Upload Section */}
          {(showUpload || image) && (
            <div className="mt-4">
              {image ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={image} alt="Upload preview" className="w-full max-h-[300px] object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <FileUpload onFileSelect={(url) => setImage(url)} />
              )}
            </div>
          )}
          
          {/* Emoji Picker Mock */}
          {showEmojiPicker && (
             <div className="bg-gray-50 p-2 rounded-lg grid grid-cols-8 gap-1 mb-2 animate-in slide-in-from-top-2 mt-2">
               {['😀','😂','🥰','😢','😡','👍','🎉','🙏'].map(emoji => (
                 <button key={emoji} onClick={() => setContent(c => c + emoji)} className="text-2xl hover:bg-gray-200 rounded p-1 transition-colors">
                   {emoji}
                 </button>
               ))}
             </div>
          )}

          {/* Add to Post Options */}
          <div className="mt-4 border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm">
            <span className="text-sm font-semibold text-gray-700 pl-1 hidden sm:block">Add to your post</span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <OptionButton 
                icon={ImageIcon} // Reuse ImageIcon but logic handled by FileUpload now
                color="text-green-500" 
                onClick={() => setShowUpload(!showUpload)} 
                active={showUpload}
                tooltip="Photo/Video" 
              />
              <OptionButton icon={UserPlus} color="text-blue-500" tooltip="Tag People" />
              <OptionButton icon={Smile} color="text-yellow-500" onClick={() => setShowEmojiPicker(!showEmojiPicker)} tooltip="Feeling/Activity" />
              <OptionButton icon={MapPin} color="text-red-500" tooltip="Check in" />
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <OptionButton 
                icon={EyeOff} 
                color={isAnonymous ? "text-purple-600 bg-purple-50" : "text-gray-500"} 
                onClick={() => setIsAnonymous(!isAnonymous)} 
                active={isAnonymous}
                tooltip="Anonymous Mode"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button 
            fullWidth 
            onClick={handleSubmit} 
            disabled={!content.trim() && !image}
            className={`${(!content.trim() && !image) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary-500 text-white'}`}
          >
            Post
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const OptionButton: React.FC<{ icon: any; color: string; onClick?: () => void; active?: boolean; tooltip?: string }> = ({ icon: Icon, color, onClick, active, tooltip }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full transition-colors relative group ${active ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
    title={tooltip}
  >
    <Icon className={`w-6 h-6 ${color}`} />
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
      {tooltip}
    </span>
  </button>
);
