'use client';

import React from 'react';

// TypeScript interfaces for sidebar items
export interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  tooltip?: string;
}

interface SideNavbarProps {
  columns: SidebarItem[];
  activeItemId?: string;
}

export default function SideNavbar({ columns, activeItemId }: SideNavbarProps): React.JSX.Element {
  return (
    <div className="flex flex-col bg-gray-100 border-r border-gray-700 h-full w-12">
      {columns.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          title={item.tooltip || item.name}
          className={`
            flex items-center justify-center h-12 w-12 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer
            ${activeItemId === item.id || item.isActive 
              ? 'bg-gray-500 text-white border-l-2 border-blue-500' 
              : 'hover:bg-gray-500'
            }
          `}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {item.icon}
          </div>
        </button>
      ))}
    </div>
  );
}
