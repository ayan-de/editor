import React from 'react';
import { DrawerItem } from '../types';
import { File, Folder } from 'lucide-react';

export const explorerHeaderOptions: DrawerItem[] = [
  {
    id: 'create-file',
    name: 'New File',
    icon: <File />,
    onClick: () => console.log('Create new file'),
    tooltip: 'New File',
  },
  {
    id: 'create-folder',
    name: 'New Folder',
    icon: <Folder />,
    onClick: () => console.log('Create new folder'),
    tooltip: 'New Folder',
  },
];

export default explorerHeaderOptions;
