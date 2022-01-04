// 17721088
console.time('test')

var all = Array(17000000).fill(0);
all.forEach((_item, index, ary) => {
  ary[index] = createNum();
});

getFiveNumber(all)
console.timeEnd('test')
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
    var result_sum = prefixInteger(parseInt(Math.floor(Math.random() * 16) + 1, 10), 2)
    if (!arr.includes(result_sum)) {
      arr.push(result_sum);
    }
  }
  if (all.includes(arr.join())) {
    return createNum()
  } else {
    return arr.join();
  }
  // return arr.join();
}

function prefixInteger (num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

function getFiveNumber (all) {
  var result = Array(5).fill(8);
  result.forEach((item, index, ary) => {
    let i = Math.floor(Math.random() * all.length);
    ary[index] = all[i];
  });
  console.log(all.length)
  console.log("result", result);
}


// // 17721088
// console.time('test')
// // var all = Array(17721088).fill(0);
// // all.forEach((item, index, ary) => ary[index] = createNum());

// let all = []
// for (let i = 0; i < 10000000; i++) {
//   all[i] = createNum()
// }

// getFiveNumber(all)
// console.timeEnd('test')



// function createNum () {
//   var arr = [];
//   while (arr.length < 6) {
//     var result_sum = parseInt(Math.floor(Math.random() * 33) + 1, 10);
//     if (!arr.includes(result_sum)) {
//       arr.push(result_sum);
//     }
//   }
//   arr.sort((a, b) => a - b);
//   while (arr.length < 7) {
//     var result_sum = parseInt(Math.floor(Math.random() * 16) + 1, 10)
//     if (!arr.includes(result_sum)) {
//       arr.push(result_sum);
//     }
//   }
//   if (all.includes(arr.join())) {
//     return createNum()
//   } else {
//     return arr.join();
//   }
// }

// function getFiveNumber (all) {
//   var result = Array(5).fill(8);
//   result.forEach((item, index, ary) => {
//     let i = Math.floor(Math.random() * all.length);
//     ary[index] = all[i];
//   });
//   console.log(all.length)
//   console.log("result", result);
// }

