<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 商家变更详情页头部信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData()" :column="5" clearable text>
      <template v-for="(item) in configData()" :slot="item[Object.keys(item)[1]]" slot-scope="scope">
        <span v-if="Array.isArray(currentFormData[scope.prop])">
          {{ currentFormData[scope.prop][0] }}
          <span class="change-form-item">变更前:{{ currentFormData[scope.prop][1] }}</span>
        </span>
        <span v-else>
          {{ currentFormData[scope.prop] }}
        </span>
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
    }
  },
  methods: {
    configData() {
      const listForm = [
        { itemType: 'text', prop: 'programName', label: '所属项目', hasSlot: true },
        { itemType: 'text', prop: 'tenantId', label: '商家编码', hasSlot: true },
        { itemType: 'text', prop: 'tenantName', label: '商家名称', hasSlot: true },
        { itemType: 'text', prop: 'tenantType', label: '商家性质', hasSlot: true },
        { itemType: 'text', prop: 'tenantCompanyQuailty', label: '商家属性', hasSlot: true },
        { itemType: 'text', prop: 'tenantTaxpayerType', label: '纳税人类型', hasSlot: true }
      ]
      if (this.currentFormData.tenantType === 1) {
        return [
          ...listForm,
          { itemType: 'text', prop: 'tenantNaturalPerson', label: '自然人姓名', hasSlot: true },
          { itemType: 'text', prop: 'tenantNaturalPersonId', label: '身份证号', hasSlot: true },
          { itemType: 'text', prop: 'tenantContactsMobile', label: '手机', hasSlot: true }
        ]
      } else {
        return [
          ...listForm,
          { itemType: 'text', prop: 'tenantCompanyName', label: '公司名称', hasSlot: true },
          { itemType: 'text', prop: 'tenantLegalPerson', label: '法定代表人', hasSlot: true },
          { itemType: 'text', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码', hasSlot: true }
        ]
      }
    }
  }

}
</script>
