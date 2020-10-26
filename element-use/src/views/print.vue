<template>
  <div style="text-align: left;">
    <div id="printJS-obj">
      <el-table
        ref="singleTable"
        :data="someJSONdata"
        border
        highlight-current-row
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        height="400px"
      >
        <el-table-column
          type="index"
        />
        <el-table-column
            v-for="(item) in properties"
            :key="item.field"
            :prop="item.field"
            :label="item.displayName"
            sortable
        />
      </el-table>
    </div>
    <TABLE class="add-row" border="0" style="font-size:9pt;" width="300px" align="center">
        <THEAD style="display:table-header-group;font-weight:bold">
          <TR><TD colspan="2" align="center" style="font-weight:bold;border:3px double red">每页都有的表头</TD></TR>
        </THEAD>
      <TBODY style="text-align:center">
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR style="page-break-after:always;"><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR style="page-break-after:always;"><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR><TD>表格内容</TD><TD>表格内容</TD></TR>
        <TR style="page-break-after:always;"><TD>表格内容</TD><TD>表格内容</TD></TR>
      </TBODY>
      <TFOOT style="display:table-footer-group;font-weight:bold">
        <TR>
          <TD colspan="2" align="center" style="font-weight:bold;border:3px double blue">每页都有的表尾</TD>
        </TR>
      </TFOOT>
    </TABLE>
    <input type=button value=" 打  印 " οnclick="javascript:window.print()">
    <el-button size="small" type="primary" @click="print">Print</el-button>
    <el-button size="small" type="primary" @click="printMy">My Print</el-button>
    <el-button size="small" type="primary" @click="printJson">Print with custom table header text</el-button>
  </div>
</template>

<script>
import printJS from 'print-js'
import { collectStyles } from 'print-js/src/js/functions'

export default {
  name: 'print',
  components: {
  },
  data() {
    return {
      someJSONdata: [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '111-111-1111'
        },
        {
          name: 'Barry Allen',
          email: 'barry@flash.com',
          phone: '222-222-2222'
        },
        {
          name: 'Cool Dude',
          email: 'cool@dude.com',
          phone: '333-333-3333'
        },
        {
          name: 'A',
          email: 'A@dude.com',
          phone: '333-333-3333'
        },
        {
          name: 'B',
          email: 'B@dude.com',
          phone: '333-333-3333'
        },
        {
          name: 'C',
          email: 'C@dude.com',
          phone: '333-333-3333'
        },
        {
          name: 'D',
          email: 'D@dude.com',
          phone: '333-333-3333'
        },
        {
          name: 'E',
          email: 'E@dude.com',
          phone: '333-333-3333'
        }
      ],
      properties: [
        { field: 'name', displayName: 'Full Name'},
        { field: 'email', displayName: 'E-mail'},
        { field: 'phone', displayName: 'Phone'}
      ]
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
    for (let i=1; i < 40; i++) {
    this.someJSONdata.push({
      name: 'F' + i,
      email: 'F' + i + '@dude.com',
      phone: '333-333-3333'
    })
    }
  },
  mounted() {
    console.log(`[${this.name}] Mounted`)
  },
  computed: {
  },
  methods: {
    printJson() {
      printJS({
        printable: this.someJSONdata,
        properties: [
          { field: 'name', displayName: 'Full Name'},
          { field: 'email', displayName: 'E-mail'},
          { field: 'phone', displayName: 'Phone'}
        ],
        type: 'json'
      })
    },
    cloneElement (element, params) {
      // Clone the main node (if not already inside the recursion process)
      const clone = element.cloneNode()

      // Loop over and process the children elements / nodes (including text nodes)
      const childNodesArray = Array.prototype.slice.call(element.childNodes)
      for (let i = 0; i < childNodesArray.length; i++) {
        // Check if we are skiping the current element
        if (params.ignoreElements.indexOf(childNodesArray[i].id) !== -1) {
          continue
        }

        // Clone the child element
        const clonedChild = this.cloneElement(childNodesArray[i], params)

        // Attach the cloned child to the cloned parent node
        clone.appendChild(clonedChild)
      }

      // Get all styling for print element (for nodes of type element only)
      if (params.scanStyles && element.nodeType === 1) {
        clone.setAttribute('style', collectStyles(element, params))
      }

      // Check if the element needs any state processing (copy user input data)
      switch (element.tagName) {
        case 'SELECT':
          // Copy the current selection value to its clone
          clone.value = element.value
          break
        case 'CANVAS':
          // Copy the canvas content to its clone
          clone.getContext('2d').drawImage(element, 0, 0)
          break
      }

      return clone
    },
    printMy() {
      const head = document.getElementsByTagName('head')[0]
      var headStr = '#printJS-obj {width="100%"}'
      const styles = head.getElementsByTagName('style')
      styles.forEach(function(style) {
        headStr = headStr + style.innerHTML
      })

      const params ={
        printable: null,
        fallbackPrintable: null,
        type: 'raw-html',
        header: '<div id="nav"><a href="/tree" class="">Tree</a> | <a href="/code1" class="">Code View 1</a> | <a href="/code2" class="">Code View 2</a> | <a href="/code3" class="router-link-exact-active router-link-active" aria-current="page">Code View 3</a> | <a href="/dragDiv" class="">Drag Div</a> | <a href="/dragView" class="">Drag View</a> | <a href="/dragView2" class="">Drag View2</a> | <a href="/dragView3" class="">Drag View3</a> | <a href="/csv" class="">csv</a></div>',
        headerStyle: 'font-weight: 300;',
        maxWidth: 1600,
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
      }
      const printElement = document.getElementById('printJS-obj')
      const printClone = this.cloneElement(printElement, params)
      const thead = printClone.querySelector('.el-table__header thead')
      const bodyTable = printClone.querySelector('.el-table__body')
      bodyTable.insertBefore(thead, bodyTable.children[1])
      const headerContainer = document.createElement('div')
      headerContainer.innerHTML = params.header
      printClone.insertBefore(headerContainer, printClone.childNodes[0])
      const hidden = printClone.querySelector('.hidden-columns')
      hidden.parentNode.removeChild(hidden)
      const headerTable = printClone.querySelector('.el-table__header-wrapper')
      headerTable.parentNode.removeChild(headerTable)
      params.printable = printClone.outerHTML
      printJS(params)
    },
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
        headerStyle: 'font-weight: 300;position:fixed;top:0;',
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

<style>
@media print {
  @page {
    size: A4 landscape;
  }
  /* #printJS-obj>div:first-child {
    position:fixed;
    top:0;
    height: 30px;
  }
  #printJS-obj .el-table {
    margin-top: 30px;
  }  */

  tr {
    page-break-inside: avoid;
  }
}

.add-row {
  counter-reset: pageCur 0;
}
.add-row tbody>tr:before {
  counter-increment: pageCur;
  content: counter(pageCur);
}

#printJS-obj .el-table__row:nth-child(17n) {
  background:#ff0000;
}
</style>