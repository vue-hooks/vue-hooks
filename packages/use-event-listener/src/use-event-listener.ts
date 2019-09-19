import { onMounted, onUnmounted } from '@vue/composition-api';

export function useEventListener(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
): void {
  onMounted(() => {
    window.addEventListener(eventName, handler);
  });

  onUnmounted(() => {
    window.removeEventListener(eventName, handler);
  });
}
