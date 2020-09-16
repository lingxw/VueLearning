const DragAside = {}

// 自定义插件
DragAside.install = function(Vue) {
  // 自定义指令 v-drag
  Vue.directive('drag-aside', {
    // 被绑定元素插入父节点时调用
    inserted: function(el) {
        const box = el
        const oAside = box.querySelectorAll('aside')[0]
        const left = document.createElement('div')
        const resize = document.createElement('div')
        const oChildNodes = oAside.childNodes
        box.setAttribute('class', 'drag-aside-box')
        left.setAttribute('class', 'drag-aside-left')
        resize.setAttribute('class', 'drag-aside-resize')
        oAside.setAttribute('width', 'auto')
        oAside.removeAttribute('style') 
        var nextChild = null
        for (var i=oChildNodes.length - 1; i >= 0 ; i--) {
            var currentChild = oChildNodes[i]
            if (!nextChild) {
                left.appendChild(currentChild) 
            } else {
                left.insertBefore(currentChild, nextChild)
            }
            nextChild = currentChild
        }
        oAside.appendChild(left)
        oAside.appendChild(resize)
        resize.onmousedown = function (e) {
            let startX = e.clientX
            resize.left = resize.offsetLeft
            document.onmousemove = function (e) {
              let endX = e.clientX
              let moveLen = resize.left + (endX - startX)
              if (moveLen / box.clientWidth < 0.2) moveLen = box.clientWidth * 0.2
              if (moveLen / box.clientWidth > 0.8) moveLen = box.clientWidth * 0.8
              resize.style.left = moveLen
              left.style.width = moveLen + 'px'
            }
            document.onmouseup = function () {
              document.onmousemove = null
              document.onmouseup = null
              resize.releaseCapture && resize.releaseCapture()
            }
            resize.setCapture && resize.setCapture()
            return false
          }
    }
  })
}

export default DragAside
