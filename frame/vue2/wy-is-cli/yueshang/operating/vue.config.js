/*
vue.config.js
*/
const Timestamp = new Date().getTime(); //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
module.exports = {
	filenameHashing:true, //建议开启 防止静态资源(图片)替换后 未即时生效
	configureWebpack: {
		output: { // 输出重构  打包编译后的 文件路径  文件名称  【时间戳】
			filename: `./static/js/[name].${Timestamp}.js?v=${Timestamp}`,
			chunkFilename: `./static/js/[name].${Timestamp}.js?v=${Timestamp}`
		}
	},
	css: {
		requireModuleExtension: true,
		loaderOptions: {
		  css: {
			modules: {
			  localIdentName: `./static/[name].${Timestamp}.css?v=${Timestamp}`
			},
			localsConvention: 'camelCaseOnly'
		  }
		}
	}
}