export default {

  totalAlgorithm(param, sums, index, query) {
    sums.forEach(item => {
      item = Number((item+'').replace(/,/g,''))
    })
    const { columns, data } = param;
    if(index === 9 && !query.biz_form_name) {
      sums[index] = '--';
      return true
    }
    if(index === 10) {
      sums[10] =  (isNaN(sums[9]) ? Number(sums[8]) : Number(sums[8]) + Number(sums[9])).toFixed(2);
      return true
    }
    if(index === 15) {
      sums[15] = (sums[13] / sums[14]).toFixed(2);
      return true
    }
    if(index === 16) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].original_ground_land_unitprice) * Number(data[index].coml_ground_area)
      })
      sums[16] = (lsum / Number(sums[8])).toFixed(2);
      return true
    }
    if(index === 18) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].underground_land_unitprice) * Number(data[index].coml_underground_area)
      })
      sums[18] = isNaN(sums[9]) ? '--' : (lsum / Number(sums[9])).toFixed(2);
      return true
    }
    if(index === 19) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].cs_ground_land_unitprice) * Number(data[index].coml_ground_area)
      })
      sums[19] = (lsum / Number(sums[8])).toFixed(2);
      return true
    }
    if(index === 20) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].cs_underground_land_unitprice) * Number(data[index].coml_underground_area)
      })
      sums[20] = isNaN(sums[9]) ? '--' : (lsum / Number(sums[9])).toFixed(2);
      return true
    }
    if(index === 21) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].garage_unitprice) * Number(data[index].garage_share_area)
      })
      sums[21] = (lsum / Number(sums[11])).toFixed(2);
      return true
    }
    if(index === 22) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].invest_accumulate_unitprice) * Number(data[index].coml_total_area)
      })
      sums[22] = (lsum / Number(sums[10])).toFixed(2);
      return true
    }
    if(index === 23) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].invest_new_unitprice) * Number(data[index].coml_total_area)
      })
      sums[23] = (lsum / Number(sums[10])).toFixed(2);
      return true
    }
    if(index === 24) {
      let lsum = 0;
      data.forEach((item, index) => {
        lsum += Number(data[index].invest_total_unitprice) * Number(data[index].coml_total_area)
      })
      sums[24] = (lsum / Number(sums[10])).toFixed(2);
      return true
    }
  }

}