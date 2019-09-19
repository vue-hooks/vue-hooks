import { createLocalVue } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';

export const createVue = () => {
  const localVue = createLocalVue();

  localVue.use(VueCompositionApi);

  return localVue;
};
