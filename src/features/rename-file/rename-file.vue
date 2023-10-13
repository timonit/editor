<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
  useMessage,
  NModal,
  NInput,
  NInputGroup,
  NFormItem,
} from 'naive-ui';
import {
  DocumentEdit20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';
import { ref } from 'vue';

const fileStore = useFileStore();

const modalShow = ref(false);
const message = useMessage();
const name = ref<string>(fileStore.getCurrentFile?.name || '');

const openModal = () => {
  if (fileStore.currentFile) {
    modalShow.value = true;
    name.value = fileStore.getCurrentFile?.name || '';
  } else {
    message.error('You need select a file');
  }
};

const renameFile = () => {
  modalShow.value = false;
  if (!fileStore.currentFile) return message.error('File not found');
  if (!name.value) return message.error('Name should not be empty');

  fileStore.renameFile(fileStore.currentFile, name.value);
};
</script>

<template>
    <NTooltip trigger="hover" placement="right-start" :delay="500">
      Rename file
      <template #trigger>
        <NButton :bordered="false" size="tiny" @click="openModal">
          <NIcon size="20">
            <DocumentEdit20Filled />
          </NIcon>
        </NButton>
      </template>
    </NTooltip>

    <NModal v-model:show="modalShow" title="Rename file" preset="dialog">
      <NInputGroup @keydown.enter.prevent="renameFile">
        <NInput name="name" type="text" v-model:value="name" placeholder="file name" />
        <NButton @click="renameFile" type="success">Rename</NButton>
      </NInputGroup>
    </NModal>
</template>
