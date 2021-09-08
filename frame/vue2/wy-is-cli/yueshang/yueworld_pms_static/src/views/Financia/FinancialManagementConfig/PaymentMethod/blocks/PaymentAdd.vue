<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: 收款方式-新增/编辑弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="!formData.paymentTypeId ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'476px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表单内容 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            v-if="formData.paymentTypeId? false:true"
            :config="configData"
            :column="2"
            :form="formDataObj"
            clearable
          />
          <ysn-formItem
            v-if="!formData.paymentTypeId? false:true"
            :config="configDataEdit"
            :column="2"
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
            v-if="!formData.paymentTypeId? false:true"
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
          </ysn-confirm>
        </div>
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
      //   表单配置
      configData: [
        {
          itemType: 'input',
          prop: 'paymentTypeId',
          label: '收款方式编码',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'thirdPartyId',
          label: '三方编码',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'paymentTypeName',
          label: '收款方式名称',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          list: PUBFN.getOptionsList('selectstatus'),
          width: '206px'
        }
      ],
      //   表单配置
      configDataEdit: [
        {
          itemType: 'input',
          prop: 'paymentTypeId',
          label: '收款方式编码',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'thirdPartyId',
          label: '三方编码',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'paymentTypeName',
          label: '收款方式名称',
          placeholder: '请输入',
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
        paymentTypeName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    //   return 从列表页获取到的数据
    formDataObj() {
      return this.formData
    }
  },

  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
      this.$emit('successTableList')
    },
    // 新增保存/编辑提交
    preservation() {
      if (!this.formData.paymentTypeId) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            PayableApi.PaymentAdd(this.formDataObj).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('successTableList')
            })
          }
        })
        return
      }
      // 提交编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          PayableApi.PaymentAddEdit(this.formDataObj).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('successTableList')
          })
        }
      })
    },
    // 删除当前列
    remove() {
      PayableApi.PaymentAddDelete(this.formDataObj).then(() => {
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
