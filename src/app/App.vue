<script setup lang="ts">
import { useFileStore } from '@/entities';
import { TextEditor } from '@/features';
import { FilesBar } from '@/widgets';
import { throttle } from 'lodash'
import {
  NLayout,
  NLayoutContent,
  NMessageProvider,
  NConfigProvider,
  darkTheme,
  type GlobalThemeOverrides,
} from 'naive-ui';

const fileStore = useFileStore();

const changeContentHandler = throttle((text?: string) => {
  if (fileStore.currentFileID) {
    fileStore.changeFileData(fileStore.currentFileID, text || '');
  } else {
    if (text) {
      const id = fileStore.createFile(`temp-${Date.now()}`, text);
      fileStore.selectFile(id);
    }
  }
}, 700);

const appTheme: GlobalThemeOverrides = {
  common: {
    bodyColor: 'red'
  },
  Layout: {
    siderColor: '#252526'
  }
}
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="appTheme">
    <NLayout has-sider>
      <NMessageProvider>
        <FilesBar />
        <NLayoutContent>
          <TextEditor @content-changed="changeContentHandler" :value="fileStore.getCurrentFile?.data" />
        </NLayoutContent>
      </NMessageProvider>
    </NLayout>
  </NConfigProvider>
</template>

<style scoped>
.n-layout {
  height: 100vh;
}
</style>
