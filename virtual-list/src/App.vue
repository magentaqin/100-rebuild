<template>
  <div id="app">
    <!-- <simple-virtual-scroller :list-data="simpleListData" /> -->
    <simple-dynamic-scroller
       v-if="dynamicListData.length" 
      :list-data="dynamicListData" 
    />
  </div>
</template>

<script>
// import SimpleVirtualScroller from './components/SimpleVirtualScroller.vue'
import SimpleDynamicScroller from './components/SimpleDynmaicScroller.vue'
import faker from 'faker';

export default {
  name: 'App',
  components: {
    // SimpleVirtualScroller
    SimpleDynamicScroller
  },
  data() {
    return {
      // simpleListData: []
      dynamicListData: []
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      // this.simpleListData.push(i)
      this.dynamicListData.push({ id: i, value: faker.lorem.sentences() })
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
