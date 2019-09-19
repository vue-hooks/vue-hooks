import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api';

export function useMousePosition(): [Ref<number>, Ref<number>] {
  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.clientX;
    y.value = e.clientY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return [x, y];
}
