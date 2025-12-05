
import React from 'react';
import { Card } from './Card';
import { Skeleton } from './Skeleton';

// --- Feed Post Skeleton ---
export const PostSkeleton: React.FC = () => {
  return (
    <Card className="mb-4 md:mb-6 p-4 md:p-5">
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2">
          <Skeleton variant="text" width={120} height={14} />
          <Skeleton variant="text" width={80} height={10} />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
      {/* Randomly show image skeleton */}
      {Math.random() > 0.5 && <Skeleton variant="rectangular" width="100%" height={250} className="mb-4" />}
      <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
        <Skeleton variant="rectangular" width="30%" height={36} />
        <Skeleton variant="rectangular" width="30%" height={36} />
        <Skeleton variant="rectangular" width="30%" height={36} />
      </div>
    </Card>
  );
};

// --- Stories Skeleton ---
export const StorySkeleton: React.FC = () => {
  return (
    <div className="flex space-x-4 overflow-hidden py-2 px-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col items-center space-y-2 min-w-[72px]">
          <div className="p-[2px] rounded-full border-2 border-gray-200">
             <Skeleton variant="circular" width={56} height={56} />
          </div>
          <Skeleton variant="text" width={40} height={10} />
        </div>
      ))}
    </div>
  );
};

// --- Healer Card Skeleton ---
export const HealerCardSkeleton: React.FC = () => {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <Skeleton variant="rectangular" width="100%" height={112} className="rounded-b-none" />
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="relative -mt-10 mb-3 flex justify-between items-end">
          <Skeleton variant="circular" width={80} height={80} className="border-4 border-white" />
          <Skeleton variant="rectangular" width={60} height={24} className="rounded-lg" />
        </div>
        
        <Skeleton variant="text" width="70%" height={20} className="mb-2" />
        <Skeleton variant="text" width="40%" height={14} className="mb-4" />
        
        <div className="flex gap-2 mb-4">
          <Skeleton variant="rectangular" width={60} height={24} />
          <Skeleton variant="rectangular" width={60} height={24} />
        </div>

        <div className="space-y-2 mb-4">
          <Skeleton variant="text" width="100%" height={12} />
          <Skeleton variant="text" width="90%" height={12} />
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <Skeleton variant="text" width={60} height={16} />
          <div className="flex gap-2">
             <Skeleton variant="rectangular" width={60} height={32} />
             <Skeleton variant="rectangular" width={60} height={32} />
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- Message Item Skeleton ---
export const MessageItemSkeleton: React.FC = () => {
  return (
    <div className="p-3 flex items-center space-x-3">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <Skeleton variant="text" width={100} height={14} />
          <Skeleton variant="text" width={30} height={10} />
        </div>
        <Skeleton variant="text" width="60%" height={12} />
      </div>
    </div>
  );
};

// --- Sidebar Skeleton ---
export const SidebarSkeleton: React.FC = () => (
  <div className="space-y-6 p-4">
    <div className="flex items-center space-x-3 mb-6">
      <Skeleton variant="circular" width={36} height={36} />
      <Skeleton variant="text" width={100} height={16} />
    </div>
    <div className="space-y-4">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={120} height={14} />
        </div>
      ))}
    </div>
    <div className="border-t border-gray-100 pt-4 mt-4">
      <Skeleton variant="text" width={80} height={14} className="mb-3" />
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={140} height={14} />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={140} height={14} />
        </div>
      </div>
    </div>
  </div>
);

// --- Right Sidebar Skeleton ---
export const RightSidebarSkeleton: React.FC = () => (
  <div className="space-y-5">
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <Skeleton variant="text" width={100} height={14} />
        <Skeleton variant="text" width={40} height={12} />
      </div>
      <div className="flex items-center space-x-3">
        <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="60%" height={14} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
    </Card>
    
    <Card className="p-4">
      <Skeleton variant="text" width={120} height={14} className="mb-4" />
      <div className="space-y-4">
        {[1,2].map(i => (
          <div key={i} className="flex items-start space-x-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" width="70%" height={14} />
              <Skeleton variant="text" width="50%" height={12} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
