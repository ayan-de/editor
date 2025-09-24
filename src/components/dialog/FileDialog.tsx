import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileSystemContext } from '@/contexts/FileSystemContext';

export function CreateItemDialog() {
  const {
    isCreateDialogOpen,
    createDialogType,
    closeCreateDialog,
    createFile,
    createFolder,
  } = useFileSystemContext();

  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!createDialogType) return;

    try {
      setIsCreating(true);
      setError('');

      // Add appropriate extension for files
      const finalName =
        createDialogType === 'file' && !name.includes('.')
          ? `${name}.txt`
          : name;

      if (createDialogType === 'file') {
        await createFile(finalName);
      } else {
        await createFolder(finalName);
      }

      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setName('');
    setError('');
    setIsCreating(false);
    closeCreateDialog();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create New {createDialogType === 'file' ? 'File' : 'Folder'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                createDialogType === 'file'
                  ? 'Enter file name (e.g., index.js)'
                  : 'Enter folder name'
              }
              autoFocus
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating || !name.trim()}>
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
