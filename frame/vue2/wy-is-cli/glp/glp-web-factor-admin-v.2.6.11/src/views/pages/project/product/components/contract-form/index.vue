<template>
  <div>
    <el-form ref="contractRef" :model="form" label-position="top" :disabled="pageType==='detail' || pageType==='auth' || !accessContract" :rules="rules" inline-message class="contract" :class="[$style.form]">
    <glp-card class="my-4">
        <div slot="title">
          <span>合同管理相关：</span>
          <span>
            <el-popover
              placement="top-start"
              title="说明"
              width="400"
              trigger="hover" >
              <el-row :gutter="20" v-if="String(templateId) === '1'">
                <el-col :span="24">
                  <p>[BL1]</p>
                  <p>（1）适用于除普链保产品以外的其他保理业务；</p>

                  <p>（2）普运贷产品适用；</p>

                  <p>（3）卖方及保理商两方签署的有追索权型保理；</p>

                  <p>（4）明保理/暗保理、通知有无回执为可选内容；</p>

                  <p>（5）线上、线下通用。</p>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="String(templateId) === '2'">
                <el-col :span="24">
                  <p>【BL2】</p>
                  <p>（1）适用于除专用产品以外的其他保理业务；</p>
                  <p>（2）买卖双方及保理商三方签署的有追索权、公开型保理；</p>
                  <p>（3）线上、线下通用。</p>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="String(templateId) === '3'">
                <el-col :span="24">
                  <p>【BL3】</p>
                  <p>（1）普链保产品专用（涉及票据业务）；</p>
                  <p>（2）卖方及保理方两方签署的有追索权型保理；</p>
                  <p>（3）明保理/暗保理、通知有无回执为可选内容；</p>
                  <p>（4）线上、线下通用。</p>
                </el-col>
              </el-row>
              <el-select
                v-model="templateId"
                @change="onChangeTemplate"
                :class="[]"
                slot="reference"
                size="small">
                <el-option
                  v-for="(item, index) in templateList"
                  :key="index"
                  :label="item.catName"
                  :value="item.id">
                  <span style="float: left">{{ item.catCode }}</span>
                  <span style="float: right;">{{ item.catName }}</span>
                </el-option>
              </el-select>
            </el-popover>
          </span>
        </div>
        <el-table
          :data="form.contractList"
          style="width: 100%"
          stripe
          highlight-current-row
          tooltip-effect>
          <el-table-column
            fixed
            prop="contractType"
            label="合同类型"
            min-width="220">
            <template slot-scope="scope">
              {{scope.row.contractTypeName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="contractConfig"
            label="配置项"
            min-width="220">
            <template slot-scope="scope">
              <el-radio-group size="small" v-model="scope.row.contractConfig" @change="onChangeConfig(scope.$index,scope.row)">
                <radio-options name="sign_config"></radio-options>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            label="模板选择"
            min-width="220">
            <template slot-scope="scope">
              <el-form-item v-if="String(scope.row.contractConfig) === '1'" :prop="'contractList.' + scope.$index + '.contractTemplateId'" :rules='rules.contractTemplateId'>
                <el-select v-model="scope.row.contractTemplateId" size="small" clearable>
                  <el-option
                    v-for="(item, index) in scope.row.templateInfoList"
                    :key="index"
                    :label="item.contractName"
                    :value="item.templateId">
                    <span style="float: left">【{{ item.templateCode }}】{{ item.contractName }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="签署方式"
            min-width="220">
            <template slot-scope="scope">
              <el-form-item v-if="String(scope.row.contractConfig) === '1'" :prop="'contractList.' + scope.$index + '.contractSignType'" :rules='rules.contractSignType'>
                <el-select v-model="scope.row.contractSignType" size="small" clearable>
                  <dict-options name="sign_type"></dict-options>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractTakeEffectNode"
            label="生成节点"
            min-width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.contractTakeEffectNode" v-if="String(scope.row.contractConfig) === '1'" size="small" disabled clearable>
                <dict-options name="effect_node"></dict-options>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractApproveType"
            label="审核方式"
            min-width="100">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.contractApproveType" label="1" v-if="String(scope.row.contractConfig) === '1'" size="small">人工</el-radio>
            </template>
          </el-table-column>
        </el-table>
    </glp-card>
     </el-form>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Emit, Watch } from 'vue-property-decorator'
import { deadlineTimeOptions } from '../config'
import { getContractList, getCategoryAll, getInfoByCategoryId } from '@/api/systemSet'
// import { getAuth } from '@/utils/perms'

@Component
export default class ContractForm extends Vue {
  @Prop() quotaCode!: any

  @Ref() contractRef!: any

  @Prop() contractForm!: any

  @Prop() id!: any

  @Prop() pageType!: string

  accessContract = false

  form: Record<string|number, any> = {
    contractList: []
  }

  contractList: Array<any> = []

  contractArray: Array<any> = []

  templateId: any = '' // 合同模板ID

  templateList: Array<any> = []

  contractVersion: any = ''

  detailContractList: Array<any> = []

  initContractForm: Array<any> = []

  editContractForm: Array<any> = []

  rules = {
    contractTemplateId: { required: true, message: '必选', trigger: 'change' },
    contractSignType: { required: true, message: '必选', trigger: 'change' }
  }

  @Emit('onContractForm') getContractForm () {
    const initObj = {
      contractVersion: '',
      contractType: '',
      contractTemplateId: '',
      contractTakeEffectNode: '',
      contractSignType: '',
      contractConfig: '',
      contractApproveType: '1'
    }
    this.contractArray = []
    this.contractList = JSON.parse(JSON.stringify(this.form.contractList))
    if (this.contractList.length > 0) {
      this.contractList.forEach((item: any, index: number) => {
        if (item.contractTypeName) delete item.contractTypeName
        if (item.templateInfoList) delete item.templateInfoList
        if (item.contractTemplateName) delete item.contractTemplateName
        const obj = { ...initObj, ...item }
        this.contractArray.push(obj)
      })
    }
    return this.contractArray
  }

  @Watch('form.contractList', { immediate: true, deep: true }) onWatchContractList () {
    this.getContractForm()
  }

  @Watch('contractForm') onWatchContractForm () {
    this.getContractForm()
  }

  queryCategoryAll () {
    this.detailContractList = JSON.parse(JSON.stringify(this.contractForm))
    getCategoryAll().then((data) => {
      this.templateList = data
      if (this.pageType === 'init' || this.contractForm.length === 0) {
        this.templateId = data[0].id
        this.contractVersion = data[0].catCode
      } else {
        data.forEach((item: any, index: number) => {
          if (item.catCode === this.detailContractList[0].contractVersion) {
            this.templateId = item.id
          }
        })
        this.contractVersion = this.detailContractList[0].contractVersion
      }
      const params = {
        categoryId: this.templateId,
        quotaCode: this.quotaCode
      }
      return getInfoByCategoryId(this.templateId, this.quotaCode)
    }).then((data) => {
      this.initContractForm = []
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.initContractForm.push({
            contractConfig: String(item.contractConfig),
            contractTakeEffectNode: String(item.contractTakeEffectNode),
            contractType: String(item.contractTypeId),
            contractTypeName: item.contractTypeName,
            templateInfoList: item.templateInfoList,
            contractVersion: this.contractVersion,
            contractApproveType: '1'
          })
          if (this.detailContractList.length > 0) {
            this.detailContractList.forEach((childItem: any, childIndex: number) => {
              if (childItem.contractType === item.contractTypeId) {
                childItem.contractTypeName = item.contractTypeName
                this.form.contractList.push({
                  contractTypeName: item.contractTypeName,
                  contractVersion: childItem.contractVersion,
                  contractType: childItem.contractType,
                  contractTemplateId: Number(childItem.contractTemplateId) === 0 ? '' : Number(childItem.contractTemplateId),
                  contractTemplateName: item.contractName,
                  contractTakeEffectNode: String(childItem.contractTakeEffectNode) === '0' ? '' : String(childItem.contractTakeEffectNode),
                  contractSignType: String(childItem.contractSignType) === '0' ? '' : String(childItem.contractSignType),
                  contractConfig: String(childItem.contractConfig),
                  contractApproveType: '1',
                  templateInfoList: childItem.templateInfos
                })
              }
            })
          }
        })
        if (this.pageType === 'init' || this.contractForm.length === 0) {
          this.form.contractList = this.initContractForm
        }
      }
    })
  }

  onChangeTemplate (value: any) {
    this.initContractForm = []
    this.templateList.forEach((item: any, index: number) => {
      if (item.id === value) {
        this.contractVersion = item.catCode
      }
    })
    const params = {
      categoryId: value,
      quotaCode: this.quotaCode
    }
    getInfoByCategoryId(this.templateId, this.quotaCode).then((data) => {
      this.initContractForm = []
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.initContractForm.push({
            contractConfig: String(item.contractConfig),
            contractTakeEffectNode: String(item.contractTakeEffectNode),
            contractType: String(item.contractTypeId),
            contractTypeName: item.contractTypeName,
            templateInfoList: item.templateInfoList,
            contractVersion: this.contractVersion,
            contractApproveType: '1'
          })
        })
        this.form.contractList = this.initContractForm
      }
    })
  }

  onChangeConfig (index: number, row: any) {

  }

  validContract () {
    return this.contractRef.validate().then((valid: boolean) => {
      return valid
    })
  }

  mounted () {
    this.getContractForm()
    this.queryCategoryAll()
    const access = this.$auth.accessSync('/project/product/edit/contract') || this.$auth.accessSync('/project/product/open-edit/contract')
    if (access) {
      this.accessContract = true
    }
  }

  $style!: any
}
</script>

<style lang="scss" module>
  .colwidth {
    width: 100%;
  }
  .el-radio-group{
    width: 100%;
  }
  .rowcenter{
    display: flex;
    align-items: center;
  }
  .textC{
    text-align: center;
  }
  .contract {
   .el-table .cell .el-form-item{
      margin-bottom: 0
    }
  }

  .form {
    :global {
      .el-form-item {
        margin-bottom: 0;
      }
      .el-table td {
        padding: 0;
        line-height: 48px;
        height: 48px;
      }
    }
  }
</style>
