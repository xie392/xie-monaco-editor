import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    name: 'dashboard',
    redirect: '/dashboard',
    children: [
      { // 首页
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard/index.vue'),
        meta: {
          keepAlive: false,
          title: '首页',
        }
      },
    ]
  },
  { // 登录
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      keepAlive: false,
      title: '登录',
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes
})

export default router
