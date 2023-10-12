<script setup lang="ts">
import {
  NMenu,
  NLayoutSider,
  NButton,
  NIcon,
  NTooltip,
  NSpace,
type MenuOption,
} from 'naive-ui';
import {
  Document20Filled,
  DocumentAdd20Filled,
  DocumentEdit20Filled,
  Delete20Filled,
} from '@vicons/fluent';
import { h } from 'vue';
import { useFileStore } from '@/entities/stores/file.store';
import type { AppFile } from '@/entities';

const fileStore = useFileStore();

const selectFile = (key: string, item: MenuOption | AppFile) => {
  console.log('select: ', key);
  fileStore.selectFile(key);
}

const createFile = () => {
  console.log('create file')
  fileStore.createFile(`document-${Date.now()}`, `document-${Date.now()}`);
}

const renameFile = () => {
  console.log('rename file')
  fileStore.renameFile(fileStore.currentFile, 'test');
}

const deleteFile = () => {
  console.log('delete file');
  fileStore.deleteFile(fileStore.currentFile);
}
</script>

<template>
  <NLayoutSider
    bordered
    collapse-mode="width"
    :collapsed-width="32"
    :width="240"
    show-trigger
  >

    <NSpace item-style="display: flex" justify="end" :align="'center'" size="small" style="border-bottom: solid 1px gray">
      <NTooltip trigger="hover" placement="right-start" :delay="500">
        Add file
        <template #trigger>
          <NButton :bordered="false" size="tiny" @click="createFile">
            <NIcon size="20"><DocumentAdd20Filled /></NIcon>
          </NButton>
        </template>
      </NTooltip>
      
      <NTooltip trigger="hover" placement="right-start" :delay="500">
        Rename file
        <template #trigger>
          <NButton :bordered="false" size="tiny" @click="renameFile">
            <NIcon size="20"><DocumentEdit20Filled /></NIcon>
          </NButton>
        </template>
      </NTooltip>

      <NTooltip trigger="hover" placement="right-start" :delay="500">
        Delete file
        <template #trigger>
          <NButton :bordered="false" size="tiny" @click="deleteFile">
            <NIcon size="20"><Delete20Filled /></NIcon>
          </NButton>
        </template>
      </NTooltip>
    </NSpace>

    <NMenu
      :collapsed-width="32"
      :options="fileStore.files"
      key-field="id"
      label-field="name"
      :collapsed-icon-size="22"
      :render-icon="() => h(Document20Filled)"
      :value="fileStore.currentFile"
      @update:value="selectFile"
    />
  </NLayoutSider>
</template>
