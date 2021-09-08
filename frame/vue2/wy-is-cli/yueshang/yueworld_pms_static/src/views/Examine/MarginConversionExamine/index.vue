<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 保证金转换单OA审核记录
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="MarginConversionExamine"
    >
      <template #topLeft>
        <span class="mr-24">{{ formData.baseInfo.programName }}</span>
        <span class="mr-24">转出商家：{{ formData.baseInfo.outTenantName }}</span>
        <span class="mr-24">转入商家：{{ formData.baseInfo.inTenantName }}</span>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { marginConversionApi } from '@/api/marginConversion'
import { pageConfig } from './config'
export default {
  name: 'MarginConversionExamine',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 数据
      formData: {
        baseInfo: {
        // 详情数据
          programName: '', // 项目
          ConversionDate: '', // 转换日期
          outTenantName: '', // 转出商家
          conversionNo: '', // 转换单号
          inTenantName: '', // 转入商家
          inContNo: '', // 转入合同
          description: '' // 备注
        },
        // 转换明细
        convertDetail: {
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { outContNo: '转出意向/合同编号' },
            { outFeeName: '费项' },
            { accountName: '收款单位' },
            { turnableAmount: '可转入金额(元)', type: 'money', width: '120px' },
            { turnAmount: '转入金额(元)', type: 'money', width: '110px' },
            { applicationAmount: '冲抵金额(元)', type: 'money', width: '130px' }
          ]
        },
        // 冲抵明细
        pushMDetail: {
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { feeName: '收款费项' },
            { receivableNo: '应收编号' },
            { receivableDate: '应收日期' },
            { accrualDate: '权责月' },
            { receivableAmount: '应收金额(元)', type: 'money', width: '120px' },
            { verificationAmount: '已核销金额(元)', type: 'money', width: '140px' },
            { subAmount: '减免金额(元)', type: 'money', width: '120px' },
            { realReceivableAmount: '未核销金额(元)', width: '140px', type: 'money' },
            { offsetAmount: '保证金冲抵金额(元)', width: '160px', type: 'money' },
            { note: '备注' }
          ]
        },
        // 审核记录
        historyShow: {
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { feeName: '处理时间', width: '200px' },
            { receivableNo: '处理者', width: '200px' },
            { receivableDate: '步骤', width: '200px', color: '#123456' },
            { accrualDate: '操作说明', width: '200px' }
          ]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
  },
  mounted() {

  },
  methods: {
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      marginConversionApi.marginConversionDetails(datas).then(res => {
        console.log(res)
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.convertDetail && res.convertDetail.tableData !== undefined && res.convertDetail.tableData.length > 0) {
          that.formData.convertDetail.tableData = res.convertDetail.tableData
        }
        if (res.pushMDetail && res.pushMDetail.tableData !== undefined && res.pushMDetail.tableData.length > 0) {
          that.formData.pushMDetail.tableData = res.pushMDetail.tableData
        }
        if (res.historyShow && res.historyShow.tableData !== undefined && res.historyShow.tableData.length > 0) {
          that.formData.historyShow.tableData = res.historyShow.tableData
        }
        that.update++
      })
    },
    // 审核记录
    handlerClick() {

    }

  }
}
</script>
