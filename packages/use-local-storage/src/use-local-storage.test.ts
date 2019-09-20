import { shallowMount } from '@vue-hooks/test-utils';
import { onMounted } from '@vue/composition-api';
import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  it('should serialize and write the value to localStorage', async () => {
    const wrapper = shallowMount({
      template: /* HTML */ /* html */ `
        <input class="input" type="text" v-model="inputValue" />
      `,

      setup() {
        const inputValue = useLocalStorage('my-local-storage-key');

        return { inputValue };
      },
    });

    wrapper.find('.input').setValue('test-value');

    // allow vue to flush changes
    await Promise.resolve();

    expect(JSON.parse(localStorage.getItem('my-local-storage-key'))).toEqual('test-value');
  });

  it('should silently fail to sync when there is a json error', async () => {
    const circularObject: { selfReference?: {} } = {};
    circularObject.selfReference = circularObject;

    shallowMount({
      setup() {
        const storageObject = useLocalStorage('my-local-storage-key');

        onMounted(() => {
          storageObject.value = circularObject;
        });

        return { storageObject };
      },
    });

    // allow vue to flush changes
    await Promise.resolve();

    expect(localStorage.getItem('my-local-storage-key')).toEqual('');
  });

  it('should not crash when you assign null', async () => {
    shallowMount({
      setup() {
        const storageObject = useLocalStorage('my-local-storage-key');

        onMounted(() => {
          storageObject.value = null;
        });

        return { storageObject };
      },
    });

    // allow vue to flush changes
    await Promise.resolve();

    expect(localStorage.getItem('my-local-storage-key')).toEqual('');
  });

  it('should not crash when the value cannot be parsed', async () => {
    // no need for expect here, we only want it to not throw

    localStorage.setItem('my-local-storage-key', 'non-parseable-string');

    shallowMount({
      setup() {
        const storageObject = useLocalStorage('my-local-storage-key');

        return { storageObject };
      },
    });
  });
});
