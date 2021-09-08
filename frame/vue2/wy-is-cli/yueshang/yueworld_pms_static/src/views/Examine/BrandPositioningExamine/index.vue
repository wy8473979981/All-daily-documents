<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description:品牌落位详情页面
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="brandPositioningDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="BrandPositioning"
      @examineOver="examineOver"
    />

  </div>
</template>
<script>
import { investmentApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'BrandPositioningExamine',
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
          brandPlacementNo: '', // 编号
          note: '', // 备注
          attachment: ''// 附件
        },
        detailedData: {
          tableData: [], // 表格数据
          tableConfig: [ // 表单配置
            { spaceName: '租赁区域' },
            { brandName: '品牌' },
            { spaceType: '商业类型' },
            { spaceFormatNamePlan: '规划业态' },
            { planner: '规划人员' }
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
      investmentApi.brandPositioningDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.tableData !== undefined && res.tableData.length > 0) {
          that.formData.detailedData.tableData = res.tableData
        }
        that.update++
      })
    },
    // 审核完毕
    examineOver() {
      this.$router.back()
    }

  }
}
</script>
