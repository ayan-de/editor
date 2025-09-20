'use client';

import React from 'react';
import { PlaybackProvider } from '@/contexts/PlaybackContext';
import EditorLayout from '@/components/layout/EditorLayout';
import { EditorThemeProvider } from '@/contexts/EditorThemeContext';
import { TweakCNThemeProvider } from '@/contexts/TweakCNThemeContext';

export default function Home() {
  return (
    <PlaybackProvider>
      <EditorThemeProvider>
        <TweakCNThemeProvider>
          <EditorLayout />
        </TweakCNThemeProvider>
      </EditorThemeProvider>
    </PlaybackProvider>
  );
}
