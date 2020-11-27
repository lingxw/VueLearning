<template>
  <div id="ocr">
    <el-table
      id="tableData"
      ref="singleTable"
      :data="tableData"
      border
      highlight-current-row
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      height="200px"
    >
      <!-- <el-table-column
        type="index"
        width="30px"
      /> -->
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :label="item.label"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row[item.prop]" placeholder="" />
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button size="small" type="primary" @click="convertHtmlTobmp">Download Bmp</el-button>
      <input type="file" id="uploader" @change="recognize">
      <button id="download-pdf" :disabled="downloadDisabled" @click="downloadPDF">Download PDF</button>
    </div>
    <textarea id="board" readonly rows="8" cols="80">Upload an image file</textarea>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import Canvas2Image from '../plugins/canvas2image'
import { createWorker } from 'tesseract.js'
const resolveURL = require('resolve-url');
export default {
  name: 'ocr',
  data() {
    return {
      worker: null,
      downloadDisabled: true,
      tableData: [['10 + 5 = ','12 - 2 = ',' 13 - ( ) = 5'],['12 + 5 = ','20 - 2 = ','( ) - 2 = 5']],
      tableTitle: [
        {
          label: 'first',
          prop: 0
        },
        {
          label: 'second',
          prop: 1
        },
        {
          label: 'third',
          prop: 2
        }
      ],
    }
  },
  created() {
    this.name = this.$options.name
    console.log(`[${this.name}] Created`)
    this.worker = createWorker({
          workerPath: resolveURL('tesseract/worker.min.js'),
          // langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          langPath: resolveURL('ocr_lang'),
          corePath: resolveURL('tesseract.js-core/tesseract-core.wasm.js'),
          logger: m => console.log(m) // Add logger here
        });
  },
  methods: {
    convertHtmlTobmp() {
      var targetDom = document.getElementById('tableData')
      html2canvas(targetDom, {
        backgroundColor: "transparent",
        allowTaint: true,
        useCORS: true 
      }).then((canvas)=>{
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        Canvas2Image.saveAsPNG(canvas, canvasWidth, canvasHeight, 'test')
      })
    },
    async recognize({ target: { files }  }) {
        const worker = this.worker
       await worker.load();
        await worker.loadLanguage('eng+chi_sim');
        await worker.initialize('eng+chi_sim');
        // await worker.setParameters({
        //     tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyz0123456789-+()\t='
        // });
        const { data: { text } } = await worker.recognize(files[0]);
        const board = document.getElementById('board');
        board.value = text;
        this.downloadDisabled = false;
    },
    async downloadPDF() {
        const worker = this.worker
        const filename = 'tesseract-ocr-result.pdf';
        const { data } = await worker.getPDF('Tesseract OCR Result', false);
        const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
        if (navigator.msSaveBlob) {
          // IE 10+
          navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>