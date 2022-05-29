import request from '@/utils/request'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

// 获取用户资料
export const userInfo = () => {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

// 获取用户详情
export const userBasicInfo = id => {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}

// 保存员工基本信息
export const saveBasicInfo = data => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

