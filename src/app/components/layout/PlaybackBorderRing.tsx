'use client';

import React from 'react';
import {
  usePlayback,
  getBorderColorClass,
} from '../../contexts/PlaybackContext';

interface PlaybackBorderRingProps {
  className?: string;
  zIndex?: number;
}
export default function PlaybackBorderRing({
  className = '',
  zIndex = 50,
}: PlaybackBorderRingProps): React.JSX.Element {
  const { playbackState } = usePlayback();
  const borderColorClass = getBorderColorClass(playbackState);

  return (
    <div
      className={`absolute inset-0 border-4 ${borderColorClass} transition-colors duration-300 pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
