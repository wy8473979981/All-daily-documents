<!--
 * @Author: shuyuan
 * @LastEditors: fhj
 * @Description: 品牌变更情页 审核状态
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="BrandLibraryChangeExamine"
    >
      <template #countData>
        <el-checkbox>未解约合同</el-checkbox>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { brandLibraryApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'BrandLibraryChangeExamine',
  props: {},
  data() {
    return {
      adopt: false,
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      auditStatus: '', // 状态
      id: null, // id
      // 统一数据
      formData: {
        detailInfo: { // 详情数据
        },
        countData: {
        }
      }
    }
  },
  created() {
    this.pageConfig = pageConfig(this)
    console.log(this.$route.query.id)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.AdjustmentCostDetail(datas) // 详情数据接口
    }
    if (this.$route.query.status === '审核通过') {
      this.adopt = true
    }
  },
  mounted() {
  },
  methods: {
    async handlerClick() {
      // const res = await this.$refs.pageDetail.valiFormDate()
    },
    // 详情数据接口
    AdjustmentCostDetail(datas) {
      console.log(datas)
      const that = this
      brandLibraryApi.brandLibraryChangeDetail(datas).then(res => {
        console.log(res)
        if (res) {
          that.formData.detailInfo = res
        }
        if (res.brandContacts !== undefined) {
          that.formData.countData.brandContacts = res.brandContacts
        }
        if (res.business !== undefined) {
          that.formData.countData.business = res.business
        }
        if (res.project !== undefined) {
          that.formData.countData.project = res.project
        }
        that.update++
      })
    }

  }
}
</script>
<style>
    .change-form-item{
        padding: 0 7px;
        background-color: #d0e6e4;
        color: #729db0;
        border-radius: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .el-table .cell{
      padding: 0;
    }
    .change-info{
        border-top: 1px solid #dfe6ec;
        display: flex;
    }
    .change-div{
        margin: 10px 0;
        padding: 0 7px;
        background-color: #d0e6e4;
        color: #729db0;
        border-radius: 50px;
        max-width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        line-height: 16px;
    }
    .left_circle_arrow {
      border-left: 2px solid #729db0;
      border-bottom: 2px solid #729db0;
      width: 16px;
      height: 16px;
      margin: 5px 8px 15px 15px;
      display: inline-block;
      border-bottom-left-radius: 5px;
    }
    .left_circle_arrow::after {
      content: "";
      display: inline-block;
      position: relative;
      left: 14px;
      bottom: 4px;
      border-left: 4px solid #729db0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }
    .overflow{
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      padding: 0 7px;
    }
    .current-table .ysn-table .el-table tr > td:first-child, .ysn-table .el-table tr > th:first-child {
      padding-left: 0;
    }
    .current-table .el-table th.is-leaf, .el-table td {
      padding-left: 0;
    }
    .current-table .ysn-table .el-table tr > td:last-child, .ysn-table .el-table tr > th:last-child {
      padding-right: 0;
      background: transparent;
    }
</style>
