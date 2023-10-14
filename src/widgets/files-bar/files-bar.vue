<script setup lang="ts">
import {
  NMenu,
  NSpin,
  NLayoutSider,
  NSpace,
} from 'naive-ui';
import { Document20Filled } from '@vicons/fluent';
import { h } from 'vue';
import { useFileStore } from '@/entities';
import {
  CreateFile,
  DeleteFile,
  LoadFile,
  RenameFile,
  LoadAll,
  UploadFile,
} from '@/features';

const fileStore = useFileStore();
</script>

<template>
  <NLayoutSider
    bordered
    collapse-mode="width"
    :collapsed-width="32"
    :width="240"
    show-trigger
  >

    <NSpin :show="fileStore.isLoading">
      <NSpace item-style="display: flex" justify="end" :align="'center'" size="small" style="border-bottom: solid 1px gray">
        <CreateFile />
        <RenameFile />
        <DeleteFile />
        <LoadFile />
        <LoadAll />
        <UploadFile />
      </NSpace>

      <NMenu
        :collapsed-width="32"
        :options="fileStore.files"
        key-field="id"
        label-field="name"
        :collapsed-icon-size="22"
        :render-icon="() => h(Document20Filled)"
        :value="fileStore.currentFileID"
        @update:value="fileStore.selectFile"
      />
    </NSpin>
  </NLayoutSider>
</template>
