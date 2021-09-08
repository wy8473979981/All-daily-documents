/*
*author: ly
*date： 2021-05-19
*desc： 多个文件上传封装
*/

<template>
  <el-upload
    name="fileName"
    :headers="{'Authorization': userInfo.token}"
    :accept="action ? action : $action"
    :action="uploadUrl"
    :data="{userName: form.userInfo.username, bizFileName: value, bizId: form.bizId}"
    :before-remove="beforeRemoveGlobal"
    :before-upload="beforeUploadGlobal"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleErrorGlobal"
    :on-preview="downLoadFileGlobal"
    :file-list="form.allEntityFileIds[value]"
    style="display: flex;">
    <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
  </el-upload>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'manyFiles',
  props: ['form', 'value', 'action'],
  data() {
    return {
      uploadUrl: window.location.href.search(/8066/) != -1 ? 'api/file/uploadFile' : process.env.VUE_APP_URL + '/api/file/uploadFile'
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file, this.value)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 2, this.value)()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
