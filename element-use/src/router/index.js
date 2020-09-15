import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/tree',
    name: 'Icon Tree',
    component: () => import('../components/tree')
  },
  {
    path: '/code1',
    name: 'Code View1',
    component: () => import('../views/codeView1.vue')
  },
  {
    path: '/code2',
    name: 'Code View2',
    component: () => import('../views/codeView2.vue')
  },
  {
    path: '/dragWindow',
    name: 'Drag Window',
    component: () => import('../views/dragWindow.vue')
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
