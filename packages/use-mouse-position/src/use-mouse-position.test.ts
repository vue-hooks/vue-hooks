import { shallowMount } from '@vue/test-utils';
import { createVue, fireMouseMoveEvent } from '@vue-hooks/test-utils';
import { useMousePosition } from './use-mouse-position';

const localVue = createVue();

const Component = {
  template: /* HTML */ /* html */ `
    <div>
      <div class="x">{{ x }}</div>
      <div class="y">{{ y }}</div>
    </div>
  `,

  setup() {
    const [x, y] = useMousePosition();

    return { x, y };
  },
};

describe('useMousePosition', () => {
  it('should update mouse position', async () => {
    const wrapper = shallowMount(Component, { localVue });

    fireMouseMoveEvent(100, 120);
    expect(wrapper.find('.x').text()).toBe('100');
    expect(wrapper.find('.y').text()).toBe('120');
  });

  // FIXME: this seems a fishy way to test and also it doesn't ensure that it fully cleans up
  it('should cleanup', async () => {
    const removeEventListener = jest.fn();
    window.removeEventListener = removeEventListener;

    const wrapper = shallowMount(Component, { localVue });
    wrapper.destroy();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });
});
