<template>
  <div id="app">
    <batch-render-list />
    <!-- <large-list /> -->
  </div>
</template>

<script>
// import LargeList from './components/LargeList.vue'
import BatchRenderList from './components/BatchRenderList.vue'

export default {
  name: 'App',
  components: {
    BatchRenderList
    // LargeList
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
