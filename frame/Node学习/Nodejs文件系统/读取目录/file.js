/*读取目录
	语法
		以下为读取目录的语法格式：
		fs.readdir(path, callback)
参数
	参数使用说明如下：
		path - 文件路径。
		callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。*/


var fs = require("fs");

console.log("查看 /Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/读取目录 目录");
fs.readdir("/Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/读取目录/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});