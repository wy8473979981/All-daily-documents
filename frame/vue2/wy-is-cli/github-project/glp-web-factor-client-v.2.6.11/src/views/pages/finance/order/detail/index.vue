<template>
<div>
<breadcrumb/>

<order-detail :id="id"></order-detail>

<div class="text-center mt-7">
  <el-button size="small" plain class="px-5" @click="$router.go(-1)">返回</el-button>
</div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import OrderDetail from '@/views/pages/components/order-detail/index.vue'

@Component({
  components: { OrderDetail }
})
export default class Detail extends Vue {
  @Prop(String) id!: string
}
</script>
