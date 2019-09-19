import { shallowMount } from '@vue/test-utils';
import { createVue, fireMouseMoveEvent } from '@vue-hooks/test-utils';
import { reactive, ref } from '@vue/composition-api';
import { useDebouncedRef } from './use-debounced-ref';

const localVue = createVue();

const createComponent = (timeout?: number) => {
  return {
    template: /* HTML */ /* html */ `
      <div>
        <input class="input" type="text" v-model="inputValue" />
        <div class="instant-value">{{ inputValue }}</div>
        <div class="debounced-value">{{ debouncedValue }}</div>
      </div>
    `,

    setup() {
      const inputValue = ref('');
      const debouncedValue = useDebouncedRef(inputValue, timeout);

      return { inputValue, debouncedValue };
    },
  };
};

describe('useDebouncedRef', () => {
  it('should debounce the value', async () => {
    jest.useFakeTimers();

    const wrapper = shallowMount(createComponent(), { localVue });

    const inputValue = 'A search input value that I want to debounce';
    wrapper.find('.input').setValue(inputValue);

    expect(wrapper.find('.instant-value').text()).toBe(inputValue);
    expect(wrapper.find('.debounced-value').text()).toBe('');

    /**
     * through monkey-patching some globals I found out that vue internally uses Promise.resolve()
     * to queue micro-tasks for scheduling watchers and other stuff
     * so when we use jest timer mocks we mess up with this system, we first need to resolve any pending promises
     * then our watcher will be executed to schedule a timer, after that we can safely run all timers
     */
    await Promise.resolve();
    jest.runAllTimers();

    expect(wrapper.find('.debounced-value').text()).toBe(inputValue);
  });

  it('should debounce the value for given timeout', async () => {
    jest.useFakeTimers();

    const wrapper = shallowMount(createComponent(2000), { localVue });

    wrapper.find('.input').setValue('');
    wrapper.find('.input').setValue('value1');

    expect(wrapper.find('.instant-value').text()).toBe('value1');
    expect(wrapper.find('.debounced-value').text()).toBe('');

    // allow vue to flush changes
    // seems fishy? see a detailed comment about this in the first test
    await Promise.resolve();

    // at this point we have a 2000ms timeout waiting

    // spend some time
    jest.advanceTimersByTime(500);
    // change the value again then allow vue to flush
    wrapper.find('.input').setValue('value2');
    await Promise.resolve();

    // now we have cleared the old timeout and have a brand new timeout
    // make sure we don't update the value in 1000 ms
    jest.advanceTimersByTime(1000);
    expect(wrapper.find('.debounced-value').text()).toBe('');

    // now we advanced 2000ms from the latest change
    jest.advanceTimersByTime(1000);
    expect(wrapper.find('.debounced-value').text()).toBe('value2');
  });

  it('throws if no ref provided', async () => {
    // vue is very noisy
    // eslint-disable-next-line no-console
    console.error = () => {};

    expect(() => {
      shallowMount(
        {
          template: '',
          setup() {
            const normalVariable = 'normal-variable';

            // we're actually testing the very thing typescript doesn't like here
            // @ts-ignore
            const debouncedValue = useDebouncedRef(normalVariable);
            return { debouncedValue };
          },
        },
        { localVue },
      );
    }).toThrow(new Error('You have to provide a ref'));
  });
});
