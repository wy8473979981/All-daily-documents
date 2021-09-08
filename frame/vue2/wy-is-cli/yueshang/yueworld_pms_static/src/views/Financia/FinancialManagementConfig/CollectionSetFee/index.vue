<!--
 * @Author: chenkeju9933
 * @LastEditors: xza
 * @Description: 收款配置-费项关系
-->
<template>
  <div class="app-page-main">
    <YsnPageFormTableContent
      ref="CollectionSetFee"
      :search-column="4"
      :search-form="searchForm"
      :query-config="queryConfig"
      show-left
      :left-config="leftConfig"
      :table-config="formTableConfig"
      persmission="CollectionSetFee"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="save">保存</ysn-btn>
      </template>
    </YsnPageFormTableContent>
  </div>
</template>
<script>
// 请求api
import { collectionSetApi } from '@/api/collectionSet'
export default {
  name: 'CollectionSetFee',
  props: {},
  data() {
    return {
      leftConfig: {
        title: '项目', // 大标题
        subTitle: '', // 副标题
        topBtn: true, // 进阶配置
        dataList: this.$PUBFN.getOptionsList('freeRelationship')
      },
      formTableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { feeName: '费项名称', itemType: 'text', required: false, width: 200, isShow: true },
        { payeeCompanyId: '收款单位及编码', itemType: 'select', required: false, width: 300, isShow: true, list: this.$PUBFN.getOptionsList('payee') },
        { taxClassification: '税收分类编码', itemType: 'input', required: false, isShow: true, width: 300 }
      ],
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: ''
      },
      // 接口请求配置
      queryConfig: {
        api: collectionSetApi.feeList,
        dataKey: 'list'
      }
    }
  },
  methods: {
    // 左侧点击搜
    async leftChange(e) {
      this.searchForm.fuzzyEnquiry = e.programId[0].toString()
      console.log(e)
      if (e.programId.length > 1) {
        this.searchForm.fuzzyEnquiry = 'x'
      }
      await this.$refs.CollectionSetFee.getList()
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
    // 保存
    save() {
      // 后续需要更改接口传的值 不确定传ID  还是 tableData
      collectionSetApi.feeListSave().then((res) => {
        console.log(res)
        // 保存成功
        if (res.success === 'ok') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message.error('保存失败')
        }
      })
    }
  }
}
</script>
