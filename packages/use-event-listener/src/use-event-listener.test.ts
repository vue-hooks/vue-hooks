import { fireMouseMoveEvent, shallowMount } from '@vue-hooks/test-utils';
import { reactive, ref } from '@vue/composition-api';
import { useEventListener } from './use-event-listener';

const Component = {
  template: /* HTML */ /* html */ `
    <div>
      <div class="x">{{ state.x }}</div>
      <div class="y">{{ state.y }}</div>
    </div>
  `,

  setup() {
    const state = reactive({ x: 0, y: 0 });

    useEventListener('mousemove', event => {
      const e = event as MouseEvent;
      state.x = e.clientX;
      state.y = e.clientY;
    });

    return { state };
  },
};

describe('useEventListener', () => {
  it('should attach event', () => {
    const wrapper = shallowMount(Component);

    fireMouseMoveEvent(100, 120);
    expect(wrapper.find('.x').text()).toBe('100');
    expect(wrapper.find('.y').text()).toBe('120');
  });

  // FIXME: this seems a fishy way to test and also it doesn't ensure that it fully cleans up
  it('should cleanup', () => {
    const removeEventListener = jest.fn();
    window.removeEventListener = removeEventListener;

    const wrapper = shallowMount(Component);
    wrapper.destroy();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});
