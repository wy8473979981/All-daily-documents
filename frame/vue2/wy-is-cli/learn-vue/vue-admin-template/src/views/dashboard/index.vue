<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <ECell ref="cake" label="T币" :value="`valuevaluevalue(T币 (共${ 0}币，抵${Number( 0) /100}元))`" @change="handleChangeCake">
      <!-- <i>{{`iiiii(T币 (共${ 0}币，抵${Number( 0) /100}元))`}}</i> -->
    </ECell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ECell from '../../components/cell/index'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: { ECell },
  methods:{
    handleChangeCake(){}
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
