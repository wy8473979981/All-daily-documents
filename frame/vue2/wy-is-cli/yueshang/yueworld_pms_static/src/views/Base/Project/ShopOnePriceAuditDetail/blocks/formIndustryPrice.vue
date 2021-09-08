<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="averagePriceIndustryPrice" label-position="top" size="small">
    <ysn-formItem :form="averagePriceIndustryPrice" :config="configData" :column="5" clearable text>
      <template v-for="(item,index) in configData" :slot="item.prop">
        {{ averagePriceIndustryPrice.list[index].value }}
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
    prop: 'averagePriceIndustryPrice',
    event: 'change'
  },
  props: {
    averagePriceIndustryPrice: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    }
  },
  data() {
    return {
      // 表单验证
      rulesForm: { }
    }
  },
  computed: {
    configData() {
      const { averagePriceIndustryPrice } = this
      if (!averagePriceIndustryPrice.list) {
        return []
      }
      return averagePriceIndustryPrice.list.map((item, index) => {
        return {
          itemType: 'text',
          prop: `list.${index}`,
          hasSlot: true,
          label: item.name,
          width: '206px'
        }
      })
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>
