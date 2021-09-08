<template>
  <div>
    <ysn-dialog
      external
      :title="dialogType==='detail'?'详情':'编辑'"
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <ysn-flod :title="form.standardYear" :show-flod="false" />
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem
            :form="form"
            :config="configData"
            :rules="itemFormRules"
            :column="4"
            :text="dialogType==='detail'?true:false"
          />
        </el-form>
        <ysn-flod title="周期性费项标准明细" :show-flod="false" />
        <ysn-formTable
          v-if="dialogType==='edit'"
          ref="formTable"
          v-model="form"
          prop="cycleCostList"
          :column="formTableConfig"
          :rules="formTableRules"
          add
          :first-row-add="true"
        />
        <ysn-table v-else :data="formData.cycleCostList" :column="cycleCostTableConfig" :checkbox="false">
          <!-- 表头提示信息 -->
          <template slot="my">
            <div>
              递增率(%)
              <el-tooltip class="item" effect="dark" content="递增率为用户手工填写，非计算所得" placement="top">
                <i class="el-icon-warning" />
              </el-tooltip>
            </div>
          </template>
        </ysn-table>
        <ysn-flod title="变更日志" :show-flod="false" />
        <ysn-table :data="formData.logTableList" :column="logTableConfig" :checkbox="false" :show-slots="['detail']">
          <template #detail="scope">
            <div class="free-show-text">
              <p v-for="(item,index) in scope.row.detail" :key="index">
                {{ item.feeName }}：{{ item.standardFee }}元/m²/{{ item.standardFeeTimeUnit }}，递增率{{ item.standardFeeIncreasing }}%
              </p>
            </div>
          </template>
        </ysn-table>
      </template>
      <template #btn>
        <ysn-btn v-if="dialogType==='detail'" class="mr-12" @click="handlerEdit">编辑</ysn-btn>
        <ysn-btn v-if="dialogType==='detail'" class="mr-12" @click="handlerCancel">审核记录</ysn-btn>
        <ysn-btn v-if="dialogType!=='detail'" class="mr-12" @click="handlerAudit">发起审核</ysn-btn>
        <ysn-btn v-if="dialogType!=='detail'" class="mr-12" type="info" @click="handlerCancel">取消</ysn-btn>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
// import PUBFN from '@/utils/pubFn'
import { baseOfficesApi } from '@/api'

