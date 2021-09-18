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
        <div id='container' height='500px' width='900px' />
    </div>
</template>

<script>
import { createG6 } from '../components/AntvG6/index'

export default {
  name: 'g6',
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
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
    createG6()
  },
  computed: {
  },
  methods: {
    undo() {
    },
    redo() {
    },
    changeComp() {
      this.$router.push({
        path: '/g6',
        query: {
          kind: 'g6',
          selectCompId: this.selectCompId
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
