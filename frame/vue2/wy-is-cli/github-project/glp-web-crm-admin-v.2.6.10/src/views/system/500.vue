<template>
	<div class="content">
		<img src="@/assets/system/500_1.png" alt='500'>
		<div class="info-div">
			<h3>500</h3>
			<p>抱歉，服务器出错了</p>
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
    		width:48%;
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


    @media screen and (min-width: 1400px){
        .content{
            img{
                width:40%;
            }
        }
    }
</style>