<template>
  <el-upload ref="upload" style="display:inline;margin-right:10px;" action="url" :auto-upload="false" :multiple="false" :show-file-list="false" :before-upload="beforeUpload" :on-change="changeFile" accept=".xlsx,.xls" :file-list="fileList">
    <el-button size="mini" type="success">导入</el-button>
  </el-upload>
</template>

<script>
import GlobalApi from '@/apis/apis/global'
export default {
  name: 'inport',
  props: {
    params: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    beforeUpload(file) {
      let filename = file.name
      let arr = filename.split('.')
      if (arr[1] !== 'xls' && arr[1] !== 'xlsx') {
        this.$message.error('上传文件只能是 excel/xls 格式!')
        return false
      }
      return arr
    },
    changeFile(file, fileList) {
      try {
        let fd = new FormData();
        let importUrl = this.params.importUrl;
        let budgetInstanceSheetId = this.params.budgetInstanceSheetId ? this.params.budgetInstanceSheetId : this.params.bean.budgetInstanceSheetId;
        let type = this.params.type || null;
        fd.append('file', file.raw);//传文件
        fd.append('budgetInstanceSheetId', budgetInstanceSheetId);
        if(type){
          fd.append('type', type);
        }
        GlobalApi.excelImport(fd, importUrl).then(res => {
          if (res.code == 0) {
            this.$emit('update')
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
