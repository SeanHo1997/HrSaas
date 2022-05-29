import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees', // 后期会用到这个name属性
  component: Layout,
  children: [
    // 二级路由
    {
      path: '',
      component: () => import('@/views/employees'),
      name: 'employees',
      // 路由元信息（存储数据的地方
      meta: { title: '员工管理', icon: 'user' }
    },
    {
      path: '/detail/:id',
      hidden: true,
      component: () => import('@/views/employees/components/Detail.vue'),
      meta: { title: '员工详情' }
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/components/Print.vue'), // 按需加载
      hidden: true,
      meta: {
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }
  ]
}
