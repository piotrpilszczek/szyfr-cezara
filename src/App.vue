<template>
  <Caesar />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Caesar from './components/Caesar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Caesar
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

* {
  font-family: 'Inconsolata', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #242932;
}
</style>
