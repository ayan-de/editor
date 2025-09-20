'use client';

import React from 'react';
import { PlaybackProvider } from '@/contexts/PlaybackContext';
import EditorLayout from '@/components/layout/EditorLayout';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Home() {
  return (
    <PlaybackProvider>
      <ThemeProvider>
        <EditorLayout />
      </ThemeProvider>
    </PlaybackProvider>
  );
}
