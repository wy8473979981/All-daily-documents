<template>
  <el-dialog title="签署方详情" :visible.sync="signVisible" width="500px" class="signDetail">
    <query-table
      :columns="signColumns"
      ref="signTb"
      title
      api="/clientend/contract/signerDetails"
      :pageable="false"
      :paged="false"
      class="mt-4"
      :wrap="false"
    >
    </query-table>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Prop } from 'vue-property-decorator'
import { signColumns } from './config'

@Component({})
export default class SignDetail extends Vue {
  @Prop() signId!: any
  @Prop() signStatus!: number
  @Prop({ default: false }) isLedger!: boolean;
  @Ref() signTb!: any
  @Watch('signVisible')
  signChange (newVal: any) {
    if (newVal) {
      this.onQuery()
    }
  }

  signVisible = false
  signColumns =signColumns
  signWidth = 0
  api=''
  onQuery () {
    const id = this.signId
    this.$nextTick(() => {
      this.signTb.query({ id })
    })
  }
}
</script>

<style lang="scss" module>
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}

</style>
<style lang="scss">
.signDetail{
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
