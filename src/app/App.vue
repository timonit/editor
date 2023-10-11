<script setup lang="ts">
import TextEditor from '@/features/text-editor/text-editor.vue';

const saved = localStorage.getItem('save');

const handler = (text: string) => {
  localStorage.setItem('save', text);
}
</script>

<template>
  <div class="wrapper">
    <TextEditor @content-changed="handler" :value="saved || ''" />
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
