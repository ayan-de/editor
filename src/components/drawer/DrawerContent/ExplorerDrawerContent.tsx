import { DirectoryItem } from '@/adapters/OPFS/types';
import { CreateItemDialog } from '@/components/dialog/FileDialog';
import { Button } from '@/components/ui/button';
import { useFileSystemContext } from '@/contexts/FileSystemContext';
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FileItemProps {
  item: DirectoryItem;
  onFileSelect?: (path: string) => void;
  onFolderSelect?: (path: string) => void;
  depth?: number;
  isExpanded?: boolean;
  onToggleExpanded?: (path: string) => void;
  children?: DirectoryItem[];
}

function FileItem({ 
  item, 
  onFileSelect, 
  onFolderSelect,
  depth = 0, 
  isExpanded = false,
  onToggleExpanded,
  children = []
}: FileItemProps) {
  const { selectedFolder } = useFileSystemContext();
  const Icon = item.type === 'directory' 
    ? isExpanded ? FolderOpen : Folder 
    : File;
  const hasChildren = item.type === 'directory';
  const isSelected = selectedFolder === item.path;

  const handleClick = () => {
    if (item.type === 'directory') {
      onToggleExpanded?.(item.path);
      onFolderSelect?.(item.path);
    } else {
      onFileSelect?.(item.path);
    }
  };

  return (
    <>
      <div
        className={`w-full flex items-center p-1 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer ${
          isSelected ? 'bg-accent text-accent-foreground' : ''
        }`}
        style={{ marginLeft: `${depth * 16}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <div className="mr-1">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </div>
        )}
        {!hasChildren && <div className="w-4" />}
        <Icon className="mr-2 h-4 w-4" />
        <span className="flex-1 truncate text-sm">{item.name}</span>
      </div>
      
      {isExpanded && children.length > 0 && (
        <div>
          {children.map((child) => (
            <NestedFileItem
              key={child.path}
              item={child}
              onFileSelect={onFileSelect}
              onFolderSelect={onFolderSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}

function NestedFileItem({ 
  item, 
  onFileSelect, 
  onFolderSelect,
  depth 
}: { 
  item: DirectoryItem; 
  onFileSelect?: (path: string) => void;
  onFolderSelect?: (path: string) => void;
  depth: number; 
}) {
  const { expandedFolders, toggleFolder, getDirectoryContents } = useFileSystemContext();
  const [children, setChildren] = useState<DirectoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  const isExpanded = expandedFolders.has(item.path);

  useEffect(() => {
    if (isExpanded && item.type === 'directory') {
      const loadChildren = async () => {
        setLoading(true);
        try {
          const items = await getDirectoryContents(item.path);
          setChildren(items);
        } catch (error) {
          console.error('Failed to load directory contents:', error);
          setChildren([]);
        } finally {
          setLoading(false);
        }
      };
      loadChildren();
    }
  }, [isExpanded, item.path, getDirectoryContents]);

  return (
    <FileItem
      item={item}
      onFileSelect={onFileSelect}
      onFolderSelect={onFolderSelect}
      depth={depth}
      isExpanded={isExpanded}
      onToggleExpanded={toggleFolder}
      children={children}
    />
  );
}

export default function ExplorerDrawerContent() {
  const { files, loading, error, refreshFiles, setSelectedFolder, selectedFolder } = useFileSystemContext();

  const handleFileSelect = (path: string) => {
    // Handle file selection - could emit event or call callback
    console.log('Selected file:', path);
    // Clear selected folder since we selected a file
    setSelectedFolder('');
  };

  const handleFolderSelect = (path: string) => {
    // Set the selected folder for new file/folder creation
    setSelectedFolder(path);
    console.log('Selected folder:', path);
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
          <div className="flex items-center gap-1">
            {selectedFolder && (
              <Button
                onClick={() => setSelectedFolder('')}
                className="p-1 hover:bg-accent rounded"
                title="Clear Selection"
                variant="ghost"
                size="sm"
              >
                <span className="text-xs">Clear</span>
              </Button>
            )}
            <Button
              onClick={refreshFiles}
              className="p-1 hover:bg-accent rounded"
              title="Refresh"
              variant="ghost"
              size="sm"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          {files.map((item) => (
            <NestedFileItem 
              key={item.path} 
              item={item} 
              onFileSelect={handleFileSelect}
              onFolderSelect={handleFolderSelect}
              depth={0}
            />
          ))}
        </div>
      </div>
      <CreateItemDialog />
    </>
  );
}
