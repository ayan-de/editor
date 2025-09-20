import React from 'react';
import { DrawerItem } from './types';
import explorerHeaderOptions from './HeaderOptions/ExplorerHeaderOptions';
import { searchHeaderOptions } from './HeaderOptions/SearchHeaderOptions';
import { gitHeaderOptions } from './HeaderOptions/GitHeaderOptions';

export function getDrawerItems(activeItem: string): DrawerItem[] {
  switch (activeItem) {
    case 'explorer':
      return explorerHeaderOptions;
    case 'search':
      return searchHeaderOptions;
    case 'git':
      return gitHeaderOptions;
    default:
      return [];
  }
}
