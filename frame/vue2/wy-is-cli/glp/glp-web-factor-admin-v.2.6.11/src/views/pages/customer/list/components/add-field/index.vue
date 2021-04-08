<template>
  <modal
    :before-confirm="beforeConfirm"
    confirm-text="确定"
    cancel-text="返回"
    ref="modal"
    modal-width="30%"
    title="代理人"
  >
    <div>
      <el-form
        size="medium "
        ref="form"
        :model="form"
        label-position="right"
        label-width="auto"
        :rules="rules"
      >
        <el-form-item label="代理人类型" prop="proxyerType">
          <el-select
            value="0"
            clearable
            disabled
            placeholder="请选择"
            :class="[$style.width100]"
            required="true"
          >
            <dict-options name="proxyerType"></dict-options>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="proxyerCustomerId">
          <el-select
            v-model="form.proxyerCustomerId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            @change="onAgentChange"
            :remote-method="remoteMethod"
            :class="[$style.width100]"
          >
            <el-option
              v-for="(item, index) in agentSearchList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="proxyerMobile">
          <el-input
            v-model="form.proxyerMobile"
            disabled
            :class="[$style.width100]"
            placeholder="请输入客户手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <glp-upload v-bind="uploadOptions" v-model="form.fileList" :limit="20" accept="image/jpeg,image/jpg,image/png,.pdf,.doc,.xls,.xlsx,.zip,.rar,.7z">
            <div slot="tip" class="el-upload__tip">（上传附件不超过20个，每个附件大小不超过100M）</div>
          </glp-upload>
        </el-form-item>
      </el-form>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import {
  submitAddFiled,
  getUpload,
  getRemoteCustomerName,
  saveCustomerProxy,
  updateCustomerProxy,
  queryEcifByCustomerProxy
} from '@/api/systemSet'
import { uploadOptions } from '@/config/form'

@Component
export default class AddField extends Vue {
  @Ref() modal!: any

  id: any = null

  row: any = null

  agentSearchList: Array<any> = []

  uploadOptions = uploadOptions

  rules = {}

  form = {
    proxyerType: '',
    proxyerCustomerId: '',
    proxyerMobile: '',
    fileList: []
  }

  get isEdit () {
    return !!this.row
  }

  remoteMethod (query: string) {
    if (query !== '') {
      queryEcifByCustomerProxy({
        name: query,
        customerType: 'INDIVIDUAL'
      }).then(res => {
        this.agentSearchList = res
      })
    } else {
      this.agentSearchList = []
    }
  }

  edit (id: any, row: any) {
    this.id = id
    this.row = row
    this.initForm(this.row)
    this.agentSearchList = []
    this.agentSearchList.push({ id: row?.proxyerCustomerId, name: row?.proxyerName })
    return this.modal.open()
  }

  add (id: any) {
    this.id = id
    this.form = {
      proxyerType: '',
      proxyerCustomerId: '',
      proxyerMobile: '',
      fileList: []
    }
    return this.modal.open()
  }

  initForm (row?: any) {
    this.form = {
      proxyerType: row?.proxyerType || '',
      proxyerCustomerId: row?.proxyerCustomerId || null,
      proxyerMobile: row?.proxyerMobile || '',
      fileList: row?.fileList || []
    }
  }

  onAgentChange (value: any) {
    const target: any = this.agentSearchList.find((v: any) => v.id === value)
    this.form.proxyerMobile = target?.mobile || ''
  }

  beforeConfirm () {
    const req: any = {
      id: this.id,
      proxyerCustomerId: this.form?.proxyerCustomerId || '',
      fileList: this.form.fileList.map((v: any) => ({ name: v.name, path: v.url }))
    }
    const request = this.isEdit ? updateCustomerProxy(req) : saveCustomerProxy(req)
    return request
  }

  $style!: any
}
</script>
<style style="scss"  module>
.width100 {
  width: 100%;
}
</style>
