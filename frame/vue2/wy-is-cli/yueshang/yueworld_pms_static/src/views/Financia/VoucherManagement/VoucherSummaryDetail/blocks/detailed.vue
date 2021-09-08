/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 16:01:32
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-30 09:42:33
 */

<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="currentFormData.tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Detailed',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = { feeName: '', accountName: '', type: '', balance: '', mayApllyAmount: '', amount: '', reason: '' }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
