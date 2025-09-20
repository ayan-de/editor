'use client';

import React from 'react';
import { DrawerProps } from './types';

export default function Drawer({
  title,
  items,
  onClose,
  children,
}: DrawerProps): React.JSX.Element {
  return (
    <div className="flex flex-col bg-background border-r border-border h-full w-64 shadow-lg">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50 h-12">
        <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-center space-x-1">
          {/* Header action buttons for Explorer */}
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              title={item.tooltip || item.name}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors duration-200 cursor-pointer"
            >
              {item.icon}
            </button>
          ))}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors duration-200 cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 9.414L2.707 14.707 1.293 13.293 6.586 8 1.293 2.707 2.707 1.293 8 6.586l5.293-5.293 1.414 1.414L9.414 8l5.293 5.293-1.414 1.414L8 9.414z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 p-2 overflow-y-auto w-full">
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
