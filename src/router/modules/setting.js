import Layout from '@/layout'

export default {
  path: '/settings',
  name: 'settings', // 后期会用到这个name属性
  component: Layout,
  children: [
    // 二级路由
    { path: '',
      component: () => import('@/views/setting'),
      name: 'settings',
      // 路由元信息（存储数据的地方
      meta: { title: '角色/岗位管理', icon: 'setting' }
    }
  ]
}
