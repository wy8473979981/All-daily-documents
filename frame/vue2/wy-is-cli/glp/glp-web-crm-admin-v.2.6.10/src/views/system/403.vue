<template>
	<div class="content">
		<img src="@/assets/system/403_1.png" alt='403'>
		<div class="info-div">
			<h3>403</h3>
			<p>抱歉，你无权访问该页面</p>
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
    		width:30%;
    		margin-right:5%;
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
    @media screen and (min-width: 1400px){
    	.content{
	    	img{
	    		width:25%;
	    	}
	    }
    }
</style>