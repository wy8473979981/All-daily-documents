<template>
  <el-button size="mini" type="success" @click="getExcle">导出</el-button>
</template>

<script>
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
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
        let res = null;
        let { params, exportUrl, excelName } = this.params;
        let projectResultIds = [params.projectResultIds.join()];
        let showTypeList = [params.showTypeList.join()];
        if (params.projectResultIds.length == 0) {
          this.$message({ message: '请勾选数据!', type: 'error' });
          return false;
        }
        const req = { projectResultIds: projectResultIds, showTypeList: showTypeList }
        res = await CalculationApi.excelExport(req, exportUrl);
        if (res) {
          var blob = new Blob([res], { type: "application/vnd.ms-excel" });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', url);
          var filename = excelName + "列表.xlsx";
          a.setAttribute('download', filename);
          a.click();
          window.URL.revokeObjectURL(url);
          this.$message({ message: '导出成功!', type: 'success' })
        } else {
          this.$message({ message: '导出失败!', type: 'error' })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
