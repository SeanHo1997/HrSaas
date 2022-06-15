<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <PageTool>
        <template slot="before">
          <el-alert
            type="success"
            :closable="false"
            show-icon
          >
            一共{{ total }}条数据
          </el-alert>
        </template>
        <template slot="after">
          <el-button size="small" type="defualt">导入Excel</el-button>
          <el-button size="small" type="default">导出Excel</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="showDialog=true" :disabled="!checkPermission('POINT-USER-ADD')">增加新员工</el-button>
          <!-- 添加新员工的 对话框 -->
          <AddNewEm
            :show-dialog="showDialog"
            @cancel="showDialog=false"
            @refresh="getEmployees"
          />
        </template>
      </PageTool>
      <!-- 表格 -->
      <el-card>
        <el-table :data="rows">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像">
            <template v-slot="{ row }">
              <img
                v-imageerror="require('@/assets/404_images/404.png')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatHireType" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="formOfEmployment">
            <el-switch
              v-model="switchValue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </el-table-column>
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button size="mini" @click="$router.push(`/detail/${scope.row.id}`)" :disabled="!checkPermission('POINT-USER-UPDATE')">查看</el-button>
              <el-button size="mini">转正</el-button>
              <el-button size="mini">调岗</el-button>
              <el-button size="mini" @click="assignRole(scope.row.id)">角色</el-button>
              <el-button size="mini" @click.native="delEmployee(scope.row.id)" :disabled="!checkPermission('POINT-USER-DELETE')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :page-size="params.size" :current-page="params.page" :total="total" @current-change="pageChanged" />
        </el-row>
        <!-- 弹出层 -->
        <RoleDst
          ref="RoleDst"
          :show-role-dst.sync="showRoleDst"
          :user-id="userId"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { employees, delEmployee } from '@/api/employees.js'
import AddNewEm from '@/views/employees/components/AddNewEm.vue'
import RoleDst from '@/views/employees/components/RoleDst.vue'

export default {
  name: 'EmployeesManage',
  components: {
    AddNewEm,
    RoleDst
  },
  data() {
    return {
      rows: [],
      total: 0,
      params: {
        page: 1,
        size: 10
      },
      // 由于接口没有返回enableState(账户状态)这个数据，所以自定义了此数据
      switchValue: true,
      showDialog: false,
      showRoleDst: false,
      userId: ''
    }
  },
  created() {
    this.getEmployees()
  },
  methods: {
    async getEmployees() {
      const { total, rows } = await employees(this.params)
      this.total = total
      this.rows = rows
    },
    pageChanged(newPage) {
      this.params.page = newPage
      this.getEmployees()
    },
    formatHireType(row, column, cellValue, index) {
      if (cellValue === 1) {
        return '正式'
      } else return '非正式'
    },
    delEmployee(workNumber) {
      this.$confirm('是否确认删除此员工?').then(async() => {
        await delEmployee(workNumber).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getEmployees()
        })
      })
    },
    async assignRole(id) {
      this.userId = id
      await this.$refs.RoleDst.userBasicInfo(id) // 解决异步props传值
      this.showRoleDst = true
    }
  }
}
</script>

<style>

</style>
