import { ref, Ref } from '@vue/composition-api';
import { useEventListener } from 'vue-fn-use-event-listener';

export function useMousePosition(): [Ref<number>, Ref<number>] {
  const x = ref(0);
  const y = ref(0);

  useEventListener('mousemove', (event: Event) => {
    const e = event as MouseEvent;
    x.value = e.clientX;
    y.value = e.clientY;
  });

  return [x, y];
}
