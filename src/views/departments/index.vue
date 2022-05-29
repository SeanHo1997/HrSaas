<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 头部 -->
        <Item
          :is-show-sec="false"
          :is-show-third="false"
          :data="head"
          @add="add"
          @edit="edit"
        />
        <!-- 分割线 -->
        <el-divider />
        <!-- tree组件 -->
        <el-tree
          :data="departmentList"
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
        >
          <Item
            slot-scope="{ data }"
            :data="data"
            @deleted="getDepartmentList"
            @add="add"
            @edit="edit"
          />
        </el-tree>
        <!-- 弹出层 -->
        <Dialog
          v-if="dialogVisible"
          :dialog-visible.sync="dialogVisible"
          :node.sync="node"
          @cancel="dialogVisible=false"
          @confirm="confirmAdd"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import { departmentList } from '@/api/departments.js'
import { transDepartToTreeData } from '@/utils/index.js'
import Dialog from './components/Dialog.vue'
export default {
  name: 'Departments',
  components: {
    Item,
    Dialog
  },
  data() {
    return {
      dialogVisible: false,
      head: {
        name: '火星专用高压锅科技有限公司',
        manager: '负责人',
        // 修复Bug
        id: ''
      },
      defaultProps: {
        label: 'name'
      },
      departmentList: [],
      // node包含当前点击节点(部门的所有信息)
      node: {}
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const res = await departmentList()
      // 返回的是扁平一维数组，没有树形结构，所以定义一个函数处理返回数据，使之成为树形结构
      this.departmentList = transDepartToTreeData(res.depts, '')
    },
    add(val, val2) {
      this.dialogVisible = true
      this.node = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: val.id,
        id: '',
        type: val2
      }
    },
    confirmAdd() {
      this.dialogVisible = false
      // 刷新页面
      this.getDepartmentList()
    },
    edit(val, val2) {
      this.node = val
      this.dialogVisible = true
      this.node.type = val2
    }
  }
}
</script>

<style>
</style>
