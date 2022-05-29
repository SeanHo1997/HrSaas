<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>{{ data.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="space-around" align="middle">
        <el-col>{{ data.manager }}</el-col>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <span>操作</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isShowSecond" command="edit">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isShowThird" command="delete">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDept } from '@/api/departments.js'

export default {
  name: 'Item',
  props: {
    isShowSecond: {
      type: Boolean,
      default: true
    },
    isShowThird: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 下拉菜单项的事件触发函数
    async handleCommand(command) {
      if (command === 'add') {
        this.$emit('add', this.data, 'add')
      } else if (command === 'edit') {
        this.$emit('edit', this.data, 'edit')
      } else if (command === 'delete') {
        this.$confirm('确认删除部门吗?').then(() => {
          return deleteDept(this.data.id)
        }).then(() => {
          this.$emit('deleted')
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      }
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  width: 100%;
}
</style>
