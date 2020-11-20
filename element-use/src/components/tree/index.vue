<template>
  <div>
    <el-tree
    id="export-content"
    :props="props"
    :load="loadNode"
    lazy
    >
        <span class="icon-tree-node" slot-scope="{ node }">
            <i v-if="node.data.role.icon.substring(0,3) === 'el-'" :class="node.data.role.icon"/>
            <svg-icon v-else :icon-class="node.data.role.icon" class="color-main" />
            {{ node.data.name }}
        </span>   
    </el-tree>
    <svg id="svg-export"
      t="1542852993843"
      class="icon"
      style=""
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2043"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="54"
      height="54">
      <path d="M825.6 554.666667c-64 0-121.6-38.4-155.733333-89.6C633.6 516.266667 576 554.666667 512 554.666667s-121.6-38.4-155.733333-89.6C320 516.266667 264.533333 554.666667 198.4 554.666667 89.6 554.666667 0 465.066667 0 356.266667v-8.533334L151.466667 0h721.066666L1024 345.6v8.533333c0 110.933333-89.6 200.533333-198.4 200.533334z m-200.533333-219.733334h85.333333c0 61.866667 51.2 134.4 113.066667 134.4 59.733333 0 108.8-46.933333 113.066666-104.533333L817.066667 85.333333H206.933333L85.333333 364.8c4.266667 57.6 53.333333 104.533333 113.066667 104.533333 64 0 113.066667-74.666667 113.066667-134.4h85.333333c0 61.866667 51.2 134.4 113.066667 134.4 66.133333 0 115.2-74.666667 115.2-134.4zM810.666667 1021.866667H213.333333c-83.2 0-149.333333-64-149.333333-142.933334V595.2h85.333333v283.733333c0 32 27.733333 57.6 64 57.6h597.333334c34.133333 0 64-25.6 64-57.6V595.2h85.333333v283.733333c0 78.933333-66.133333 142.933333-149.333333 142.933334z" p-id="2044" />
      </svg>
    <el-button size="small" type="primary" @click="exportByMsExcel">exportByMsExcel</el-button>
    <el-button size="small" type="primary" @click="convertSvgToPng">svgToPng</el-button>
  </div>
</template>

<script>
  import { fetchListByRole }  from '../../api/user'
  import { saveAs } from 'file-saver'
  // const convert = require('../../plugins/saveSvgAsPng')
  const convert = require('save-svg-as-png')
  export default {
    data() {
      return {
        roles: [
            {
                id:0,
                name:'Root',
                icon:'el-icon-s-home'
            },
            {
                id:1,
                name:'Admin',
                icon:'el-icon-user'
            },
            {
                id:2,
                name:'Vip',
                icon:'el-icon-s-custom'
            },
            {
                id:3,
                name:'User',
                icon:'people'
            }
        ],
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        },
        //nodeChilds:[],
        count: 1
      };
    },
    methods: {
      convertSvgToPng() {
        convert.saveSvgAsPng(document.getElementById('svg-export'), "sprite.png")
      },
      exportByMsExcel() {
        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        const head = document.head
        let headStyle = head.innerHTML
        var printStr = '<html><head><meta charset=\'utf-8\' />' + headStyle + '<style>code { page-break-after:always }</style></head><body>'
        var html2 = printStr + document.getElementById('export-content').outerHTML + "</body></html>";
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob2 = new Blob([html2], {
            type: "application/vnd.ms-excel"
        });
        saveAs(blob2, 'sheetjs.xls');
      },
      loadNode(node, resolve) {
        if (node.level === 0) 
            return resolve([{
                name:'Root',
                role:this.roles[0],
                summary:''
            }]);
        if (node.level > 2) 
            return resolve([]);
        setTimeout(() => {
            var data;
            if(node.data.role.id === 0) {
                data = [
                    {
                        name:'Admin',
                        role:this.roles[1],
                        summary:'管理员'
                    }, 
                    {
                        name:'Vip',
                        role:this.roles[2],
                        summary:'Vip用户'
                    },
                    {
                        name:'User',
                        role:this.roles[3],
                        summary:'普通用户'
                    }
                ];
            } else if(node.data.role.id === 2 
                    || node.data.role.id === 3) {
                fetchListByRole(node.data.role.id).then(response => {
                    let code = response.data.code;
                    if (code == 20000) {
                        this.nodeChilds = response.data.nodeChilds;
                    } else {
                        this.nodeChilds = [];
                    }
                     console.log("1:" + this.nodeChilds);
                });
                console.log("2:" + this.nodeChilds);
                data = this.nodeChilds;
                if(!data) {
                   data = [];
                }
            } else {
                data = [];
            }
            console.log("3:" + this.nodeChilds);
            resolve(data);
        }, 200);
      }
    }
  };
</script>