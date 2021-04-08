<template>
  <div>
    <glp-card :title="`结算单：${settlementNo}`">
      <abstract :summary="summary"></abstract>
    </glp-card>
    <pre-settlement :data="settlementBefore" :summary="summary"></pre-settlement>
    <on-settlement :data="settlementCurt"></on-settlement>
    <after-settlement :data="settlementAfter" :summary="summary"></after-settlement>
    <div class="t-c mt-3">
      <el-button size="small" @click="onReturn">返回</el-button>
    </div>
  </div>
</template>s

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import Abstract from './abstract/index.vue'
import PreSettlement from './pre-settlement/index.vue'
import OnSettlement from './on-settlement/index.vue'
import AfterSettlement from './after-settlement/index.vue'
import { settlementDetail } from '@/api/settlement'

@Component({
  components: {
    Abstract,
    PreSettlement,
    OnSettlement,
    AfterSettlement
  }
})
export default class Settlement extends Vue {
  $style!: any

  summary = {}

  settlementBefore = []

  settlementCurt = []

  settlementAfter = []

  @Prop() settlementNo!: any

  mounted () {
    this.loadDetail()
  }

  loadDetail () {
    const data = {
      settlementNo: this.settlementNo
    }
    settlementDetail(data).then(res => {
      this.summary = res
      this.settlementBefore = res.settlementBefore || []
      this.settlementCurt = res.settlementCurt || []
      this.settlementAfter = res.settlementAfter || []
    })
  }

  onReturn () {
    window.history.back()
  }

  balacneReturnList = [
    {
      id: '12987122',
      name: '融资租赁上海有限公司',
      amount1: '234',
      time: '2019-12-09 12:34:23',
      type: '直接回款',
      amount3: 10
    },
    {
      id: '12987123',
      name: '普洛斯金融控股有限公司',
      amount1: '165',
      time: '2019-12-09 12:34:23',
      type: '间接回款',
      amount3: 12
    }
  ]
}
</script>

<style lang="scss" module></style>
