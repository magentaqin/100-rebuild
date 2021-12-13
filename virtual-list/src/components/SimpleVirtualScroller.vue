<template>
  <div 
    ref="scroller" 
    class="simple-virtual-scroller-container" 
    @scroll="handleScroll"
  >
    <div class="phantom-list" :style="{height: listHeight + 'px'}"></div>
    <div class="visible-list" :style="{ position: 'absolute', top: visibleListTransform }">
      <div
        class="visible-list-item"
        v-for="(item, index) in visibleData"
        :key="index"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
       >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleVirtualScroller',
  props: {
    // 所有列表数据
    listData:{
      type:Array,
      default:() => []
    },
    // 每项高度
    itemSize: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      // 可视区域高度。先暂定为full screen。
      screenHeight: window.innerHeight,
      // 起始索引
      startIndex: 0,
      // 结束索引
      endIndex: 0,
      // 可视区域垂直移动偏移量
      startOffset: 0,
    };
  },
  computed:{
    // 列表的总高度，并撑开列表
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    // 可视区域需要展示的 item 数量
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    // 获取可视区域内列表数据
    visibleData(){
      return this.listData.slice(this.startIndex, this.endIndex + 1);
    },
    // 可视区域垂直移动偏移量
    visibleListTransform() {
      return `${this.startOffset}px`;
    }
  },
  mounted() {
    this.endIndex = this.startIndex + this.visibleCount - 1;
  },
  methods: {
    handleScroll() {
      const scrollTop = this.$refs.scroller.scrollTop;
      this.startIndex = Math.floor(scrollTop / this.itemSize)
      this.endIndex = this.startIndex + this.visibleCount - 1
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    }
  }
}
</script>

<style scoped>
.simple-virtual-scroller-container {
  height: 100vh;
  position: relative;
  overflow-y: auto;
}
.visible-list-item {
  width: 100vw;
  border-bottom: 1px solid #333;
  color: magenta;
}
</style>