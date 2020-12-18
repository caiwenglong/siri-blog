
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
      roles: ['admin', 'test'],
      t_title: 'route.article',
      title: 'article',
      icon: 'description'
    },
    component: () => import('@/components/Layout/layout.vue'),
    children: [
      {
        path: 'article-writing',
        meta: {
          roles: ['admin', 'test'],
          t_title: 'route.article',
          title: 'article',
          icon: 'history_edu',
          keepAlive: true
        },
        component: () => import('@/views/articles/article-writing/index.vue')
      }
    ]
  },
  {
    path: '*', // 此处需置于最底部
    redirect: '/NoFound404',
    meta: {
      roles: ['admin', 'test'],
      isHidden: true
    }
  }
]

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
