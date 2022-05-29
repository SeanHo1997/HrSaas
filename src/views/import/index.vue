<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployees } from '@/api/employees.js'

export default {
  name: 'Import',
  data() {
    return this.$route.query.type
  },
  methods: {
    async  success({ header, results }) {
      // 如果是导入员工
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      await importEmployees(arr) // 调用导入接口
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
