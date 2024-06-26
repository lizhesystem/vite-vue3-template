import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import NotFound from '@/views/ExceptionPage/NotFound.vue'

/** 常驻路由 除了 redirect/403/404/login 等隐藏页面，其它页面建议设置 Name 属性 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', hidden: true },
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'Dashboard',
        name: 'Dashboard',
        component: () => import(`@/views/Dashboard/index.vue`),
        meta: { title: '首页' },
      },
    ],
  },

  {
    path: '/404',
    component: NotFound,
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
