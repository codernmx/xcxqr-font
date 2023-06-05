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
    path: '/resume',
    component: () => import('@/views/pages/resume/index'),
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
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['1', '2'] // 超级管理员

    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/pages/user/User'),
        name: 'list',
        meta: { title: '用户管理', roles: ['1'] }
      },
      {
        path: 'invite',
        component: () => import('@/views/pages/user/Invite'),
        name: 'invite',
        meta: { title: '邀请列表', roles: ['1', '2'] }
      },
      {
        path: 'log',
        component: () => import('@/views/pages/user/UserLog'),
        name: 'log',
        meta: { title: '用户日志', roles: ['1', '2'] }
      },
      {
        path: 'role',
        component: () => import('@/views/pages/user/Role'),
        name: 'Role',
        meta: { title: '角色管理', roles: ['1'] }
      },
      {
        path: 'university',
        component: () => import('@/views/pages/user/University'),
        name: 'University',
        meta: { title: '收集管理', roles: ['1'] }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'example',
      roles: ['1'] // 超级管理员

    },
    children: [
      {
        path: 'file',
        component: () => import('@/views/pages/system/File'),
        name: 'File',
        meta: { title: '附件管理' }
      },
      {
        path: 'send',
        component: () => import('@/views/pages/system/Send'),
        name: 'email',
        meta: { title: '发送邮件' }
      }
    ]
  },
  // {
  //   path: '/gzh',
  //   component: Layout,
  //   name: 'Gzh',
  //   meta: {
  //     title: '公众号管理',
  //     icon: 'example',
  //     roles: ['1', '5'] // 公众号管理员 + 超级管理员

  //   },
  //   children: [
  //     {
  //       path: 'city',
  //       component: () => import('@/views/pages/gzh/City'),
  //       name: 'City',
  //       meta: { title: '城市管理' }
  //     },
  //     {
  //       path: 'notice',
  //       component: () => import('@/views/pages/gzh/Notice'),
  //       name: 'Notice',
  //       meta: { title: '发送通知' }
  //     }
  //   ]
  // },

  /** 模块化 **/
  // componentsRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
