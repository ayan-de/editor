import React from 'react';

export default function SearchDrawerContent() {
  return (
    <div className="w-60">
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
      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
        Results
      </div>
      <div className="w-full text-sm text-muted-foreground">
        <p className="p-2">No results found</p>
      </div>
    </div>
  );
}
