<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: 应付单详情弹窗配置
-->
<template>
  <div>
    <ysn-dialog
      :title="'详情'"
      :width="'920px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :out-close="outClose"
      :is-determine="false"
      :is-cancel="isCancel"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <!-- 合同信息插槽 -->
        <ysn-flod :title="'合同信息'" :show-flod="false" />
        <el-form :model="currentFormData" label-position="top" size="small">
          <!-- 合同信息数据 -->
          <ysn-formItem :form="currentFormData" :config="configDataOne" :column="4" clearable text />
        </el-form>
        <!-- 付款单详情插槽 -->
        <ysn-flod :title="'付款单信息'" :show-flod="false" />
        <el-form :model="currentFormData" label-position="top" size="small" class="mt-8">
          <!-- 付款单详情数据显示 -->
          <ysn-formItem :form="currentFormData" :config="configDataTou" clearable text />
        </el-form>
        <!-- 付款单详情插槽 -->
        <ysn-flod :title="'应付明细'" :show-flod="false" />
        <ysn-formTable
          ref="currentFormData"
          v-model="currentTableData"
          prop="TableData"
          :column="formTableConfig"
          text
        />
      </template>

    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'PayableEnterAdd',
  components: {},
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
      isDetermine: false, // 是否需要确定按钮
      isCancel: false, // 是否需要取消按钮
      outClose: true,
      visible: false,
      // 请求后的数据
      reqData: {},
      configDataOne: [ // 表单配置
        { itemType: 'text', prop: 'payableId', label: '应付编号' },
        { itemType: 'text', prop: 'contNo', label: '合同编号' },
        { itemType: 'text', prop: 'programName', label: '项目名称' },
        { itemType: 'text', prop: 'sourceDocumentsId', label: '来源单据编号' },
        { itemType: 'text', prop: 'dataSource', label: '数据来源' },
        { itemType: 'text', prop: 'tenantId', label: '商家/企业' },
        { itemType: 'text', prop: 'brandName', label: '品牌' },
        { itemType: 'text', prop: 'shopNo', label: '铺位号' },
        { itemType: 'text', prop: 'payableAmount', label: '应付金额', type: 'money' },
        { itemType: 'text', prop: 'payableTime', label: '应付日期' },
        { itemType: 'text', prop: 'verificationStatusId', label: '核销状态' }
      ],
      configDataTou: [ // 表单配置
        { itemType: 'text', prop: 'accountName', label: '付款单位' },
        { itemType: 'text', prop: 'bankName', label: '付款银行' },
        { itemType: 'text', prop: 'bankAccount', label: '付款账户' }
      ],
      //   v-model对象
      formTableData: {
        // 取v-model[prop]值作为绑定数据列表
        TableData: []
      },
      flag: false,
      formTableConfig: [// 表格配置
        { id: '序号', type: 'index', itemType: 'text' },
        { feeName: '费项', itemType: 'text' },
        { payableAmountONE: '应付金额(元)', itemType: 'text', type: 'money' },
        { tax: '税率(%)', itemType: 'text', align: 'right' },
        { payableNotReceivedAmount: '应付未核销金额(元)', itemType: 'text', type: 'money' },
        { payableReceivedAmount: '应付已核销金额(元)', itemType: 'text', type: 'money' }
      ]

    }
  },
  computed: {
    //   return 列表页数据
    currentFormData() {
      return this.formData
    },
    currentTableData() {
      return this.formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}

</script>
