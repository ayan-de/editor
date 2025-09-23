import { OPFSAdapter } from '../OPFS/OPFSAdapter';
import {
  isOPFSSupported,
  OPFSNotSupportedError,
  formatFileSize,
} from '../OPFS/opfs-utils';

/**
 * Example usage of the OPFS Storage Adapter
 * This demonstrates how to use the adapter in a VS Code-like editor
 */

// Example: Initialize and use the adapter
export async function initializeFileSystem() {
  // Check if OPFS is supported before creating the adapter
  if (!isOPFSSupported()) {
    console.error('OPFS is not supported in this browser');
    // Fallback to other storage methods (localStorage, IndexedDB, etc.)
    return null;
  }

  const adapter = new OPFSAdapter();

  try {
    // Wait for initialization (happens automatically in constructor)
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log('OPFS initialized successfully');
    return adapter;
  } catch (error) {
    if (error instanceof OPFSNotSupportedError) {
      console.error('OPFS not supported:', error.message);
    } else {
      console.error('Failed to initialize OPFS:', error);
    }
    return null;
  }
}

// Example: Basic file operations
export async function demonstrateFileOperations(adapter: OPFSAdapter) {
  try {
    // Create a project structure
    await adapter.createFolder('my-project');
    await adapter.createFolder('my-project/src');
    await adapter.createFolder('my-project/src/components');

    // Create files
    await adapter.createFile('my-project/README.md');
    await adapter.writeFile(
      'my-project/README.md',
      '# My Project\n\nThis is a sample project.'
    );

    await adapter.createFile('my-project/src/index.ts');
    await adapter.writeFile(
      'my-project/src/index.ts',
      `
import { App } from './components/App';

const app = new App();
app.start();
`
    );

    await adapter.createFile('my-project/src/components/App.ts');
    await adapter.writeFile(
      'my-project/src/components/App.ts',
      `
export class App {
  start() {
    console.log('App started!');
  }
}
`
    );

    // List directory contents
    const projectFiles = await adapter.list('my-project');
    console.log('Project files:', projectFiles);

    const srcFiles = await adapter.list('my-project/src');
    console.log('Source files:', srcFiles);

    // Read file content
    const readmeContent = await adapter.readFile('my-project/README.md');
    console.log('README content:', readmeContent);

    // Get storage info
    const storageInfo = await adapter.getStorageInfo();
    console.log(
      `Storage usage: ${formatFileSize(storageInfo.usage)} / ${formatFileSize(storageInfo.quota)}`
    );
  } catch (error) {
    console.error('File operation failed:', error);
  }
}

// Example: File tree explorer
export async function buildFileTree(
  adapter: OPFSAdapter,
  path: string = ''
): Promise<any> {
  try {
    const items = await adapter.list(path);
    const tree: any = {};

    for (const item of items) {
      const itemPath = path ? `${path}/${item.name}` : item.name;

      if (item.type === 'folder') {
        tree[item.name] = {
          type: 'folder',
          children: await buildFileTree(adapter, itemPath),
        };
      } else {
        tree[item.name] = {
          type: 'file',
          path: itemPath,
        };
      }
    }

    return tree;
  } catch (error) {
    console.error('Failed to build file tree:', error);
    return {};
  }
}

// Example: Search for files
export async function searchFiles(
  adapter: OPFSAdapter,
  searchTerm: string,
  path: string = ''
): Promise<string[]> {
  const results: string[] = [];

  try {
    const items = await adapter.list(path);

    for (const item of items) {
      const itemPath = path ? `${path}/${item.name}` : item.name;

      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(itemPath);
      }

      if (item.type === 'folder') {
        const subResults = await searchFiles(adapter, searchTerm, itemPath);
        results.push(...subResults);
      }
    }
  } catch (error) {
    console.error('Search failed:', error);
  }

  return results;
}

// Example: Backup and restore functionality
export async function backupProject(
  adapter: OPFSAdapter,
  projectPath: string
): Promise<any> {
  const backup: any = {
    timestamp: new Date().toISOString(),
    files: {},
  };

  async function backupDirectory(dirPath: string, target: any) {
    try {
      const items = await adapter.list(dirPath);

      for (const item of items) {
        const itemPath = dirPath ? `${dirPath}/${item.name}` : item.name;

        if (item.type === 'file') {
          const content = await adapter.readFile(itemPath);
          target[item.name] = {
            type: 'file',
            content,
          };
        } else {
          target[item.name] = {
            type: 'folder',
            children: {},
          };
          await backupDirectory(itemPath, target[item.name].children);
        }
      }
    } catch (error) {
      console.error('Backup failed for directory:', dirPath, error);
    }
  }

  await backupDirectory(projectPath, backup.files);
  return backup;
}

export async function restoreProject(
  adapter: OPFSAdapter,
  backup: any,
  targetPath: string
): Promise<void> {
  async function restoreDirectory(source: any, dirPath: string) {
    for (const [name, item] of Object.entries(source)) {
      const itemPath = dirPath ? `${dirPath}/${name}` : name;

      if ((item as any).type === 'file') {
        await adapter.createFile(itemPath);
        await adapter.writeFile(itemPath, (item as any).content);
      } else if ((item as any).type === 'folder') {
        await adapter.createFolder(itemPath);
        await restoreDirectory((item as any).children, itemPath);
      }
    }
  }

  await adapter.createFolder(targetPath);
  await restoreDirectory(backup.files, targetPath);
}

// Example usage in a React component or similar
export const FileSystemExample = {
  async init() {
    const adapter = await initializeFileSystem();
    if (!adapter) return null;

    // Demonstrate basic operations
    await demonstrateFileOperations(adapter);

    // Build file tree for UI
    const fileTree = await buildFileTree(adapter);
    console.log('File tree:', fileTree);

    // Search functionality
    const searchResults = await searchFiles(adapter, '.ts');
    console.log('TypeScript files:', searchResults);

    return adapter;
  },
};
