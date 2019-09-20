import { ref, watch, Ref } from '@vue/composition-api';

const jsonSerializer = {
  serialize(input: any) {
    if (!input) {
      return '';
    }

    try {
      return JSON.stringify(input);
    } catch (err) {
      return '';
    }
  },

  deserialize(input: any) {
    if (!input) {
      return null;
    }

    try {
      return JSON.parse(input);
    } catch (err) {
      return null;
    }
  },
};

// we can accept these as options in the future but currently that's too much abstraction
const serializer = jsonSerializer;
const storage = localStorage;

export function useLocalStorage<T>(key: string): Ref<T> {
  const read = () => serializer.deserialize(storage.getItem(key));
  const write = (value: T) => storage.setItem(key, serializer.serialize(value));

  const item = ref<any>(read());

  watch(async () => {
    write(item.value);
  });

  return item;
}
