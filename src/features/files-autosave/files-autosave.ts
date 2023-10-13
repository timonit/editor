import { throttle } from 'lodash';
import type { PiniaPluginContext } from 'pinia';

/**
 * Добавляет автосохранение и восстановление в store с именем files.
 */
export function filesAutosave(context: PiniaPluginContext): void {
  if (context.store.$id === 'files') {
    // сохраняем все изменения состояния каждые 500мс
    context.store.$subscribe(
      throttle((mutation, state) => {
        localStorage.setItem(`${context.store.$id}-store`, JSON.stringify(state));
      }, 500)
    );
    
    // востанавливаем состояние из локального хранилища
    const saved = localStorage.getItem(`${context.store.$id}-store`);
    if (saved) return JSON.parse(saved);
  }
}
