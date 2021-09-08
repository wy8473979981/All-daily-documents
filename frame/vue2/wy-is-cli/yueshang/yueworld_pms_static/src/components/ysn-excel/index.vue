<template>
  <div class="export-excel" @click="handleExcel">
    <slot></slot>
    <upload-excel
      v-if="type === 'import'"
      ref="upload-excel"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
  </div>
</template>
<script>
import uploadExcel from './uploadExcel'
export default {
  props: {
    type: {
      //判断是导入还是导出
      type: String,
      default: 'export',
    },
    list: {
      // 导出的数据列表
      type: Array,
      default: () => [],
    },
    config: {
      // 导出的头部配置
      type: Array,
      default: () => [],
    },
  },
  components: {
    uploadExcel,
  },
  methods: {
    handleExcel() {
      this.type === 'export'
        ? this.handleDownload()
        : this.$refs['upload-excel'].handleUpload()
    },
    handleDownload() {
      console.log(this.list, 'ddd')
      import('@/utils/export2Excel').then((excel) => {
        let filterVal = [],
          tHeader = []
        this.config.forEach((el) => {
          let elArray = Object.keys(el)
          let name = elArray[0]
          filterVal.push(name)
          tHeader.push(el[name])
        })
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, index) =>
        filterVal.map((j) => {
          if (j === 't0') {
            return index + 1
          } else {
            return v[j]
          }
        })
      )
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传大于1M的文件',
        type: 'warning',
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.$emit('handleSuccess', { results, header })
    },
  },
}
</script>
