'use client';

import React from 'react';
import { usePlayback } from '@/contexts/PlaybackContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, Square } from 'lucide-react';

export default function PlaybackControls(): React.JSX.Element {
  const { playbackState, play, pause, stop } = usePlayback();

  return (
    <div className="flex items-center space-x-1 border-l border-border pl-4">
      <Button
        onClick={play}
        // variant="ghost"
        size="sm"
        className={cn(
          'h-8 w-8 p-0',
          playbackState === 'play'
            ? 'bg-green-600 text-white hover:bg-green-700'
            : ''
        )}
        title="Play"
      >
        <Play className="h-4 w-4" />
      </Button>
      <Button
        onClick={pause}
        variant="secondary"
        size="sm"
        className={cn(
          'h-8 w-8 p-0',
          playbackState === 'pause'
            ? 'bg-red-600 text-white hover:bg-red-700'
            : ''
        )}
        title="Pause"
      >
        <Pause className="h-4 w-4" />
      </Button>
      <Button
        onClick={stop}
        variant="destructive"
        size="sm"
        className={cn(
          'h-8 w-8 p-0',
          playbackState === 'stop'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : ''
        )}
        title="Stop"
      >
        <Square className="h-4 w-4" />
      </Button>
    </div>
  );
}
