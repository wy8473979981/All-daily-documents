<template>
  <div class="list-page">
    <el-button @click="refreshBsDictCache" size="mini" type="success">刷新数据字典缓存</el-button>
    <el-button @click="refreshElasticSearchPush" size="mini" type="success">刷新数据中心审批单同步任务</el-button>
    <el-button @click="refreshModuleCache" size="mini" type="success">刷新模块缓存</el-button>
    <el-button @click="refreshOrgAndUserCache" size="mini" type="success">刷新人员机构缓存</el-button>
    <el-button @click="refreshBsDictCache" size="mini" type="success">刷新流程和节点缓存</el-button>
    <el-button @click="refreshBsDictCache" size="mini" type="success">刷新模块和模板内容缓存</el-button>
  </div>
</template>

<script>
  import basicConfig from '../../../apis/apis/basicConfig';
  export default {
    data() {
      return {
        fast: false,
      }
    },
    created() {
      // this.getList()
    },
    mounted() {
    },
    methods: {
      // 刷新数据字典缓存
      async refreshBsDictCache () {
        await basicConfig.refreshBsDictCache().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 刷新数据中心审批单同步任务
      async refreshElasticSearchPush () {
        await basicConfig.refreshElasticSearchPush().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 刷新模块缓存
      async refreshModuleCache () {
        await basicConfig.refreshModuleCache().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 刷新人员机构缓存
      async refreshOrgAndUserCache () {
        await basicConfig.refreshOrgAndUserCache().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 刷新流程和节点缓存
      async refreshProcessAndNodeCache () {
        await basicConfig.refreshProcessAndNodeCache().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 刷新模块和模板内容缓存
      async refreshTemplateCache () {
        await basicConfig.refreshTemplateCache().then(res => {
          if(res.code == 1){
            this.$message.success('刷新成功')
          } else {
            this.$message.error(res.message)
          }
        })
      },
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
@import '~@/assets/styles/common.scss';
.list-page {
  .el-button {
    display: block;
    margin: 0 0 10px 0;
  }
}
</style>
