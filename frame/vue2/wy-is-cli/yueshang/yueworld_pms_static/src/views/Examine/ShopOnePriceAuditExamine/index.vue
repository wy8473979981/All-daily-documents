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
      :examine="examine"
      :accessory="accessory"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <!--<ysn-btn class="mr-12" @click="handlerAuditList">审核记录</ysn-btn>-->
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'ShopOnePriceAuditExamine',
  components: {},
  props: {},
  data() {
    return {
      // 审核页面
      examine: 'ShopOnePriceAuditList',
      // 显示附件
      accessory: 'show',
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
        },
        // 附件列表
        fileList: []
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
        const { data } = await baseProjectApi.shopOnePriceAuditDetail({ id })
        this.formData = data
        this.update++
      } catch (e) {
        console.log(e)
      }
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
    }
  }
}
</script>
