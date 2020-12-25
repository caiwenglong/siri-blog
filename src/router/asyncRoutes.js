import * as _ from 'lodash'
/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      t_title: 'route.home',
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      roles: ['admin', 'editor', 'test'],
      t_title: 'route.article',
      title: 'article',
      icon: 'blur_linear'
    },
    component: () => import('@/components/Layout/layout.vue'),
    children: [
      {
        path: 'article-writing',
        meta: {
          roles: ['admin', 'editor'],
          t_title: 'route.articleWriting',
          title: 'article',
          icon: 'edit_road',
          keepAlive: true,
          component: () => import('@/components/Layout/layout.vue')
        },
        component: () => import('@/views/articles/article-writing/index.vue')
      },
      {
        path: 'article-list',
        meta: {
          roles: ['admin', 'editor', 'test'],
          t_title: 'route.articleList',
          title: 'article',
          icon: 'description',
          keepAlive: true
        },
        component: () => import('@/views/articles/article-list/index.vue')
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
  }
]

export function generateAsyncRouters(menus) {
  const generateRouters = []
  _.forEach(menus, menu => {
    if(menu.parentId === '0') {
      const route = {
        path: `/${menu.path}`,
        name: menu.id,
        url: menu.id,
        meta: {
          title: menu.name,
          icon: menu.icon,
          id: menu.id,
          roles: ['admin', 'editor', 'test'],
          isHidden: false
        },
        component: () => import('@/components/Layout/layout.vue'),
        children: getChildrenRouters(menus, menu.id)
      }
      generateRouters.push(route)
    }
  })
  return generateRouters
}

function getChildrenRouters(menus, parentId) {
  const childrenRoutes = []
  const children = _.filter(menus, function(item) {
    if(item.parentId === parentId) {
      const route = {
        path: `${item.path}`,
        name: item.id,
        url: item.id,
        component: () => import('@/views/articles/article-list/index.vue'),
        props: { categoryId: item.id },
        meta: {
          title: item.name,
          icon: item.icon,
          id: item.id,
          roles: ['admin', 'editor', 'test'],
          isHidden: false
        },
        children: getChildrenRouters(menus, item.id)
      }
      childrenRoutes.push(route)
    }
    return item.parentId === parentId
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
      roles: ['admin', 'editor', 'test']
    },
    children: asyncRoutesChildren
  }
]

export default asyncRoutes
