
//通过 exports 对象把 world 作为模块的访问接口

exports.world = function() {
  console.log('Hello World');
}


/*function world() {
  console.log('Hello World');
}

exports.world = world;*/


//两种写法