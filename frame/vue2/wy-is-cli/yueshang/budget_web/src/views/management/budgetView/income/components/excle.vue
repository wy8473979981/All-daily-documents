<template>
  <el-button  size="mini" type="success" @click="getExcle">导出</el-button>
</template>

<script>
import LeaseApi from '../../../../../apis/apis/leaseApi.js'
// import { mapMutations } from 'vuex'
export default {
  props:['params','type','url'],
  data() {
    return {
    }
  },
  methods: {
    async getExcle() {
        await LeaseApi.getExcle(this.url, {param:JSON.stringify(this.params)}).then(data => {
          var blob = new Blob([data], {type: "application/vnd.ms-excel"});
          var objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          var filename= this.type + "列表.xlsx";
          a.setAttribute('download', filename);
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.$message({ message: '导出成功！', type: 'success' })
        })
    }
  }
}
</script>
