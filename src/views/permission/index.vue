<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部 -->
      <PageTool>
        <el-button slot="after" @click="addPermission(1, 0)">添加权限</el-button>
      </PageTool>
      <!-- 底部表格 -->
      <el-table :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="权限标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" size="small" @click="addPermission(2, row.id)">添加</el-button>
            <el-button size="small" @click="editPermission(row)">编辑</el-button>
            <el-button size="small" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加权限Dialog -->
      <el-dialog
        v-if="showDialog"
        :title="form.id ? '编辑权限': '添加权限'"
        :visible.sync="showDialog"
        @close="closeDialog"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="form.code" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="是否可见" prop="enVisible">
            <el-switch
              v-model="form.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-col>
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="confirmAddPermission">确定</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, updatePermission } from '@/api/permissiong.js'
import { transDepartToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      showDialog: false,
      form: {
        enVisible: '1',
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transDepartToTreeData(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确认删除吗?').then(async() => {
        await delPermission(id).then(() => {
          this.getPermissionList()
          this.$message.success('已删除')
        })
      })
    },
    async addPermission(type, pid) {
      // 访问权的type=1，按钮操作权的type=2
      this.form.type = type
      this.form.pid = pid
      this.showDialog = true
    },
    async confirmAddPermission() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            // 如果form中有id证明是 编辑权限
            await updatePermission(this.form).then(() => {
              this.showDialog = false
              this.getPermissionList()
              this.$message.success('编辑权限成功')
            })
          } else {
            await addPermission(this.form).then(() => {
              this.showDialog = false
              this.getPermissionList()
              this.$message.success('添加权限成功')
            })
          }
        }
      })
    },
    editPermission(row) {
      this.form = row
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.$refs.form.resetFields()
      this.form = {}
    }
  }
}
</script>

<style>

</style>

