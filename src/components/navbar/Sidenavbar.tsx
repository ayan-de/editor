'use client';

import React from 'react';
import { SideNavbarProps } from './types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SideNavbar({
  columns,
  activeItemId,
}: SideNavbarProps): React.JSX.Element {
  return (
    <div className="flex flex-col bg-muted border-r border-border h-full w-12">
      {columns.map((item) => (
        <Button
          key={item.id}
          variant={
            activeItemId === item.id || item.isActive ? 'secondary' : 'ghost'
          }
          size="sm"
          onClick={item.onClick}
          title={item.tooltip || item.name}
          className={cn(
            'h-12 w-12 p-0 rounded-none border-l-2 border-transparent transition-all duration-200 cursor-pointer',
            activeItemId === item.id || item.isActive
              ? 'border-l-primary bg-secondary text-secondary-foreground'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {item.icon}
          </div>
        </Button>
      ))}
    </div>
  );
}
