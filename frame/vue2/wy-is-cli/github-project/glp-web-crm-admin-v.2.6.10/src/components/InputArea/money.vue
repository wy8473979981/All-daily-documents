<template>
	<el-form-item class="unit-item" :label="labelName" :prop="keyName">
		<span class="unit-span" v-show="isFocus">{{moneyUnit}}</span>
		<el-input
			v-model="inputData[keyName]"
			:disabled="disabled"
			@focus='isFocus=true'
			@blur="isFocus=false"
			@keyup.native="getMoney"
			:placeholder="placeText"></el-input>
	</el-form-item>
</template>

<script type="text/javascript">
	const {regex} = require('@/utils/formCheck');
	export default {
		props:{
			'inputData':{
				type:Object
			},
			'labelName':{
				type:String
			},
			'keyName':{
				type:String
			},
			'disabled':{
				type:Boolean,
				default:false
			},
			kValue:{							//单位基础系数
				type:Number,
				default:1
			},
			placeText:{
				type:String,
				default:'请输入金额'
			}
		},

		data (){
			return{
				isFocus:false,                  //是否显示
				moneyUnit:'',                   //金额单位
				moneyLevel:[                    //金额数量级
					{name:'百',value:100},
					{name:'千',value:1000},
					{name:'万',value:10000},
					{name:'十万',value:100000},
					{name:'百万',value:1000000},
					{name:'千万',value:10000000},
					{name:'亿',value:100000000},
					{name:'十亿',value:1000000000},
					{name:'百亿',value:10000000000},
					{name:'千亿',value:100000000000},
					{name:'万亿',value:1000000000000}
				]
			}
		},
		methods:{
			getMoney (e){                           //监听金额变动
				let t=e.target;
				let v=t.value;
				if(regex.money.test(v)){
					v*=this.kValue;
					let obj=this.moneyLevel.find((item) => {
						let quotient=v/item.value;
						return quotient>1 && quotient<10
					});
					if(obj){
						this.moneyUnit=obj.name;
					}else {
						this.moneyUnit='';
					}
				}else{
					this.moneyUnit='';
					console.log('非金额类型')
				}
			}
		}
	}
</script>

<style scoped>
	.unit-item{
        position: relative;
    }

    .unit-span{
        position: absolute;
        left: 20px;
        top: -15px;
        z-index: 10;
        padding: 3px 5px;
        line-height: 1em;
        background-color: #fff;
        box-shadow: 0px 0px 5px #eee;
    }
</style>