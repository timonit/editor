<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
} from 'naive-ui';
import {
  DocumentAdd20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';

const fileStore = useFileStore();

const createFile = () => {
  fileStore.createFile(`document-${Date.now()}`, `document-${Date.now()}`);
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
    Add file
    <template #trigger>
      <NButton :bordered="false" size="tiny" @click="createFile">
        <NIcon size="20"><DocumentAdd20Filled /></NIcon>
      </NButton>
    </template>
  </NTooltip>
</template>
