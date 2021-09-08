<!--
 * @Description:
 * @Author: wyz
 * @LastEditors: wyz
-->
<template>
  <div>
    <!-- <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
    /> -->
    <div v-if="currentFormData !== undefined && currentFormData.length > 0">
      <ysn-table
        :data="currentFormData"
        :column="tableConfig"
        select-key="id"
        :checkbox="false"
        :show-slots="['s5','s4']"
        is-dis-table
        :show-header="false"
      >
        <template #s4="scope">
          <span>{{ scope.row.s4 }}</span>
          <span v-if="scope.row.s6">
            <template v-if="scope.row.s6==='up'">
              <i class="el-icon-top" style="color:#5B6F63" />
              <span style="color:#5B6F63"> {{ scope.row.s7 }}%</span>
            </template>
            <template v-else>
              <i class="el-icon-bottom" style="color:#6F120C" />
              <span style="color:#6F120C"> {{ scope.row.s7 }}%</span>
            </template>
          </span>
          <span v-else>
            <span v-if="scope.row.s7" :style="{color:scope.row.s7>100?'#5B6F63':'#6F120C'}"> {{ scope.row.s7 }}%</span>
          </span>
        </template>
        <template #s5="scope">
          <ysn-btn :type="scope.row.s5==='有提高'?'primary':'reject'" style="height: 30px!important;">
            {{ scope.row.s5 }}
          </ysn-btn>
        </template>
      </ysn-table>
    </div>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'AgreementOfIntentEarlyWarning',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'agreementOfIntentEarlyWarning',
    event: 'change'
  },
  props: {
    agreementOfIntentEarlyWarning: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [
        { s1: 's1', itemType: 'text', columnClass: 'hasBg' },
        { s2: 's2', itemType: 'text' },
        { s3: 's3' },
        { s4: 's4' },
        { s5: 's5', hasSlot: true }
      ]
    }
  }
}
</script>

