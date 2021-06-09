<template>
	<!-- 居中弹窗 -->
	<van-popup v-model="show" position="center" :close-on-click-overlay="false" style="width: 315px;" class="center-popup">
		<customTags :data="{mainText:title}" :height="`24px`" :mianTextStyle="{fontSize:'14px'}"/>
		<template v-if="type == 'rent'">
			<van-row >
				<van-col span="8"></van-col>
				<van-col span="8" ><p>标准月租</p><p>(元/m²/月)</p></van-col>
				<van-col span="8" ><p>预算月租</p><p>(元/m²/月)</p></van-col>
			</van-row>
			<van-row v-for="(item, i) in list" :key="i">
				<van-col span="8" :align="center">第{{i+1}}年({{2020 + i}})</van-col>
				<van-col span="8">170</van-col>
				<van-col span="8">180</van-col>
			</van-row>
		</template>
		<template v-if="type == 'wg'">

		</template>
		<template v-else>
			{{content}}
		</template>
		<customTags :data="{mainText:'确定'}" :type="'vertical'" />
	</van-popup>
</template>

<script>
	export default {
		components: {},
		props: {
			type: {
				type: String,
				default: ''
			},
			showPopup: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			}
		},
		watch: {
			showPopup: {
				handler: function(newValue) {
					this.show = newValue
				},
				// immediate: true,
				// deep: true,
			},
		},
		data() {
			return {
				show: false,
				list:[1,1,1,1,1,1,1]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center-popup {
		padding: 20px 20px;
		.van-col {
			text-align: right;
			p {
				text-align: right;
				margin: 0;
				display: block;
			}
		}
	}
</style>
