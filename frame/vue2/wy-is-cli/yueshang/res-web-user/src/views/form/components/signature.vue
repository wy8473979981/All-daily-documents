// 总裁签字附件组件

<template>
	<div class="xshtfj-wrapper">
    <div v-if="show">
      <el-row class="min-title">总裁意见副本</el-row>
      <el-row class="row" v-for="(v,i) in signFiles" :key="i">
        <el-col :span="24" class="content"><span @click="downloadFile(v)">{{v.originalFilename}}</span></el-col>
      </el-row>
    </div>
	</div>
</template>
<script>

  export default {
    props: ['signFiles'],
    data() {
      return {
        show: false
      }
    },
		watch: {
			signFiles: {
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
      downloadFile(item) {
        if(item.showUrl) {
          window.open(item.showUrl,'_blank')
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