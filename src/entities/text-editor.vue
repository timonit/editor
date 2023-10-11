<script setup lang="ts">
import { editor } from 'monaco-editor';
import { ref, onMounted } from 'vue';


const editorEl = ref<HTMLElement>();

onMounted(() => {
  const codeEditor = editor.create(
    editorEl.value,
    {
      value: 'asdasd',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap:{
        enabled: false,
      },
      tabCompletion: 'on'
    }
  )
})
</script>

<template>
  <div class="editor" ref="editorEl">
  </div>
</template>

<style scoped>
.editor {
  width: 600px;
  height: 600px;
}
</style>
