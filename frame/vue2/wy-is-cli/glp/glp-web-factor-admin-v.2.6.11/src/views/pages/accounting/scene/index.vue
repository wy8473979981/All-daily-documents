<template>
  <div>
    <modal
      :before-confirm="beforeConfirmFn"
      confirm-text="确定"
      cancel-text="取消"
      ref="modal"
      :modalWidth="'640px'"
      :title="modalObj.title"
    >
      <edit-form-group @submit="onSubmit" ref="fm">
        <edit-form :def="createDefs" :form="form" :span="12" :xl="12"></edit-form>
        <template v-slot:action>
          <div></div>
        </template>
      </edit-form-group>
    </modal>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table :columns="columns" ref="tb" api="/glp-fae/scene/pageQuery" class="mt-4">
      <template slot="extra">
        <el-button type="primary" size="small" @click="onAdd">新增</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onDisabled(row)">{{row.status ==0?'启用':'禁用'}}</el-button>
        <el-button type="text" @click="onEdit(row)">编辑</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns, createDefs } from './config'
import {
  handlScenarioDisabled,
  addScenarioSubmit,
  editScenarioSubmit
} from '@/api/accounting-server'
@Component
export default class Index extends Vue {
  $style!: any;

  @Ref() tb!: any;
  @Ref() modal!: any;
  @Ref() fm!: any;

  formDefs = formDefs;
  createDefs = createDefs;

  columns = columns;

  modalObj = {
    title: '新增',
    falg: false
  };

  form = {
    appId: '',
    sceneCode: '',
    sceneName: '',
    subjectCode: '',
    subjectName: '',
    interestSettleType: '',
    tradeType: '',
    fundType: '',
    status: 1
  };

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onAdd () {
    this.modalObj = {
      title: '新增',
      falg: false
    }
    this.form = {
      appId: '',
      sceneCode: '',
      sceneName: '',
      subjectCode: '',
      subjectName: '',
      interestSettleType: '',
      tradeType: '',
      fundType: '',
      status: 1
    }
    this.modal.open()
    this.fm && this.fm.onReset()
  }

  onDisabled (row: any) {
    const confirmTip = row.status === 0 ? '确认启用此场景?' : '确认禁用此场景?'
    this.$confirm(confirmTip, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        const param = { ...row, status: row.status === 0 ? 1 : 0 }
        handlScenarioDisabled(param).then(data => {
          this.$message({
            type: 'success',
            message: '成功!'
          })
          this.onRefresh()
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
  }

  beforeConfirmFn () {
    return this.fm.forSubmit().then((data: any) => {
      if (this.modalObj.falg) {
        return editScenarioSubmit(data[0]).then(data => {
          this.onRefresh()
        })
      } else {
        return addScenarioSubmit(data[0]).then(data => {
          this.onRefresh()
        })
      }
    })
  }

  onSubmit () {
    console.log('onSubmit')
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
      ...row
    }
    this.modal.open()
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module></style>
