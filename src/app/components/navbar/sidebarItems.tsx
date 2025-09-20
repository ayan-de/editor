import React from 'react';
import Image from 'next/image';
import { SidebarItem } from './types';

const ExplorerIcon = () => (
  <Image
    src="/file-copy-svgrepo-com.svg"
    alt="Explorer"
    width={36}
    height={36}
    className="w-8 h-8"
  />
);

const SearchIcon = () => (
  <Image
    src="/search-alt-svgrepo-com.svg"
    alt="Search"
    width={36}
    height={36}
    className="w-8 h-8"
  />
);

const GitIcon = () => (
  <Image
    src="/git-merge-svgrepo-com.svg"
    alt="Git"
    width={36}
    height={36}
    className="w-8 h-8"
  />
);

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
