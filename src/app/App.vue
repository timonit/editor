<script setup lang="ts">
import { useFileStore } from '@/entities';
import { TextEditor } from '@/features';
import { FilesBar } from '@/widgets';
import { throttle } from 'lodash'
import { NLayout, NLayoutContent } from 'naive-ui';

const fileStore = useFileStore();
const handler = throttle((text?: string) => {
  if (fileStore.currentFile) {
    fileStore.changeFileData(fileStore.currentFile, text || '');
  } else {
    if (text) {
      const id = fileStore.createFile(`temp-${Date.now()}`, text);
      fileStore.selectFile(id);
    }
  }
}, 700);
</script>

<template>
  <NLayout has-sider>
    <FilesBar />
    <NLayoutContent>
      <TextEditor @content-changed="handler" :value="fileStore.getCurrentFile?.data" />
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.n-layout {
  height: 100vh;
}
</style>
@/entities/file/api/file.store
