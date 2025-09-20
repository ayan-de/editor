import React from 'react';
import { DrawerItem } from './Drawer';

export function getDrawerItems(activeItem: string): DrawerItem[] {
  const createFileIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.5 4.5L11 3H5L3.5 4.5v7L5 13h6l1.5-1.5v-7z"/>
      <path d="M8 6v4M6 8h4" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );

  const createFolderIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.5 3H7.71l-.85-.85L6.51 2h-5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 3z"/>
      <path d="M8 6v4M6 8h4" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );

  switch (activeItem) {
    case 'explorer':
      return [
        {
          id: 'create-file',
          name: 'New File',
          icon: createFileIcon,
          onClick: () => console.log('Create new file'),
          tooltip: 'New File'
        },
        {
          id: 'create-folder',
          name: 'New Folder',
          icon: createFolderIcon,
          onClick: () => console.log('Create new folder'),
          tooltip: 'New Folder'
        }
      ];
    case 'search':
      return [
        {
          id: 'search-settings',
          name: 'Search Settings',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.3.7-2.4.5v1.2l2.4.5.3.7-1.3 2 .8.8 2-1.3.7.3.5 2.4h1.2l.5-2.4.7-.3 2 1.3.8-.8-1.3-2 .3-.7 2.4-.5V7.4l-2.4-.5-.3-.7 1.3-2-.8-.8-2 1.3-.7-.3zM8 10a2 2 0 110-4 2 2 0 010 4z"/>
            </svg>
          ),
          onClick: () => console.log('Search settings'),
          tooltip: 'Search Settings'
        }
      ];
    case 'git':
      return [
        {
          id: 'git-refresh',
          name: 'Refresh',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1l1.5-1.5L8 2v1z"/>
            </svg>
          ),
          onClick: () => console.log('Refresh git status'),
          tooltip: 'Refresh'
        },
        {
          id: 'git-commit',
          name: 'Commit',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM8 13A5 5 0 118 3a5 5 0 010 10z"/>
              <path d="M8 5a3 3 0 100 6 3 3 0 000-6z"/>
            </svg>
          ),
          onClick: () => console.log('Commit changes'),
          tooltip: 'Commit'
        }
      ];
    default:
      return [];
  }
}
