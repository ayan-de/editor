import React from 'react';
import ExplorerDrawerContent from './DrawerContent/ExplorerDrawerContent';
import SearchDrawerContent from './DrawerContent/SearchDrawerContent';
import GitDrawerContent from './DrawerContent/GitDrawerContent';

export function getDrawerContent(activeItem: string): React.ReactNode {
  switch (activeItem) {
    case 'explorer':
      // return <ExplorerDrawerContent />;
      return <GitDrawerContent />;
    case 'search':
      // return <SearchDrawerContent />;
      return <GitDrawerContent />;
    case 'git':
      return <GitDrawerContent />;
    default:
      return null;
  }
}
