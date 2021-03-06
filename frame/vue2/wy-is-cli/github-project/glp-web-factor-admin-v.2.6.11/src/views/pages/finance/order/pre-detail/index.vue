<template>
<div>
  <edit-pre-order :id="id" type="view"></edit-pre-order>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import EditPreOrder from '../components/edit-pre-order/index.vue'

@Component({
  components: { EditPreOrder }
})
export default class PreDetail extends Vue {
  @Prop(String) id!: string
}
</script>
