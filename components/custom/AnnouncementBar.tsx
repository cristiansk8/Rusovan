// /components/AnnouncementBar.tsx
import React from 'react';

type AnnouncementBarProps = {
  text?: string;
  enabled?: boolean;
};

const AnnouncementBar = ({
  text = 'ENVÍO GRATIS en pedidos superiores a $150.000 COP',
  enabled = true
}: AnnouncementBarProps) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white text-sm font-medium h-10 w-full">
      <div className="h-full flex justify-center items-center text-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="inline">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
