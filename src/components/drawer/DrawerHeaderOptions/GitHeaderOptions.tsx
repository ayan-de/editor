import { GitCommitHorizontal, RefreshCw } from 'lucide-react';
import { DrawerItem } from '../types';

export const gitHeaderOptions: DrawerItem[] = [
  {
    id: 'git-refresh',
    name: 'Refresh',
    icon: <RefreshCw />,
    onClick: () => console.log('Refresh git status'),
    tooltip: 'Refresh',
  },
  {
    id: 'git-commit',
    name: 'Commit',
    icon: <GitCommitHorizontal />,
    onClick: () => console.log('Commit changes'),
    tooltip: 'Commit',
  },
];
