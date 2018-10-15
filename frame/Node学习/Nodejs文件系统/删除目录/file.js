/*删除目录
	语法
		以下为删除目录的语法格式：
		fs.rmdir(path, callback)
参数
	参数使用说明如下：
		path - 文件路径。
		callback - 回调函数，没有参数。*/

var fs = require("fs");

console.log("准备删除目录 /Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/删除目录/test");
fs.rmdir("/Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/删除目录/test",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 /Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/删除目录 目录");
   fs.readdir("/Users/ws/Desktop/shdanyan公司/Node学习/Nodejs文件系统/删除目录/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});