import { DrawerItem } from '../types';

export const gitHeaderOptions: DrawerItem[] = [
  {
    id: 'git-refresh',
    name: 'Refresh',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 3a5 5 0 104.546 2.914.5.5 0 00-.908-.417A4 4 0 118 4v1l1.5-1.5L8 2v1z" />
      </svg>
    ),
    onClick: () => console.log('Refresh git status'),
    tooltip: 'Refresh',
  },
  {
    id: 'git-commit',
    name: 'Commit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM8 13A5 5 0 118 3a5 5 0 010 10z" />
        <path d="M8 5a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
    onClick: () => console.log('Commit changes'),
    tooltip: 'Commit',
  },
];
