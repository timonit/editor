<script setup lang="ts">
import {
  NButton,
  NIcon,
  NTooltip,
  useMessage,
} from 'naive-ui';
import {
  ArrowUpload20Filled,
} from '@vicons/fluent';
import { useFileStore } from '@/entities';

const fileStore = useFileStore();
const message = useMessage();

const uploadFile = async () => {
  const files: FileSystemFileHandle[] = await window.showOpenFilePicker({multiple: true});
  fileStore.setLoading(true);
  
  const promises = files.map((el) => {
    return new Promise<File | null>((res, rej) => {
      el.getFile()
        .then(async (file) => {
          if (!file.type) return res(null);
          res(file);
        })
        .catch((err: Error) => rej(err));
      });
    });
    
  try {
    const appFiles = await Promise.all(promises);
    fileStore.addNativeFiles(appFiles.filter(f => f !== null) as File[]);
  } catch(err: any) {
    message.error(err.message);
  } finally {
    fileStore.setLoading(false);
  }
};
</script>

<template>
    <NTooltip trigger="hover" placement="right-start" :delay="500">
      Upload file
      <template #trigger>
        <NButton :bordered="false" size="tiny" @click="uploadFile">
          <NIcon size="20">
            <ArrowUpload20Filled />
          </NIcon>
        </NButton>
      </template>
    </NTooltip>
</template>
