import Vue from 'vue'

import i18n from './locales';
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
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import HljsExtend from './plugins/highlightjs-extend'
import '@/icons'
import joint from './plugins/joint'
import vgl from 'vue-golden-layout'
import 'golden-layout/src/css/goldenlayout-light-theme.css'

// if (process.env.NODE_ENV === 'dev') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
hljs.registerLanguage('jcl', require('./plugins/hl-jcl'));
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Highlight)
Vue.use(hljs.vuePlugin)
Vue.use(Drag)
Vue.use(DragAside)
Vue.use(MarkdownItVue)
Vue.use(HljsExtend.HljsEvent)
Vue.use(joint)
Vue.use(vgl);

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
