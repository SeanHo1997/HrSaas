<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="nameAndPassword" :model="basicInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="basicInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="basicInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { userBasicInfo, saveBasicInfo } from '@/api/user.js'
import UserInfo from './UserInfo.vue'
import JobInfo from './JobInfo.vue'

export default {
  name: 'Detail',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      basicInfo: {
        password2: ''
      },
      rules: {
        username: [
          { reuqired: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password2: [
          { reuqired: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployeeBasicInfo()
  },
  methods: {
    async getEmployeeBasicInfo() {
      this.basicInfo = await userBasicInfo(this.$route.params.id)
    },
    async update() {
      this.$refs.nameAndPassword.validate(async(valid) => {
        if (valid) {
          await saveBasicInfo({ ...this.basicInfo, password: this.basicInfo.password2 })
          this.getEmployeeBasicInfo()
          this.$message.success('更新成功')
        }
      })
    }
  }
}
</script>

<style>

</style>
