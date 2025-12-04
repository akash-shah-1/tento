
import React, { useState } from 'react';
import { Smile, Image as ImageIcon, EyeOff } from 'lucide-react';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { CURRENT_USER } from '../../data/index';
import { CreatePostModal } from './CreatePostModal';

interface CreatePostProps {
  onPostCreate: (content: string, image: string | undefined, visibility: any, isAnonymous: boolean) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="mb-6 p-4">
        <div className="flex space-x-3 md:space-x-4">
          <Avatar src={CURRENT_USER.avatar} alt="Me" size="md" className="cursor-pointer hover:opacity-90" />
          <div className="flex-1">
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-100 rounded-full px-5 py-3 text-gray-500 text-sm md:text-base cursor-pointer hover:bg-gray-200 transition-colors w-full text-left"
            >
              What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 px-2 md:px-4">
          <Button variant="ghost" size="sm" icon={ImageIcon} className="text-gray-500 hover:bg-gray-100 flex-1 md:flex-none" onClick={() => setIsModalOpen(true)}>
            Photo
          </Button>
          <Button variant="ghost" size="sm" icon={Smile} className="text-gray-500 hover:bg-gray-100 flex-1 md:flex-none" onClick={() => setIsModalOpen(true)}>
            Feeling
          </Button>
          <Button variant="ghost" size="sm" icon={EyeOff} className="text-gray-500 hover:bg-gray-100 flex-1 md:flex-none" onClick={() => setIsModalOpen(true)}>
            Anonymous
          </Button>
        </div>
      </Card>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentUser={CURRENT_USER}
        onSubmit={onPostCreate}
      />
    </>
  );
};
