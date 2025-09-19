'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MonacoEditor from "./components/editor/MonacoEditor";
import SideNavbar, { SidebarItem } from "./components/navbar/Sidenavbar";
import TopNavbar from './components/navbar/Topnavbar';
import FileNavbar from './components/navbar/Filesnavbar';
import Drawer, { DrawerItem } from './components/drawer/Drawer';

// Dynamically import Xterm to prevent SSR issues
const Xterm = dynamic(() => import('./components/terminal/Xterm'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#1e1e1e] border-t border-gray-700 flex items-center justify-center">
      <span className="text-gray-400">Loading terminal...</span>
    </div>
  )
});

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  const [terminalHeight, setTerminalHeight] = useState<number>(300);

  // Drawer items for Explorer
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

  const explorerDrawerItems: DrawerItem[] = [
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

  // Drawer items for Search (empty header items, search functionality will be in content)
  // const searchDrawerItems: DrawerItem[] = [];

  const handleSidebarClick = (itemId: string) => {
    if (activeItem === itemId && isDrawerOpen) {
      setIsDrawerOpen(false);
    } else {
      setActiveItem(itemId);
      setIsDrawerOpen(true);
    }
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle terminal with Ctrl+` (backtick)
      if (event.ctrlKey && event.key === '`') {
        event.preventDefault();
        setIsTerminalOpen(!isTerminalOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'explorer',
      name: 'Explorer',
      icon: <ExplorerIcon />,
      onClick: () => handleSidebarClick('explorer'),
      tooltip: 'Explorer (Ctrl+Shift+E)'
    },
    {
      id: 'search',
      name: 'Search',
      icon: <SearchIcon />,
      onClick: () => handleSidebarClick('search'),
      tooltip: 'Search (Ctrl+Shift+F)'
    },
    {
      id: 'git',
      name: 'Source Control',
      icon: <GitIcon />,
      onClick: () => handleSidebarClick('git'),
      tooltip: 'Source Control (Ctrl+Shift+G)'
    }
  ];

  return (
    <div className="h-screen w-full flex flex-col">
      <TopNavbar />
      <div className="flex-1 flex">
        <SideNavbar columns={sidebarItems} activeItemId={activeItem} />
        <Drawer 
          isOpen={isDrawerOpen && activeItem === 'explorer'} 
          title="Explorer" 
          items={explorerDrawerItems}
          onClose={() => setIsDrawerOpen(false)}
        />        
        <div className="flex-1 flex flex-col">
          <FileNavbar 
            onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
            isTerminalOpen={isTerminalOpen}
          />
          <div className="flex-1 flex flex-col">
            <div 
              className="flex-1"
              style={{ 
                height: isTerminalOpen 
                  ? `calc(100% - ${terminalHeight}px)` 
                  : '100%' 
              }}
            >
              <MonacoEditor />
            </div>
            {isTerminalOpen && (
              <div 
                className="border-t border-gray-700 relative"
                style={{ height: `${terminalHeight}px` }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1 cursor-row-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-50 z-10"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startY = e.clientY;
                    const startHeight = terminalHeight;
                    
                    const handleMouseMove = (e: MouseEvent) => {
                      const diff = startY - e.clientY;
                      const newHeight = Math.max(100, Math.min(600, startHeight + diff));
                      setTerminalHeight(newHeight);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
                <Xterm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
