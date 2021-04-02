import * as _ from 'lodash'
import pool from '@/share/constant/files/pool'
import gather from '@/share/constant/files/gather'
import i18n from '@/i18n'
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
      isShowMenuContext: true,
      keepAlive: true
    },
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/component',
    name: 'component',
    component: () => import('@/components/Layout/layout.vue'),
    meta: {
      roles: pool.accessible.ROLE_ADMIN,
      title: '图标集合',
      icon: 'apps',
      isOpen: false,
      isShowMenuContext: false,
      isHidden: false
    },
    children: [
      {
        path: 'icon',
        name: 'icon',
        meta: {
          roles: pool.accessible.ROLE_ADMIN,
          title: 'icon 集合',
          icon: 'api',
          isShowMenuContext: false,
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "group-icon" */ '@/views/components/icon')
      }
    ]
  },
  {
    path: '/article-writing',
    name: 'articleWriting',
    meta: {
      roles: pool.accessible.ROLE_ADMIN,
      t_title: 'route.articleWriting',
      title: '文章写作',
      icon: 'history_edu',
      isShowMenuContext: false,
      keepAlive: true,
      component: () => import('@/components/Layout/layout.vue')
    },
    component: () => import('@/views/articles/article-writing/index.vue')
  },
  {
    path: '/article-details/:artId',
    name: 'articleDetails',
    meta: {
      roles: pool.accessible.ROLE_ADMIN,
      t_title: 'route.articleDetails',
      title: i18n.t('route.article'),
      icon: 'description',
      isShowMenuContext: false,
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
    roles: pool.accessible.ROLE_ADMIN,
    isHidden: true
  }
}

const aboutMe = {
  path: '/about',
  name: 'about',
  meta: {
    roles: ['admin'],
    t_title: 'route.aboutMe',
    title: '个人简介',
    icon: 'history_edu',
    isShowMenuContext: false,
    keepAlive: true
  },
  component: () => import('@/views/about/index.vue')
}

export function generateAsyncRouters(menus) {
  const generateRouters = []
  if(menus.length) {
    _.forEach(menus, menu => {
      if(menu.idParent === gather.TOP_LEVEL_MENU_ID) {
        const route = {
          path: `/${menu.path}`,
          name: menu.name,
          url: menu.id,
          meta: {
            title: menu.name,
            icon: menu.icon,
            id: menu.id,
            isOpen: false,
            isShowMenuContext: true,
            idParent: gather.TOP_LEVEL_MENU_ID,
            isParent: menu.isParent,
            roles: pool.accessible.ROLE_ADMIN,
            isHidden: false
          },
          component: () => import('@/views/articles/article-list/index.vue'),
          children: getChildrenRouters(menus, menu.id)
        }
        generateRouters.push(route)
      }
    })
  }
  generateRouters.push(aboutMe)
  generateRouters.push(notFound)
  return generateRouters
}

function getChildrenRouters(menus, idParent) {
  const childrenRoutes = []
  const children = _.filter(menus, function(item) {
    if(item.idParent === idParent) {
      const route = {
        path: `${item.path}`,
        name: item.name,
        url: item.id,
        component: () => import('@/views/articles/article-list/index.vue'),
        meta: {
          title: item.name,
          icon: item.icon,
          id: item.id,
          isOpen: false,
          isShowMenuContext: true,
          idParent: item.idParent,
          isParent: item.isParent,
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
