<template>
  <div class="box" ref="box">
    <el-container>
        <el-aside
        width="auto"
        >
        <div class="left" ref="leftConcent">aside</div>
        </el-aside>
        <div class="resize" ref="resize"></div>
        <el-main><div class="right" ref="rightConcent">container + div的窗口拖拽功能不是特别好用</div></el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'DragView',
  components: {
  },
  data() {
    return {
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
    this.onChaneWidth()
  },
  computed: {
  },
  methods: {
    onChaneWidth() {
      let resize = this.$refs.resize
      let left = this.$refs.leftConcent
      let right = this.$refs.rightConcent
      let box = this.$refs.box

      resize.onmousedown = function (e) {
        let startX = e.clientX
        resize.left = resize.offsetLeft
        document.onmousemove = function (e) {
          let endX = e.clientX
          let moveLen = resize.left + (endX - startX)
          if (moveLen / box.clientWidth < 0.2) moveLen = box.clientWidth * 0.2
          if (moveLen / box.clientWidth > 0.8) moveLen = box.clientWidth * 0.8
          resize.style.left = moveLen
          left.style.width = moveLen + 'px'
          let rWidth = box.clientWidth - moveLen - 2
          right.style. width =  rWidth + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          resize.releaseCapture && resize.releaseCapture()
        }
        resize.setCapture && resize.setCapture()
        return false
      }
    }
  }
}
</script>

<style>
  .box, .el-container{
    width:100%;
    height:400px;
    overflow:hidden;
  }
  .resize{
    width:2px;
    height:100%;
    cursor: w-resize;
    float:left;
  }
  .left {
    width:288px;
    height: 100%;
    float:left;
    overflow: auto;
    background: pink;
  }
  .right {
    width:100%;
    height:100%;
    float:left;
    overflow: hidden;
    background: #ffc5c1;
  }
  .el-main{
    padding: 0;
    width: auto;
  }
</style>