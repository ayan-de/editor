import { DirectoryItem } from '@/adapters/OPFS/types';
import { CreateItemDialog } from '@/components/dialog/FileDialog';
import { Button } from '@/components/ui/button';
import { useFileSystemContext } from '@/contexts/FileSystemContext';
import {
  AlertCircle,
  File,
  FolderOpen,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import React from 'react';

interface FileItemProps {
  item: DirectoryItem;
  onSelect?: (path: string) => void;
  depth?: number;
}

function FileItem({ item, onSelect, depth = 0 }: FileItemProps) {
  const Icon = item.type === 'directory' ? FolderOpen : File;

  return (
    <div
      className="w-full flex items-center p-2 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer"
      style={{ marginLeft: `${depth * 16}px` }}
      onClick={() => onSelect?.(item.path)}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span className="flex-1 truncate">{item.name}</span>
    </div>
  );
}

export default function ExplorerDrawerContent() {
  const { files, loading, error, refreshFiles } = useFileSystemContext();

  const handleFileSelect = (path: string) => {
    // Handle file selection - could emit event or call callback
    console.log('Selected file:', path);
  };
  if (loading) {
    return (
      <div className="w-60 text-sm text-muted-foreground">
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading files...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-60 text-sm text-muted-foreground">
        <div className="flex items-center p-2 text-destructive">
          <AlertCircle className="h-4 w-4 mr-2" />
          Error loading files
        </div>
        <button
          onClick={refreshFiles}
          className="flex items-center p-2 hover:bg-accent rounded w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <>
        <div className="w-60 text-sm text-muted-foreground">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            No files in workspace
          </div>
          <div className="text-center p-4 text-muted-foreground">
            <p>Your workspace is empty</p>
            <p className="text-xs mt-1">
              Create files and folders to get started
            </p>
          </div>
        </div>
        <CreateItemDialog />
      </>
    );
  }

  return (
    <>
      <div className="w-60 text-sm text-muted-foreground">
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2 flex items-center justify-between">
          <span>Explorer</span>
          <Button
            onClick={refreshFiles}
            className="p-1 hover:bg-accent rounded"
            title="Refresh"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-1">
          {files.map((item) => (
            <FileItem key={item.path} item={item} onSelect={handleFileSelect} />
          ))}
        </div>
      </div>
      <CreateItemDialog />
    </>
  );
}
