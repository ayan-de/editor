'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import MonacoEditor from '../editor/MonacoEditor';
import SideNavbar from '../navbar/Sidenavbar';
import TopNavbar from '../navbar/Topnavbar';
import FileNavbar from '../navbar/Filesnavbar';
import Drawer from '../drawer/Drawer';
import { getDrawerItems } from '../drawer/getDrawerItems';
import { getDrawerTitle } from '../drawer/getDrawerTitle';
import { getDrawerContent } from '../drawer/getDrawerContent';
import { sidebarItems as defaultSidebarItems } from '../navbar/sidebarItems';
import {
  usePlayback,
  getBorderColorClass,
} from '../../contexts/PlaybackContext';
import { SidebarItem } from '../navbar/types';

// Dynamically import Xterm to prevent SSR issues
const Xterm = dynamic(() => import('../terminal/Xterm'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#1e1e1e] border-t border-gray-700 flex items-center justify-center">
      <span className="text-gray-400">Loading terminal...</span>
    </div>
  ),
});

export default function EditorLayout() {
  const [activeItem, setActiveItem] = useState<string>('explorer');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  const [terminalHeight, setTerminalHeight] = useState<number>(300);

  // Get playback state for border styling
  const { playbackState } = usePlayback();
  const borderColorClass = getBorderColorClass(playbackState);

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

  const sidebarItems: SidebarItem[] = defaultSidebarItems.map((s) => ({
    ...s,
    onClick: () => handleSidebarClick(s.id),
  }));

  return (
    <div
      className={`h-screen w-full flex flex-col border-4 ${borderColorClass} transition-colors duration-300`}
    >
      <TopNavbar />
      <div className="flex-1 flex">
        <SideNavbar columns={sidebarItems} activeItemId={activeItem} />
        {isDrawerOpen && (
          <Drawer
            title={getDrawerTitle(activeItem)}
            items={getDrawerItems(activeItem)}
            onClose={() => setIsDrawerOpen(false)}
          >
            {getDrawerContent(activeItem)}
          </Drawer>
        )}
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
                  : '100%',
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
                      const newHeight = Math.max(
                        100,
                        Math.min(600, startHeight + diff)
                      );
                      setTerminalHeight(newHeight);
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener(
                        'mousemove',
                        handleMouseMove
                      );
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
