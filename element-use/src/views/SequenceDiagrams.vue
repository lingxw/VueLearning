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
  name: 'SequenceDiagrams',
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
