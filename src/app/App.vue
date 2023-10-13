<script setup lang="ts">
import { TextEditor } from '@/features';
import { FilesBar } from '@/widgets';
import {
  NLayout,
  NLayoutContent,
  NMessageProvider,
  NConfigProvider,
  darkTheme,
  type GlobalThemeOverrides,
} from 'naive-ui';

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
          <TextEditor />
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
