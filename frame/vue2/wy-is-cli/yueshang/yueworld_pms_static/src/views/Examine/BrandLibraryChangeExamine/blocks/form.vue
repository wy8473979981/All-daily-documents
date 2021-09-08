<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌变更详情页头部信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text>
      <template v-for="(item) in configData" :slot="item[Object.keys(item)[1]]" slot-scope="scope">
        <div v-if="Array.isArray(currentFormData[scope.prop])" style="display: flex;">
          {{ currentFormData[scope.prop][0] }}
          <div class="overflow">
            <span class="change-form-item">变更前:{{ currentFormData[scope.prop][1] }}</span>
          </div>
        </div>
        <div v-else>
          {{ currentFormData[scope.prop] }}
        </div>
      </template>
      <template #brandLogo>
        <a
          v-for="(item,index) in currentFormData.brandLogo"
          :key="index"
          class="link-type"
          target="_blank"
          :href="item.url"
        >{{ item.name }}</a>
      </template>
    </ysn-formItem>
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailInfo',
    event: 'change'
  },
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        { itemType: 'text', prop: 'brandName', label: '品牌名', hasSlot: true },
        { itemType: 'text', prop: 'brandId', label: '品牌编码', hasSlot: true },
        { itemType: 'text', prop: 'brandType', label: '品牌类型', hasSlot: true },
        { itemType: 'text', prop: 'brandOtherName', label: '品牌别名', hasSlot: true },
        { itemType: 'text', prop: 'brandLevel', label: '品牌等级', hasSlot: true },
        { itemType: 'text', prop: 'brandOperateType', label: '经营性质', hasSlot: true },
        { itemType: 'text', prop: 'brandFormatName', label: '业态', hasSlot: true },
        { itemType: 'text', prop: 'brandStoreType', label: '连锁/单店', hasSlot: true },
        { itemType: 'text', prop: 'brandShopMode', label: '开店方式', hasSlot: true },
        { itemType: 'text', prop: 'brandGroupName', label: '集团名称', hasSlot: true },
        { itemType: 'text', prop: 'brandHqAddress', label: '总部地址', hasSlot: true },
        { itemType: 'text', prop: 'brandKeyProvince', label: '重点发展省份', hasSlot: true },
        { itemType: 'text', prop: 'brandKeyCity', label: '主要分布城市', hasSlot: true },
        { itemType: 'text', prop: 'brandPerCustomerTransaction', label: '客单价(元)', hasSlot: true },
        { itemType: 'text', prop: 'brandTel', label: '联系电话', hasSlot: true },
        { itemType: 'text', prop: 'brandWebsite', label: '官网地址', hasSlot: true },
        { itemType: 'text', prop: 'brandDescription', label: '品牌说明', hasSlot: true },
        { itemType: 'text', prop: 'brandLogo', label: 'Logo', hasSlot: true }
      ]
    }
  },
  methods: {
  }

}
</script>
