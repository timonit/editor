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
  DocumentEdit20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';
import { ref } from 'vue';

const fileStore = useFileStore();

const modalShow = ref(false);
const message = useMessage();
const name = ref<string>(fileStore.getCurrentFile?.name || '');

const openModal = () => {
  if (fileStore.currentFileID) {
    modalShow.value = true;
    // Устанавливаем в поле имя открытого файла
    name.value = fileStore.getCurrentFile?.name || '';
  } else {
    // если нет текущего файла выбросить ошибко о отсутствии выделеного файла
    message.error('You need select a file');
  }
};

const renameFile = () => {
  modalShow.value = false;
  // если нет текущего файла выбросить ошибко о отсутствии выделеного файла
  if (!fileStore.currentFileID) return message.error('File not found');
  // Вывести ошибку о пустом имени файла
  if (!name.value) return message.error('Name should not be empty');

  fileStore.renameFile(fileStore.currentFileID, name.value);
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
