<template>
  <div v-drag-aside>
    <el-container>
        <el-aside>
          <div>1</div>
          <div>2</div>
          3
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
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
  .drag-aside-box, .el-container{
    width:100%;
    height:400px;
    overflow:auto;
  }
  .drag-aside-resize{
    width:2px;
    height:100%;
    cursor: w-resize;
    float:left;
  }
  .drag-aside-left {
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