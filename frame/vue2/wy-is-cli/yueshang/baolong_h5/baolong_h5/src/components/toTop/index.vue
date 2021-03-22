<template>
	<div class="app-to-top">
		<div class="to-top" @click="goToTop">
			<van-image round width="1rem" height="1rem" :src="topImg" />
		</div>
	</div>
</template>
<script>
import topImg from "../../assets/images/icon-totpo.png";
export default {
	data() {
		return {
			topImg,
			querySelect: "#app",
		};
	},
	methods: {
		goToTop() {
			let dom = document.querySelector(this.querySelect);
			dom.scrollTop = 0;
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped></style>
