import { defineStore, type _GettersTree } from 'pinia'
import type { AppFile } from '../types';

interface FileStoreState {
  files: AppFile[];
  currentFile?: AppFile['id'];
}

interface FileStoreGetters extends _GettersTree<FileStoreState> {
  getCurrentFile(): AppFile | undefined;
}

interface FileStoreActions {
  createFile(name: string, data?: string): string;
  renameFile(id: string, newName: string): void;
  deleteFile(id: string): void;
  changeFileData(id: string, data: string): void;
  selectFile(id: string): void;
  clearCurrentFile(): void;
}


export const useFileStore = defineStore<'files', FileStoreState, FileStoreGetters, FileStoreActions>({
  id: 'files',
  state: (): FileStoreState => ({
    files: [],
    currentFile: undefined,
  }),
  getters: {
    getCurrentFile(): AppFile | undefined {
      return this.files.find(file => file.id === this.currentFile);
    }
  },
  actions: {
    createFile(name: string, data?: string): string {
      const date = new Date();
      const id = `${String(date.getTime())}${(Math.random()*1000).toFixed()}`;
      const file: AppFile = {
        name,
        id,
        lastModified: date.getTime(),
        data: data || id,
        type: 'plain/text',
      }
      this.files = [...this.files, file];
      return file.id;
    },
    renameFile(id: string, newName: string) {
      const i = this.files.findIndex(el => el.id === id);
      if (i < 0) throw new Error('File not found');

      this.files[i].name = newName;
    },
    deleteFile(id: string) {
      if (this.currentFile === id) this.clearCurrentFile();
      this.files = this.files.filter(el => el.id !== id);
    },
    changeFileData(id: string, data: string) {
      const i = this.files.findIndex(el => el.id === id);
      if (i < 0) throw new Error('File not found');

      this.files[i].data = data;
    },
    selectFile(id: string) {
      this.currentFile = id;
    },
    clearCurrentFile() {
      this.currentFile = undefined;
    },
  },
})
