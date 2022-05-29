<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @closed="closeDialog"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" placeholder="请选择部门负责人" @focus="getSimpleEmployees">
          <el-option v-for="(item, index) in people" :key="index" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" :rows="3" maxlength="30" show-word-limit placeholder="请输入部门介绍" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDept, departmentList, amendDept } from '@/api/departments'
import { SimpleEmployees } from '@/api/employees.js'

export default {
  name: 'Dialog',
  props: {
    node: {
      type: Object,
      default: null
    },
    dialogVisible: {
      type: Boolean,
      defualt: false
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, cb) => {
      // 连续筛选=》 目的：找出与当前value同名的同级部门
      const { depts } = await departmentList()
      const isRepeat = depts.filter(item => item.pid === this.node.id).some(item => item.name === value)
      // 如果有同名
      if (isRepeat) {
        cb(new Error(`已存在当前部门`))
      } else {
        cb()
      }
    }
    const checkCodeRepeat = async(rule, value, cb) => {
      const { depts } = await departmentList()
      let isRepeat = false
      // 根据不同的业务操作区分不同的校验规则
      if (this.form.id) {
        // 如果是编辑操作
        isRepeat = depts.filter(item => item.pid === this.form.pid && item.id !== this.form.id).some(item => item.code === value)
        return
      } else {
        // 不然就是新增操作
        isRepeat = depts.some(item => item.code === value)
      }
      if (isRepeat) {
        cb(new Error(`编码已存在`))
      } else {
        cb()
      }
    }
    return {
      form: {
        name: this.node.name,
        code: this.node.code,
        manager: this.node.manager,
        introduce: this.node.introduce,
        pid: this.node.pid,
        id: this.node.id
      },
      people: {},
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 10, message: '3-10个字以内', trigger: 'blur' },
          // 自定义规则: 同级部门不能重名
          { validator: checkNameRepeat, message: '同级部门不可同名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 5, max: 10, message: '5-10个字以内', trigger: 'blur' },
          // 自定义规则: 部门编码定义时不能与之前已经定义的部门编码重复
          { validator: checkCodeRepeat, message: '编码已存在', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 5, max: 30, message: '部门介绍在5-30个字以内', trigger: 'blur' }
        ]
      },
      depts: {}
    }
  },
  computed: {
    title() {
      return this.form.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
    },
    closeDialog() {
      this.form = {}
      // this.node = null
    },
    async addDept() {
      // !!!!!
      await addDept(this.form).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
      // 最后发送信号给父组件，关闭dialog
      this.$emit('confirm')
    },
    async amendDept() {
      await amendDept(this.form).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
      // 最后发送信号给父组件，关闭dialog
      this.$emit('confirm')
    },
    async getSimpleEmployees() {
      await SimpleEmployees().then(res => {
        this.people = res
      })
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid && this.node.type === 'add') {
          this.addDept()
          // 验证通过
        } else if (valid && this.node.type === 'edit') {
          this.amendDept()
        } else {
          // 验证不通过
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
