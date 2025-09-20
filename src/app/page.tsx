'use client';

import React from 'react';
import { PlaybackProvider } from './contexts/PlaybackContext';
import EditorLayout from './components/layout/EditorLayout';

export default function Home() {
  return (
    <PlaybackProvider>
      <EditorLayout />
    </PlaybackProvider>
  );
}
