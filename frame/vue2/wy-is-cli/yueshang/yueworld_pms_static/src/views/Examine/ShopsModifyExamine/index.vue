<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
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
      :examine="examine"
      @change="detailChange"
    >
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'ShopsModifyExamine',
  components: {},
  props: {},
  data() {
    return {
      // 审核页面
      examine: 'ShopOnePriceAuditList',
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 详情id
      id: null,
      // 统一数据
      formData: {
        // 基础数据
        baseInfo: {},
        // 业态信息
        formBussiness: {},
        // 业主信息
        formOwner: {},
      },
      update: 0,
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
    getData() {
      const { id } = this.$route.query
      this.id = id

      baseProjectApi.shopsModifyMaintenanceExamine({ id }).then((res) => {
        this.formData = res
        this.update++
      })
    },
    /**
     * 调整审核记录
     * @returns {Promise<void>}
     */
    async handlerAuditList() {
      // todo:go审核记录
    },
    detailChange(val) {
      this.formData = val
    },
  },
}
</script>
