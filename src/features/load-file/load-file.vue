<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
useMessage,
} from 'naive-ui';
import {
  DocumentSave20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';
import { loadFile } from '@/shared';

const fileStore = useFileStore();
const message = useMessage();

const loadFileHandler = async () => {
  if (fileStore.getCurrentFile) {
    fileStore.setLoading(true);
    try {
      await loadFile(fileStore.getCurrentFile.name, fileStore.getCurrentFile.data);
    } catch(err: any) {
      message.error(err.message);
    } finally {
      fileStore.setLoading(false);
    }
  } else {
    message.warning('You need select a file');
  }
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
    Download file
    <template #trigger>
      <NButton :bordered="false" size="tiny" @click="loadFileHandler">
        <NIcon size="20"><DocumentSave20Filled /></NIcon>
      </NButton>
    </template>
  </NTooltip>
</template>
