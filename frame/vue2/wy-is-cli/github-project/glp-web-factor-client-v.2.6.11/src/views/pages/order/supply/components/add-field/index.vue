<template>
  <modal
    :before-confirm="beforeConfirm"
    confirm-text="保存"
    cancel-text="取消"
    ref="modal"
    modal-width="50%"
    title="添加文件"
  >
    <div>
      <el-form
        size="medium "
        ref="formRef"
        :model="form"
        label-position="top"
        :rules="rules"
      >
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="文件名称" prop="fileName">
              <el-select
                v-model="form.fileName"
                clearable
                placeholder="请选择"
                @change="onChangeFileName"
              >
                <dict-options name="filenameList"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件编号" prop="fileNo">
              <el-input
                v-model="form.fileNo"
                placeholder="请输入补充协议编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="附件" prop="fileList">
              <glp-upload v-bind="uploadOptions" v-model="form.fileList" :limit="20" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif,.pdf,.zip" maxSize="30M">
                <div slot="tip" class="el-upload__tip">（支持JPG/JPEG/BMP/PNG/PDF/GIF/压缩包（zip）文件，最大30M）</div>
              </glp-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import { submitAddFiled } from '@/api/customerInfo'
import { uploadOptions } from '@/config/form'

@Component
export default class AddField extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  id: any = null

  row: any = null

  agentSearchList: Array<any> = []

  uploadOptions = uploadOptions

  rules = {
    fileName: [
      { required: true, message: '必填', trigger: 'change' }
    ],
    fileNo: [
      { required: true, message: '必填', trigger: 'blur' }
    ],
    fileList: [
      { required: true, message: '必填', trigger: 'blur' }
    ]
  }

  form: Record<string|number, any> = {
    fileName: '',
    fileNo: '',
    fileList: []
  }

  add () {
    this.form = {
      fileName: '',
      fileNo: '',
      fileList: []
    }
    return this.modal.open()
  }

  onChangeFileName (value: any) {
    console.log(value)
  }

  beforeConfirm () {
    return this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        const req: any = {
          fileName: this.form.fileName,
          fileNo: this.form.fileNo,
          fileList: this.form.fileList.map((v: any) => ({ name: v.name, path: v.url }))
        }
        return submitAddFiled(req).then((data) => {
          const flag = data
          if (flag) {
            this.$confirm('补充材料填写错误将影响您的订单进度，请确认您上传的补充材料无误！', '确认是否保存', {
              confirmButtonText: '保存',
              cancelButtonText: '暂不保存',
              center: true
            }).then(() => {
              submitAddFiled(req).then((data) => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
              })
            }).catch(() => {
              //
            })
          } else {
            this.$confirm('您已上传同个补充协议编号的附件，是否替换！', '确认是否替换', {
              confirmButtonText: '替换',
              cancelButtonText: '取消',
              center: true
            }).then(() => {
              submitAddFiled(req).then((data) => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
              })
            }).catch(() => {
              //
            })
          }
        })
      }
    })
  }

  $style!: any
}
</script>
<style style="scss"  module>
.width100 {
  width: 100%;
}
</style>
