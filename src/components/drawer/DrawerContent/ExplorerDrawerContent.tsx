import React from 'react';

export default function ExplorerDrawerContent() {
  return (
    <div className="w-60 text-sm text-muted-foreground">
      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
        No files in workspace
      </div>
      <div className="w-full flex items-center p-2 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📁</span>
        <span className="flex-1">src</span>
      </div>
      <div className="w-full flex items-center p-2 ml-4 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📄</span>
        <span className="flex-1">index.js</span>
      </div>
      <div className="w-full flex items-center p-2 ml-4 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📄</span>
        <span className="flex-1">App.tsx</span>
      </div>
    </div>
  );
}
