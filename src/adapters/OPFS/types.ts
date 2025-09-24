export type NodeType = 'file' | 'folder';

export interface BaseNode {
  id: string;
  name: string;
  type: NodeType;
}

export interface FileNodeFile extends BaseNode {
  type: 'file';
  content: string;
  children?: never;
}

export interface FileNodeFolder extends BaseNode {
  type: 'folder';
  content: never;
  children: string[]; //array of child node ids
}

export type FileNode = FileNodeFile | FileNodeFolder;

// Directory listing item for the new StorageAdapter
export interface DirectoryItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
}

// Updated StorageAdapter interface using file paths
export interface StorageAdapter {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  createFile(path: string): Promise<void>;
  createFolder(path: string): Promise<void>;
  list(path: string): Promise<DirectoryItem[]>;
  delete(path: string): Promise<void>;
}