export default {
  name: 'SOPDialog',
  props: {
    dialogType: {
      type: String,
      default: 'edit' // detail=详情，edit=编辑
    },
    dialogNum: {
      type: Number,
      default: 0
    },
    formData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      visible: false,
      confirmVisiable: false,
      form: {
        // 周期性费项标准明细
        cycleCostList: [],
        // 变更日志
        logTableList: []
      },
      itemFormRules: {
        // standardDeposit: [{ required: true, message: '' }],
        // standardDecorationDeposit: [{ required: true, message: '' }],
        // standardRentFreePeriod: [{ required: true, message: '' }]
      },
      formTableConfig: [
        {
          feeName: '费项名称',
          itemType: 'select',
          width: '200px',
          inputType: 'String',
          required: true
        },
        {
          standardFee: '费项标准(元/m²)',
          itemType: 'input',
          width: '200px',
          inputType: 'Number',
          required: true
        },
        {
          standardFeeTimeUnit: '费项时间单位',
          itemType: 'select',
          width: '200px',
          inputType: 'String',
          required: true
        },
        {
          standardFeeIncreasing: '递增率(%)',
          itemType: 'input',
          width: '200px',
          inputType: 'Number',
          required: true
        }
      ],
      formTableRules: {
        feeName: [{ required: true, message: '' }],
        standardFee: [{ required: true, message: '' }],
        standardFeeTimeUnit: [{ required: true, message: '' }],
        standardFeeIncreasing: [{ required: true, message: '' }]
      },
      // 周期费用详情table配置
      cycleCostTableConfig: [
        { feeName: '费项名称', sortable: false, isShow: true, width: 120 },
        { standardFee: '费项标准(元/m²)', sortable: false, isShow: true, type: 'money' },
        { standardFeeTimeUnit: '费项时间单位', sortable: false, isShow: true },
        { standardFeeIncreasing: '递增率(%)', width: 105, sortable: false, isShow: true, type: 'rate', hasSlotHeader: true, slotsItem: 'my' }
      ],
      logTableConfig: [
        { changTime: '变更日期', sortable: false, isShow: true }, // todo:字段名称
        // { standardDeposit: '租赁保证金标准(元)', sortable: false, isShow: true, type: 'money', width: 160 },
        // { standardDecorationDeposit: '装修保证金标准(元)', sortable: false, isShow: true, type: 'money', width: 160 },
        // { standardRentFreePeriod: '免租期(天)', sortable: false, isShow: true },
        { detail: '详情', sortable: false, isShow: true, fixedWidth: 540 }, // todo:字段名称
        { username: '变更人', sortable: false, isShow: true, fixedWidth: 120 } // todo:字段名称
      ]
    }
  },
  computed: {
    // formItem配置 input||text
    configData() {
      const { dialogType } = this
      if (dialogType === 'edit') {
        return [
          {
            itemType: 'input',
            prop: 'programName',
            label: '所属项目',
            placeholder: '请输入',
            width: '206px',
            disabled: true
          },
          {
            itemType: 'input',
            prop: 'buildingName',
            label: '所属楼栋',
            placeholder: '请输入',
            width: '206px',
            disabled: true
          },
          {
            itemType: 'input',
            prop: 'floorName',
            label: '所属楼层',
            placeholder: '请输入',
            width: '206px',
            disabled: true
          },
          {
            itemType: 'input',
            prop: 'officeName',
            label: '单元号',
            placeholder: '请输入',
            width: '206px',
            disabled: true
          }
          // {
          //   itemType: 'input',
          //   prop: 'standardDeposit',
          //   label: '租赁保证金标准(元)',
          //   placeholder: '请输入',
          //   width: '206px',
          //   required: true
          // },
          // {
          //   itemType: 'input',
          //   prop: 'standardDecorationDeposit',
          //   label: '装修保证金标准(元)',
          //   placeholder: '请输入',
          //   width: '206px',
          //   required: true
          // },
          // {
          //   itemType: 'input',
          //   prop: 'standardRentFreePeriod',
          //   label: '免租期(天)',
          //   placeholder: '请输入',
          //   width: '206px',
          //   required: true
          // }
        ]
      }
      return [
        {
          itemType: 'text',
          prop: 'programName',
          label: '所属项目',
          width: '206px'
        },
        {
          itemType: 'text',
          prop: 'buildingName',
          label: '所属楼栋',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'text',
          prop: 'floorName',
          label: '所属楼层',
          width: '206px'
        },
        {
          itemType: 'text',
          prop: 'officeName',
          label: '单元号',
          width: '206px'
        }
        // {
        //   itemType: 'text',
        //   prop: 'standardDeposit',
        //   label: '租赁保证金标准(元)',
        //   width: '206px'
        // },
        // {
        //   itemType: 'text',
        //   prop: 'standardDecorationDeposit',
        //   label: '装修保证金标准(元)',
        //   width: '206px'
        // },
        // {
        //   itemType: 'text',
        //   prop: 'standardRentFreePeriod',
        //   label: '免租期(天)',
        //   width: '206px'
        // }
      ]
    }
  },
  watch: {
    dialogNum() {
      this.form = this.formData
      this.visible = true
    }
  },
  mounted() {
  },
  methods: {
    /**
     * @method:handleVisibleClose
     * @desc:dialog 关闭方法
     */
    handleVisibleClose() {
      // 初始化数据
      this.form = {}
      this.visible = false
    },
    saveClick() {

    },
    /**
     * 取消
     */
    handlerCancel() {
      this.handleVisibleClose()
    },
    /**
     * 编辑
     */
    handlerEdit() {
      this.$emit('changeType')
    },
    validateFrom(formRef) {
      return new Promise((resolve, reject) => {
        this.$refs[formRef].validate((valid, failedObj) => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      }
      )
    },
    /**
     * 审核
     */
    async handlerAudit() {
      const { form, dialogType } = this
      // 编辑审核逻辑
      if (dialogType === 'edit') {
        try {
          const ruleFormValid = await this.validateFrom('ruleForm')
          const formTableValid = await this.validateFrom('formTable')
          if (ruleFormValid && formTableValid) {
            await baseOfficesApi.officesOnePriceAuditAudit(form)
            this.handleVisibleClose()
            await this.$PUBFN.routerPushNew({
              name: 'OfficesOnePriceAuditList'
            })
          }
        } catch (e) {
          console.log(e)
        }
        return
      }
      // 详情审核
      await baseOfficesApi.officesOnePriceAuditAudit(form)
      this.handleVisibleClose()
      await this.$PUBFN.routerPushNew({
        name: 'OfficesOnePriceAuditList'
      })
    }
  }
}
</script>
