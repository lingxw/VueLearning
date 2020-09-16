import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// import Highlight from './plugins/highlight.js'
import Highlight from './plugins/hl.js'
import Drag from './plugins/drag'
import DragAside from './plugins/dragAside'

if (process.env.NODE_ENV === 'dev') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Highlight)
Vue.use(hljs.vuePlugin)
Vue.use(Drag)
Vue.use(DragAside)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
