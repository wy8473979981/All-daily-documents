<template>
<div>
<breadcrumb/>
<edit-order :order-number="id"></edit-order>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import EditOrder from '../components/edit-order/index.vue'

@Component({
  components: { EditOrder }
})
export default class AddOrder extends Vue {
  @Prop(String) id!: string
}
</script>
