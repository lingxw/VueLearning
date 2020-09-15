// src/utils/highlight.js 文件路径，纯属自定义

// highlight.js  代码高亮指令
import Hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css' // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件

let Highlight = {}
// 自定义插件
Highlight.install = function (Vue) {
  window.hljs = Hljs
  require('highlightjs-line-numbers.js')
  // 自定义指令 v-highlight
  Vue.directive('highlight', {
    // 被绑定元素插入父节点时调用
    inserted: function(el) {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightBlock(blocks[i])
        Hljs.lineNumbersBlock(blocks[i],
            { 
             singleLine:true,
             startFrom: 1
            })
      }
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function(el) {
        let blocks = el.querySelectorAll('pre code')
        for (let i = 0; i < blocks.length; i++) {
          Hljs.highlightBlock(blocks[i])
          Hljs.lineNumbersBlock(blocks[i],
            { 
             singleLine:true,
             startFrom: 1
            })
        }
      }
  })
};

export default Highlight;