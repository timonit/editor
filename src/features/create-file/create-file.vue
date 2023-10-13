<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
  useMessage,
  NModal,
  NInput,
  NInputGroup,
} from 'naive-ui';
import {
  DocumentAdd20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';
import { ref } from 'vue';

const fileStore = useFileStore();

const modalShow = ref(false);
const message = useMessage();
const name = ref<string>('');

const openModal = () => {
  modalShow.value = true;
};

const createFile = () => {
  if (!name.value) return message.error('Name should not be empty');
  const id = fileStore.createFile(name.value);
  fileStore.selectFile(id);
  modalShow.value = false;
  name.value = '';
}
</script>

<template>
  <NTooltip trigger="hover" placement="right-start" :delay="500">
    Add file
    <template #trigger>
      <NButton :bordered="false" size="tiny" @click="openModal">
        <NIcon size="20"><DocumentAdd20Filled /></NIcon>
      </NButton>
    </template>
  </NTooltip>

  <NModal v-model:show="modalShow" title="Create file" preset="dialog">
    <NInputGroup @keydown.enter.prevent="createFile">
      <NInput name="name" type="text" v-model:value="name" placeholder="file name" />
      <NButton @click="createFile" type="success">Create</NButton>
    </NInputGroup>
  </NModal>
</template>
