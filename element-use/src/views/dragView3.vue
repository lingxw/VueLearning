<template>
  <div id="view">
    <el-container v-drag-aside>
        <el-aside>
          <div>1</div>
          <div>2</div>
          3
        </el-aside>
        <el-main>
          <el-container v-drag-aside>
            <el-aside>
              <div>11</div>
              <div>22</div>
              33
            </el-aside>
            <el-main>main</el-main>
          </el-container>
        </el-main>
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
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  #app{
    height:100%;
  }
  #view{
    height:calc(100% - 50px);
  }
  .drag-aside-box{
    width:100%;
    height:100%;
    display: flex;
    position: relative;
  }
  .drag-aside-left {
    width:calc(300px - 2px);
    height: 100%;
    float:left;
    overflow: auto;
  }
  .drag-aside-resize{
    width:2px;
    height:100%;
    cursor: w-resize;
    float:left;
    background-color: gray;
  }
  .el-main{
    padding: 0;
  }
</style>