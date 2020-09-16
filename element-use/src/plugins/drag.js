const Drag = {}
// 自定义插件
Drag.install = function(Vue) {
  // 自定义指令 v-drag
  Vue.directive('drag', {
    // 被绑定元素插入父节点时调用
    inserted: function(el) {
        var oDiv = el;//el就是指令绑定的元素
        oDiv.onmousedown = function(ev){
            var startX = ev.clientX - oDiv.offsetLeft;
            var startY = ev.clientY - oDiv.offsetTop;
            document.onmousemove = function(e){
                oDiv.style.left = (e.clientX - startX==0)? 0 : (e.clientX - startX) + 'px';
                oDiv.style.top = (e.clientY - startY==0)? 0: (e.clientY - startY) + 'px';
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null
            }
        }
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function(el) {
        var oDiv = el;//el就是指令绑定的元素
        oDiv.onmousedown = function(ev){
            var startX = ev.clientX - oDiv.offsetLeft;
            var startY = ev.clientY - oDiv.offsetTop;
            document.onmousemove = function(e){
                oDiv.style.left = (e.clientX - startX==0)? 0 : (e.clientX - startX) + 'px';
                oDiv.style.top = (e.clientY - startY==0)? 0: (e.clientY - startY) + 'px';
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null
            }
        }
    }
  })
}

export default Drag
