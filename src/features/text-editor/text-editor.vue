<script setup lang="ts">
import { editor } from 'monaco-editor';
import { ref, onMounted } from 'vue';

const editorEl = ref<HTMLElement>();

const props = defineProps<{value?: string}>();
const emit = defineEmits<{(e: 'contentChanged', text: string): void}>()

onMounted(() => {
  const codeEditor = editor.create(
    // @ts-ignore
    editorEl.value,
    {
      value: props.value,
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap:{
        enabled: false,
      },
    }
  );
  codeEditor.onDidChangeModelContent((event) => {
    emit('contentChanged', codeEditor.getValue());
  })
})
</script>

<template>
  <div class="editor" ref="editorEl">
  </div>
</template>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
