<template>
    <div>
        <div class="toolbar">
          <i id="zoom-in" class="el-icon-zoom-in"></i>
          <i id="zoom-out" class="el-icon-zoom-out"></i>
          <i id="reset" class="el-icon-refresh"></i>
          <el-divider direction="vertical"></el-divider>
          <i id="undo" class="el-icon-refresh-left" @click="undo"></i>
          <i id="redo" class="el-icon-refresh-right" @click="redo"></i>
          <el-divider direction="vertical"></el-divider>
          <i id="setting" class="el-icon-setting"></i>
          <el-select v-model="selectCompId" placeholder="" style="float: left;" @change="changeComp">
            <el-option
              key="s-1"
              label="1"
              value="s-1"
            />
          <el-option
            key="2-2"
            label="2"
            value="2-2"
          />
          </el-select>
        </div>
        <div id='paper'/>
        <div id='paper1'/>
        <div id="toolbar">
            <textarea id="adjacency-list">{
          'This is\nan element': ['b', 'c'],
          'b': ['f'],
          'c': ['e', 'd'],
          'd': [],
          'e': [],
          'f': ['g'],
          'g': []
        }</textarea>
            <br/>
            <button id="btn-layout">Layout</button>
        </div>
        <div id="paper2"></div>
    </div>
</template>

<script>
import JointContainer from '../components/graph/joint.shapes.container'
import JointPaper from '../components/graph/index'
import autolayout from '../components/AutoLayout/assets/autolayout'
var undoManager = require('../components/graph/undoManager');

export default {
  name: 'graph',
  components: {
  },
  data() {
    return {
      selectCompId: '2-2'
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
    if (this.$route.query.selectCompId) {
      this.selectCompId = this.$route.query.selectCompId
    }
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
    this.initGraph(this.$joint)
    autolayout.init(window.joint, window._, window.$, window.V, 'paper2')
  },
  computed: {
  },
  methods: {
    initGraph(joint) {
        JointContainer.createGraph(joint);
        if (this.selectCompId === '2-2') {
          JointPaper.initPaper(joint, 'paper', false, false);
        } else {
          JointPaper.initPaper(joint, 'paper', true, 'manhattan');
        }
    },
    undo() {
      undoManager.undo()
    },
    redo() {
      undoManager.redo()
    },
    changeComp() {
      this.$router.push({
        path: '/graphView',
        query: {
          kind: 'graphView',
          selectCompId: this.selectCompId
        }
      })
    }
  }
}
</script>
<style scoped>
  @import "../components/AutoLayout/assets/autolayout.css"
</style>
