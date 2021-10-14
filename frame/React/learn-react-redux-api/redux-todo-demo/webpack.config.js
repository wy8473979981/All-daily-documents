var webpack = require('webpack');


var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
  entry: [
  	'webpack-dev-server/client?http://localhost:8080/',
    './js/index.js'
  ],
  
//output: {
//  filename: './public/bundle.js',
//},
  output:{
		path:'public',//我这里的路径是在lib文件夹下
		filename:'bundle.js'
	},
  devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		//progress:true,//报错无法识别，删除后也能正常刷新
	},
  
plugins: [
	new webpack.DefinePlugin({
		'process.env.NODE.ENV':"development"
	}),
	new webpack.HotModuleReplacementPlugin(),
//  devFlagPlugin,
//  new HtmlwebpackPlugin({
//    title: 'react-demos',
//    filename: './public/index.html'
//  }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),


//  new uglifyJsPlugin({
//    compress: {
//      warnings: false
//    }
//  }),
],
  
  module: {
    loaders: [{
      	test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react','stage-1']
        }
    },{
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
    },{ 
     	test: /\.(png|jpg)$/, 
     	loader: 'url-loader?limit=8192'
    }
    ]
  },
  externals: {
    //全局通用
  }
};