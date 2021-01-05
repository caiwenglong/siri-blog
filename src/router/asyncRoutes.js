import * as _ from 'lodash'
import pool from '@/share/constant/files/pool'
/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: pool.accessible.ROLE_ADMIN,
      t_title: 'route.home',
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('../views/home/home.vue')
  },
  {
    path: 'component',
    name: 'component',
    component: () => import('@/components/Layout/layout.vue'),
    meta: {
      roles: ['admin', 'test'],
      title: '组件说明',
      icon: 'apps',
      isOpen: false,
      isHidden: false
    },
    children: [
      {
        path: 'icon',
        name: 'icon',
        meta: {
          roles: ['admin', 'editor'],
          title: 'icon 集合',
          icon: 'api',
          keepAlive: false
        },
        component: () => import('@/views/components/icon')
      }
    ]
  },
  {
    path: 'article-writing',
    name: 'articleWriting',
    meta: {
      roles: ['admin', 'editor'],
      t_title: 'route.articleWriting',
      title: '文章写作',
      icon: 'edit_road',
      keepAlive: true,
      component: () => import('@/components/Layout/layout.vue')
    },
    component: () => import('@/views/articles/article-writing/index.vue')
  },
  {
    path: 'article-details/:artId',
    name: 'articleDetails',
    meta: {
      roles: ['admin', 'editor', 'test'],
      t_title: 'route.articleDetails',
      title: 'article',
      icon: 'description',
      isHidden: true,
      keepAlive: true
    },
    component: () => import('@/views/articles/article-details/index.vue')
  }
]

const notFound = {
  path: '*', // 此处需置于最底部
  redirect: '/NoFound404',
  meta: {
    roles: ['admin', 'test'],
    isHidden: true
  }
}

export function generateAsyncRouters(menus) {
  const generateRouters = []
  _.forEach(menus, menu => {
    if(menu.idParent === '0') {
      const route = {
        path: `/${menu.path}`,
        name: menu.id,
        url: menu.id,
        meta: {
          title: menu.name,
          icon: menu.icon,
          id: menu.id,
          idParent: '0',
          isOpen: false,
          roles: pool.accessible.ROLE_ADMIN,
          isHidden: false
        },
        component: () => import('@/views/articles/article-list/index.vue'),
        children: getChildrenRouters(menus, menu.id)
      }
      generateRouters.push(route)
    }
  })
  generateRouters.push(notFound)
  return generateRouters
}

function getChildrenRouters(menus, idParent) {
  const childrenRoutes = []
  const children = _.filter(menus, function(item) {
    if(item.idParent === idParent) {
      const route = {
        path: `${item.path}`,
        name: item.id,
        url: item.id,
        component: () => import('@/views/articles/article-list/index.vue'),
        meta: {
          title: item.name,
          icon: item.icon,
          id: item.id,
          isOpen: false,
          idParent: item.idParent,
          roles: pool.accessible.ROLE_ADMIN,
          isHidden: false
        },
        children: getChildrenRouters(menus, item.id)
      }
      childrenRoutes.push(route)
    }
    return item.idParent === idParent
  })
  if(children.length) {
    _.forEach(children, item => {
      getChildrenRouters(menus, item.id)
    })
  }
  return childrenRoutes
}

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('../views/index'),
    meta: {
      // index 应该是所有的用户都可以访问
      roles: pool.accessible.ROLE_ADMIN
    },
    children: asyncRoutesChildren
  }
]

export default asyncRoutes
