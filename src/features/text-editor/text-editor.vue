<script setup lang="ts">
import { useFileStore, type AppFile } from '@/entities';
import { throttle } from 'lodash';
import { editor } from 'monaco-editor';
import { ref, onMounted } from 'vue';

const editorEl = ref<HTMLElement>();
const fileStore = useFileStore();
let codeEditor: editor.IStandaloneCodeEditor;

/**
 * Обработчик записи содержимого в стор.
 */
const changeContentHandler = throttle((id?: AppFile['id'], text?: string) => {
  if (id) {
    fileStore.changeFileData(id, text || '');
  } else {
    // если нет выделенного файла, создаем файл
    if (text) {
      // сохраняем позицию курсора(иначе при созданий файла курсор сбрасывается на 0)
      const cursorPosition = codeEditor.getPosition();
      // создаем и выделяем файл 
      const newID = fileStore.createFile(`temp-${Date.now()}`, text);
      fileStore.selectFile(newID);
      // устанавливаем в новом файл курсор на прежнее места
      if (cursorPosition) codeEditor.setPosition(cursorPosition);
    }
  }
}, 500);

onMounted(() => {
  codeEditor = editor.create(
    // @ts-ignore
    editorEl.value,
    {
      value: fileStore.getCurrentFile?.data || '',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
    }
  );

  codeEditor.onDidChangeModelContent(() => {
    changeContentHandler(fileStore.currentFileID, codeEditor.getValue());
  })
});

fileStore.$onAction((context) => {
  switch(context.name) {
    // меняем содержимое редактора при смене файла
    case 'selectFile': {
      context.after(() => {
        if (fileStore.getCurrentFile) codeEditor.setValue(fileStore.getCurrentFile.data);
      })
      break;
    }
    // очищаем содержимое редактора при учистке выделенного файла
    case 'clearCurrentFile': {
      codeEditor.setValue('');
      break;
    }
  }
})
</script>

<template>
  <div class="editor" ref="editorEl">
  </div>
</template>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
