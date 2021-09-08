<!--
 * @Author: zbk
 * @Date: 2021-07-24 14:21:54
 * @LastEditTime: 2021-08-10 15:18:28
 * @LastEditors: xza
-->
<template>
  <el-form
    ref="ruleForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="ruleForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'UserInfo',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'userInfo',
    event: 'change'
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    routeMess: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      flag: 0,
      ruleForm: {
        isTenant: [
          { required: true, message: '请选择是否租户' }
        ],
        operationDate: [
          { required: true, message: '请选择日期' }
        ],
        payConpanyName: [
          { required: true, message: '请选择缴款单位' }
        ]
      },
      // 表单配置
      userInfoConfig: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'isTenant',
          label: '是否商家',
          placeholder: '请输入',
          list: this.$PUBFN.getOptionsList('isShowTotalAmount'),
          change: this.contractNoChange
        },
        {
          itemType: 'datePicker',
          type: 'date',
          prop: 'operationDate',
          label: '开票日期',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          prop: 'status',
          label: '收据状态',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'receiptId',
          label: '收据编号',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'contNo',
          label: '合同编号',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('conID')
        },
        {
          itemType: 'input',
          prop: 'programName',
          label: '项目名称',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'tenantName',
          label: '商家/企业名称',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '收款单位',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('accountNames')
        },
        {
          itemType: 'input',
          prop: 'payConpanyName',
          label: '缴款单位',
          placeholder: '请填写'
        },
        {
          itemType: 'input',
          prop: 'operationUser',
          label: '经办人员',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'securityCode',
          label: '防伪编码',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'remark',
          label: '备注信息',
          placeholder: '请输入',
          span: 10,
          change: this.contractNoChange
        }
      ],
      newConfig: [
        {
          itemType: 'select',
          prop: 'isTenant',
          label: '是否商家',
          placeholder: '请输入',
          list: this.$PUBFN.getOptionsList('isShowTotalAmount'),
          change: this.contractNoChange
        },
        {
          itemType: 'datePicker',
          prop: 'operationDate',
          label: '开票日期',
          required: false,
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'status',
          label: '收据状态',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'receiptId',
          label: '收据编号',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'securityCode',
          label: '防伪编码',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'remark',
          label: '备注信息',
          placeholder: '请输入',
          span: 2,
          change: this.contractNoChange
        }
      ],
      lastConfig: [
        {
          itemType: 'select',
          prop: 'isTenant',
          label: '是否商家',
          placeholder: '请输入',
          list: this.$PUBFN.getOptionsList('isShowTotalAmount'),
          change: this.contractNoChange
        },
        {
          itemType: 'datePicker',
          prop: 'operationDate',
          label: '开票日期',
          required: false,
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'status',
          label: '收据状态',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'receiptId',
          label: '收据编号',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'programName',
          label: '项目名称',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '收款单位',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('accountNames')
        },
        {
          itemType: 'input',
          prop: 'payConpanyName',
          label: '缴款单位',
          placeholder: '请填写'
        },
        {
          itemType: 'input',
          prop: 'operationUser',
          label: '经办人员',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'update',
          prop: 'securityCode',
          label: '防伪编码',
          placeholder: '--系统自动生成--',
          disabled: true
        }
      ]
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    configData() {
      if (this.flag === 0) {
        return this.newConfig
      }
      if (this.flag === 1) {
        return this.userInfoConfig
      }
      if (this.flag === 2) {
        return this.lastConfig
      }
    }
  },
  methods: {
    // 模板名称change
    contractNoChange(val) {
      if (val.isTenant === 1) {
        this.flag = 1
      } else {
        this.flag = 2
      }
      console.log(val)
      this.$emit('comChange', { type: '1', val })
      // const obj = this.formDatas.userInfo
      // for (const k in obj) {
      //   for (const key in this.currentFormData) {
      //     if (k === key) {
      //       obj[k] = this.currentFormData[key]
      //     }
      //   }
      // }
      // this.$refs.userInfo.validate((valids, failedObjs) => {
      //   if (valids) {
      //     this.$emit('comChange', { type: '1', data: this.formDatas.userInfo })
      //   }
      // })
    }
  }
}
</script>
