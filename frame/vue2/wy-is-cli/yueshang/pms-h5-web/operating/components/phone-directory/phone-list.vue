<template>
	<view style="width: 100%;">
		<scroll-view class="scroll-list"
		:scroll-top="1"
		scroll-y="true"
		:scroll-with-animation="scrollAnimationOFF" 
		:scroll-into-view="scrollViewId" 
		:style="{height:winHeight + 'px',width: '100%'}" 
		@scroll="handleScroll">
			<view class="phone-list">
				<view class="list-item" 
				v-for="(item, key) of phones" 
				:key="item.label" 
				:id="item.label">
					<view class="list-item-title" v-if="item.label != '#'">{{item.label}}</view>
					<view class="list-item-phone" 
					@click="handleClick"
					hover-class="commonly-hover" 
					:hover-start-time="20" 
					:hover-stay-time="70" 
					v-for="innerItem in item.items"
					:key="innerItem.value.mallId"
					:data-name="innerItem.label"
					:data-id="innerItem.value.mallId"
					:data-item="JSON.stringify(innerItem.value)"
					>
					{{innerItem.label}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"phone-list",
		props:{
			phones:Array,
			letter:String,
			scrollAnimationOFF:Boolean
		},
		data () {
			return {
				winHeight:0,
				scrollTop:0,
				letterDetails:[],
				timer:null
			}
		},
		computed:{
			scrollViewId () {
				return this.letter
			}
		},
		mounted(){
			// #ifndef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 49.50
			//#endif
			
			//#ifdef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 100
			//#endif
		},
		methods:{
			handleClick (e) {
				const val = JSON.parse(e.target.dataset.item)
				e.target.dataset.detail = {item: val,value: val,label: e.target.dataset.name}
				this.$emit('handleClick',e.target.dataset)
			},
			handleScroll (e){
				if(this.letterDetails.length === 0){
					let view = uni.createSelectorQuery().selectAll('.list-item')
					view.boundingClientRect(data=>{
						let top = data[0].top
						data.forEach((item,index)=>{
							item.top = item.top - top
							item.bottom  = item.bottom - top
							this.letterDetails.push({
								id:item.id,
								top:item.top,
								bottom:item.bottom
							})
						})
					}).exec()	
				}
				
				const scrollTop = e.detail.scrollTop
				this.letterDetails.some((item,index)=>{
					if(scrollTop>=item.top && scrollTop <= item.bottom - 5){
						this.$emit('change',item.id)
						this.$emit('reset',true)
						return true
					}
				})
			}
		}
			
	}
</script>

<style>
	
	.commonly-hover{
		background-color: #eee;
	}
	
	.scroll-list{
		flex: 1;
		height: 100vh;
		overflow-y: hidden;
	}

	.phone-list{
		display: flex;
		background-color: #fff;
		flex-direction:column;
		position:relative;
		width: 100%;
	}
	
	.list-item {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		height: 92upx;
		background-color: #fff;
		height: 100%;
		
	}
	
	.list-item >.list-item-phone{
		font-weight: normal;
	}
	
	.list-item-title{
		background-color: #eee;
	}
	
	.list-item-title,.list-item-phone{
		width: 100%;
		height: 92upx;
		line-height: 92upx;
		font-size: 32upx;
		font-weight: bold;
		padding: 0 20upx;
		border-bottom: 1px solid #e5e5e5;
	}
	
	

</style>
