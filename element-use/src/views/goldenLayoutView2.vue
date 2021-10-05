<template>
  <div>
    <button class="reset" @click="reset">Reset localStorage</button>
    <golden-layout
      :showPopoutIcon="false"
      :showMaximiseIcon="true"
      :showCloseIcon="true"
      class="hscreen"
    >
      <gl-row :closable="false">
        <gl-component title="SourceView">
          <highlightjs id="svView1" language="jcl" :code="content" />
        </gl-component>
        <gl-stack>
          <gl-component title="component2">
            <h1>Component 2</h1>
          </gl-component>
          <gl-component title="component3">
            <h1>Component 3</h1>
          </gl-component>
          <gl-component title="component4">
            <h1>Component 4</h1>
          </gl-component>
        </gl-stack>
      </gl-row>
    </golden-layout>
  </div>
</template>

<script>
import hljs from 'highlight.js'
window.hljs = hljs
require('highlightjs-line-numbers.js')
import HljsExtend from '../plugins/highlightjs-extend'
import sample from '../components/GoldenLayout/sample.jcl'

function addLineNumbers() {
  hljs.initLineNumbersOnLoad({
    singleLine: true,
    startFrom: 1
  })
}

export default {
  name: 'GoldenLayoutView2',
  components: {},
  data() {
    return {
      content: sample
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
    addLineNumbers()
    HljsExtend.hoverLine()
  },
  methods: {
    reset() {
      delete localStorage.browserGL
      location.reload()
    }
  }
}
</script>

<style>
.hljs-ln-numbers {
  text-align: center;
  color: #ccc;
  border-right: 1px solid #999;
  vertical-align: top;
  padding-right: 5px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hljs-ln-code {
  padding-left: 10px;
}
.hljs-ln-code,
.hljs-ln-numbers {
  line-height: 12px;
}

code {
  white-space: pre-wrap;
  overflow: auto;
  text-align: left;
}

.hljs-ln tr.current-row > td {
  background-color: #ecf5ff;
}

#svView2 .hljs-comment,
#svView2 .hljs-quote {
  font-style: normal;
}

.hljs-planet-comment {
  color: rgb(30, 184, 132);
}

#fragments {
  background-color: darkcyan;
}

#fragTable {
  border-collapse: collapse;
}
body {
  overflow: hidden; /* The 'light' theme let a scroll-bar on the right of the main container */
}
.hscreen {
  width: 100vw;
  height: 100vh;
}
.reset {
  position: absolute;
  bottom: 0;
  right: 0;
  float: right;
  z-index: 9000;
}
.reset:hover {
  background-color: red;
}
</style>
