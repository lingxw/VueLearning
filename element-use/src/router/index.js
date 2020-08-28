import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/tree',
    name: 'Icon Tree',
    //component: () => import('../views/About.vue')
    component: () => import('../components/tree')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
