<template>
<div>
<breadcrumb/>
<edit-debt :id="id" readonly></edit-debt>
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
}
</script>
