import Vue from 'vue'

export default {

  // 用地面积合计、地上建筑面积合计、平均容积率合计
  countArea(arr, field) {
    let sum = arr.slice(0,-1)
              .map((item, index) => Number(item[field]))
              .reduce((prev, cur) =>  prev + cur, 0).toFixed(2);
    // console.log(sum);
    sum = Number(sum) ? sum : null;
    Vue.set(arr[arr.length-1], field, sum);
  },

  // 平均容积率计算
  countAvgVolumePer(lands) {
    lands.slice(0,-1).forEach(item => {
      if(item.land_area && item.ground_area) {
        item.avg_volume_per = ((item.ground_area / item.land_area)).toFixed(2);
        console.log(item.avg_volume_per)
      }else{
        item.avg_volume_per = null;
      }
    })
  },

  // 楼板价计算
  countFloorUnitprice(lands) {
    lands.slice(0,-1).forEach(item => {
      if(item.transfer_price && item.ground_area) {
        item.floor_unitprice = ((item.transfer_price * 100000000) / item.ground_area).toFixed(2);
        console.log(item.floor_unitprice)
      }else{
        item.floor_unitprice = null;
      }
    })
    let l = lands[lands.length-1];
    // 土地出让金合计*1亿/地上建面合计
    if(l.transfer_price && l.ground_area) {
      l.floor_unitprice = ((l.transfer_price * 100000000) / l.ground_area).toFixed(2);
    }else{
      l.floor_unitprice = null
    }
  },

  // 销售物业地上计容计算
  countSaleArea(lands, others) {
    let l = lands[lands.length-1];
    console.log(others.sale_property_ground_area, l.ground_area)
    if(others.sale_property_ground_area && l.ground_area) {
      others.sale_property_ground_per = ((others.sale_property_ground_area / l.ground_area)*100).toFixed(2);
    }else{
      others.sale_property_ground_per = null
    }
  },

  // 持有物业地上计容计算
  countHoldArea(lands, others) {
    let l = lands[lands.length-1];
    if(others.hold_property_ground_area && l.ground_area) {
      others.hold_property_ground_per = ((others.hold_property_ground_area / l.ground_area)*100).toFixed(2);
    }else{
      others.hold_property_ground_per = null
    }
  },

  // 车位指标计算
  countParkingTarget(lands, others) {
    let l = lands[lands.length-1];
    if(others.underground_area && l.ground_area) {
      others.parking_target = Math.floor(others.underground_area / l.ground_area * 100)
    }else{
      others.parking_target = null
    }
  },

  // 总土地成本(亿元)(含地价、契税、市政配套)
  countInvestTotalPrice(lands, others, config) {
    //土地出让金（亿元） * （1 + 契税 (地块) ） + 市政大配套费(万元）(地块)/10000
    console.log(config)
    // 
    let l = lands[lands.length-1];
    if(config.deed_tax_per && config.municipal_facilities_price && l.transfer_price) {
      others.invest_total_price = ((l.transfer_price) * (1 + config.deed_tax_per/100) + config.municipal_facilities_price / 10000).toFixed(2);
    }else{
      others.invest_total_price = null
    }
    console.log(others.invest_total_price)
  },

  // 销售物业楼板价计算
  countPropertySaleFloorUnitprice(config, others) {
    // 地价*100000000*销售物业地价占比/销售物业总建面
    if(config.land_per && config.property_sale_land_per && others.sale_property_ground_area) {
      config.property_sale_floor_unitprice = (config.land_per * 100000000 * config.property_sale_land_per / others.sale_property_ground_area).toFixed(2);
    }else{
      config.property_sale_floor_unitprice = null
    }
  },

  // 自持物业楼板价计算
  countPropertyHoldFloorUnitprice(config, others) {
    // 地价*100000000*自持物业地价占比/自持物业总建面
    if(config.land_per && config.property_hold_land_per && others.hold_property_ground_area) {
      config.property_hold_floor_unitprice = (config.land_per * 100000000 * config.property_hold_land_per / others.hold_property_ground_area).toFixed(2);
    }else{
      config.property_hold_floor_unitprice = null
    }
  },

  // 保障房面积计算
  countAffordableArea(config) {
    if(config.affordable_dispose_area && config.affordable_dispose_multiple) {
      config.affordable_area = (config.affordable_dispose_area * config.affordable_dispose_multiple).toFixed(2);
    }else{
      config.affordable_area = null
    }
  },

  // 建安成本合计计算
  countAffordableCsPrice(config) {
    if(config.affordable_cs_unitprice && config.affordable_area) {
      config.affordable_cs_price = (config.affordable_cs_unitprice * config.affordable_area).toFixed(2);
    }else{
      config.affordable_cs_price = null
    }
  }

}