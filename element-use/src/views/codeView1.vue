<template>
  <div style="text-align: left;">
    <!-- bind to a data property named `code` -->
    <highlightjs autodetect :code="content" />
    <!-- or literal code works as well -->
    <highlightjs :language="contentLang" code="var x = 5;" />
  </div>
</template>

<script>
import hljs from 'highlight.js'
window.hljs = hljs
require('highlightjs-line-numbers.js')
import HljsExtend from '../plugins/highlightjs-extend'

function addLineNumbers() {
  hljs.initLineNumbersOnLoad({ 
    singleLine:true,
    startFrom: 1
  })
}

export default {
  name: 'CodeView1',
  components: {
  },
  data() {
    return {
      content: 'import hljs from \'highlight.js\'\nimport \'highlight.js/styles/googlecode.css\'\n\nlet Highlight = {} // comment',
      contentLang: 'javascript'
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
  computed: {
  },
  methods: {
  },
  
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

.markdown-body .hljs table td.hljs-ln-numbers {
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

.markdown-body .hljs table td, .markdown-body .hljs table th {
  padding: 3px 6px;
  border: none;
}

.markdown-body .hljs table tr {
  background-color: inherit;
  border: none;
}

code {
  white-space: pre-wrap;
  overflow: auto;
}

.hljs-ln tr.current-row>td {
  background-color: #ecf5ff;
}
</style>