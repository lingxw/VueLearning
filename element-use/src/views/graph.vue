<template>
    <div>
        <h1>Paper</h1>
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
        JointPaper.initPaper(joint, 'paper', true, false);
        JointPaper.initPaper(joint, 'paper1', false, 'manhattan');
    }
  }
}
</script>
