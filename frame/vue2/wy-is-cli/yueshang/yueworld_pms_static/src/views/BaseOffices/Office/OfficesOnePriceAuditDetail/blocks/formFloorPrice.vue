<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="averagePriceFloor" label-position="top" size="small">
    <ysn-formItem :form="averagePriceFloor" :config="configData" :column="5" clearable text>
      <template v-for="(item,index) in configData" :slot="item.prop">
        {{ averagePriceFloor.list[index].value }}
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
    prop: 'averagePriceFloor',
    event: 'change'
  },
  props: {
    averagePriceFloor: {
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
      rulesForm: {}
    }
  },
  computed: {
    configData() {
      const { averagePriceFloor } = this
      if (!averagePriceFloor.list) {
        return []
      }
      return averagePriceFloor.list.map((item, index) => {
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
  methods: {}
}
</script>
