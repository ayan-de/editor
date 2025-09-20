'use client';

import Image from 'next/image';
import React from 'react';
import PlaybackControls from './PlaybackControls';
import { Button } from '@/components/ui/button';

export default function TopNavbar(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between bg-muted border-b border-border h-10 w-full px-2 text-sm">
      {/* Left section - Menu items */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Image
            src="/instagram.png"
            alt="Logo"
            width={30}
            height={30}
            className="w-6 h-6"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs font-normal"
          >
            Run
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs font-normal"
          >
            Terminal
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs font-normal"
          >
            Help
          </Button>
        </div>
        <PlaybackControls />
      </div>

      {/* Center section - Project title */}
      <div className="flex-1 flex justify-center">
        <span className="text-muted-foreground text-xs">Editor</span>
      </div>

      {/* Right section - Window controls */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 hover:bg-accent"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0L0 6h12L6 0z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
