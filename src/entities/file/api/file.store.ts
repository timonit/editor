import { defineStore, type _GettersTree } from 'pinia'
import type { AppFile } from '../types';

interface FileStoreState {
  files: AppFile[];
  /**
   * Идентификатор текущий(открытый) файл
   */
  currentFileID?: AppFile['id'];
}

interface FileStoreGetters extends _GettersTree<FileStoreState> {
  /**
   * Возвращает текущий(открытый) файл
   */
  getCurrentFile(): AppFile | undefined;
}

interface FileStoreActions {
  /**
   * Добавляет файл с именем.
   * @param name - Имя файла
   * @param data - Содержимое файла
   * @return - Идентификатор файла
   */
  createFile(name: string, data?: string): string;
  /**
   * Переименовать файл
   * @param id - Идентификатор файла
   * @param newName - Новое имя файла
   */
  renameFile(id: string, newName: string): void;
  /**
   * Удаляет файл
   * @param id - Идентификатор файла
   */
  deleteFile(id: string): void;
  /**
   * Изменить содержимое файла
   * @param id - Идентификатор файла
   * @param data - Содержимое файла
   */
  changeFileData(id: string, data: string): void;
  /**
   * Устанавливает идентификатор текущего(открытого) файла
   * @param id - Идентификатор файла
   */
  selectFile(id: string): void;
  /**
   * Убирает идентификатор текущего(открытого) файл
   */
  clearCurrentFile(): void;
}


export const useFileStore = defineStore<'files', FileStoreState, FileStoreGetters, FileStoreActions>({
  id: 'files',
  state: (): FileStoreState => ({
    files: [],
    currentFileID: undefined,
  }),
  getters: {
    getCurrentFile(): AppFile | undefined {
      return this.files.find(file => file.id === this.currentFileID);
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
        data: data || '',
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
      if (this.currentFileID === id) this.clearCurrentFile();
      this.files = this.files.filter(el => el.id !== id);
    },
    changeFileData(id: string, data: string) {
      const i = this.files.findIndex(el => el.id === id);
      if (i < 0) throw new Error('File not found');

      this.files[i].data = data;
    },
    selectFile(id: string) {
      this.currentFileID = id;
    },
    clearCurrentFile() {
      this.currentFileID = undefined;
    },
  },
})
