import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/tree',
    name: 'Icon Tree',
    component: () => import('../components/tree'),
    meta: {
      title: 'Tree',
      icon: 'Tree.ico'
    }
  },
  {
    path: '/code1',
    name: 'Code View1',
    component: () => import('../views/codeView1.vue'),
    meta: {
      title: 'Code View'
    }
  },
  {
    path: '/code2',
    name: 'Code View2',
    component: () => import('../views/codeView2.vue'),
    meta: {
      title: 'Code View'
    }
  },
  {
    path: '/code3',
    name: 'Code View3',
    component: () => import('../views/codeView3.vue'),
    meta: {
      title: 'Code View'
    }
  },
  {
    path: '/dragView',
    name: 'Drag View',
    component: () => import('../views/dragView.vue'),
    meta: {
      title: 'Drag View'
    }
  },
  {
    path: '/dragDiv',
    name: 'Drag Div',
    component: () => import('../views/dragDiv.vue'),
    meta: {
      title: 'Drag Div'
    }
  },
  {
    path: '/dragView2',
    name: 'Drag View2',
    component: () => import('../views/dragView2.vue'),
    meta: {
      title: 'Drag View'
    }
  },
  {
    path: '/dragView3',
    name: 'Drag View3',
    component: () => import('../views/dragView3.vue'),
    meta: {
      title: 'Drag View'
    }
  },
  {
    path: '/csv',
    name: 'csv',
    component: () => import('../views/csv.vue'),
    meta: {
      title: 'Csv'
    }
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('../views/print.vue'),
    meta: {
      title: 'print'
    }
  },
  {
    path: '/ocrView',
    name: 'ocrView',
    component: () => import('../views/ocrView.vue'),
    meta: {
      title: 'ocrView'
    }
  },
  {
    path: '/graphView',
    name: 'graphView',
    component: () => import('../views/graph.vue'),
    // component: () => import('../components/diagram6/index.vue'),
    meta: {
      title: 'graph'
    }
  },
  {
    path: '/g6',
    name: 'g6',
    component: () => import('../views/graphG6.vue'),
    meta: {
      title: 'graph'
    }
  },
  {
    path: '/i18n',
    name: 'i18n',
    component: () => import('../views/i18nView.vue'),
    meta: {
      title: 'i18n'
    }
  },
  {
    path: '/propertiesView',
    name: 'propertiesView',
    component: () => import('../views/propertiesView.vue'),
    meta: {
      title: 'propertiesView'
    }
  },
  {
    path: '/hbs',
    name: 'hbs',
    component: () => import('../views/hbsView.vue'),
    meta: {
      title: 'hbsView'
    }
  },
  {
    path: '/glv',
    name: 'glv',
    component: () => import('../views/goldenLayoutView.vue'),
    meta: {
      title: 'GoldenLayoutView'
    }
  },
  {
    path: '/glv2',
    name: 'glv2',
    component: () => import('../views/goldenLayoutView2.vue'),
    meta: {
      title: 'GoldenLayoutView2'
    }
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    const icon = document.getElementById('titleIcon')
    if (icon) {
      if (to.meta.icon) {
        icon.href = '/' + to.meta.icon
      } else {
        icon.href = '/favicon.ico'
      }
    }
  }
  next();
})

export default router
