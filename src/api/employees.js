import request from '@/utils/request.js'

// 获取员工简单列表
export const SimpleEmployees = () => {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 获取员工列表
export const employees = params => {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

// 删除员工(接口文档中没有，视频里面有)
export const delEmployee = id => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 新增员工
export const addEmployee = data => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 批量导入员工
export const importEmployees = data => {
  return request({
    url: '/sys/user/batch',
    mehtod: 'POST'
  })
}

// 获取员工个人信息
export const employeePersonalInfo = id => {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}

// 获取员工岗位信息
export const employeeJobInfo = id => {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function savePersonalInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给员工分配角色
export const assignRole = data => {
  return request({
    url: `/sys/user/assignRoles`,
    method: 'PUT',
    data
  })
}
