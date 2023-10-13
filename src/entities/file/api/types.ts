import type { _GettersTree } from 'pinia';
import type { AppFile } from '..';

export interface FileStoreState {
  files: AppFile[];
  /**
   * Идентификатор текущий(открытый) файл
   */
  currentFileID?: AppFile['id'];
}

export interface FileStoreGetters extends _GettersTree<FileStoreState> {
  /**
   * Возвращает текущий(открытый) файл
   */
  getCurrentFile(): AppFile | undefined;
}

export interface FileStoreActions {
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