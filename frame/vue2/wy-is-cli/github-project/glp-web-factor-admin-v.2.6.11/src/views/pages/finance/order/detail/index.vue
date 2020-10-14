<template>
<div>
  <edit-order :id="id" type="view"></edit-order>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import EditOrder from '../components/edit-order/index.vue'

@Component({
  components: { EditOrder }
})
export default class Detail extends Vue {
  @Prop(String) id!: string
}
</script>

<style lang="scss" module>

</style>
