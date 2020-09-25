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
    path: '/dragView',
    name: 'Drag View',
    component: () => import('../views/dragView.vue')
  },
  {
    path: '/dragDiv',
    name: 'Drag Div',
    component: () => import('../views/dragDiv.vue')
  },
  {
    path: '/dragView2',
    name: 'Drag View2',
    component: () => import('../views/dragView2.vue')
  },
  {
    path: '/dragView3',
    name: 'Drag View3',
    component: () => import('../views/dragView3.vue')
  },
  {
    path: '/csv',
    name: 'csv',
    component: () => import('../views/csv.vue')
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
