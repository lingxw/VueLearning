<template>
  <div style="text-align: left;">
    <!-- bind to a data property named `code` -->
    <highlightjs id="svView1" autodetect :code="content" />
    <!-- or literal code works as well -->
    <highlightjs id="svView2" :language="contentLang" code="var x = 5;" />
    <el-button size="small" type="primary" @click="print">Print</el-button>
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
    print() {
      const head = document.getElementsByTagName('head')[0]
      var headStr = ''
      const styles = head.getElementsByTagName('style')
      styles.forEach(function(style) {
        headStr = headStr + style.outerHTML
      })
      var printStr = '<html><head>' + headStr + '<style>code { page-break-after:always }</style></head><body>'
      var content = ''
      var str = document.getElementById('svView1').innerHTML
      content = content + str
      str = document.getElementById('svView2').innerHTML
      content = content + str
      printStr = printStr + content + '</body></html>'
      var pwin = window.open('Print.htm', 'print')
      pwin.document.write(printStr)
      pwin.document.close()
      pwin.print()
    },
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