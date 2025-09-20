'use client';

import React from 'react';
import { DrawerProps } from './types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

export default function Drawer({
  title,
  items,
  onClose,
  children,
  isOpen = true,
}: DrawerProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="w-64 flex flex-col bg-background border-r border-border h-full shadow-sm">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 h-12">
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
        <div className="flex items-center space-x-1">
          {/* Header action buttons */}
          {items.map((item) => (
            <Button
              key={item.id}
              // variant="ghost"
              size="sm"
              onClick={item.onClick}
              title={item.tooltip || item.name}
              // className="h-6 w-6 p-0 z-10 relative"
            >
              {item.icon}
            </Button>
          ))}
          {onClose && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              // className="h-6 w-6 p-0 z-10 relative hover:bg-destructive/10"
            >
              <X className="h-1 w-1" />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Drawer Content */}
      <div className="flex-1 p-2 overflow-y-auto">
        {children ? (
          children
        ) : (
          /* Default content - File tree placeholder */
          <div className="w-full text-sm text-muted-foreground">
            <p className="p-2">To be implemented</p>
          </div>
        )}
      </div>
    </div>
  );
}
