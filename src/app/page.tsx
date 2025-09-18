'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MonacoEditor from "./components/editor/MonacoEditor";
import SideNavbar, { SidebarItem } from "./components/navbar/sidenavbar";
import TopNavbar from './components/navbar/topnavbar';

// VS Code-style icons using Unicode symbols and SVG-like components
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
    alt="Explorer" 
    width={36} 
    height={36} 
    className="w-8 h-8"
  />
);

const GitIcon = () => (
   <Image 
    src="/git-merge-svgrepo-com.svg" 
    alt="Explorer" 
    width={36} 
    height={36} 
    className="w-8 h-8"
  />
);

export default function Home() {
  const [activeItem, setActiveItem] = useState<string>('explorer');

  const sidebarItems: SidebarItem[] = [
    {
      id: 'explorer',
      name: 'Explorer',
      icon: <ExplorerIcon />,
      onClick: () => setActiveItem('explorer'),
      tooltip: 'Explorer (Ctrl+Shift+E)'
    },
    {
      id: 'search',
      name: 'Search',
      icon: <SearchIcon />,
      onClick: () => setActiveItem('search'),
      tooltip: 'Search (Ctrl+Shift+F)'
    },
    {
      id: 'git',
      name: 'Source Control',
      icon: <GitIcon />,
      onClick: () => setActiveItem('git'),
      tooltip: 'Source Control (Ctrl+Shift+G)'
    }
  ];

  return (
    <div className="h-screen w-full flex flex-col">
      <TopNavbar />
      <div className="flex-1 flex">
        <SideNavbar columns={sidebarItems} activeItemId={activeItem} />
        <div className="flex-1">
          <MonacoEditor />
        </div>
      </div>
    </div>
  );
}
