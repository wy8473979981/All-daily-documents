<template>
	<el-dialog
	  title=""
	  :visible.sync="visible"
	  :before-close="handleClose"  width="73%" style="height: 100%;" :center="true" top="10vh" class="swiper-dilog">
		<el-carousel :interval="5000" arrow="always" :autoplay="false" :loop="false" indicator-position="none" height="100%">
			<el-carousel-item v-for="(item,i) in list" :key="i" style="overflow-y: auto;">
				<img :src="item" style="width: 100%;"/>
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
<style lang="scss">
	.swiper-dilog {
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
	}
		
	
</style>
