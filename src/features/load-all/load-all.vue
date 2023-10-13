<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
  useMessage,
} from 'naive-ui';
import {
  Save20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';
import { loadMany } from '@/shared';

const fileStore = useFileStore();
const message = useMessage();

const loadAllHandler = async () => {
  if (fileStore.files.length) {
    fileStore.setLoading(true);
    try {
      await loadMany(fileStore.files);
    } catch(err: any) {
      message.error(err.toString());
    } finally {
      fileStore.setLoading(false);
    }
  } else {
    message.warning('No files');
  }
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
    Download all
    <template #trigger>
      <NButton :bordered="false" size="tiny" @click="loadAllHandler">
        <NIcon size="20"><Save20Filled /></NIcon>
      </NButton>
    </template>
  </NTooltip>
</template>
