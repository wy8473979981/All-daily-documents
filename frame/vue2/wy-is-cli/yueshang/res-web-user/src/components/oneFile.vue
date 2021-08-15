/*
*author: ly
*date： 2021-05-19
*desc： 单个文件上传封装
*/

<template>
  <div class="oneFile-box">
    <el-upload
      name="fileName"
      :headers="{'Authorization': userInfo.token}"
      :accept="$action"
      :action="uploadUrl"
      :show-file-list="false"
      :data="{userName: form.userInfo.username, bizFileName: value, bizId: form.bizId}"
      :before-remove="beforeRemoveGlobal"
      :before-upload="beforeUploadGlobal"
      :on-success="handleSuccess"
      :on-error="handleErrorGlobal"
      :on-preview="downLoadFileGlobal"
      :file-list="form.allEntityFileIds[value]"
      style="display: flex;">
      <el-button v-if="!form.bizEntityJson.disabled || admin" type="text" size="mini">上传附件</el-button>
    </el-upload>
    <p v-if="fileDetail" class="file-p">
      <span class="upload-title">
        <i class="el-icon-document"></i>
        <span class="fj-title">{{ fileDetail.name }}</span>
      </span>
      <span class="upload-del">
        <i class="el-icon-close" @click="delFile(1)"></i>
      </span>
    </p>
    <p v-else-if="$route.query.id && form.allEntityFileIds[value][0]" class="file-p">
      <span class="upload-title">
        <i class="el-icon-document"></i>
        <span class="fj-title">{{ form.allEntityFileIds[value][0].name }}</span>
      </span>
      <span v-if="!form.bizEntityJson.disabled || admin" class="upload-del">
        <i class="el-icon-close" @click="delFile(2)"></i>
      </span>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'oneFile',
  props: ['form', 'value', 'admin'],
  data() {
    return {
      uploadUrl: window.location.href.search(/8066/) != -1 ? 'api/file/uploadFile' : process.env.VUE_APP_URL + '/api/file/uploadFile',
      fileDetail: null
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    delFile(index) {
      console.log(this.value, index)
      if (index == 1) {
        this.fileDetail = ''
        this.form.bizEntityJson[this.value] = ''
      } else {
        this.form.allEntityFileIds[this.value] = []
        this.form.bizEntityJson[this.value] = ''
      }
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 1, this.value)()
    },
    onChangeToolFile(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1].raw]
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.oneFile-box {
  display: flex;
}
</style>
