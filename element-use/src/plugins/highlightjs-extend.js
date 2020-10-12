import './highlightjs-line-numbers'
// const $ = require('jquery')

function addLineNumbers() {
  const el = document.querySelector('.md-body')
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    window.lineNumbersBlock(block,
      {
        singleLine: true,
        startFrom: 1
      })
  })
}

// function clickCodeLine() {
//   $(document).on('mouseover', '.hljs-ln tr', function() {
//     $(this).addClass('current-row')
//   })
//   $(document).on('mouseout', '.hljs-ln tr', function() {
//     $(this).removeClass('current-row')
//   })
// }

//
// HELPERS
//
function async(func) {
  window.setTimeout(func, 0)
}

function hoverLine() {
  async(function() {
    hoverCodeLineInternal()
  })
}

const HljsEvent = {}

function hoverCodeLineInternal() {
  const lines = document.querySelectorAll('.hljs-ln tr')
  lines.forEach((line) => {
    line.onmouseover = function() {
      document.onmouseover = function(event) {
        console.log(event)
        if (line.hasAttribute('class')) {
          const oldClass = line.getAttribute('class')
          if (oldClass.indexOf('current-row') === -1) {
            line.setAttribute('class', oldClass + ' current-row')
          }
        } else {
          line.setAttribute('class', 'current-row')
        }
      }
    }
    line.onmouseout = function() {
      document.onmouseout = function(event) {
        console.log(event)
        if (line.hasAttribute('class')) {
          const oldClass = line.getAttribute('class')
          const newClass = oldClass.replace(/current-row/g, '')
          line.setAttribute('class', newClass)
        }
      }
    }
  })
}
// 自定义插件
HljsEvent.install = function(Vue) {
  // 自定义指令 v-hljs-event
  Vue.directive('hljs-event', {
    // 被绑定元素插入父节点时调用
    inserted: hoverLine,
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: hoverLine
  })
}

export default {
  addLineNumbers,
  HljsEvent,
  hoverLine
}
