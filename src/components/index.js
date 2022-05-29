// 此文件负责 自定义组件的 全局注册

import PageTool from '@/components/PageTool/index.vue'
import UploadExcel from '@/components/UploadExcel/UploadExcel.vue'
import ImageUpload from '@/components/imageUpload/index.vue'
import LangChange from '@/components/lang/index.vue'
import Print from 'vue-print-nb'

export default {
  // install方法把vue对象通过参数导入
  install(Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('LangChange', LangChange)
    Vue.use(Print)
  }
}

