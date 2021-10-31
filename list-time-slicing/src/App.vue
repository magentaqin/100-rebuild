<template>
  <div id="app">
    <large-list />
  </div>
</template>

<script>
import LargeList from './components/LargeList.vue'

export default {
  name: 'App',
  components: {
    LargeList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
