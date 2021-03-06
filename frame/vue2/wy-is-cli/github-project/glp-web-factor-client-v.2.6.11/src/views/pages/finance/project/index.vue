<template>
<div>
<breadcrumb/>

<div :class="[$style.header]">请选择产品进行用款</div>

<div :class="[$style.list]">
  <card :icon="row.icon" :title="row.title" :color="row.color" v-for="(row, i) in dataSource" :key="i" class="mx-4 mb-6" style="width: 260px">
    <div>
      <div :class="[$style.text]">
        <span>授信额度</span> <span>{{row.limit | number('¥')}}</span>
      </div>
      <div :class="[$style.text]">
        <span>正在用信</span> <span>{{row.used | number('¥')}}</span>
      </div>
      <div :class="[$style.text]">
        <span>剩余额度</span> <span>{{row.left | number('¥')}}</span>
      </div>

      <div class="text-center mt-4">
        <el-button size="small" plain type="primary" @click="onApply(row)" class="px-5">申请用款</el-button>
      </div>
    </div>
  </card>
</div>

</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import Card from './components/card/index.vue'

const colors = ['#508DF9', '#3AC082', '#FF902A']

@Component({
  components: { Card }
})
export default class FinanceProject extends Vue {
  loading = false

  dataSource: any[] = [
    // {
    //   id: '1',
    //   icon: 'van',
    //   color: '#508DF9',
    //   title: '普运贷G7',
    //   limit: 100000000.45678,
    //   used: 22445.5467,
    //   left: 8834556646
    // },
    // {
    //   id: '2',
    //   icon: 'van',
    //   color: '#3AC082',
    //   title: '普运贷一米',
    //   limit: 1400000000,
    //   used: 12445.00,
    //   left: 834556.46
    // },
    // {
    //   id: '2',
    //   icon: 'van',
    //   color: '#FF902A',
    //   title: '普运贷其他',
    //   limit: 15400000.00,
    //   used: 0,
    //   left: 15400000.00
    // }
  ]

  onApply (row: any) {
    this.$router.push(`/finance/order/add/${row.projectId}`)
  }

  loadData () {
    this.$http.post('/clientend/project/getMyFinancingList').then(data => {
      this.dataSource = (data || []).map((v: any, i: number) => {
        const item = {
          icon: 'van',
          color: colors[colors.length % (i + 1)],
          title: v.projectName,
          limit: v.quotaAmount,
          used: v.quotaTotalUseAmount,
          left: v.quotaAvailableUseAmount,
          ...v
        }
        return item
      })
    })
  }

  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.header {
  margin: 24px 0;
  text-align: center;
  color: $text-heading-color;;
  font-weight: 600;
  font-size: 18px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}

.text {
  display: flex;
  justify-content: space-between;

  &>span:first-child {
    color: $text-secondary-color;
    font-size: 14px;
    margin-bottom: 12px;
  }

  &>span:last-child {
    color: $text-regular-color;
    font-weight: 600;
  }
}
</style>
