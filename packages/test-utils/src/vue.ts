import { createLocalVue, shallowMount as originalShallowMount } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';

export const createVue = () => {
  const localVue = createLocalVue();

  localVue.use(VueCompositionApi);

  return localVue;
};

const localVue = createVue();

// since we use typeof originalShallowMount
export const shallowMount: typeof originalShallowMount = (component: any) => {
  return originalShallowMount(
    {
      template: '<div></div>',
      ...component,
    },
    {
      localVue,
    },
  );
};
