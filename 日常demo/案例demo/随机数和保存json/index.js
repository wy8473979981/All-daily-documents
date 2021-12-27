// 17721088
console.time('test')
new Promise((resolve, reject) => {
  var all = Array(11000000).fill(0);
  all.forEach((item, index, ary) => {
    ary[index] = createNum();
  });
  resolve(all)
}).then((res) => {
  getFiveNumber(res)
})
function createNum () {
  var arr = [];
  //红色球 6个
  while (arr.length < 6) {
    var result_sum = prefixInteger(parseInt(Math.floor(Math.random() * 33) + 1, 10), 2);
    if (!arr.includes(result_sum)) {
      arr.push(result_sum);
    }
  }
  arr.sort((a, b) => a - b);
  //蓝色球 1个
  while (arr.length < 7) {
    var result_sum = prefixInteger(parseInt(Math.floor(Math.random() * 16) + 1, 10), 2);
    if (!arr.includes(result_sum)) {
      arr.push(result_sum);
    }
  }
  return arr;
}

function prefixInteger (num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

function getFiveNumber (all) {
  all.forEach((item, index, ary) => {
    ary[index] = item.join();
  });
  var setAry = [...new Set(all)];
  console.log(setAry.length)
  var result = Array(5).fill(8);
  result.forEach((item, index, ary) => {
    let i = Math.floor(Math.random() * setAry.length);
    ary[index] = setAry[i];
  });

  console.log("result", result);

}
