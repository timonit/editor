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

  // Эмитим событие об изменений содержимого редактора.
  codeEditor.onDidChangeModelContent((event) => {
    emit('contentChanged', codeEditor.getValue());
  })
})

// обновляем редактор(не оптимизировано)
onBeforeUpdate(() => {
  // сохраняем позицию курсора
  const position = codeEditor.getPosition();
  // Устанавливаем новое значение в редактор при обновлений пропсов
  codeEditor.setValue(props.value || '');
  // Восстанавливаем позицию курсора. Иначе курсор сбрасывается в начальное положение.
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
