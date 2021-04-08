<template>
  <div>
    <order-detail></order-detail>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import OrderDetail from '../../components/detail/index.vue'
const Plb = namespace('plb')
@Component({
  components: {
    OrderDetail
  }
})
export default class Attachment extends Vue {}
</script>
<style lang='scss' module>
</style>
