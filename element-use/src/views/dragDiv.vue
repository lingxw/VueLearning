<template>
  <div id="box">
    <div class="top">顶部导航</div>
    <div id="left"> 左边的div
      <svg width="100%" id="controllerSvg" ></svg>
    </div>
    <div id="resize"></div>
    <div id="right" style="border-top: 1px solid #b5b9a9; ">右边的div
    </div>
    <p></p>
    <div class="drag" v-drag></div>
  </div>
</template>

<script>
export default {
  name: 'change',
  methods: {
    dragControllerDiv: function () {
      let resize = document.getElementById('resize')
      let left = document.getElementById('left')
      let right = document.getElementById('right')
      let box = document.getElementById('box')

      resize.onmousedown = function (e) {
        let startX = e.clientX
        resize.left = resize.offsetLeft
        document.onmousemove = function (e) {
          let endX = e.clientX
          let moveLen = resize.left + (endX - startX)
          let percentLen = moveLen / box.clientWidth
          if (percentLen < 0.2) moveLen = box.clientWidth * 0.2
          if (percentLen > 0.8) moveLen = box.clientWidth * 0.8
          resize.style.left = moveLen
          percentLen = Math.floor(moveLen * 10000 / box.clientWidth) / 100
          left.style.width =  percentLen + '%'
          right.style.width = 'calc(' + (100 - percentLen) + '% - 2px)'
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
  },
  mounted () {
    this.dragControllerDiv()
  }
}
</script>

<style scoped>
  #box{
    width:100%;
    min-width: 300px;
    height:400px;
    position: relative;
    overflow:hidden;
  }
  .top {
    width: 100%;
    height: 30px;
    background: #ffe0c6;
  }
  #left{
    width:calc(30% - 2px);
    height: 100%;
    float:left;
    overflow: auto;
    background: pink;
  }

  #resize{
    position: relative;
    width:2px;
    height:100%;
    cursor: w-resize;
    float:left;
  }

  #right{
    width:70%;
    height:100%;
    float:left;
    overflow: hidden;
    background: #ffc5c1;
  }
  .drag{
    position: absolute;
    width: 200px;
    height: 200px;
    background: yellowgreen;
  }
</style>