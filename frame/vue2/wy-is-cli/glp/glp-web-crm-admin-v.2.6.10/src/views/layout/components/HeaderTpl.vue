<template>
	<div class="header-section">
		<span class="show-span" @click="collapseChage" :class="isShow?'el-icon-s-fold':'el-icon-s-unfold'"></span>

		<rightBar></rightBar>
	</div>
</template>
<script type="text/javascript">
	import rightBar from './RightBar'
	import bus from "./Sidebar/bus";
	export default {
		data (){
			return {
				isShow:true,
				collapse:false
			}
		},
		components:{
			rightBar
		},
		methods:{
			collapseChage() {

				this.isShow=!this.isShow;
				let appEle=document.body.querySelector('.app-wrapper');
				if(this.isShow){
					appEle.classList.remove('hideSidebar');
				}else {
					appEle.classList.add('hideSidebar');	
				}

		      	this.collapse = !this.collapse;
		      	bus.$emit("collapse", this.collapse);
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.show-span{
		display: inline-block;
		height: 48px;
		line-height:52px;
		padding: 0 5px;
		font-size: 22px;
		cursor: pointer;
		color: #666;
		
	}
</style>