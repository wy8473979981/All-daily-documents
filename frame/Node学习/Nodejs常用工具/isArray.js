/*如果给定的参数 "object" 是一个数组返回true，否则返回false。*/
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false