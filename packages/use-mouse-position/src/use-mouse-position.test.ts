import { shallowMount, fireMouseMoveEvent } from '@vue-hooks/test-utils';
import { useMousePosition } from './use-mouse-position';

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
  it('should update mouse position', () => {
    const wrapper = shallowMount(Component);

    fireMouseMoveEvent(100, 120);
    expect(wrapper.find('.x').text()).toBe('100');
    expect(wrapper.find('.y').text()).toBe('120');
  });
});
