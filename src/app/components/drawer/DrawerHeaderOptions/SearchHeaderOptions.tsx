import { DrawerItem } from '../types';

export const searchHeaderOptions: DrawerItem[] = [
  {
    id: 'search-settings',
    name: 'Search Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.3.7-2.4.5v1.2l2.4.5.3.7-1.3 2 .8.8 2-1.3.7.3.5 2.4h1.2l.5-2.4.7-.3 2 1.3.8-.8-1.3-2 .3-.7 2.4-.5V7.4l-2.4-.5-.3-.7 1.3-2-.8-.8-2 1.3-.7-.3zM8 10a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
    onClick: () => console.log('Search settings'),
    tooltip: 'Search Settings',
  },
];
