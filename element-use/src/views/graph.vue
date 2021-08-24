<template>
    <div>
        <div class="toolbar">
          <i id="zoom-in" class="el-icon-zoom-in"></i>
          <i id="zoom-out" class="el-icon-zoom-out"></i>
          <i id="reset" class="el-icon-refresh"></i>
          <el-divider direction="vertical"></el-divider>
          <i id="setting" class="el-icon-setting"></i>
        </div>
        <div id='paper'/>
        <div id='paper1'/>
    </div>
</template>

<script>
import JointContainer from '../components/graph/joint.shapes.container'
import JointPaper from '../components/graph/index'
export default {
  name: 'name',
  components: {
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
    this.initGraph(this.$joint)
  },
  computed: {
  },
  methods: {
    initGraph(joint) {
        JointContainer.createGraph(joint);
        JointPaper.initPaper(joint, 'paper', false, false);
        JointPaper.initPaper(joint, 'paper1', true, 'manhattan');
    }
  }
}
</script>
