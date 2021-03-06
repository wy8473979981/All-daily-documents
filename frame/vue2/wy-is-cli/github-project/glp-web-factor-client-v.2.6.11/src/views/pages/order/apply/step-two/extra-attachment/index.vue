<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="640px" :before-close="handleClose">
      <template slot="title">
        <p class="dialog-title">
          <label>添加补充文件</label>
          <span>请如实填写文件名称及文件编号</span>
        </p>
      </template>
      <el-form :model="form" :inline="true" size="small" :rules="rules" label-position="top">
        <el-form-item label="文件名称" prop="name">
          <el-select v-model="form.name" placeholder="请选择文件名称" style="width:280px">
            <el-option label="补充协议" value="补充协议"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件编号" prop="code" style="margin-left:20px">
          <el-input v-model="form.code" placeholder="请输入补充文件编号" style="width:280px"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="url" style="width:280px">
          <glp-upload
            :request="request"
            :resp="resp"
            type="list"
            :file-list="form.url"
            :limit="1"
            class="tip-upload"
            maxSize="50M"
          ></glp-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialg-footer">
        <el-button @click="dialogVisible = false" size="small" plain>取消</el-button>
        <el-button type="primary" @click="onSave" size="small" plain>保存</el-button>
      </span>
    </el-dialog>
    <query-table
      :columns="columns"
      ref="tb"
      title="补充文件"
      row-key="a"
      :pageable="false"
      :data-source="fileList"
      class="mt-4"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogVisible = true">新增</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onDelete(row)">删除</el-button>
      </template>
    </query-table>
    <div class="clear"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import { columns } from './config'
import { resp, request, action } from '@/config/form'

@Component
export default class ExtraAttachment extends Vue {
  columns = columns

  request = request

  type = 'list'

  url = ''

  form = {
    code: undefined,
    name: undefined,
    path: undefined,
    url: undefined
  }

  fileList = []

  rules = {
    name: [{ required: true, message: '请选择', trigger: 'blur' }],
    code: [{ required: true, message: '请输入', trigger: 'blur' }],
    path: [{ type: 'file', required: true, trigger: 'change' }]
  }

  @Emit('onFormChange')
  onFormChange() {
    return this.form
  }

  onDelete(row: any) {
    let _index = 0
    this.fileList.map((item: any, index) => {
      if (item.path === row.path) _index = index
    })

    const _fileList = [].concat(this.fileList)
    _fileList.splice(_index, 1)
    this.fileList = _fileList
  }

  onSave() {
    this.onFormChange()
    const _fileList: any = [].concat(this.fileList)
    _fileList.push(this.form)
    this.fileList = _fileList
    this.dialogVisible = false
  }

  dialogVisible = false

  resp = (response: any) => {
    this.dialogVisible = false
    this.form.path = response.url
  }

  handleClose() {}
}
</script>
<style lang="scss" scope>
.dialog-title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  span {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    margin-left: 5px;
    color: rgba(255, 144, 42, 1);
    line-height: 17px;
  }
}
.dialg-footer {
  text-align: center !important;
  display: block;
  width: 100%;
}
</style>
