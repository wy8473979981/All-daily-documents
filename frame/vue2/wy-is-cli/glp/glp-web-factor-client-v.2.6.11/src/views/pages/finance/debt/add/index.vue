<template>
<div>
<breadcrumb/>
<edit-debt></edit-debt>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import EditDebt from '../components/edit-debt/index.vue'

@Component({
  components: { EditDebt }
})
export default class Add extends Vue {

}
</script>
