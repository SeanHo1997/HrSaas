<template>
  <el-dialog :before-close="closeDialog" title="角色分配" :visible.sync="showRoleDst" @closed="closeDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { assignRole } from '@/api/employees.js'
import { allRoles } from '@/api/setting.js'
import { userBasicInfo } from '@/api/user.js'

export default {
  name: 'RoleDst',
  props: {
    showRoleDst: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showDst: this.showRoleDst,
      roles: [],
      roleIds: []
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    closeDialog() {
      this.$emit('update:showRoleDst', false)
    },
    // 分配角色
    async assignRole() {
      await assignRole({
        id: this.userId,
        roleIds: this.roleIds
      }).then(() => {
        this.$message.success('分配角色成功')
        // 关闭弹层
        this.closeDialog()
      })
    },
    async getRoles() {
      const { rows } = await allRoles()
      this.roles = rows
    },
    async userBasicInfo(id) {
      const { roleIds } = await userBasicInfo(id)
      this.roleIds = roleIds
    }
  }
}
</script>

<style>

</style>
