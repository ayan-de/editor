'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the playback states
export type PlaybackState = 'play' | 'pause' | 'stop';

// Define the context type
interface PlaybackContextType {
  playbackState: PlaybackState;
  setPlaybackState: (state: PlaybackState) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | undefined>(
  undefined
);

// Provider component props
interface PlaybackProviderProps {
  children: ReactNode;
}

// Provider component
export function PlaybackProvider({ children }: PlaybackProviderProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('stop');

  // Helper functions for better UX
  const play = () => setPlaybackState('play');
  const pause = () => setPlaybackState('pause');
  const stop = () => setPlaybackState('stop');

  const value: PlaybackContextType = {
    playbackState,
    setPlaybackState,
    play,
    pause,
    stop,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}

// Custom hook to use the playback context
export function usePlayback(): PlaybackContextType {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
}

// Utility function to get border color based on playback state
export function getBorderColorClass(state: PlaybackState): string {
  switch (state) {
    case 'play':
      return 'border-green-500';
    case 'pause':
      return 'border-red-500';
    case 'stop':
    default:
      return 'border-blue-500';
  }
}
