<template>
	<div class="main">
		<div class="index-content">
		<ul class="index-top">
			<li>
				<img src="../../assets/images/app.png" width="42px" height="42px" />
				<div class="num-count">
					<p class="name">应用数量</p>
					<p class="num">{{appNum}}</p>
				</div>
			</li>
			<li>
				<img src="../../assets/images/serveApi.png" width="42px" height="42px" />
				<div class="num-count">
					<p class="name">服务（API）数量</p>
					<p class="num">{{businessNum}}</p>
				</div>
			</li>
			<li>
				<img src="../../assets/images/requestCount.png" width="42px" height="42px" />
				<div class="num-count">
					<p class="name">当日请求总量</p>
					<p class="num">{{requestNum}}</p>
				</div>
			</li>
		</ul>
		<div class="echart">
			<ys-echart :options="options" height="271px"></ys-echart>
		</div>
		<div class="index-bottom">
			<div class="echart" style="flex:1">
				<ys-echart :options="appOption" height="341px" style="width:100%;"></ys-echart>
			</div>
			<div class="echart" style="width:375px;margin-left: 10px;">
				<ys-echart :options="successOption" height="341px" style="width:100%;"></ys-echart>
			</div>
		</div>
	</div>
    </div>
</template>

<script>
	import successUrl from '../../assets/images/indexSuccess.png'
	import failUrl from '../../assets/images/indexFail.png'
	import totalUrl from '../../assets/images/indexTotal.png'
	import emptyUrl from '../../assets/images/empty.png'
	import optionsList from './config/options.js'
	export default {
		data() {
			return {
				options: optionsList.requestOption,
				appOption: optionsList.appOption,
				successOption: optionsList.successOption,
				appNum:'',
				businessNum:'',
				requestNum:'',
				
			}
		},
		mounted() {
			this.getTopCount()
			this.requestTotal()
			this.appRequestTotal()
			this.successToTal()
		},
		methods: {
			async getTopCount() {
				console.log(this.$axios.systemServe)
				let res = await this.$axios.homeServe.getTopCount()
				if (res.code == 200) {
					this.appNum = res.data.appNum
					this.businessNum = res.data.businessNum
					this.requestNum = res.data.requestNum
				}
			},
			async requestTotal() {
				console.log(this.$axios.systemServe)
				let res = await this.$axios.homeServe.requestTotal()
				if (res.code == 200) {
					//this.tableList = res.data.result
					let xList = []
					let yList = [[],[],[]]
					res.data.allList.map(item => {
						xList.push(item.timeKey)
						yList[0].push(item.reqValue)
					})
					res.data.successList.map(item => {
						yList[1].push(item.reqValue)
					})
					res.data.errorList.map(item => {
						yList[2].push(item.reqValue)
					})
					this.options.xAxis.data = xList
					this.options.series[0].data = yList[0]
					this.options.series[1].data = yList[1]
					this.options.series[2].data = yList[2]
					console.log(this.options.series)
				}
			},
			async appRequestTotal() {
				console.log(this.$axios.systemServe)
				let res = await this.$axios.homeServe.appRequestTotal()
				if (res.code == 200) {
					let xList = []
					let yList = []
					res.data.map(item => {
						xList.push(item.timeKey)
						yList.push(item.reqValue)
					})
					this.appOption.xAxis.data = xList
					this.appOption.series.data = yList
				}
			},
			async successToTal() {
				console.log(this.$axios.systemServe)
				let res = await this.$axios.homeServe.successTotal()
				if (res.code == 200) {
					let arr = [
						{
							value : res.data.successNum,
							name:'成功'
						},
						{
							value : res.data.errorNum,
							name:'失败'
						}
					] 
					console.log(this.successOption)
					//this.tableList = res.data.result
					this.successOption.series[0].data = arr
					
					/* this.$set(this.successOption.series.data,0,{
						value : res.data.successNum,
						name:'成功'
					})
					this.$set(this.successOption.series.data,1,{
						value : res.data.errorNum,
						name:'失败'
					}) */
				}
			}
		}

	}
</script>

<style lang="scss" type="text/css" scoped>
	.main {
		// height: 1000px;
		overflow-y: auto;
	}
	.index-content {
		// height: 1480px;
		overflow-y: auto;
		.index-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			li {
				width: 390px;
				background: #FFFFFF;
				box-shadow: 10px 10px 30px 0px rgba(224, 229, 235, 0.5);
				display: flex;
				align-items: center;
				padding: 20px 58px;
				border: 2px solid #FFFFFF;
                &:hover {
                  border: 2px solid #4876EF;
				  box-sizing: content-box;
				}
				.num-count {
					margin-left: 42px;
				}

				.name {
					color: #8893A3;
					font-size: 14px;
					line-height: 32px;
				}

				.num {
					line-height: 50px;
					font-size: 36px;
					color: #1C1C1C;
				}
			}
		}

		.echart {
			background: #FFFFFF;
			box-shadow: 0px 10px 20px 0px rgba(224, 229, 235, 0.5);
			margin-top: 20px;
			padding: 10px 20px;
		}
		.index-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
