<template>
  <div style="text-align: left;">
    <div id="printJS-obj">
      <markdown-it-vue ref="sv-md" class="md-body" :content="'```\n' + content + '\n```'" />
      <markdown-it-vue ref="sv-md" class="md-body" :content="'```\n' + content + '\n```'" />
    </div>
    <el-button size="small" type="primary" @click="print">Print</el-button>
  </div>
</template>

<script>
import '../plugins/highlightjs-line-numbers'
import printJS from 'print-js'
// import HljsExtend from '../plugins/highlightjs-extend'

function addLineNumbers() {
  window.initLineNumbersOnLoad({ 
    singleLine:true,
    startFrom: 1
  })
}

export default {
  name: 'CodeView3',
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
    this.$nextTick(function () {
      addLineNumbers()
      // HljsExtend.hoverLine()
    })
  },
  computed: {
  },
  methods: {
    print() {
      const head = document.getElementsByTagName('head')[0]
      var headStr = ''
      const styles = head.getElementsByTagName('style')
      styles.forEach(function(style) {
        headStr = headStr + style.innerHTML
      })
      printJS({
        printable: 'printJS-obj',
        fallbackPrintable: null,
        type: 'html',
        header: '<div id="nav"><a href="/tree" class="">Tree</a> | <a href="/code1" class="">Code View 1</a> | <a href="/code2" class="">Code View 2</a> | <a href="/code3" class="router-link-exact-active router-link-active" aria-current="page">Code View 3</a> | <a href="/dragDiv" class="">Drag Div</a> | <a href="/dragView" class="">Drag View</a> | <a href="/dragView2" class="">Drag View2</a> | <a href="/dragView3" class="">Drag View3</a> | <a href="/csv" class="">csv</a></div>',
        headerStyle: 'font-weight: 300;',
        maxWidth: 800,
        properties: null,
        gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
        gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
        showModal: false,
        onError: (error) => { throw error },
        onLoadingStart: null,
        onLoadingEnd: null,
        onPrintDialogClose: () => {},
        onIncompatibleBrowser: () => {},
        modalMessage: 'Retrieving Document...',
        frameId: 'printJS',
        printableElement: null,
        documentTitle: 'Document',
        targetStyle: ['clear', 'display'], // ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
        targetStyles: ['border', 'box', 'break', 'text-decoration'], // ['border', 'box', 'break', 'text-decoration'],
        ignoreElements: [],
        repeatTableHeader: true,
        css: null,
        style: headStr,
        scanStyles: true,
        base64: false,

        // Deprecated
        onPdfOpen: null,
        font: 'TimesNewRoman',
        font_size: '12pt',
        honorMarginPadding: true,
        honorColor: false,
        imageStyle: 'max-width: 100%;'
      })
    }
  }
}
</script>

<style lang="less">

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

.markdown-body table td.hljs-ln-numbers {
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

.md-body + .md-body{
  page-break-before: always;
}

// .hljs-ln tr.current-row>td {
//   background-color: #ecf5ff;
// }

.markdown-body .hljs-ln tr>td.hljs-ln-code:hover {
  background-color: #4091ff;
  color: white;
  &>* {
    color: white;
  }
}
</style>