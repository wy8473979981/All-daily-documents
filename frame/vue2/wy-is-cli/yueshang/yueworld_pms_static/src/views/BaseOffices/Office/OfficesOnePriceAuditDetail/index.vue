<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 手风琴详情页配置
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="examinePage"
      @change="detailChange"
    />
  </div>
</template>
<script>
// 请求api
import { baseOfficesApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'OfficesOnePriceAuditDetail',
  components: {},
  props: {},
  data() {
    return {
      // 审核记录页面
      examinePage: 'OfficesOnePriceAuditExamine',
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 详情id
      id: null,
      // 统一数据
      formData: {
        // 业态平均价格
        averagePriceFormat: {},
        // 一铺一价信息
        averagePriceFloor: {},
        // 一铺一价信息
        infoList: {
          tableData: []
        }
      },
      update: 0
    }
  },

  mounted() {
    this.getData()
  },
  methods: {
    /**
     * 获取详情页数据
     * @returns {Promise<void>}
     */
    async getData() {
      const { id } = this.$route.query
      this.id = id
      try {
        const { data } = await baseOfficesApi.officesOnePriceAuditDetail({ id })
        this.formData = data
        this.update++
      } catch (e) {
        console.log(e)
      }
    },
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>
