import React from 'react';
import { DrawerItem } from '../types';
import Image from 'next/image';

export const explorerHeaderOptions: DrawerItem[] = [
  {
    id: 'create-file',
    name: 'New File',
    icon: (
      <Image src={'./icons/add-file.svg'} width={23} height={23} alt="File" />
    ),
    onClick: () => console.log('Create new file'),
    tooltip: 'New File',
  },
  {
    id: 'create-folder',
    name: 'New Folder',
    icon: (
      <Image
        src={'./icons/add-folder.svg'}
        width={23}
        height={23}
        alt="Folder"
      />
    ),
    onClick: () => console.log('Create new folder'),
    tooltip: 'New Folder',
  },
];

export default explorerHeaderOptions;
