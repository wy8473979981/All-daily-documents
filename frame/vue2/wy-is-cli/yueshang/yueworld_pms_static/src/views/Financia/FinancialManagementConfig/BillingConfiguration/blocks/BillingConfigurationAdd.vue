<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:账单配置新增/编辑弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="!formData.creatDate ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'920px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          v-if="!formData.creatDate? true:false"
          ref="ruleForm"
          :model="formDataOne"
          label-position="top"
          size="small"
          :rules="rulesFormEdit"
        >
          <ysn-formItem
            :config="configData"
            :column="4"
            :form="formDataOne"
            clearable
          />
        </el-form>
        <el-form
          v-if="!formData.creatDate? false:true"
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="configDataEdit"
            :column="4"
            :form="formDataObj"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存/删除按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">保存</ysn-btn>
          <ysn-confirm
            v-if="!formData.creatDate? false:true"
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn type="delete" class="mr-12">删除</ysn-btn>
          </ysn-confirm></div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
// 字典
import PUBFN from '@/utils/pubFn'
// 请求api
import { PayableApi } from '@/api/PayableList'
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  // 表单数据
  data() {
    return {
      outClose: true,
      formDataOne: {
        programName: '', // 适用项目
        contractType: '', // 合同类型
        object: [], // 适用铺位
        status: '', // 状态
        settlementRealName: '', // 结算联系人
        settlementTel: '', // 电话
        settlementEmail: '', // 邮箱
        settlementFax: '', // 传真
        leaseRealName: '', // 租凭联系人
        leaseTel: '', // 电话
        leaseEmail: '', // 邮箱
        invoiceRealName: '', // 开票联系人
        invoiceTel: '', // 电话
        invoiceEmail: '', // 邮箱
        invoiceFax: '', // 传真
        remark: '', // 备注
        creatDate: '' // 创建时间

      },
      //    表单配置
      configData: [
        {
          itemType: 'select',
          prop: 'programName',
          label: '适用项目',
          list: PUBFN.getOptionsList('projectList'),
          width: '206px',
          placeholder: '请选择'
        },
        {
          itemType: 'select',
          prop: 'contractType',
          label: '合同类型',
          list: PUBFN.getOptionsList('contractTypeA'),
          placeholder: '请选择',
          width: '206px'
        },
        {
          itemType: 'cascaderDialog',
          prop: 'object',
          label: '适用铺位',
          labelText: '适用铺位',
          placeholder: '请选择',
          listName: 'label',
          listValue: 'value',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          list: PUBFN.getOptionsList('selectstatus'),
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementRealName',
          label: '结算联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'settlementTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseRealName',
          label: '租赁联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'leaseTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceRealName',
          label: '开票联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'invoiceTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'remark',
          label: '备注',
          placeholder: '请输入小于300个文字，该信息将用于填充账单备注区域',
          maxlength: 300, // 输入框字数限制于300
          width: '428px',
          labelPosition: 'left'
        }
      ],
      //    表单配置
      configDataEdit: [
        {
          itemType: 'select',
          prop: 'programName',
          label: '适用项目',
          list: PUBFN.getOptionsList('projectList'),
          width: '206px',
          placeholder: '请选择'
        },
        {
          itemType: 'select',
          prop: 'contractType',
          label: '合同类型',
          list: PUBFN.getOptionsList('contractTypeA'),
          placeholder: '请选择',
          width: '206px'
        },
        {
          itemType: 'cascaderDialog',
          prop: 'object',
          label: '适用铺位',
          placeholder: '请选择',
          width: '206px'

        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          list: PUBFN.getOptionsList('selectstatus'),
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementRealName',
          label: '结算联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'settlementTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'settlementFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseRealName',
          label: '租赁联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'leaseTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'leaseFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceRealName',
          label: '开票联系人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'phone',
          prop: 'invoiceTel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceEmail',
          label: '邮箱',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'invoiceFax',
          label: '传真',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'remark',
          label: '备注',
          placeholder: '请输入小于300个文字，该信息将用于填充账单备注区域',
          maxlength: 300, // 输入框字数限制于300
          width: '428px',
          span: '4',
          labelPosition: 'left'
        },
        {
          itemType: 'datePicker',
          type: 'datetime',
          valueFormat: 'yyyy-MM-dd HH:mm',
          prop: 'creatDate',
          label: '创建时间',
          placeholder: '请选择',
          width: '206px',
          disabled: true
        }
      ],
      rulesForm: {
        // 表单验证
        programName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        contractType: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        object: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        settlementRealName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        settlementTel: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        leaseRealName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        leaseTel: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        invoiceRealName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        invoiceTel: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        settlementEmail: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]

      },
      // 表单验证
      rulesFormEdit: {
        programName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        contractType: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        object: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        settlementRealName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        settlementTel: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]

      }
    }
  },
  computed: {
    //   return 列表传过来的数据
    formDataObj() {
      return this.formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
      // 关闭弹窗清除新增缓存数据
      this.$refs.ruleForm.resetFields()
    },
    // 新增保存
    preservation() {
      if (!this.formData.creatDate) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            PayableApi.BillingConfigurationAdd(this.formDataObj).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              // 提交保存清除新增缓存数据
              this.$refs.ruleForm.resetFields()
            })
          }
        })
        return
      }
      // 编辑保存
      if (this.formData.creatDate) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            PayableApi.BillingConfigurationEdit(this.formDataObj).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$refs.ruleForm.resetFields()
            })
          }
        })
      }
    },
    // 删除当前列
    remove() {
      PayableApi.BillingConfigurationdelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        }, 2000)
        this.$emit('remove')
      })
    }
  }
}
</script>
