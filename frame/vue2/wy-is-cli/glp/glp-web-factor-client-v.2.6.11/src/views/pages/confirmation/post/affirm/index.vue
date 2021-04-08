<template>
<div>
<breadcrumb/>

<order-detail :id="id"></order-detail>

<el-checkbox v-model="agreed">我已阅读并同意 <el-link type="primary">“确权须知”</el-link></el-checkbox>

<div class="text-center mt-7">
  <el-button size="small" type="primary" class="px-5 mx-3" @click="onConfirm" :loading="submitting">确权提交</el-button>
  <el-button size="small" plain class="px-5 mx-3" @click="$router.go(-1)">返回</el-button>
</div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import OrderDetail from '@/views/pages/components/order-detail/index.vue'

@Component({
  components: { OrderDetail }
})
export default class PostAffirm extends Vue {
  @Prop(String) id!: string

  submitting = false

  agreed = false

  onConfirm () {
    if (!this.agreed) {
      this.$message.info('未勾选‘我已阅读并同意’，不能进行确权提交')
      return
    }
    this.submitting = true
    this.$http.get(`/clientend/order/buyer/confirmOrder/${this.id}`).then(() => {
      this.$message.success('确权成功')
      this.$router.go(-1)
    }).finally(() => {
      this.submitting = false
    })
  }
}
</script>
