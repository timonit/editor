<script setup lang="ts">
import { useFileStore } from '@/entities/stores/file.store';
import TextEditor from '@/features/text-editor/text-editor.vue';
import FilesBar from '@/widgets/files-bar/files-bar.vue';
import { throttle } from 'lodash'

const fileStore = useFileStore();
const handler = throttle((text?: string) => {
  if (fileStore.currentFile) {
    fileStore.changeFileData(fileStore.currentFile, text);
  } else {
    if (text) {
      const id = fileStore.createFile(`temp-${Date.now()}`, text);
      fileStore.selectFile(id);
    }
  }
}, 700);
</script>

<template>
  <div class="wrapper">
    <FilesBar />
    <TextEditor @content-changed="handler" :value="fileStore.getCurrentFile?.data" />
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
