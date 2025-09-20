import { Settings2 } from 'lucide-react';
import { DrawerItem } from '../types';

export const searchHeaderOptions: DrawerItem[] = [
  {
    id: 'search-settings',
    name: 'Search Settings',
    icon: <Settings2 />,
    onClick: () => console.log('Search settings'),
    tooltip: 'Search Settings',
  },
];
