<!-- <script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script> -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./app.css";
	@import "./wxcomponents/vant/dist/common/index.wxss";
</style>
