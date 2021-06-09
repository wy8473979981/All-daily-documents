import Utils from './index.js';

export default {

  // table 合计栏合计方法
  tableTotalSum(param, fn) {
    const { columns, data } = param;
    const sums = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map(item => {
       return Number((item[column.property]+'').replace(/,/g,''))
      });
      // console.log(values)
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        sums[index] = sums[index].toFixed(2)
      } else {
        sums[index] = '--';
      }
      // 方法自定义计算公式 fn
      if(fn(sums, index)) {
        return
      }
    });
    console.log(sums)
    sums.forEach((item, index) => {
      console.log(isNaN(item))
      if(!isNaN(item)) {
        if(index === 12 || index === 14) {
          item = parseInt(item)
        }
        if(index >= 16 && index <= 25) {
          item = Utils.toThousands(item)
        }
        sums.splice(index,1,item)
      }
    })
    console.log(sums)
    return sums;
  }

}