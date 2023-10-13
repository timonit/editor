import type { AppFile } from '@/entities';
import { loadFile } from './load-file';

/**
 * Загружает несколько файлов, предварительно запрашивает директорию у пользователя
 * @param files - массив файлов
 */
export async function loadMany(files: AppFile[]) {
  const dir = await window.showDirectoryPicker({
    mode: 'readwrite',
  });

  const allPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      dir.getFileHandle(file.name, {create: true})
        .then(async (fileHandler: FileSystemFileHandle) => {
          await loadFile(fileHandler, file.data);
          resolve(null);
        })
        .catch((err: Error) => {
          reject(err);
        });
    })
  });

  await Promise.all(allPromise);
}
