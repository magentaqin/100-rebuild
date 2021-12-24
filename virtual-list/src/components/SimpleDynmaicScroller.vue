<template>
  <div 
    ref="scroller" 
    class="simple-dynamic-virtual-scroller-container" 
    @scroll="handleScroll"
  >
    <div class="phantom-list" :style="{height: listHeight + 'px'}"></div>
    <div class="visible-list" :style="{ position: 'absolute', top: visibleListTransform }">
      <div
        ref="items"
        class="visible-list-item"
        v-for="(item, index) in visibleData"
        :key="index"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
       >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleDynamicScroller',
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
    },
    // 预估最小高度
    minSize: {
      type: Number,
      default: 0
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
      // 存储列表渲染后每一项的实际高度以及位置
      positionInfo: []
    };
  },
  computed:{
    // 列表的总高度：最后一项位置信息的bottom
    listHeight() {
      return this.positionInfo[this.positionInfo.length - 1].bottom;
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
    this.initPositionInfo();
  },
  // 渲染完成后，用每项的实际渲染信息来更新positionInfo
  updated() {
    const nodes = this.$refs.items;
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect()
      const height = rect.height
      const index = node.id;
      const oldHeight = this.positionInfo[index].height
      if (height !== oldHeight) {
        
      }
    })
  },
  methods: {
    // scroll回调
    handleScroll() {
      const scrollTop = this.$refs.scroller.scrollTop;
      this.startIndex = Math.floor(scrollTop / this.itemSize)
      this.endIndex = this.startIndex + this.visibleCount - 1
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    },
    // 初始化positionInfo
    initPositionInfo() {
      this.positionInfo = this.listData.map(((item, index) => {
        return {
          index,
          height: this.minSize,
          top: index * this.minSize,
          bottom: (index + 1) * this.minSize
        }
      }))
    }
  }
}
</script>

<style scoped>
.simple-dynamic-virtual-scroller-container {
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