import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useFileSystem } from '@/hooks/useFileSystem';

interface FileSystemContextType {
  files: any[];
  loading: boolean;
  error: string | null;
  refreshFiles: () => Promise<void>;
  createFile: (path: string) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteItem: (path: string) => Promise<void>;
  getDirectoryContents: (path: string) => Promise<any[]>;
  showCreateDialog: (type: 'file' | 'folder') => void;
  isCreateDialogOpen: boolean;
  createDialogType: 'file' | 'folder' | null;
  closeCreateDialog: () => void;
  selectedFolder: string;
  setSelectedFolder: (path: string) => void;
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(
  undefined
);

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const fileSystem = useFileSystem();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createDialogType, setCreateDialogType] = useState<
    'file' | 'folder' | null
  >(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const showCreateDialog = (type: 'file' | 'folder') => {
    setCreateDialogType(type);
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setCreateDialogType(null);
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  return (
    <FileSystemContext.Provider
      value={{
        ...fileSystem,
        showCreateDialog,
        isCreateDialogOpen,
        createDialogType,
        closeCreateDialog,
        selectedFolder,
        setSelectedFolder,
        expandedFolders,
        toggleFolder,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystemContext() {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error(
      'useFileSystemContext must be used within a FileSystemProvider'
    );
  }
  return context;
}
