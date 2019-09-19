import { ref, isRef, Ref, watch } from '@vue/composition-api';

const debounce = (fn: Function, timeout: number) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => fn(), timeout);
  };
};

export function useDebouncedRef<T extends any>(source: Ref<T>, timeout: number = 0): Ref<T> {
  if (!isRef(source)) {
    throw new Error('You have to provide a ref');
  }

  /**
   * things become really complicated when we try to use anything other than `any` here
   * so we went with any to keep things simple for now
   * But we still we still return Ref<T> from the function so outside of this function it doesn't matter
   */
  const debouncedRef = ref<any>(source.value);

  const debouncedWatcher = debounce(() => {
    debouncedRef.value = source.value;
  }, timeout);

  watch(() => {
    /**
     * if vue detects this function's dependencies only on the first run
     * we have to let vue know that we're interested in `source` synchronously
     * TODO: dive deep into vue source code and find out if this is paranoid or not
     */
    // eslint-disable-next-line no-unused-expressions
    source.value;

    debouncedWatcher();
  });

  return debouncedRef as Ref<T>;
}
