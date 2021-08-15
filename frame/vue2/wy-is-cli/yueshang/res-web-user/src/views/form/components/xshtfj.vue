// 销售合同附件组件

<template>
	<div class="xshtfj-wrapper">
    <div v-if="show">
      <el-row class="row" v-for="(v,i) in xshtFjList" :key="i">
        <el-col :span="24" class="title">{{v.attachTypeCd}}</el-col>
        <el-col :span="24" class="content"><span @click="viewPd(v)">{{v.contractNo}}</span></el-col>
      </el-row>
    </div>
	</div>
</template>
<script>

  export default {
    props: ['xshtFjList'],
    data() {
      return {
        show: false
      }
    },
		watch: {
			xshtFjList: {
				deep: true,
				immediate: true,
				handler: function(val) {
					if(!val) return;
				  if(val.length > 0) {
            this.show = true;
          }
				}
			}
		},
		methods: {
      viewPd(item) {
        if(item.url) {
          window.open(item.url,'_blank')
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .xshtfj-wrapper {
    margin-top: 20px;
    .row {
      margin-bottom: 10px;
    }
    .title {
      color: #6BAD42;
      line-height: 20px;
    }
    .content {
      color: #0693e3;
      line-height: 20px;
      cursor: pointer;
    }
  }
</style>