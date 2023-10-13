/**
 * Загружает 1 файл, предварительно спрашивая у пользователя место
 * @param fileName - Имя файла
 * @param data - содержимое файла
 */
function loadFile(fileName: string, data: string): Promise<void>;
/**
 * Загружает 1 файл без предварительного запроса у пользователя места
 * @param fileHandler
 * @param data - содержимое файла
 */
function loadFile(fileHandler: FileSystemFileHandle, data: string): Promise<void>;
async function loadFile(fileHandlerOrName: FileSystemFileHandle | string, data: string) {
  let fileHandler: FileSystemFileHandle;
  if (fileHandlerOrName instanceof FileSystemFileHandle) {
    fileHandler = fileHandlerOrName;
  } else {
    fileHandler = await window.showSaveFilePicker({
      suggestedName: fileHandlerOrName,
      types: [
        {
          accept: {
            "text/javascript": ['.js']
          }
        }
      ]
    });
  }

  const stream = await fileHandler.createWritable();

  await stream.write(data);
  await stream.close();
}

export { loadFile };
