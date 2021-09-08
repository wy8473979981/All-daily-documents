<!--
 * @Author: zbk
 * @LastEditors: jiallk
 * @Description: 开票配置新增/编辑弹窗
-->
<template>
  <div>
    <ysn-dialog
      ref="dialogFormAdd"
      :title="!isEdit ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'920px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
      @beforeClose="beforeClose"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="configData"
            :column="4"
            :form="formDataObj"
            clearable
          />
        </el-form>
        <ysn-flod :title="'开票参数'" flodicon @iconsval="flodClick">
          <ysn-formTable
            ref="tableRule"
            v-model="formDatas.detailedData"
            prop="tableData"
            :column="formTableConfig"
            :rules="formTableRules"
            add
            :first-row-add="false"
          />
        </ysn-flod>
      </template>

      <!-- 保存按钮 -->
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
import PUBFN from '@/utils/pubFn'
import { accountingProcesApi } from '@/api/accountingProces'
export default {
  name: 'DialogFormAdd',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 表单数据
    isEdit: { type: Boolean, default: false }
  },
  data() {
    return {
      firstTime: 0,
      lastTime: 0,
      flag: true,
      telFlag: true, // 手机号格式是否正确
      update: 0, // 更新视图用
      // 数据
      formDatas: {
        baseInfo: {
        },
        // 费用信息
        detailedData: {
          tableData: [
          ]
        }
      },
      outClose: true,
      //   表单配置
      configData: [
        {
          itemType: 'input',
          prop: 'payeeInvoiceId',
          label: '开票单位编码',
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
          list: this.$PUBFN.getOptionsList('openInvoic')
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '开票单位',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('ticketsUnit')
        },
        {
          itemType: 'input',
          prop: 'UnifiedSocialCreditCode',
          label: '统一社会信用代码',
          inputType: 'autoValue',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'phone',
          prop: 'tel',
          label: '电话',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'address',
          label: '地址',
          width: '650px',
          span: 3,
          disabled: true,
          inputType: 'autoValue'
        },
        {
          itemType: 'select',
          prop: 'bankName',
          label: '银行',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('bankName')
        },
        {
          itemType: 'input',
          prop: 'bankAccount',
          label: '账户',
          width: '206px',
          disabled: true,
          inputType: 'autoValue'
        },
        {
          itemType: 'input',
          prop: 'drawerRealName',
          label: '开票人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'reviewerrRealName',
          label: '复核人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'payeerRealName',
          label: '收款人',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'programNo',
          label: '项目号',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'diskNo',
          label: '税盘编号',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'ukeyNo',
          label: '开票点编码',
          placeholder: '请输入',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'status',
          label: '状态',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('selectstatus')
        }
      ],
      //   表单校验
      rulesForm: {
        programName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        accountName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        thirdPartyId: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        drawerRealName: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        reviewerrRealName: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        payeerRealName: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        projectId: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        diskNo: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        ukeyNo: [
          { required: false, message: '请选择必填项', trigger: 'change' }
        ],
        assistingName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        bankName: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择必填项', trigger: 'change' }
        ]
      },
      //   表格配置
      formTableConfig: [
        { invoiceType: '开票类型', itemType: 'select', list: PUBFN.getOptionsList('invoiceTypes'), required: false },
        { identitySecretkey: '身份认证秘钥', itemType: 'input', inputType: 'Text', required: true },
        { UnifiedSocialCreditCode: '统一社会信用代码', itemType: 'input', inputType: 'Text', required: true, width: '100' },
        { mainExtensionNumber: '主分机号', itemType: 'input', inputType: 'Text', required: true },
        { terminalNumber: '终端号', itemType: 'input', inputType: 'Text', required: true },
        { invoiceAddress: '开票地址', itemType: 'input', required: true }
      ],
      //   表格校验
      formTableRules: {
        identitySecretkey: [
          { required: true, message: '请选择必填项', trigger: 'blur' }
        ],
        UnifiedSocialCreditCode: [
          { required: true, message: '请选择必填项', trigger: 'blur' }
        ],
        mainExtensionNumber: [
          { required: true, message: '请选择必填项', trigger: 'blur' }
        ],
        terminalNumber: [
          { required: true, message: '请选择必填项', trigger: 'blur' }
        ],
        invoiceAddress: [
          { required: true, message: '请选择必填项', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    //   return 列表页中获取到的数据
    formDataObj() {
      return this.formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
      this.formDatas.detailedData.tableData = [] // 关闭弹窗时的数据处理
    },

    formRule() {
      return new Promise(res => {
        this.$refs.ruleForm.validate(valid => {
          res(valid)
        })
      })
    },
    formTableRule() {
      return new Promise(res => {
        this.$refs.tableRule.validate(valid => {
          res(valid)
        })
      })
    },
    // 新增保存/编辑提交
    async preservation() {
      // 新增保存
      const valid1 = await this.formRule()
      const valid2 = await this.formTableRule()
      if (valid1 && valid2) {
        this.outClose = !this.outClose
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.formDatas.detailedData.tableData = []
        this.$emit('successTableList')
      }
    },
    //  点击保存后的弹窗数据处理
    beforeClose(done) {
      this.$tool.info(this.formDatas.detailedData || this.formDatas.baseInfo)
      done()
    },
    // 删除当前列
    remove() {
      accountingProcesApi.accountingProcesDelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.formDatas.detailedData.tableData = []
        this.$emit('remove')
      })
    },
    // 点击 flodicon 新增一行
    async flodClick() {
      if (this.formDatas.detailedData.tableData !== undefined) {
        const datas = { invoiceType: [], identitySecretkey: '', UnifiedSocialCreditCode: '', mainExtensionNumber: '', terminalNumber: '', invoiceAddress: '' }
        this.formDatas.detailedData.tableData.push(datas)
      }
    }
  }
}
</script>
