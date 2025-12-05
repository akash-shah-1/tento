
import React, { useState } from 'react';
import { Camera, Globe, Lock, Users, Link as LinkIcon, Instagram, Twitter, MessageCircle, Eye } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { User, UserSettings } from '../../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (data: Partial<User & UserSettings>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState("Healing is a journey, not a destination. 🌱");
  const [location, setLocation] = useState("Seattle, Washington");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  
  // Privacy Settings State
  const [visibility, setVisibility] = useState<'Public' | 'Community' | 'Private'>('Public');
  const [messagePrivacy, setMessagePrivacy] = useState<'Everyone' | 'Healers Only' | 'None'>('Everyone');
  const [sessionPrivacy, setSessionPrivacy] = useState<'Public' | 'Private'>('Private');

  const handleSave = () => {
    // Simple validation check before saving
    if (name.length < 2) return;
    onSave({ name, visibility }); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="space-y-6">
        {/* Profile Photos */}
        <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
          <img src="https://picsum.photos/seed/cover/1200/400" className="w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="relative -mt-16 ml-4 w-24 h-24">
          <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white object-cover" alt="Profile" />
          <div className="absolute bottom-0 right-0 bg-gray-100 p-1.5 rounded-full border-2 border-white cursor-pointer hover:bg-gray-200">
             <Camera className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Basic Info</h3>
          
          <Input 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            validationRule={/^.{2,}$/}
            errorMessage="Name must be at least 2 characters"
            placeholder="Your full name"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 text-right mt-1">{bio.length}/500</p>
          </div>

          <Input 
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Social Links</h3>
          <div className="grid grid-cols-1 gap-3">
            <Input 
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yoursite.com"
              validationRule={/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/}
              errorMessage="Please enter a valid URL"
            />
            <Input 
              label="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@username"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Privacy & Visibility</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <div className="grid grid-cols-3 gap-2">
               {['Public', 'Community', 'Private'].map((opt) => (
                 <button
                   key={opt}
                   onClick={() => setVisibility(opt as any)}
                   className={`flex items-center justify-center py-2 px-3 border rounded-lg text-xs md:text-sm font-medium transition-colors ${visibility === opt ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   {opt === 'Public' && <Globe className="w-3.5 h-3.5 mr-1.5" />}
                   {opt === 'Community' && <Users className="w-3.5 h-3.5 mr-1.5" />}
                   {opt === 'Private' && <Lock className="w-3.5 h-3.5 mr-1.5" />}
                   {opt}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MessageCircle className="w-4 h-4 mr-1 text-gray-400" /> Who can message you?
              </label>
              <select 
                value={messagePrivacy} 
                onChange={(e) => setMessagePrivacy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              >
                <option>Everyone</option>
                <option>Healers Only</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Eye className="w-4 h-4 mr-1 text-gray-400" /> Who can see sessions?
              </label>
              <select 
                value={sessionPrivacy} 
                onChange={(e) => setSessionPrivacy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              >
                <option>Private</option>
                <option>Public</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
};
