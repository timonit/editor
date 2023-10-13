import { throttle } from 'lodash';
import { useFileStore } from '../../entities/file/api/file.store';
import type { PiniaPluginContext } from 'pinia';

export function filesAutosave(context: PiniaPluginContext) {
  if (context.store.$id === 'files') {
    context.store.$subscribe(
      throttle((mutation, state) => {
        localStorage.setItem(`${context.store.$id}-store`, JSON.stringify(state));
      }, 500)
    );
    
    const saved = localStorage.getItem(`${context.store.$id}-store`);
    if (saved && context.store.$id === 'files') {
      return JSON.parse(saved);
    }
  }
}
