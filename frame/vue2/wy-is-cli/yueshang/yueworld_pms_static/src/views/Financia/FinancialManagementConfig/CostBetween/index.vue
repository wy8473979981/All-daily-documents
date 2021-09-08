<!--
 * @Author: zbk
 * @LastEditors: xza
 * @Description: 开票配置-费项关系
-->
<template>
  <div class="app-page-main">
    <YsnPageFormTableContent
      ref="CostBetween"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="formTableConfig"
      show-left
      :left-config="leftConfig"
      persmission="CostBetween"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn
          class="mr-8 ml-8"
          @click="save"
        >保存</ysn-btn>
      </template>
    </YsnPageFormTableContent>
  </div>
</template>
<script>
// 请求api
import { meterApi } from '@/api/openInvoice'
export default {
  name: 'CostBetween',
  props: {},
  data() {
    return {
      leftConfig: {
        title: '项目', // 大标题
        topBtn: true, // 进阶配置
        dataList: this.$PUBFN.getOptionsList('freeRelationship')
      },
      formTableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        {
          feeName: '费项名称',
          itemType: 'text',
          required: false,
          isShow: true
        },
        {
          payeeInvoiceId: '开票单位及编码',
          itemType: 'select',
          required: false,
          width: 120,
          isShow: true,
          list: this.$PUBFN.getOptionsList('FeeSubjectAll')
        },
        {
          taxClassification: '税收分类编码',
          itemType: 'input',
          required: false,
          width: 300,
          isShow: true,
          list: this.$PUBFN.getOptionsList('FeeSubjectAll'),
          change: this.clickSelect
        }
      ],
      formData: {
        baseInfo: {
          id: '',
          feeName: '',
          taxInfo: ''
        }
      },
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: '' // 项目
      },
      // 接口请求配置
      queryConfig: {
        api: meterApi.feeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      }
    }
  },
  methods: {
    // 左侧点击搜
    async leftChange(e) {
      this.searchForm.programName = e.programId[0].toString()
      console.log(e)
      if (e.programId.length > 1) {
        this.searchForm.programName = 'x'
      }
      await this.$refs.CostBetween.getList()
      this.update++
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    clickSelect(val) {
      this.formData.baseInfo = { ...this.formData.baseInfo, ...val }
    },
    // 保存
    save() {
      meterApi.feeSave(this.formData.baseInfo).then((res) => {
        if (res.code === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

