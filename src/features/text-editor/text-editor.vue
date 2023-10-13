<script setup lang="ts">
import { editor } from 'monaco-editor';
import { ref, onMounted, onBeforeUpdate } from 'vue';

const editorEl = ref<HTMLElement>();

const props = defineProps<{value: string | undefined}>();
const emit = defineEmits<{(e: 'contentChanged', text: string): void}>()

let codeEditor: editor.IStandaloneCodeEditor;

onMounted(() => {
  codeEditor = editor.create(
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

onBeforeUpdate(() => {
  const position = codeEditor.getPosition();
  codeEditor.setValue(props.value || '');
  if (position) codeEditor.setPosition(position);
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
