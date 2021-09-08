<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 合同信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="config" :column="5" clearable text>
      <template v-for="(item) in config" :slot="item[Object.keys(item)[1]]" slot-scope="scope">
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
  name: 'ContractInfo',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailInfo',
    event: 'change'
  },
  props: {
    detailInfo: { type: Object, default: () => {} }
  },
  data() {
    return {
      // 配置
      config: [
        { itemType: 'text', prop: 'tenantContractName', label: '合同抬头', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractAddress', label: '合同地址', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractTel', label: '合同电话', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractPerson', label: '合同联系人', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractFax', label: '合同传真', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractEmail', label: '合同邮箱', hasSlot: true },
        { itemType: 'text', prop: 'tenantContractPostcode', label: '合同邮编', hasSlot: true }
      ]
    }
  },
  methods: {}
}
</script>
