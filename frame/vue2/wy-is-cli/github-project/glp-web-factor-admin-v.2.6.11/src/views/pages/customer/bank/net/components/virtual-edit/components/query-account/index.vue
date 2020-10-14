<template>
<el-dialog  :visible.sync="showModal"  width="50%" :before-close="closeDialog" :modal="false">
  <div>
      <el-table
        ref="multipleTable"
        :data="accountList"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
          width="55">
          <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="scope.row.flagValue" @change.native="handleSelectionChange(scope.$index,scope.row)"><i></i></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="cifName"
          label="账户名">
        </el-table-column>
        <el-table-column
          prop="acctNo"
          label="账号">
        </el-table-column>
      </el-table>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCancle">取 消</el-button>
    <el-button type="primary" @click="onConfirm">下一步</el-button>
  </span>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, PropSync, Emit, Watch } from 'vue-property-decorator'
import { queryAccountAndChoose } from '@/api/systemSet'

@Component
export default class QueryAccount extends Vue {
  $style!: any

  @Prop() showModal!: boolean

  @Prop() paramsObj!: any

  @Ref() multipleTable!: any

  dialogVisible = true

  @Emit('getModal')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Emit('getModalData')
  onGetModalData (params: any) {
    return this.chooseItem
  }

  @Watch('showModal') onChangeAccount () {
    if (this.showModal) {
      this.onQueryAccountAndChoose()
    }
  }

  accountList = []

  title = '选择账户'

  chooseItem: any = []

  onQueryAccountAndChoose () {
    queryAccountAndChoose(this.paramsObj).then((data: any) => {
      this.accountList = data
    })
  }

  // onSelect (selection: any, row: any) {
  //   this.multipleTable.clearSelection(row)
  //   if (selection.length === 0) return
  //   this.multipleTable.toggleRowSelection(row, true)
  // }

  handleSelectionChange (index: number, val: any) {
    this.chooseItem.push(val)
  }

  onConfirm () {
    this.dialogVisible = false
    if (this.chooseItem.length > 0) {
      this.onSend(this.dialogVisible)
      this.onGetModalData(this.chooseItem)
    } else {
      this.$message({
        message: '请选择',
        type: 'warning'
      })
    }
  }

  onCancle () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }

  closeDialog () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }

  mounted () {
    // this.onQueryAccountAndChoose()
  }
}
</script>
