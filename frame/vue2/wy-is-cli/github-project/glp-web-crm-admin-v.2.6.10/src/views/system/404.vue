<template>
	<div class="content">
		<img src="@/assets/system/404_1.png" alt='404'>
		<div class="info-div">
			<h3>404</h3>
			<p>抱歉，您访问的页面不存在</p>
			<el-button @click="backHome" type="primary">返回首页</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods :{
			backHome (){
				this.$router.push({
					path:'/'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    .content{
    	display:flex;
    	height:100vh;
    	justify-content:center;
    	align-items:center;
    	img{
    		width:40%;
    		margin-right:40px;
    	}
    }
    .info-div{
    	h3{
    		font-size:56px;
    	}
    	p{
    		font-size:16px;
    		margin:20px auto;
    		color:#666;
    	}
    }
</style>