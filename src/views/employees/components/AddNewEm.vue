<template>
  <el-dialog
    :visible.sync="showDialog"
    title="新增员工"
    width="40%"
    @closed="closeDialog"
  >
    <el-form
      ref="addForm"
      label-position="left"
      :model="addForm"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addForm.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="addForm.formOfEmployment"
          placeholder="请选择聘用形式"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="addForm.workNumber" />
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentName">
        <el-input v-model="addForm.departmentName" :readonly="true" placeholder="请选择所属部门" @focus="getDepartmentList" />
        <el-tree
          v-if="showTree"
          :data="depts"
          :props="{label: 'name'}"
          @node-click="nodeCLick"
        />
        <!-- <el-option v-for="(item, index) in depts" :key="index" :label="item.name" :value="item.name" /> -->
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="addForm.timeOfEntry" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="addForm.correctionTime" value-format="yyyy-MM-dd" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="confirmAdd">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addEmployee } from '@/api/employees.js'
import { departmentList } from '@/api/departments.js'
import { transDepartToTreeData } from '@/utils/index.js'

export default {
  name: 'AddNewEm',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      depts: [],
      addForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择聘用形式', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入部门', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '0',
          label: '非正式'
        },
        {
          value: '1',
          label: '正式'
        }
      ],
      showTree: false
    }
  },
  methods: {
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (valid) {
          await addEmployee(this.addForm).then(() => {
            this.$message.success('添加成功')
            // $parent
            this.$emit('cancel')
            this.$emit('refresh')
          })
        }
      })
    },
    async getDepartmentList() {
      this.showTree = true
      const { depts } = await departmentList()
      this.depts = transDepartToTreeData(depts, '')
    },
    closeDialog() {
      // 清空表单数据
      this.addForm = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 移除表单校验
      this.$refs.addForm.resetFields()
    },
    nodeCLick(p1, p2, p3) {
      this.addForm.departmentName = p1.name
      this.showTree = false
    }
  }
}
</script>

<style></style>
