<!--
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 收款配置 新增/编辑弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="!isEdit ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'920px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗内容 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="getNewArr"
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
            title="提示"
            width="484px"
            top="120px"
            :content="`确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn v-if="isEdit" type="delete" class="color-red pr-16">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
// 请求api
import { collectionSetApi } from '@/api/collectionSet'
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
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
          prop: 'payeeCompanyId',
          label: '收款单位编码',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'programName',
          label: '适用项目',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('BankAccounts'),
          required: true
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '收款单位',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('payee')
        },
        {
          itemType: 'input',
          prop: 'accountNameShort',
          label: '简称',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'payeeCompanyType',
          label: '主体',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('PayeeCompanyType')
        },
        {
          itemType: 'select',
          prop: 'bankName',
          label: '银行',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('collectionBankName')
        },
        {
          itemType: 'input',
          prop: 'bankAccount',
          label: '账户',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'isAgent',
          label: '代收',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('distributionType')
        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('selectstatus')
        },
        {
          itemType: 'select',
          prop: 'subjectInfo',
          label: '科目',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('allProjectFeeNo')
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
      // 表单验证
      rulesForm: {
        accountName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        programName: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        bankName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        payeeCompanyType: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    //   return 从列表页里获取到的数据
    formDataObj() {
      return this.formData
    },
    // 编辑的时候对configData进行过滤
    getNewArr() {
      if (!this.isEdit) {
        const newArr = this.configData.filter(i => {
          return i.prop !== 'creatDate'
        })
        return newArr
      } else {
        return this.configData
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 新增保存/编辑提交
    preservation() {
      if (!this.isEdit) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            collectionSetApi.collectionSetCreate(this.formDataObj).then(() => {
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
          collectionSetApi.collectionSetEdit(this.formDataObj).then(() => {
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
    // 删除
    remove() {
      collectionSetApi.collectionSetDelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('remove')
      })
    }
  }
}
</script>
