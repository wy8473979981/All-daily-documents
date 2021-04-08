<template>
  <div>
    <modal :before-confirm='beforeConfirmFn' confirm-text='确定' cancel-text='取消' :modalWidth="'640px'" ref='createModal' :title='modalObj.title'>
      <edit-form-group @submit="onSubmit" ref="fm">
        <edit-form :def="createDefs" :form="form" :span="12" :xl="12"></edit-form>
        <template v-slot:action><div></div></template>
      </edit-form-group>
    </modal>
    <modal :before-confirm='beforeConfirmFn' confirm-text='确定' cancel-text='取消' :modalWidth="'640px'" ref='editModal' :title='modalObj.title'>
      <edit-form-group @submit="onSubmit" ref="fm">
        <edit-form :def="editDefs" :form="form" :span='12' :xl="12"></edit-form>
        <template v-slot:action><div></div></template>
      </edit-form-group>
    </modal>
    <query-form :def='formDefs' @query='onQuery'></query-form>
    <query-table :columns='columns' ref='tb' api='/glp-fae/subject/listPage' class='mt-4'>
      <template slot='extra'>
        <el-button type='primary' size='small' @click='onAdd'>新增</el-button>
      </template>
      <template v-slot:opt='{row}'>
        <el-button type='text' @click='onDisabled(row)'>{{row.status ==0?'启用':'禁用'}}</el-button>
        <el-button type='text' @click='onEdit(row)'>编辑</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns, createDefs, editDefs } from './config'
import { handlSubjectDisabled, addSubjectSubmit, editSubjectSubmit } from '@/api/accounting-server'

@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() createModal!: any
  @Ref() editModal!: any

  @Ref() fm!: any

  formDefs = formDefs
  createDefs= createDefs
  editDefs= editDefs
  columns = columns
  modalObj = {
    title: '新增',
    falg: false
  }

  form: any = {
    appId: '',
    subjectCode: '',
    subjectName: '',
    status: '1'
  }

  onSubmit () {
    console.log('onSubmit')
  }

  onAdd () {
    this.modalObj = {
      title: '新增',
      falg: false
    }
    this.form = {
      appId: '',
      subjectCode: '',
      subjectName: '',
      status: '1'
    }
    this.createModal.open()
    this.fm && this.fm.onReset()
  }

  onDisabled (row: any) {
    const confirmTip = row.status === 0 ? '确认启用此科目?' : '确认禁用此科目?'
    this.$confirm(confirmTip, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const param = { ...row, status: row.status === 0 ? 1 : 0 }
      handlSubjectDisabled(param).then((data) => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
        this.onRefresh()
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    })
  }

  onRefresh () {
    this.tb.refresh()
  }

  onEdit (row: any) {
    this.modalObj = {
      title: '编辑',
      falg: true
    }
    this.form = {
      ...row,
      appId: row.appId,
      subjectCode: row.subjectCode,
      subjectName: row.subjectName,
      status: row.status + ''
    }
    this.editModal.open()
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  beforeConfirmFn () {
    return this.fm.forSubmit().then((data: any) => {
      if (this.modalObj.falg) {
        return editSubjectSubmit(data[0]).then(data => {
          this.onRefresh()
        })
      } else {
        return addSubjectSubmit(data[0]).then(data => {
          this.onRefresh()
        })
      }
    })
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang='scss' module></style>
