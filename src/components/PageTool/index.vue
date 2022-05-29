<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-col v-if="isShowBefore">
        <slot name="before" />
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTool',
  props: {
    isShowBefore: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">

</style>
