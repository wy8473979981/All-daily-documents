<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text>
      <template #OfficeId>
        <a
          class="link-type"
          v-for="(item,index) in currentFormData.OfficeId"
          :key="index"
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
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'programName', label: '项目名称' },
        { itemType: 'text', prop: 'commentId', label: '审批号' },
        { itemType: 'text', prop: 'createUser', label: '发起人' },
        { itemType: 'text', prop: 'applyDate', label: '发起时间' },
        { itemType: 'text', prop: 'remark', type: 'textarea', label: '备注' },
        { itemType: 'text', prop: 'OfficeId', label: '附件', hasSlot: true }
      ]
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
    handelChange(val) {
      this.currentFormData.decorationEnterDate = val
    }
  }

}
</script>
