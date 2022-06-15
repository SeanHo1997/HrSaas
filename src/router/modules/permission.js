import Layout from '@/layout'

export default {
  path: '/permissions',
  name: 'permissions', // 后期会用到这个name属性
  component: Layout,
  children: [
    // 二级路由
    { path: '',
      component: () => import('@/views/permission'),
      name: 'permissions',
      // 路由元信息（存储数据的地方
      meta: { title: '角色管理', icon: 'example' }
    }
  ]
}
