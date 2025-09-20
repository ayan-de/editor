'use client';

import React from 'react';
import { usePlayback } from '@/contexts/PlaybackContext';

export default function PlaybackControls(): React.JSX.Element {
  const { playbackState, play, pause, stop } = usePlayback();

  return (
    <div className="flex items-center space-x-1 border-l border-gray-600 pl-4">
      <button
        onClick={play}
        className={`p-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer ${
          playbackState === 'play' ? 'bg-green-600 text-white' : ''
        }`}
        title="Play"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 2v12l10-6L3 2z" />
        </svg>
      </button>
      <button
        onClick={pause}
        className={`p-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer ${
          playbackState === 'pause' ? 'bg-red-600 text-white' : ''
        }`}
        title="Pause"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z" />
        </svg>
      </button>
      <button
        onClick={stop}
        className={`p-1 hover:bg-gray-700 rounded transition-colors duration-200 cursor-pointer ${
          playbackState === 'stop' ? 'bg-blue-600 text-white' : ''
        }`}
        title="Stop"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 4h8v8H4V4z" />
        </svg>
      </button>
    </div>
  );
}
