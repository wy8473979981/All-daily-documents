<template>
  <!-- 商务条件审批页面 -->
  <!-- 全部组件整理，需要复制到后台模板配置  start -->
  <div class="template-wrapper">
    <div class="template-content">
      <!-- 封装方法展示 -->
      <!-- 承租 -->
      <ysNTenantModule />
      <!-- 商务条件 -->
      <ysNSwtjModule />
      <!-- 租金 -->
      <ysNRentModule />
      <!-- 物管费 -->
      <ysNWgfModule />
      <!-- 预付款、保证金 -->
      <ysNDepositModule />
      <!-- 其他事项 -->
      <ysNQtsxModule />
      <!-- 工程情况 -->
      <ysNGcqkModule />
      <!-- 备注 -->
      <ysNRemarkModule />
      <!-- 附件 -->
      <ysNAccessoryModule />
      <!-- 留言记录 -->
      <ysNLyjlModule />
    </div>
  </div>
  <!-- end -->
</template>
<script>

// 复制到模板内容配置 逻辑信息里
// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       disabled: true
//     }
//   }
// }
import ysNTenantModule from './components/ysNTenantModule' // 承租
import ysNSwtjModule from './components/ysNSwtjModule' // 商务条件
import ysNRentModule from './components/ysNRentModule' // 租金 
import ysNWgfModule from './components/ysNWgfModule' // 物管费 
import ysNDepositModule from './components/ysNDepositModule' // 预付款、保证金 
import ysNQtsxModule from './components/ysNQtsxModule' // 其他事项 
import ysNGcqkModule from './components/ysNGcqkModule' // 工程情况 
import ysNRemarkModule from './components/ysNRemarkModule' // 备注
import ysNAccessoryModule from './components/ysNAccessoryModule' // 附件
import ysNLyjlModule from './components/ysNLyjlModule' // 留言记录

// 本地预览需要的方法，不需要复制到模板内容配置
export default {
  components: {
    ysNTenantModule,
    ysNSwtjModule,
    ysNRentModule,
    ysNDepositModule,
    ysNQtsxModule,
    ysNGcqkModule,
    ysNRemarkModule,
    ysNAccessoryModule,
    ysNLyjlModule,
    ysNWgfModule,
  },
  data () {
    return {

    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
.template-wrapper {
  .template-content {
    padding: 0 19px 0 20px;
  }
}
</style>