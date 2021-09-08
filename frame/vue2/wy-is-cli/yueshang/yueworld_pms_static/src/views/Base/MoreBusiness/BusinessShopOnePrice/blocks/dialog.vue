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
        <ysn-table v-else :data="formData.cycleCostList" :column="cycleCostTableConfig" :checkbox="false" />
        <ysn-flod title="变更日志" :show-flod="false" />
        <ysn-table :data="formData.logTableList" :column="logTableConfig" :checkbox="false" :show-slots="['detail']">
          <template #detail="scope">
            <div class="free-show-text">
              <p v-for="(item,index) in scope.row.detail" :key="index">
                {{ item.feeName }}：{{ item.standardFee }}元/m²/{{ item.standardFeeTimeUnit }}
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
import PUBFN from '@/utils/pubFn'
import { baseProjectApi } from '@/api'

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
      },
      formTableConfig: [
        {
          feeName: '费项名称',
          itemType: 'select',
          width: '200px',
          inputType: 'String',
          list: PUBFN.getOptionsList('onePriceList'),
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
          list: PUBFN.getOptionsList('moneyTimeType'),
          required: true
        }
      ],
      formTableRules: {
        feeName: [{ required: true, message: '' }],
        standardFee: [{ required: true, message: '' }],
        standardFeeTimeUnit: [{ required: true, message: '' }]
      },
      // 周期费用详情table配置
      cycleCostTableConfig: [
        { feeName: '费项名称', sortable: false, isShow: true, fixedWidth: '250px' },
        { standardFee: '费项标准(元/m²)', sortable: false, isShow: true, type: 'money', fixedWidth: '200px' },
        { standardFeeTimeUnit: '费项时间单位', sortable: false, isShow: true }
      ],
      logTableConfig: [
        { changTime: '变更日期', sortable: false, isShow: true, width: 120 }, // todo:字段名称
        // { standardDeposit: '租赁保证金标准(元)', sortable: false, isShow: true, type: 'money', width: 200 },
        // { standardRentFreePeriod: '免租期(天)', sortable: false, isShow: true, width: 160 },
        { detail: '详情', sortable: false, isShow: true, fixedWidth: 540 } // todo:字段名称
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
            prop: 'diverseName',
            label: '多经名称',
            placeholder: '请输入',
            width: '206px',
            disabled: true
          }
          // {
          //   itemType: 'input',
          //   prop: 'standardDeposit',
          //   label: '租赁保证金标准(元)',
          //   placeholder: '请输入',
          //   width: '206px'
          // },
          // {
          //   itemType: 'input',
          //   prop: 'standardRentFreePeriod',
          //   label: '免租期(天)',
          //   placeholder: '请输入',
          //   width: '206px'
          // },
          // {
          //   itemType: 'select',
          //   prop: 'checkStatus',
          //   label: '审核状态',
          //   width: '206px',
          //   list: this.$PUBFN.getOptionsList('auditStatus')
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
          prop: 'diverseName',
          label: '多经名称',
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
        //   prop: 'standardRentFreePeriod',
        //   label: '免租期(天)',
        //   width: '206px'
        // },
        // {
        //   itemType: 'text',
        //   prop: 'checkStatus',
        //   label: '审核状态',
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
            await baseProjectApi.shopOnePriceAuditAudit(form)
            this.handleVisibleClose()
            await this.$PUBFN.routerPushNew({
              name: 'BusinessShopOnePriceAuditList'
            })
          }
        } catch (e) {
          console.log(e)
        }
        return
      }
      // 详情审核
      await baseProjectApi.shopOnePriceAuditAudit(form)
      this.handleVisibleClose()
      this.$PUBFN.routerPushNew({
        name: 'BusinessShopOnePriceAuditList'
      })
    }
  }
}
</script>
