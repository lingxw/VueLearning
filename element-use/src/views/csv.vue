<template>
  <div style="text-align: left;">
    <el-table
      id="tableData"
      ref="singleTable"
      :data="tableData"
      border
      highlight-current-row
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      height="200px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        type="index"
        width="30px"
      />
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
    <el-upload
      action=""
      accept=".csv"
      :on-change="onUploadChange"
      :auto-upload="false"
      :show-file-list="false"
      :file-list="fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      <el-button type="primary" @click="exportCsv()">下载</el-button>
    </el-upload>
    <input  type="file" id="files" ref="refFile" v-on:change="importCsv" />
  </div>
</template>

<script>
import Papa from 'papaparse'

export default {
  name: 'csv',
  components: {
  },
  data() {
    return {
      tableData: [['a','b'],['c','d']],
      tableTitle: [
        {
          label: 'word',
          prop: 0
        },
        {
          label: 'AND',
          prop: 1
        }
      ],
      multipleSelection: [],
      fileList: []
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
    * by wjw
    * 导出指令csv文件
    */
    exportCsv(){
      var csv = Papa.unparse(this.tableData)
      // 定义文件内容，类型必须为Blob 否则createObjectURL会报错
      let content = new Blob([csv])
      // 生成url对象
      let urlObject = window.URL || window.webkitURL || window
      let url = urlObject.createObjectURL(content)
      // 生成<a></a>DOM元素
      let el = document.createElement("a")
      // 链接赋值
      el.href = url
      el.download = "文件导出.cvs"
      // 必须点击否则不会下载
      el.click()
      // 移除链接释放资源
      urlObject.revokeObjectURL(url)
    },
	importCsv(){
      let selectedFile = null
      selectedFile = this.$refs.refFile.files[0]
      if (selectedFile === undefined){
        return
      }
      const csv = {}
      csv.tableData = this.tableData
      csv.tableTitle = this.tableTitle
      var reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = () => {
        // 检查编码
        // let encoding = this.checkEncoding(evt.target.result)
        // 将csv转换成二维数组
        Papa.parse(selectedFile, {
          encoding:"ANSI",
          complete: res => {
            // UTF8 \r\n与\n混用时有可能会出问题
            let data = res.data
            if (data[data.length - 1].length === 1 &&  data[data.length - 1][0] === '') {
              // 去除最后的空行
              data.pop()
            }
            csv.tableData.splice(0)
            data.forEach(function (item) {
              csv.tableData.push(item)
            })
            
            csv.tableTitle.splice(0)
            csv.tableTitle.push({
                label: 'word',
                prop: 0
              })
            csv.tableTitle.push(              {
                label: 'AND',
                prop: 1
              })
            for (var i = 2; i < csv.tableData[0].length; i++) {
              csv.tableTitle.push({
                  label: 'AND',
                  prop: i
              })
            }
            console.log(data) // data就是文件里面的数据
          }
        })
      }
    },
    submitUpload() {
      this.tableData = window.tableData
      this.tableTitle = [
        {
          label: 'word',
          prop: 0
        },
        {
          label: 'AND',
          prop: 1
        }
      ]
      for (var i = 2; i < this.tableData[0].length; i++) {
        this.tableTitle.push({
            label: 'AND',
            prop: i
        })
      }
      console.log("submit")
    },
    onUploadChange(file) {
      const isIMAGE = (file.raw.type === 'application/vnd.ms-excel')
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是csv!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return false
      }
    
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(){
        console.log(this.result) // 图片的base64数据
        // 检查编码
        // let encoding = this.checkEncoding(evt.target.result)
        // 将csv转换成二维数组
        Papa.parse(file.raw, {
          encoding:"ANSI",
          complete: res => {
            // UTF8 \r\n与\n混用时有可能会出问题
            let data = res.data
            if (data[data.length - 1].length === 1 &&  data[data.length - 1][0] === '') {
              // 去除最后的空行
              data.pop()
            }
            window.tableData = data
            console.log(data) // data就是文件里面的数据
          }
        })
      }
    }
  }
}
</script>
