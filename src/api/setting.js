import request from '@/utils/request.js'

// 获取所有的角色
export const allRoles = params => {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

// 根据id查询企业
export const companyById = id => {
  return request({
    url: `/company/${id}`,
    method: 'GET'
  })
}

// 根据id更新企业
export const updateCompanyById = (id, data) => {
  return request({
    url: `/company/${id}`,
    method: 'PUT',
    data
  })
}

// 根据id删除企业
export const deleteRoleById = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 根据id获取角色详情
export const getRoleDetailById = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

// 根据id更新角色
export const updateRoleById = (id, data) => {
  return request({
    url: `sys/role/${id}`,
    method: 'PUT',
    data
  })
}

// 新增角色
export const addRole = data => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

// 给角色分配权限
export const assignPermission = data => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

