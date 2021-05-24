<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="上传EXCEL转JSON">
        <UploadExcelToJson @getJsonDataFunc="getJsonDataFunc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import XLSX from 'xlsx'
import UploadExcelToJson from '../../components/uploadExcelToJson'
export default {
  data () {
    return {
      form: {

      }
    }
  },
  components: {
    UploadExcelToJson
  },
  mounted () {
  },
  methods: {
    getJsonDataFunc (data) {
      console.log(data, 'getJsonDataFunc')
    },
    onSubmit () {
      this.$message('submit!')
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

