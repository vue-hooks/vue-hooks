<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MousePosition />
  </div>
</template>

<script>
import MousePosition from './components/MousePosition.vue';

export default {
  name: 'app',
  components: {
    MousePosition,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
