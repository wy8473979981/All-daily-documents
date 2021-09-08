<template>
  <section>
    <div class="page-top mb-9">
      <ys-n-cascader
        v-model="bisProjectId"
        :options="projectOptions"
        size="mini"
        :showAllLevels="false"
        :props="{ emitPath: false, value: 'code', label: 'detail' }"></ys-n-cascader>
      <top-list class="ml-24" :config="topListConfig" :list="projectInfo"/>
    </div>
    <ys-n-title underline size="medium" title="项目概览"> </ys-n-title>

    <div class="page-block pt-17">
      <ys-n-title size="small" title="铺位信息"> </ys-n-title>
      <ys-n-list :config="shopInfoConfig" :list="projectInfo" size="small" :margin="10"></ys-n-list>

      <div class="page-year mt-24">
        <div class="page-year--rent pr-24">
          <ys-n-title size="small" title="本年租金(万元)"> </ys-n-title>
          <ys-n-list :width="33.3" :config="rentThisYearConfig" :list="projectInfo" size="small"></ys-n-list>
        </div>
        <div class="page-year--pro">
          <ys-n-title size="small" title="本年物管费(万元)"> </ys-n-title>
          <ys-n-list :width="33.3" :config="propertyManagementFeeThisYearConfig" :list="projectInfo" size="small"></ys-n-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { TopList } from '../../components'
import { mapState, mapActions } from 'vuex'
import { ProjectOptions, TopListConfig, ShopInfoConfig, RentThisYearConfig, PropertyManagementFeeThisYearConfig } from './config'
export default {
  name: 'ModulesProject',

  components: { TopList },

  data() {
    return {
      bisProjectId: 'C068924639924123480EBEB52D6E002E',
      projectOptions: ProjectOptions,
      topListConfig: TopListConfig,

      /* 项目概览 */
      // 铺位信息
      shopInfoConfig: ShopInfoConfig,

      // 本年租金
      rentThisYearConfig: RentThisYearConfig,
      // 本年物管费
      propertyManagementFeeThisYearConfig: PropertyManagementFeeThisYearConfig,
    }
  },

  computed: {
    ...mapState({
      projectInfo: state => state.rentalPlatform.projectInfo
    })
  },

  created() {
    this.getLayoutListInfo()
    this.getInfoByProject(this.bisProjectId)
  },

  methods: {
    ...mapActions({getInfoByProject: 'rentalPlatform/getInfoByProject', getLayoutListInfo: 'rentalPlatform/getLayoutListInfo'})
  }
}
</script>

<style lang="scss" scoped>
.page-top {
  display: flex;
  width: 100%;

  &--select {
    margin-right: 24px;
  }
}

.page-year {
  display: flex;

  >div {
    flex: 1;
  }
}

.page-block {
  background: #FDFCFA;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 23px;
}
</style>