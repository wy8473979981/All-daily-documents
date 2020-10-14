<template>
<modal :before-confirm="beforeConfirm" confirm-text="保存" cancel-text="返回" ref="modal" title="关联项目" width="480px" :class="[$style.formModal]">
<div>
  <el-form size="small"  ref="formRef" :model="form" label-position="right" label-width="auto">
    <el-row :gutter="32">
      <el-col :span="20">
        <el-form-item label="账号" prop="loginName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
          <el-input v-model="form.loginName" :class="[$style.width100]" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-for="(item, index) in projectIds" :key="index" :gutter="32">
      <el-col :span="20">
        <el-form-item label="项目名称" :prop="'projectIds.' + index">
          <el-select v-model="item.projectId" clearable filterable remote :remote-method="getProjectName" :class="[$style.width100]" placeholder="请选择项目名称">
            <el-option
              v-for="(item, index) in projectOptions"
              :key="index"
              :label="item.projectName"
              :value="item.projectId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <!-- <el-button type="danger" icon="el-icon-remove" size="small" @click="onDelete(item,index)" plain></el-button> -->
        <el-button type="danger" icon="el-icon-delete" circle size="small" @click="onDelete(item,index)"></el-button>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="20">
        <el-form-item>
          <el-button type="primary" @click="onAdd" size="small" plain :class="[$style.width100]">新增</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</modal>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit } from 'vue-property-decorator'
import { submitRelevanceProject, getRemoteProjectName } from '@/api/systemSet'

@Component
export default class RelationProject extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  form: any = {
    projectIds: [],
    userId: ''
  }

  projectIds: any = []

  relationOptions: Array<any> = []

  projectOptions: Array<any> = []

  query = ''

  @Emit('reloadAccount') onChangeAccount () {
    return this.form
  }

  openModel (row: any) {
    this.projectIds = []
    this.projectOptions = []
    this.form.loginName = row.loginName
    this.form.userId = row.userId
    if (row.projectList.length > 0) {
      row.projectList.forEach((item: any, index: number) => {
        this.projectIds.push({ projectId: item.id, projectName: item.projectName })
        this.projectOptions.push({ projectId: item.id, projectName: item.projectName })
      })
      Array.from(new Set(this.projectOptions))
    } else {
      this.projectIds = [
        {
          projectId: '',
          projectName: ''
        }
      ]
    }
    return this.modal.open()
  }

  getProjectName (query: any) {
    getRemoteProjectName({ projectName: query }).then((data) => {
      this.projectOptions = data
    })
  }

  beforeConfirm () {
    this.form.projectIds = []
    this.projectIds = Array.from(new Set(this.projectIds))
    for (let i = 0; i < this.projectIds.length; i++) {
      this.form.projectIds.push(this.projectIds[i].projectId)
    }
    return this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        delete this.form.loginName
        if (this.form.projectIds[0] === '' || this.form.projectIds[0] === null) this.form.projectIds = []
        return submitRelevanceProject(this.form).then((data: any) => {
          this.$message({
            message: '保存成功',
            type: 'success',
            onClose: () => {
              this.onChangeAccount()
            },
            duration: 1500
          })
        })
      }
    })
  }

  onAdd () {
    this.projectIds.push(
      {
        projectId: '',
        projectName: ''
      }
    )
  }

  onDelete (item: {}, index: number) {
    if (Number(this.projectIds.length) > 1) this.projectIds.splice(index, 1)
  }

  mounted () {
    this.form = {
      projectIds: [],
      userId: ''
    }
  }
}
</script>
<style lang="scss" module>
.width100{
  width: 100%;
}
.formModal{
  :global{
    .el-dialog__body .index_body_2u9Qn{
      min-height: 0;
    }
  }
}
</style>
