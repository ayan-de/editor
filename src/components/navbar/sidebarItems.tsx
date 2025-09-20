import React from 'react';
import { SidebarItem } from './types';
import { Files, GitMerge, Search } from 'lucide-react';

const ExplorerIcon = () => <Files className="w-6 h-6" />;

const SearchIcon = () => <Search className="w-6 h-6" />;

const GitIcon = () => <GitMerge className="w-6 h-6" />;

export const sidebarItems: SidebarItem[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    icon: <ExplorerIcon />,
    onClick: () => {},
    tooltip: 'Explorer (Ctrl+Shift+E)',
  },
  {
    id: 'search',
    name: 'Search',
    icon: <SearchIcon />,
    onClick: () => {},
    tooltip: 'Search (Ctrl+Shift+F)',
  },
  {
    id: 'git',
    name: 'Source Control',
    icon: <GitIcon />,
    onClick: () => {},
    tooltip: 'Source Control (Ctrl+Shift+G)',
  },
];
