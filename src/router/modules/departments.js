import Layout from '@/layout'

export default {
  path: '/departments',
  name: 'departments', // 后期会用到这个name属性
  component: Layout,
  children: [
    // 二级路由
    { path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      // 路由元信息（存储数据的地方
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
