'use client';

import React from 'react';
import { FileNavbarProps } from './types';

export default function FileNavbar({
  onToggleTerminal,
  isTerminalOpen,
}: FileNavbarProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between bg-gray-600 border-b border-gray-700 h-8 w-full px-2 text-sm text-gray-300">
      <div className="flex items-center justify-center">
        <span className="text-gray-400 text-xs">
          Files will be displayed here
        </span>
      </div>

      <div className="flex items-center gap-2">
        {onToggleTerminal && (
          <button
            onClick={onToggleTerminal}
            className={`flex items-center justify-center w-6 h-6 rounded text-xs hover:bg-gray-500 transition-colors ${
              isTerminalOpen ? 'bg-gray-500 text-white' : 'text-gray-400'
            }`}
            title="Toggle Terminal (Ctrl+`)"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 2.5h13v11h-13v-11zm1 1v9h11v-9h-11z" />
              <path d="M3 5.5l2 1.5-2 1.5v-3z" />
              <path d="M6 8.5h4v1h-4v-1z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
