<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="previewFn"
      :on-remove="remove"
      :on-change="change"
      :file-list="fileList"
      :limit="1"
      :class="{ disabled: uploadDone }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showProgress" style="width: 180px" :text-inside="true" :stroke-width="26" :percentage="percentage" />
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" height="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDue8LJ2UfYBWaNuA9rJUO1OVKs99sKVP2',
  SecretKey: 'NTIr88csrYy80bvxjESP6WfXAWbOuA9s'
})

export default {
  name: 'ImageUpload',
  data() {
    return {
      imgUrl: '',
      dialogVisible: false,
      fileList: [],
      percentage: 0,
      showProgress: false
    }
  },
  computed: {
    uploadDone() {
      return this.fileList.length === 1
    }
  },
  methods: {
    previewFn(file) {
      this.imgUrl = file.url
      this.dialogVisible = true
    },
    remove(file, fileList) {
      this.fileList = fileList
    },
    change(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/png']
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      // 显示进度条
      this.showProgress = true
      return true
    },
    upload(p) {
      if (p.file) {
        cos.putObject({
          Bucket: 'storage-1312130793', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-chengdu', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: p.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: p.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100
          }
          // 上传失败 || 上传成功
        }, (err, data) => { // 将上传成功的地址回写到this.fileList中
          if (!err && data.statusCode === 200) {
            // 如果上传成功
            this.fileList[0].url = 'http://' + data.Location
            // 为后期进度条做标记
            this.fileList[0].uploaded = true
            // 关闭进度条
            this.showProgress = false
            this.percentage = 0
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
