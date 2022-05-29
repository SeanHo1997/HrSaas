import request from '@/utils/request'

// 查询企业部门列表
export const departmentList = () => {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export const deleteDept = id => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

// 新增部门
export const addDept = data => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 根据ID查询部门详情
export const searchDeptById = id => {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

// 根据id修改部门
export const amendDept = data => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

