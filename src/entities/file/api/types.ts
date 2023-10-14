import type { _GettersTree } from 'pinia';
import type { AppFile } from '..';

export interface FileStoreState {
  files: AppFile[];
  /**
   * Идентификатор текущий(открытый) файл
   */
  currentFileID?: AppFile['id'];
  isLoading: boolean;
}

export interface FileStoreGetters extends _GettersTree<FileStoreState> {
  /**
   * Возвращает текущий(открытый) файл
   */
  getCurrentFile(): AppFile | undefined;
}

export interface FileStoreActions {
  /**
   * Создает файл с именем.
   * @param name - Имя файла
   * @param data - Содержимое файла
   * @return - Идентификатор файла
   */
  createFile(name: string, data?: string): string;
  /**
   * Добавляет несколько файлов c файловой системы пользователя
   * @param files
   */
  addNativeFiles(files: File[]): Promise<void>;
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
  /**
   * Устанавливает состояние загрузки
   * @param state 
   */
  setLoading(state: boolean): void;
}
