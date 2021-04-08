<template>
  <glp-card title="到账账户信息">
    <el-form :model="entryModel" inline size="small">
      <el-form-item label="拨付到账账户" prop="accountId">
        <el-select
          v-model="entryModel.accountId"
          placeholder="请选择到账账户"
          :disabled="disabled"
          @change="entryBankChange"
        >
          <el-option
            v-for="item in bankList"
            v-bind:key="item.accountId"
            :label="item.accountName"
            :value="item.accountId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拨付到账帐号" prop="accountNumber">
        <el-input v-model="entryModel.accountNumber" placeholder="请选择到账账户" disabled></el-input>
      </el-form-item>
      <el-form-item label="开户行信息" prop="accountBank">
        <el-input v-model="entryModel.accountBank" placeholder="请选择到账账户" disabled></el-input>
      </el-form-item>
    </el-form>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch, Emit } from 'vue-property-decorator'
import { customerAccountList, getCompanySupervisorCard } from '@/api/balance'
import { accountDetailDefs } from './config'
@Component
export default class EntryAccount extends Vue {
  $style!: any

  @Prop() type!: string

  @Prop() status!: number

  accountDetailDefs = accountDetailDefs

  baseForm: Record<string, any> = {}

  dataSource: Record<string, any> = {}

  bankList: Array<any> = []

  @Prop(Object) entryModel!: object

  @Prop() customerId!: any

  @Prop() summary!: any

  @Emit('entryBankChange')
  entryBankChange(value: any) {
    return this.bankList.filter((item: any) => {
      return item.accountId === value
    })[0]
  }

  get disabled() {
    if (this.status === 3) {
      return false
    }
    if (this.type !== 'edit') {
      return true
    }
    return false
  }

  @Watch('summary.saleCompanyId')
  onWacthSaleCompanyId(newValue: any) {
    const data = {
      saleCompanyId: newValue
    }
    getCompanySupervisorCard(data).then((res) => {
      this.bankList = res
    })
  }
}
</script>
<style lang="scss" module></style>
