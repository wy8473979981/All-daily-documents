<template>
  <el-button size="mini" type="success" @click="getExcle">导出</el-button>
</template>

<script>
import GlobalApi from '@/apis/apis/global'
export default {
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  methods: {
    async getExcle() {
      try {
        let data = null;
        let exportUrl = this.params.exportUrl;
        let excelName = this.params.excelName;
        let chartType = this.params.chartType || null;
        if (chartType && (chartType == 44 || chartType == 49)) {
          const params = { ...this.params.params }
          data = await GlobalApi.excelExport(params, exportUrl);
        } else {
          data = await GlobalApi.excelExport({ param: JSON.stringify(this.params.params) }, exportUrl);
        }
        if (data) {
          var blob = new Blob([data], { type: "application/vnd.ms-excel" });
          var objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          var filename = excelName + "列表.xlsx";
          a.setAttribute('download', filename);
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.$message({ message: '导出成功！', type: 'success' })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
