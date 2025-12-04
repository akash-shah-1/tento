
import React from 'react';
import { X, Link, MessageCircle, Twitter, Facebook, Mail, PlusSquare } from 'lucide-react';
import { Modal } from '../common/Modal';

interface ShareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  postUrl?: string;
}

export const ShareDrawer: React.FC<ShareDrawerProps> = ({ isOpen, onClose, postUrl = 'https://healspace.app/post/123' }) => {
  const options = [
    { icon: PlusSquare, label: 'Share to Feed', color: 'bg-gray-100 text-gray-700' },
    { icon: MessageCircle, label: 'Send in Message', color: 'bg-blue-100 text-blue-600' },
    { icon: Link, label: 'Copy Link', color: 'bg-gray-100 text-gray-700', onClick: () => navigator.clipboard.writeText(postUrl) },
    { icon: Facebook, label: 'Facebook', color: 'bg-blue-50 text-blue-700' },
    { icon: Twitter, label: 'Twitter', color: 'bg-sky-50 text-sky-500' },
    { icon: Mail, label: 'Email', color: 'bg-red-50 text-red-600' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Post">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => {
              if (opt.onClick) opt.onClick();
              onClose();
            }}
            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${opt.color}`}>
              <opt.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">{opt.label}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
};
