/**
 * 公共路由
 */
const constantRoutes = [
  {
    path: '/logon',
    name: 'logon',
    meta: {
      title: '登录'
    },
    component: () => import('../views/logon/logon.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/NoFound404',
    name: 'NoFound404',
    meta: {
      roles: ['admin', 'users'],
      title: '404',
      icon: 'sentiment_dissatisfied',
      isHidden: true
    },
    component: () => import('../components/404/NoFound404')
  }
]

export default constantRoutes
