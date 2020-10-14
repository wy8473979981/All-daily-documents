<template>
  <div>
    <glp-card title="清分规则相关" class="my-4">
      <el-form
        size="small"
        ref="sortRuleFormRef"
        :model="form"
        label-position="right"
        label-width="140px"
        :disabled="pageType==='detail' || pageType==='auth' || !isAbled || disabledFlag"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否自动清分">
              <el-select v-model="form.ifAutoClean" @change="onChangeIfAutoClean">
                <dict-options name="project_sfzdqf"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="form.ifAutoClean === '1'">
            <el-form-item label="自动清分规则">
                <el-radio :label="1" v-model="firstRadio" @change="onChangeFirstRadio">
                  <el-select
                    v-model="form.autoCleanType"
                    :disabled="form.autoCleanType1 === 1"
                  >
                    <dict-options name="project_zdqfgz_one"></dict-options>
                  </el-select>
                </el-radio>
                <el-radio :label="1" v-model="form.autoCleanType1" @change="onChangeSecondRadio">
                  最晚还款日-实际还款日＜
                  <el-input
                    v-model="form.autoCleanType1Day"
                    :class="[$style.inputWidth]"
                    :disabled="firstRadio === 1"
                  ></el-input>&ensp;天
                </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.ifAutoClean === '1'">
          <el-col :span="24">
            <el-form-item label="暂停自动清分">
                <el-button type="primary" @click="onAdd" disabled size="small" plain>新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.ifAutoClean === '1'">
          <el-row
            v-for="(item, index) in form.projectStopAutoBank"
            :key="index"
            :gutter="32"
          >
            <el-col :span="7">
              <el-form-item label="企业名称" :prop="'projectStopAutoBank.' + index + '.companyName'">
                <el-select
                  v-model="item.sellerId"
                  filterable
                  remote
                  @change="(query)=>onSelectChange(query, index)"
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="(query)=>remoteMethod(query, index)"
                  :class="[$style.colwidth]"
                >
                  <el-option
                    v-for="(item, index) in item.options"
                    :key="index"
                    :label="item.customerName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="开户行" :prop="'projectStopAutoBank.' + index + '.openBank'">
                <el-select v-model="item.bankCardId" :class="[$style.colwidth]">
                  <el-option
                    v-for="(item, index) in item.bankOptions"
                    :key="index"
                    :label="item.bankAccountName"
                    :value="item.bankAccountNumber"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="银行帐号" :prop="'projectStopAutoBank.' + index + '.accountNo'">
                <el-select v-model="item.bankCardId" :class="[$style.colwidth]" disabled>
                  <el-option
                    v-for="(item, index) in item.bankOptions"
                    :key="index"
                    :label="item.bankAccountNumber"
                    :value="item.bankAccountNumber"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="text-center">
              <el-button type="primary" size="small" @click="onDelete(item,index)" class="text-center">删除</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { getSellerLikeByName, getCompanySupervisorCard } from '@/api/systemSet'
import { ArrayItem } from './config'

@Component
export default class SortruleForm extends Vue {
  @Ref() sortRuleFormRef!: any

  @Prop(String) projectId!: string

  @Prop() pageType!: string

  @Prop() sortRuleForm!: Record<string|number, any>

  @Prop() disabledFlag!: boolean

  isAbled = false

  form: Record<string|number, any> ={
    ifAutoClean: '',
    autoCleanType: '',
    autoCleanType1: '',
    autoCleanType1Day: '',
    projectStopAutoBank: []
  }

  projectStopAutoBank: any = ''

  firstRadio: any = 0 // 默认等于1是选中

  @Emit('onSortRuleForm') getSortRuleForm () {
    return this.form
  }

  @Watch('sortRuleForm') onChangeSortRuleForm () {
    this.form.autoCleanType1 = this.sortRuleForm.autoCleanType1
    this.form.ifAutoClean = String(this.sortRuleForm.ifAutoClean)
    this.form.autoCleanType = String(this.sortRuleForm.autoCleanType)
    this.form.projectStopAutoBank = this.sortRuleForm.projectStopAutoBank
    this.form.autoCleanType1Day = this.sortRuleForm.autoCleanType1Day

    if (String(this.form.autoCleanType1) === '0') this.form.autoCleanType1 = ''

    if (String(this.sortRuleForm.autoCleanType) === '0') {
      this.form.autoCleanType = ''
      this.firstRadio = 0
    }

    if (String(this.form.autoCleanType).length > 0 && String(this.form.autoCleanType) !== '0') {
      this.firstRadio = 1
    }

    if (String(this.form.autoCleanType1Day) === '0') {
      this.form.autoCleanType1Day = ''
    }
  }

  remoteMethod (query: any, index: string) {
    if (query !== '') {
      getSellerLikeByName(query, Number(this.projectId)).then(data => {
        this.form.projectStopAutoBank[index].options = data
        const array: Array<any> = []
        this.form.projectStopAutoBank.map((item: any, index: any) => {
          array.push(item)
        })
        this.form.projectStopAutoBank = array
      })
    } else {
    }
  }

  onChangeIfAutoClean (value: any) {
    this.form.autoCleanType1 = ''
    this.form.autoCleanType1Day = ''
    this.form.autoCleanType = ''
    this.firstRadio = 0
  }

  onChangeFirstRadio (value: any) {
    this.firstRadio = 1
    this.form.autoCleanType1 = ''
    this.form.autoCleanType1Day = ''
  }

  onChangeSecondRadio (value: any) {
    this.firstRadio = 0
    this.form.autoCleanType1 = 1
    this.form.autoCleanType = ''
    this.$set(this.form, 'autoCleanType', '')
  }

  onSelectChange (value: any, index: number) {
    const data = {
      customerId: value,
      usage: 1
    }
    getCompanySupervisorCard(data).then(res => {
      this.form.projectStopAutoBank[index].bankOptions = res
      const array: Array<any> = []
      this.form.projectStopAutoBank.map((item: any, index: number) => {
        array.push(item)
      })
      this.form.projectStopAutoBank = array
    })
  }

  onAdd () {
    this.form.projectStopAutoBank.push({
      sellerId: '',
      bankCardId: '',
      options: [],
      bankOptions: []
    })
  }

  onDelete (item: {}, index: number) {
    if (Number(this.form.projectStopAutoBank.length) > 0) {
      this.form.projectStopAutoBank.splice(index, 1)
    }
  }

  mounted () {
    this.getSortRuleForm()
    const access = this.$auth.accessSync('/project/product/edit/rule') || this.$auth.accessSync('/project/product/open-edit/rule')
    if (access) {
      this.isAbled = true
    }
  }
}
</script>

<style lang="scss" module>
.colwidth {
  width: 100%;
}
.inputWidth {
  width: 200px;
}
</style>
