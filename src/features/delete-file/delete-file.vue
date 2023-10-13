<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
} from 'naive-ui';
import {
  Delete20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';

const fileStore = useFileStore();

const deleteFile = () => {
  fileStore.deleteFile(fileStore.currentFile);
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
    Delete file
    <template #trigger>
      <NButton :bordered="false" size="tiny" @click="deleteFile">
        <NIcon size="20"><Delete20Filled /></NIcon>
      </NButton>
    </template>
  </NTooltip>
</template>
