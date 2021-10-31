<template>
  <div>
    <h3>一次性渲染10万条数据</h3>
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
      list: []
    }
  },
  mounted() {
    for (let i = 0; i < 100000; i++) {
      this.list.push(i)
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