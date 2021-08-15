<template>
	<el-dialog
	  title=""
		:show-close="false"
	  :visible.sync="visible"
	  :before-close="handleClose"  width="73%" style="height: 100%;" :center="true" top="10vh">
		<el-carousel :interval="5000" arrow="always" :autoplay="false" height="100%">
			<el-carousel-item v-for="item in list" :key="item" style="overflow-y: auto;">
				<img :src="'data:image/png;base64,'+item" style="width: 100%;"/>
			</el-carousel-item>
		</el-carousel>
	</el-dialog>
</template>
<script>
	export default {
		data () {
      return {
				visible:false
			}
		},
		props:{
			dialogVisible:{
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:function() {
					return []
				}
			}
		},
		watch:{
			dialogVisible:function(newValue) {
				this.visible = newValue
			}
		},
		methods:{
			handleClose() {
				this.visible = false
				this.$emit('update:dialogVisible',false)
			}
		}
	}
</script>
<style>
	.el-dialog{
		height:76%
	}
	.el-carousel{
		height:100%
	}
	.el-dialog__body {
		height:85%
	}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
