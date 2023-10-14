<script setup lang="ts">
import {
  NMenu,
  NSpin,
  NLayoutSider,
  NSpace,
  NEmpty,
} from 'naive-ui';
import { DocumentArrowUp20Filled, Document20Filled } from '@vicons/fluent';
import { h, ref } from 'vue';
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
const dropzoneIsShow = ref(false);

const showDropzone = () => (dropzoneIsShow.value = true);
const hideDropzone = () => (dropzoneIsShow.value = false);

['dragover', "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

const dropHandler = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer && event.dataTransfer.files.length) {
    fileStore.addNativeFiles(Array.from(event.dataTransfer.files));
  }
  hideDropzone();
}
</script>

<template>
  <NLayoutSider
    bordered
    collapse-mode="width"
    :collapsed-width="32"
    :width="240"
    show-trigger
    @dragenter="showDropzone"
  >
    <!--
      v-show баговано работает для этого компонента.
      Пришлось отрисовывать через v-if.
      Иначе происходит отрисовка компонента при скрытии панели или открытии файл пикера
    -->
    <NEmpty
      v-if="dropzoneIsShow"
      @drop="dropHandler"
      @dragleave="hideDropzone"
      description="drop files"
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50000,
        background: '#252526',
        display: 'flex',
        justifyContent: 'center',
      }"
    >
      <template #icon><DocumentArrowUp20Filled /></template>
    </NEmpty>

    <NSpin
      :show="fileStore.isLoading"
      v-show="!dropzoneIsShow"
    >
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
