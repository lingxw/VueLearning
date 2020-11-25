<template>
  <div id="image" style="text-align: left;">
    <!-- bind to a data property named `code` -->
    <highlightjs id="svView1" autodetect :code="content" />
    <!-- or literal code works as well -->
    <highlightjs id="svView2" :language="contentLang" :code="contentJcl" />
    <el-button size="small" type="primary" @click="print">Print</el-button>
    <el-button size="small" type="primary" @click="exportXlsx_table_to_book">excel table_to_book</el-button>
    <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Excel
    </el-button>
    <el-button size="small" type="primary" @click="exportByExecljs">exportByExecljs</el-button>
    <el-button size="small" type="primary" @click="exportByMsExcel">exportByMsExcel</el-button>
    <el-button size="small" type="primary" @click="exportMy">my export</el-button>
    <el-button size="small" type="primary" @click="convertHtmlTobmp">htmlTobmp</el-button>
  </div>
</template>

<script>
import hljs from 'highlight.js'
window.hljs = hljs
require('highlightjs-line-numbers.js')
import HljsExtend from '../plugins/highlightjs-extend'
import XLSX from 'xlsx'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { exportToExcel } from '../plugins/exportExcel'
import html2canvas from 'html2canvas'
import Canvas2Image from '../plugins/canvas2image'

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
      contentLang: 'jcl',
      contentJcl: '#@PLANET1#AA\n#@PLANET2#2002/01/012002/01/0112:00USER1\n#@PLANET3#ACCES.JCLLIB\n//**  ＳＴ２１１４Ａ　プログラム　                **\n//ST214A JOB 1,ST214A,MSGLEVEL=(1,1),NOTIFY=&SYSUID\n//STEP1 EXEC PROC=IGYWCLG\n//COBOL.SYSIN DD DSN="ST214.COBOL.SOURCE(LAB1)",DISP=SHR\n//LKED.SYSLMOD DD DSNAME=ST214.LOADLIB(LAB1),DISP=SHR\n',
      downloadLoading: false
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
    exportXlsx_table_to_book() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.getElementById('svView2'))
      /* generate file and force a download*/
      XLSX.writeFile(wb, 'sheetjs.xlsx')
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/plugins/Export2Excel').then(excel => {
        excel.export_table_to_excel('sheetjs.xlsx', 'svView2', ['data-line-number'])
        this.downloadLoading = false
      })
    },
    exportByExecljs() {
      const workbook = new Excel.Workbook()
      workbook.creator = 'test'
      workbook.lastModifiedBy = 'test'
      workbook.created = new Date()
      workbook.modified = new Date()

      let sheet = workbook.addWorksheet('sheet1')
      // Add column headers and define column keys and widths
      sheet.columns = [
        {header: 'SEQ', key: 'seq', width: 15},
        {header: 'CODE', key: 'code', width: 15}
      ]
      // テーブル
      let rows = []
      const lines = this.contentJcl.split('\n')
      let lineCount = 0
      lines.forEach((line) => {
        lineCount++
        if (lines.length === lineCount && line.trim() === '') {
          lineCount--
        } else {
          rows.push({seq: lineCount, code: line})
        }
      })
      // Add an array of rows
      sheet.addRows(rows)
      const fileName = 'sheetjs'
      workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(new Blob([buffer], {
              type: 'application/octet-stream'
          }), fileName + '.' + 'xlsx');
      })
    },
    exportByMsExcel() {
      // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
      const head = document.getElementsByTagName('head')[0]
      var headStr = ''
      const styles = head.getElementsByTagName('style')
      styles.forEach(function(style) {
        headStr = headStr + style.outerHTML
      })
      var printStr = '<html><head><meta charset=\'utf-8\' />' + headStr + '<style>code { page-break-after:always }</style></head><body>'
      var html2 = printStr + document.getElementById('svView2').outerHTML + "</body></html>";
      // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
      var blob2 = new Blob([html2], {
        type: "application/vnd.ms-excel"
      });
      saveAs(blob2, 'sheetjs.xls');
    },
    exportMy() {
      exportToExcel('sheetjs.xls', '#svView2')
    },
    convertHtmlTobmp() {
      var targetDom = document.getElementById('image')
      var copyDom = targetDom.cloneNode()
      copyDom = targetDom.width + "px"
      copyDom = targetDom.height + "px"
      html2canvas(copyDom, {
        // backgroundColor: null,
        backgroundColor: "transparent",
        allowTaint: true,
        useCORS: true 
      }).then((canvas)=>{
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        Canvas2Image.saveAsPNG(canvas, canvasWidth, canvasHeight, 'sv')
      })
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

#svView2 .hljs-comment,
#svView2 .hljs-quote {
  font-style: normal;
}

.hljs-planet-comment {
  color: rgb(30, 184, 132);
}
</style>