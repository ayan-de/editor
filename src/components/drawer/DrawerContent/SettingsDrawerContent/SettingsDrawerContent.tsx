import React from 'react';
import { EditorThemeSelector } from './Selectors/EditorThemeSelector';
import { TweakCNThemeSelector } from './Selectors/TweakCNThemeSelector';

export default function SettingsDrawerContent() {
  return (
    <div className="w-60 space-y-6">
      {/* Editor Themes Section */}
      <EditorThemeSelector />

      {/* TweakCN Themes Section */}
      <TweakCNThemeSelector />

      {/* Info */}
      <div className="space-y-2 pt-4 border-t">
        <h3 className="text-sm font-medium">Build your Custom Theme</h3>
      </div>
    </div>
  );
}
