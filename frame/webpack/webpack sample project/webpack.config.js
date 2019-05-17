const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: "eval-source-map", //生成Source Maps（使调试更容易）
	entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname + "/build", //打包后的文件存放的地方
		filename: "bundle.js" //打包后输出文件的文件名
	},

	devServer: { //构建本地服务器
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		hot: true//hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，
        //前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
	},

	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader",
					options: {
						modules: true, // 指定启用css modules
						localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
					}
				}, {
					loader: "postcss-loader"
				}]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin() //热加载插件
	],
};