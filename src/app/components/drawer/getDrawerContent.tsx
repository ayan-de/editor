import React from 'react';

export function getDrawerContent(activeItem: string): React.ReactNode {
  switch (activeItem) {
    case 'explorer':
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
    case 'search':
      return (
        <div className="p-2">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full p-2 text-sm bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="mb-2">
            <input 
              type="text" 
              placeholder="Replace (optional)" 
              className="w-full p-2 text-sm bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="p-2">No results found</p>
          </div>
        </div>
      );
    case 'git':
      return (
        <div className="p-2">
          <div className="mb-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Changes</div>
            <div className="text-sm">
              <div className="flex items-center py-1 px-2 hover:bg-accent rounded cursor-pointer">
                <span className="text-green-500 mr-2 font-mono">M</span>
                <span>src/app/page.tsx</span>
              </div>
              <div className="flex items-center py-1 px-2 hover:bg-accent rounded cursor-pointer">
                <span className="text-blue-500 mr-2 font-mono">A</span>
                <span>src/components/drawer/Drawer.tsx</span>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <input 
              type="text" 
              placeholder="Message (press Ctrl+Enter to commit)" 
              className="w-full p-2 text-sm bg-input border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded transition-colors">
            Commit Changes
          </button>
        </div>
      );
    default:
      return null;
  }
}
