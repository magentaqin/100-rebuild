<template>
  <div>
    <h3>用RequestAnimationFrame分批渲染数据</h3>
    <ul id="container">
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      count: 0,
    }
  },
  mounted() {
    this.loop()
  },
  methods: {
    loop() {
      const start = Date.now()
      if (this.count > 100000) {
        return;
      }
      this.updateList(this.count)
      requestAnimationFrame((now) => {
        console.log('now', now)
        console.log('gap', Date.now() - start)
        this.loop();
      })
    },
    updateList(start) {
      for (let i = start; i < start + 20; i++) {
        this.list.push(i)
      }
      this.count += 20
    }
  }
}
</script>

<style scoped>
h3 {
  color: #42b983;
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}

</style>