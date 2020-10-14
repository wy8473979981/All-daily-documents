<template>
<div>
<edit-debt :id="id" readonly type="view"></edit-debt>

<div class="text-center mt-4">
  <el-button type="small" plain class="px-5" @click="onBack">返 回</el-button>
</div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import EditDebt from '../components/edit-debt/index.vue'

@Component({
  components: { EditDebt }
})
export default class Detail extends Vue {
  @Prop(String) id!: string

  onBack () {
    this.$rp.close()
  }
}
</script>
