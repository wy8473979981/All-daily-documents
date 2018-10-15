//如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false