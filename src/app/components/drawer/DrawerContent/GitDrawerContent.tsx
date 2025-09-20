import React from 'react';

export default function GitDrawerContent() {
  return (
    <div className="p-2">
      <div className="mb-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          Changes
        </div>
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
}
