<template>
<el-dialog  :visible.sync="showModal"  width="640px" :before-close="closeDialog" :append-to-body="true" height="445px">
  <div>
      <el-table
        ref="multipleTable"
        :data="accountList"
        tooltip-effect="dark"
        style="width: 100%"
        @current-change="handleSelectionChange"
        >
        <el-table-column>
          <template slot-scope="scope">
              <el-radio :label="scope.row" v-model="chooseItem"><i></i></el-radio>
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
  <div class="text-center mt-4">
    <el-button @click="onCancle" size="small">取 消</el-button>
    <el-button type="primary" @click="onConfirm" size="small">下一步</el-button>
  </div>
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

  accountList: any = []

  title = '选择账户'

  chooseItem: any = {}

  onQueryAccountAndChoose () {
    queryAccountAndChoose(this.paramsObj).then((data: any) => {
      this.accountList = data
      // if (data.length > 0) {
      //   data.forEach((item: any, index: number) => {
      //     if (item.acctNo === this.paramsObj.bindBankAccountNumber) {
      //       this.chooseItem = item
      //     }
      //   })
      // }
    })
  }

  handleSelectionChange (val: any) {
    this.chooseItem = val
  }

  onConfirm () {
    this.dialogVisible = false
    if (this.chooseItem.acctNo) {
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
