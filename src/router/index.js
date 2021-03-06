import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/zip/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * ?????????????????????????????????????????????
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '????????????',
      icon: 'user',
      roles: ['1'] // ???????????????

    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/pages/user/User'),
        name: 'list',
        meta: { title: '????????????' }
      },
      {
        path: 'log',
        component: () => import('@/views/pages/user/UserLog'),
        name: 'log',
        meta: { title: '????????????' }
      },
      {
        path: 'role',
        component: () => import('@/views/pages/user/Role'),
        name: 'Role',
        meta: { title: '????????????' }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    name: 'System',
    meta: {
      title: '????????????',
      icon: 'example',
      roles: ['1'] // ???????????????

    },
    children: [
      {
        path: 'file',
        component: () => import('@/views/pages/system/File'),
        name: 'File',
        meta: { title: '????????????' }
      },
      {
        path: 'send',
        component: () => import('@/views/pages/system/Send'),
        name: 'email',
        meta: { title: '????????????' }
      }
    ]
  },
  {
    path: '/gzh',
    component: Layout,
    name: 'Gzh',
    meta: {
      title: '???????????????',
      icon: 'example',
      roles: ['1','5'] // ?????????????????? + ???????????????

    },
    children: [
      {
        path: 'city',
        component: () => import('@/views/pages/gzh/City'),
        name: 'City',
        meta: { title: '????????????' }
      },
      {
        path: 'notice',
        component: () => import('@/views/pages/gzh/Notice'),
        name: 'Notice',
        meta: { title: '????????????' }
      },
    ]
  },

  /** ????????? **/
  componentsRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
