import React from 'react';

export default function ExplorerDrawerContent() {
  return (
    <div className="text-sm text-muted-foreground">
      <p className="p-2">No files in workspace</p>
      <div className="flex items-center p-2 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📁</span>
        <span>src</span>
      </div>
      <div className="flex items-center p-2 ml-4 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📄</span>
        <span>index.js</span>
      </div>
      <div className="flex items-center p-2 ml-4 hover:bg-accent rounded cursor-pointer">
        <span className="mr-2">📄</span>
        <span>App.tsx</span>
      </div>
    </div>
  );
}
