import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

let Highlight = {}

Highlight.install = (Vue) => {
  window.hljs = hljs
  require('highlightjs-line-numbers.js')

  Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
        hljs.lineNumbersBlock(block,
          { 
           singleLine:true,
           startFrom: 1
          })
    })
  })
}

export default Highlight