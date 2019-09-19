<template>
  <div class="mouse-position">
    <div class="position-x">X: {{ x }}</div>
    <div class="position-y">Y: {{ y }}</div>
  </div>
</template>

<script>
import { useMousePosition } from 'vue-fn-use-mouse-position';

export default {
  setup() {
    const [x, y] = useMousePosition();

    return { x, y };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
