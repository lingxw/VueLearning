<template>
  <div class="box" ref="box">
    <el-container>
        <el-aside
        width="auto"
        >
        <div class="left" ref="left">aside</div>
        <div class="resize" ref="resize"></div>
        </el-aside>
        <el-main>main</el-main>
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
      let left = this.$refs.left
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
    overflow:auto;
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
  .el-main{
    padding: 0;
    background: #ffc5c1;
  }
</style>