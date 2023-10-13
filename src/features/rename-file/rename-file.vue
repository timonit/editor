<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
} from 'naive-ui';
import {
  DocumentEdit20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';

const fileStore = useFileStore();

const renameFile = () => {
  fileStore.renameFile(fileStore.currentFile, 'test');
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
        Rename file
        <template #trigger>
          <NButton :bordered="false" size="tiny" @click="renameFile">
            <NIcon size="20"><DocumentEdit20Filled /></NIcon>
          </NButton>
        </template>
      </NTooltip>
</template>
