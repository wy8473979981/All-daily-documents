<template>
  <div>
    <div id="mapContainer" class="ysn-map" />
    <ul
      v-if="spenSionShow"
      class="box"
      :style="{ left: tranLeft, top: tranTop }"
    >
      <li
        v-for="item in spenSionList"
        :key="item.id"
        @click.stop="clickSpen(item.id)"
      >
        {{ item.val }}
      </li>
    </ul>
    <div class="tool">
      <i class="el-icon-refresh-right" @click="open" />
      <i class="el-icon-lock" @click="scrollableClick" />
      <i class="el-icon-discover" @click="open" />
    </div>
    <div class="left-btn">
      <button>收入比重</button>
      <button>收益指标</button>
    </div>
    <div class="card">
      <div v-if="clickShow" class="cardBox">
        <div
          v-for="(item, index) in cardList"
          :key="index"
          class="txt-box"
          :style="'width:' + item.width"
        >
          <p>{{ item.title }}</p>
          <div class="txt-bottom">
            <div class="one-bottom">
              <span>{{ item.name1 }}</span>
              <span>{{ item.val1 }}</span>
            </div>
            <div class="one-bottom">
              <span>{{ item.name2 }}</span>
              <span>{{ item.val2 }}</span>
            </div>
            <div v-if="item.name3" class="one-bottom">
              <span>{{ item.name3 }}</span>
              <span>{{ item.val3 }}</span>
            </div>
            <div v-if="item.name3" class="one-bottom">
              <span>{{ item.name4 }}</span>
              <span>{{ item.val4 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApi } from '@/api'
export default {
  name: 'YsNMap',
  props: {
    centerLatLng: {
      // 中心点默认西安
      type: Object,
      default() {
        return {
          lat: 31.15811,
          lng: 121.357109
          //  lat: 31.151025,
          // lng: 121.375339,
        }
      }
    },
    zoom: {
      // 缩放比例
      type: Number,
      default: 17
    }
  },

  data() {
    return {
      // 业态悬浮菜单
      spenSionList: [
        { id: 1, val: '详情' },
        { id: 2, val: '投测' },
        { id: 3, val: '租金' }
      ],
      // 弹窗卡片
      cardList: [
        {
          title: '净资产收入NOI(万元)',
          name1: '当月实际',
          val1: '216.57',
          name2: '今年预测',
          val2: '1,324',
          width: '230px'
        },
        {
          title: '业主收益（万元）',
          name1: '目标业主收益',
          val1: '855.53',
          name2: '实际业主收益',
          val2: '643.86',
          name3: '预测平均业主',
          val3: '86.69%',
          name4: '收益率',
          val4: '75.98%',
          width: '429px'
        },
        {
          title: '财务',
          name1: '出租率',
          val1: '13%',
          name2: '总租金',
          val2: '643.86%',
          name3: '平均租金',
          val3: '86.69%',
          name4: '坪效',
          val4: '75.98%',
          width: '367px'
        },
        {
          title: '总投资成本（万元）',
          name1: '总成本',
          val1: '254,324',
          name2: '预测年回报率',
          val2: '7.75%',
          width: '230px'
        },
        {
          title: '售价（万元）',
          name1: '本金',
          val1: '254,324',
          name2: '估值日期',
          val2: '2021-02-18',
          name3: '预测年回报率',
          val3: '7.86%',
          width: '429px'
        },
        {
          title: '贷款',
          name1: '本金',
          val1: '254,324',
          name2: '到期日',
          val2: '2021-02-18',
          name3: '年贷款利息',
          val3: '1,758',
          width: '367px'
        }
      ],
      map: null, // 地图实例
      polygon: null,
      clickShow: false, // 地块信息
      cityList: [], // 城市列表
      position: {}, // 点击坐标点
      infoWindow: null, // 弹窗信息
      tranLeft: 0, // 向左偏移
      tranTop: 0, // 向右偏移
      spenSionShow: false, // 业态卡片
      scrollable: true // 是否支持缩放
    }
  },

  mounted() {
    this.init()
    // this.getCtiyList();
  },

  created() {
    function myInfoWindow(options) {
      var mydom
      window.TMap.DOMOverlay.call(this, options)
    }
    myInfoWindow.prototype = new window.TMap.DOMOverlay()

    // 初始化
    myInfoWindow.prototype.onInit = function(options) {
      this.position = options.position
      this.content = options.content
    }

    // 创建DOM元素，返回一个DOMElement
    myInfoWindow.prototype.createDOM = function() {
      mydom = document.createElement('div')
      // 设置DOM样式
      mydom.style.cssText =
        'height:15px;max-width:120px;padding:5px;background:#fff;border:#ccc solid 1px;\line-height:15px;font-size:12px;position:absolute;top:0px;left:0px;'
      mydom.innerHTML = this.content
      return mydom
    }

    // 更新DOM元素，在地图移动/缩放后执行
    myInfoWindow.prototype.updateDOM = function() {
      if (!this.map) {
        return
      }

      // 经纬度坐标转容器像素坐标
      const pixel = this.map.projectToContainer(this.position)

      // 默认使用DOM左上角作为坐标焦点进行绘制（左上对齐）
      // 如想以DOM中心点（横向&垂直居中）或其它位置为焦点，可结合this.dom.clientWidth和this.dom.clientHeight自行计算
      const left = pixel.getX() - this.dom.clientWidth / 2 + 'px' // 本例水平居中
      const top = pixel.getY() + 'px'

      // 将平面坐标转为三维空间坐标
      this.dom.style.transform = `translate3d(${left}, ${top}, 0px)`
    }

    // 自定义一个更新内容的方法
    myInfoWindow.prototype.updateContent = function(content) {
      mydom.innerHTML = content
    }
  },

  methods: {
    // 返回
    open() {
      alert('我是返回键')
    },
    // 缩放设置
    scrollableClick() {
      this.scrollable = !this.scrollable
      this.destroy()
      this.init()
    },
    // 业态菜单
    clickSpen(val) {
      this.spenSionShow = false
      this.$parent.tabIdx = val - 1
      this.$parent.filterS = true
      if (val === 1) {
        this.clickShow = true
      } else {
        this.clickShow = false
        if (val === 3) {
          this.$parent.title = ''
          this.$parent.echart = true
        }
      }
    },
    init(val) {
      this.map = new window.TMap.Map('mapContainer', {
        // center: new window.TMap.LatLng(39.984120,116.307484),
        zoom: this.zoom,
        scrollable: this.scrollable,
        center: new window.TMap.LatLng(
          this.centerLatLng.lat,
          this.centerLatLng.lng
        )
      })
      console.log(val)
      this.draw()
      if (val) {
        this.makeMarkers(val)
      } else {
        this.makeMarker()
      }
    },
    destroy() {
      this.map.destroy()
    },
    makeMarker() {
      var marker2 = new window.TMap.MultiMarker({
        id: 'markers-layers', // 图层id
        map: this.map,
        styles: {
          // 点标注的相关样式
          marker: new window.TMap.MarkerStyle({
            width: 52,
            height: 59,
            src: require('./lou.png')
          })
        },
        geometries: [
          {
            // 点标注数据数组
            id: 'demo',
            styleId: 'marker',
            position: new window.TMap.LatLng(31.158632, 121.356389),
            properties: {
              title: 'marker'
            }
          }
        ]
      })
      var marker = new window.TMap.MultiMarker({
        id: 'marker-layer', // 图层id
        map: this.map,
        styles: {
          // 点标注的相关样式
          marker: new window.TMap.MarkerStyle({
            width: 52,
            height: 59,

            src: require('./cheng.png')
          })
        },
        geometries: [
          {
            // 点标注数据数组
            id: 'demo',
            styleId: 'marker',
            position: new window.TMap.LatLng(31.158509, 121.355066),
            properties: {
              title: 'marker'
            }
          }
        ]
      })
      var marker1 = new window.TMap.MultiMarker({
        id: 'markers-layer', // 图层id
        map: this.map,
        styles: {
          // 点标注的相关样式
          marker: new window.TMap.MarkerStyle({
            width: 52,
            height: 59,
            src: require('./hotel.png')
          })
        },
        geometries: [
          {
            // 点标注数据数组
            id: 'demo',
            styleId: 'marker',
            position: new window.TMap.LatLng(31.157654, 121.35645),
            properties: {
              title: 'marker'
            }
          }
        ]
      })
      // marker.setMap(null);移除
      marker.on('mousemove', this.eventClick)
      marker1.on('mousemove', this.eventClick)
      marker2.on('mousemove', this.eventClick)
      // marker.setMap(null);移除
      marker.on('mouseout', this.eventClicks)
      marker1.on('mouseout', this.eventClicks)
      marker2.on('mouseout', this.eventClicks)
    },
    // 点击投测高亮
    clickMakeMarkers(index) {
      this.destroy()
      if (index === 3) {
        this.init(3)
      } else {
        this.clickShow = false
        this.init(1)
      }
    },
    // 高亮
    makeMarkers(val) {
      console.log(val)
      if (val === 3) {
        var marker2 = new window.TMap.MultiMarker({
          id: 'markers-layers', // 图层id
          map: this.map,
          styles: {
            // 点标注的相关样式
            marker: new window.TMap.MarkerStyle({
              width: 52,
              height: 59,
              src: require('./lou.png')
            })
          },
          geometries: [
            {
              // 点标注数据数组
              id: 'demo',
              styleId: 'marker',
              position: new window.TMap.LatLng(31.158632, 121.356389),
              properties: {
                title: 'marker'
              }
            }
          ]
        })
        var marker1 = new window.TMap.MultiMarker({
          id: 'markers-layer', // 图层id
          map: this.map,
          styles: {
            // 点标注的相关样式
            marker: new window.TMap.MarkerStyle({
              width: 52,
              height: 59,
              src: require('./hotel.png')
            })
          },
          geometries: [
            {
              // 点标注数据数组
              id: 'demo',
              styleId: 'marker',
              position: new window.TMap.LatLng(31.157654, 121.35645),
              properties: {
                title: 'marker'
              }
            }
          ]
        })
      } else {
        var marker2 = new window.TMap.MultiMarker({
          id: 'markers-layers', // 图层id
          map: this.map,
          styles: {
            // 点标注的相关样式
            marker: new window.TMap.MarkerStyle({
              width: 52,
              height: 59,
              src: require('./kexuan1.png')
            })
          },
          geometries: [
            {
              // 点标注数据数组
              id: 'demo',
              styleId: 'marker',
              position: new window.TMap.LatLng(31.158632, 121.356389),
              properties: {
                title: 'marker'
              }
            }
          ]
        })
        var marker1 = new window.TMap.MultiMarker({
          id: 'markers-layer', // 图层id
          map: this.map,
          styles: {
            // 点标注的相关样式
            marker: new window.TMap.MarkerStyle({
              width: 52,
              height: 59,
              src: require('./kexuan2.png')
            })
          },
          geometries: [
            {
              // 点标注数据数组
              id: 'demo',
              styleId: 'marker',
              position: new window.TMap.LatLng(31.157654, 121.35645),
              properties: {
                title: 'marker'
              }
            }
          ]
        })
      }

      var marker = new window.TMap.MultiMarker({
        id: 'marker-layer', // 图层id
        map: this.map,
        styles: {
          // 点标注的相关样式
          marker: new window.TMap.MarkerStyle({
            width: 52,
            height: 59,
            src: require('./kexuan.png')
          })
        },
        geometries: [
          {
            // 点标注数据数组
            id: 'demo',
            styleId: 'marker',
            position: new window.TMap.LatLng(31.158509, 121.355066),
            properties: {
              title: 'marker'
            }
          }
        ]
      })
      // marker.setMap(null);移除
      marker.on('mousemove', this.eventClick)
      marker1.on('mousemove', this.eventClick)
      marker2.on('mousemove', this.eventClick)
      // marker.setMap(null);移除
      marker.on('mouseout', this.eventClicks)
      marker1.on('mouseout', this.eventClicks)
      marker2.on('mouseout', this.eventClicks)
    },

    eventClick(e) {
      this.spenSionShow = true
      this.tranLeft = e.point.x + 30 + 'px'
      this.tranTop = e.point.y + 'px'
    },
    eventClicks(e) {
      this.spenSionShow = false
      this.tranLeft = e.point.x + 30 + 'px'
      this.tranTop = e.point.y + 'px'
    },

    // 创建点聚合
    markerPoints() {
      // 创建点聚合实例
      const markerCluster = new window.TMap.MarkerCluster({
        id: 'cluster',
        map: this.map,
        enableDefaultStyle: true, // 启用默认样式
        minimumClusterSize: 2, // 形成聚合簇的最小个数
        geometries: [
          {
            // 点数组
            position: new window.TMap.LatLng(40.034947, 116.269814)
          },
          {
            // 点数组
            position: new window.TMap.LatLng(40.036947, 116.269814)
          },
          {
            // 点数组
            position: new window.TMap.LatLng(40.036947, 116.279814)
          }
        ],
        zoomOnClick: true, // 点击簇时放大至簇内点分离
        gridSize: 60, // 聚合算法的可聚合距离
        averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
        maxZoom: 10 // 采用聚合策略的最大缩放级别
      })
    },

    mapClick(evt) {
      const lat = evt.latLng.getLat().toFixed(6)
      const lng = evt.latLng.getLng().toFixed(6)
      this.position = { lat, lng }
      console.log('mapClick', evt)
      // this.getCity({ lat, lng });
    },

    // 获取所有城市
    // getCtiyList() {
    //   baseApi.getList().then((res) => {
    //     console.log(res);
    //     this.cityList = res;
    //   });
    // },

    // 根据坐标点获取城市
    // getCity(latLng) {
    //   baseApi
    //     .getCityByLocation({ location: `${latLng.lat},${latLng.lng}` })
    //     .then((res) => {
    //       console.log("getCity", res);

    //       this.createInfoWindow(
    //         this.position,
    //         res.address_component.province,
    //         6
    //       );
    //     });
    // },

    // 根据城市获取path
    // getGeometries(cityId) {
    //   return baseApi.search({ get_polygon: 2, keyword: cityId });
    // },

    // 重新设置中心点和zoom
    setCenter() {
      var center = new window.TMap.LatLng(this.position.lat, this.position.lng) // 设置中心点坐标
      // 初始化地图
      this.map.easeTo(
        {
          zoom: this.zoom,
          center: center
        },
        {
          duration: 2000
        }
      )
    },

    // 绘制轮廓，遮罩
    draw(
      mapData,
      cityId = 'polygon-layer',
      color = 'rgba(255, 0, 0, 0.51)',
      borderColor = '#FF2D2D'
    ) {
      // let geometries = []

      // for (let i = 0; i < mapData.length; i++) {
      //   var path = []
      //   var mapj = mapData[i]
      //   if (mapj && mapj.length > 0) {
      //     for (let j = 0; j < mapj.length / 2; j++) {
      //       path.push(new window.TMap.LatLng(mapj[2 * j + 1], mapj[2 * j]))
      //     }
      //   }
      //   geometries.push({ paths: path, id: 'polygon', styleId: 'polygon' })
      // }

      const path = [
        // 多边形的位置信息
        new window.TMap.LatLng(31.157379, 121.3586),
        new window.TMap.LatLng(31.158828, 121.35845),
        new window.TMap.LatLng(31.159574, 121.359771),
        new window.TMap.LatLng(31.160234, 121.36003),
        new window.TMap.LatLng(31.160254, 121.360479),
        new window.TMap.LatLng(31.157893, 121.360353)
      ]

      this.polygon = new window.TMap.MultiPolygon({
        id: cityId,
        map: this.map,
        styles: {
          polygon: new window.TMap.PolygonStyle({
            color: color,
            showBorder: false,
            borderColor: borderColor // 边线颜色
          })
        },
        geometries: [
          {
            id: 'polygon', // 多边形图形数据的标志信息
            styleId: 'polygon', // 样式id
            paths: path // 多边形的位置信息
          }
        ]
      })

      this.polygon.on('click', this.placeClick)

      // this.infoWindow.close();
      // this.setCenter()
    },
    // 地块点击
    placeClick() {
      this.$parent.clikd()
      this.$parent.filterS = true
    },

    // 创建信息窗口
    // createInfoWindow(latLng, cityName, number) {
    //   this.infoWindow && this.infoWindow.close();

    //   const id = new Date().getTime();

    //   const infoWindowLocation = new window.TMap.LatLng(latLng.lat, latLng.lng); //创建一个坐标
    //   //创建InfoWindow实例，并进行初始化
    //   if (!this.infoWindow) {
    //     this.infoWindow = new window.TMap.InfoWindow({
    //       map: this.map,
    //       position: infoWindowLocation,
    //       //设置infoWindow，content支持直接传入html代码，以实现各类内容格式需求
    //       content: `
    //         <div class="lla" id="content-${id}">
    //           <p style="background: #fff;">Hello World!${cityName}, ${number}</p>
    //           <input type="button" value="按钮" id="button-${id}"/>
    //         </div>
    //       `,
    //     });
    //   } else {
    //     this.infoWindow.setPosition(infoWindowLocation); //设置信息窗位置
    //     const html = `
    //         <div class="lla" id="content-${id}">
    //           <p style="background: #fff;">Hello World!${cityName}, ${number}</p>
    //           <input type="button" value="按钮" id="button-${id}"/>
    //         </div>
    //       `;
    //     this.infoWindow.setContent(html); //设置信息窗内容
    //     this.infoWindow.open();
    //   }

    //   this.$nextTick(() => {
    //     this.setStyle(id, latLng, cityName, number);
    //   });
    // },

    handleClick(e) {
      console.log('你点我了')
    }

    // setStyle(id, latLng, cityName, number) {
    //   const ele = document.querySelector(`#content-${id}`);
    //   ele.parentElement.style.background = "rgba(0,0,0,.5)";

    //   const oButton = document.querySelector(`#button-${id}`);
    //   oButton.onclick = () => {
    //     this.$message.success(
    //       `点击的坐标${latLng.lat},${latLng.lng},城市名称：${cityName},项目数量： ${number}`
    //     );

    //     const cityId = this.cityList[0].find(
    //       (item) => item.fullname === cityName
    //     ).id;
    //     this.getGeometries(cityId).then((res) => {
    //       const pathData = res[0][0].polygon;
    //       this.draw(pathData, cityId);
    //     });
    //   };
    // },
  }
}
</script>

<style lang="scss" scoped>
.ysn-map {
  height: 660px;
  width: 770px;
  ::v-deep.rotate-circle {
    padding: 36px 20px 7px;
  }
}
.box {
  position: absolute;
  /*top: 587px;
    left: 933px;*/
  z-index: 1000;
  width: 104px;
  height: 105px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    padding: 0 16px;
    height: 28px;
    font-size: 12px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #848382;
    cursor: pointer;
    line-height: 28px;
  }
  li:hover {
    background: #f2f1ec;
    color: #3b8995;
  }
}
.tool {
  position: absolute;
  right: 100px;
  top: 10px;
  text-align: center;
  cursor: pointer;
  z-index: 1990;
  i {
    line-height: 20px;
    width: 32px;
    height: 20px;
    background: #e0dfdd;
    border-radius: 16px;
    margin-left: 6px;
  }
}
.left-btn {
  width: 32px;
  position: absolute;
  left: 15px;
  top: 59px;
  z-index: 1990;
  button {
    width: 32px;
    height: 94px;
    margin-bottom: 8px;
    border: none;
    background: #c8c6a9;
    border-radius: 16px;
    font-size: 14px;
    padding: 0 9px;
    color: #014543;
  }
}

//弹窗卡片
.card {
  width: 50px;
  height: 50px;
  background: transparent;
  // position: absolute;
  // top: 255px;
  // left: 218px;
  border-radius: 50%;
  .cardBox {
    width: 1052px;
    position: absolute;
    left: 88px;
    top: 450px;
    display: flex;
    flex-wrap: wrap;
    z-index: 1990;
    .txt-box {
      padding: 16px 13px 25px 19px;
      background: #e0e7e7;
      border-radius: 8px;
      opacity: 0.7;
      border: 1px solid #485f47;
      margin-right: 8px;
      margin-bottom: 8px;
      p {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #020b14;
        margin-bottom: 8px;
      }
      .txt-bottom {
        display: flex;
        // justify-content: space-evenly;
        .one-bottom {
          :nth-child(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #020b14;
          }
          :nth-child(2) {
            display: inline-block;
            margin-top: 15px;
            margin-right: 20px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #347e7c;
          }
        }
      }
    }
  }
}
</style>
