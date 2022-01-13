<template>
  <div 
    ref="scroller" 
    class="simple-dynamic-virtual-scroller-container" 
    @scroll="handleScroll"
  >
    <div ref="phantom" class="phantom-list"></div>
    <div ref="content" class="visible-list">
      <div
        ref="items"
        class="visible-list-item"
        v-for="(item) in visibleData"
        :id="item.id"
        :key="item.id"
       >
        <span>{{ item.id }}: <span>{{ item.value }}</span></span>
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
    // 预估高度
    estimatedItemSize: {
      type: Number,
      default: 100
    },
    // 缓冲区比例
    bufferPercentage: {
      type: Number,
      default: 1
    },
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
    // 可视区域需要展示的 item 数量
    visibleCount() {
      return Math.ceil(this.screenHeight / this.estimatedItemSize)
    },
    // 可视区域上方渲染条数
    aboveCount() {
      const bufferCount = Math.floor(this.bufferPercentage * this.visibleCount)
      // 考虑到startIndex比bufferCount小的情况
      return Math.min(this.startIndex, bufferCount);
    },
    // 可视区域下方渲染条数
    belowCount() {
      const bufferCount = Math.floor(this.bufferPercentage * this.visibleCount)
      const lastIndex = this.listData.length - 1
      // 考虑到endIndex快到底的情况
      return Math.min(lastIndex - this.endIndex, bufferCount)
    },
    // 获取可视区域内列表数据
    visibleData(){
      const start = this.startIndex - this.aboveCount;
      let end = this.endIndex + this.belowCount;
      const lastIndex = this.listData.length - 1
      end = Math.min(lastIndex, end);
      return this.listData.slice(start, end + 1);
    },
  },
  created() {
    this.initPositionInfo();
  },
  mounted() {
    this.endIndex = this.startIndex + this.visibleCount - 1;
  },
  updated() {
    this.$nextTick(() => {
      if(!this.$refs.items || !this.$refs.items.length){
        return ;
      }
      // 渲染完成后，用每项的实际渲染信息来更新positionInfo
      this.updatePositionInfo()
      // 更新列表总高度
      if (this.positionInfo[this.positionInfo.length-1]) {
        const height = this.positionInfo[this.positionInfo.length-1].bottom
        this.$refs.phantom.style.height = height + 'px'
      }
      // 设置偏移量
      this.setStartOffset();
    })
  },
  methods: {
    // 初始化positionInfo
    initPositionInfo() {
      this.positionInfo = this.listData.map(((item, index) => {
        return {
          index,
          height: this.estimatedItemSize,
          top: index * this.estimatedItemSize,
          bottom: (index + 1) * this.estimatedItemSize
        }
      }))
    },
    // 渲染完成后，用每项的实际渲染信息来更新positionInfo
    updatePositionInfo() {
      const nodes = this.$refs.items;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const height = rect.height
        const index = Number(node.id)
        const oldHeight = this.positionInfo[index].height
        // 预估的高度和实际渲染高度不一致
        if (height !== oldHeight) {
          const diffVal = height - oldHeight;
          // 当前node的bottom和height重新赋值
          this.positionInfo[index].bottom = this.positionInfo[index].bottom + diffVal;
          this.positionInfo[index].height = height;
          // 接下来的node的top和bottom也重新赋值
          for (let k = index + 1; k < this.positionInfo.length; k++) {
            this.positionInfo[k].top = this.positionInfo[k].bottom;
            this.positionInfo[k].bottom = this.positionInfo[k].bottom + diffVal
          }
        }
      })
    },
     // scroll回调
    handleScroll() {
      const scrollTop = this.$refs.scroller.scrollTop;
      this.startIndex = this.getStartIndex(scrollTop)
      this.endIndex = this.startIndex + this.visibleCount - 1
      this.setStartOffset();
    },
    // 获取开始索引
    // getStartIndex(scrollTop = 0) {
    //   const item = this.positionInfo.find(item => item.bottom > scrollTop)
    //   return item.index;
    // },
    //获取列表起始索引
    getStartIndex(scrollTop = 0){
      //二分法查找
      return this.binarySearch(this.positionInfo,scrollTop)
    },
    binarySearch(list,value){
      let start = 0;
      let end = list.length - 1;
      let tempIndex = null;

      while(start <= end){
        let midIndex = parseInt((start + end)/2);
        let midValue = list[midIndex].bottom;
        if(midValue === value){
          return midIndex + 1;
        }else if(midValue < value){
          start = midIndex + 1;
        }else if(midValue > value){
          if(tempIndex === null || tempIndex > midIndex){
            tempIndex = midIndex;
          }
          end = end - 1;
        }
      }
      return tempIndex;
    },
    // 设置当前的偏移量
    setStartOffset() {
      let startOffset = 0;
      if (this.startIndex > 0) {
        const startTop = this.positionInfo[this.startIndex].top
        let size = startTop
        // 上方缓冲区第一个item
        const aboveFirstItem = this.positionInfo[this.startIndex - this.aboveCount]
        if (aboveFirstItem) {
          size = startTop - aboveFirstItem.top
        }
        startOffset = startTop - size
      }
      this.$refs.content.style.transform = `translate(0,${startOffset}px)`
    }
  }
}
</script>

<style scoped>
.simple-dynamic-virtual-scroller-container {
  height: 100vh;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}
.phantom-list {
  position: absolute;
  top: 0;
}

.visible-list-item {
  width: 100vw;
  border-bottom: 1px solid #333;
  color: magenta;
}
</style>