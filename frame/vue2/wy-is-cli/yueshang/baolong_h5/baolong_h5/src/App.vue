<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style lang="scss">
html,
body,
#app {
	width: 100%;
	height: 100%;
	overflow: auto;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.app-header {
	padding: 0.3rem 0.4rem;
	background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
	color: #ffffff;
	font-size: 0.35rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.app-header-right {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;
}
img {
	width: 100%;
	height: 100%;
	display: block;
}
.ellipsis {
	overflow: hidden; //超出的文本隐藏
	text-overflow: ellipsis; //溢出用省略号显示
	white-space: nowrap; //溢出不换行
}
</style>
