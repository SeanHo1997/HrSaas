<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 选项卡1: 角色管理 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="roleManage">
          <!-- 按钮(新增角色) -->
          <el-row style="height: 50px">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogVisible=true">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table
            :data="roles"
            stripe
            :border="true"
          >
            <el-table-column
              label="序号"
              type="index"
            />
            <el-table-column
              label="角色名称"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button size="small" type="success" @click="openDialog(scope.row.id)">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(scope.row.id)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-row
            style="height: 50px; display: flex; justify-content: center; align-items: center"
          >
            <el-pagination
              small
              layout="prev, pager, next"
              :total="roleQuery.total"
              :page-size="roleQuery.pagesize"
              :current-page="roleQuery.page"
              @current-change="currentChange"
            />
          </el-row>
          <!-- 编辑/新增角色 对话框 -->
          <el-dialog
            :title="addOrUpdate"
            :visible.sync="dialogVisible"
            width="50%"
            :append-to-body="true"
            @close="cancel"
          >
            <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="80px">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="roleForm.name" />
              </el-form-item>
              <el-form-item label="角色描述" prop="description">
                <el-input v-model="roleForm.description" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="updateOrAddRole">确 定</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <!-- 选项卡2: 公司信息 -->
        <el-tab-pane label="公司信息" name="companyInfo">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row style="height: 50px">
              <el-alert
                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                type="info"
                show-icon
                :closable="false"
              />
            </el-row>
            <el-form-item label="公司名称">
              <el-input v-model="form.companyName" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="form.companyAdress" />
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="form.companyEmail" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" rows="3" />
            </el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="updateCompany">提交更新</el-button>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 分配权限 弹出层 -->
      <el-dialog
        title="分配权限"
        :visible.sync="showDialog"
        @close="closeDialog"
      >
        <!-- 树形结构权限点 -->
        <el-tree
          ref="permTree"
          :check-on-click-node="true"
          :default-expand-all="true"
          :data="permissionList"
          :props="{ label: 'name' }"
          :show-checkbox="true"
          :check-strictly="true"
          node-key="id"
          :default-checked-keys="assignPerData.permIds"
          @setCheckedNodes="setCheckedNodes(nodes)"
        />
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="assignPermission">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { allRoles, companyById, updateCompanyById, deleteRoleById, getRoleDetailById, updateRoleById, addRole, assignPermission } from '@/api/setting'
import { getPermissionList } from '@/api/permissiong.js'
import { transDepartToTreeData } from '@/utils/index.js'

export default {
  name: 'Setting',
  data() {
    const checkNameRepeat = (rule, value, callback) => {
      // 验证角色名是否重名
      // bug待解决: isrepeat一直是false
      const isRepeat = this.roles.some(item => {
        item.name === value
      })
      isRepeat ? callback(new Error('已存在目前的角色名')) : callback()
    }
    return {
      activeName: 'roleManage',
      roleQuery: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      roles: [],
      form: {
        companyName: '',
        companyAdress: '',
        companyEmail: '',
        remark: ''
      },
      companyInfo: null,
      dialogVisible: false,
      roleForm: {
        description: '',
        name: ''
      },
      roleRules: {
        name: [
          { required: true, message: '请填写角色名称', trigger: 'blur' },
          { validator: checkNameRepeat, message: '重名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写角色描述', trigger: 'blur' }
        ]
      },
      permissionList: [],
      showDialog: false,
      assignPerData: {
        id: '',
        permIds: []
      }
    }
  },
  computed: {
    addOrUpdate() {
      return this.roleForm.id ? '更新角色' : '新增角色'
    }
  },
  created() {
    this.getAllRoles()
  },
  methods: {
    handleClick() {
      if (this.activeName === 'companyInfo') {
        const companyId = this.$store.state.user.userInfo.companyId
        this.getCompanyById(companyId)
      }
    },
    async getAllRoles() {
      const { total, rows } = await allRoles(this.roleQuery)
      this.roleQuery.total = total
      this.roles = rows
    },
    currentChange(newPage) {
      this.roleQuery.page = newPage
      this.getAllRoles()
    },
    async getCompanyById(id) {
      const { name, companyAddress, mailbox, remarks } = await companyById(id)
      this.form.companyName = name
      this.form.companyAdress = companyAddress
      this.form.companyEmail = mailbox
      this.form.remark = remarks
    },
    updateCompany() {
      const companyId = this.$store.state.user.userInfo.companyId
      this.$confirm('确定更新企业信息吗?').then(async() => {
        await updateCompanyById(companyId, this.form).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.handleClick()
        })
      })
    },
    async deleteRole(scoperow) {
      this.$confirm('确认删除角色吗?').then(async() => {
        await deleteRoleById(scoperow)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getAllRoles()
      })
    },
    async editRole(scoperow) {
      const res = await getRoleDetailById(scoperow)
      this.roleForm = res
      this.dialogVisible = true
    },
    updateOrAddRole() {
      // 角色板块表单校验
      this.$refs.roleForm.validate(async(valid) => {
        if (valid) {
          if (this.roleForm.id) {
            // 如果表单中的id有值的话，调用更新角色接口
            await updateRoleById(this.roleForm.id, this.roleForm)
          } else {
            // 表单中没有id， 调用新增角色接口
            await addRole(this.roleForm)
          }
          this.getAllRoles()
          this.dialogVisible = false
          this.$message.success('更新成功')
          this.roleForm = {
            name: '',
            description: ''
          }
        } else {
          return false
        }
      })
    },
    cancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.dialogVisible = false
    },
    async getPermissionList() {
      this.permissionList = transDepartToTreeData(await getPermissionList(), '0')
    },
    closeDialog() {
      this.showDialog = false
    },
    async assignPermission() {
      this.assignPerData.permIds = this.$refs.permTree.getCheckedKeys()
      await assignPermission(this.assignPerData).then(() => {
        this.showDialog = false
        this.$message.success('分配成功')
      })
    },
    async openDialog(id) {
      // 得到当前行角色的权限数据
      this.assignPerData.id = id
      const { permIds } = await getRoleDetailById(id)
      this.assignPerData.permIds = permIds
      this.getPermissionList()
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
