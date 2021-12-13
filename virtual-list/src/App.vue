<template>
  <div id="app">
    <simple-virtual-scroller :list-data="listData" />
  </div>
</template>

<script>
import SimpleVirtualScroller from './components/SimpleVirtualScroller.vue'

export default {
  name: 'App',
  components: {
    SimpleVirtualScroller
  },
  data() {
    return {
      listData: []
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.listData.push(i)
    }
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
}
</style>
