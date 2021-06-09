<template>
  <div class="ysn-map" id='mapContainer'></div>
</template>

<script>
import { baseApi } from '@/api'
export default {
  name: 'YsNMap',

  props: {
    centerLatLng: { // 中心点默认西安
      type: Object,
      default() {
        return {
          lat: 34.34127,
          lng: 108.93984
        }
      }
    },
    zoom: { // 缩放比例
      type: Number,
      default: 4
    }
  },

  data() {
    return {
      map: null, // 地图实例
      polygon: null,

      cityList: [], // 城市列表
      position: {}, // 点击坐标点
      infoWindow: null, // 弹窗信息
    }
  },

  mounted() {
    this.init();
    this.getCtiyList();

  },

  methods: {
    init() {
      this.map = new window.TMap.Map('mapContainer', {
        zoom: this.zoom,
        center: new window.TMap.LatLng(this.centerLatLng.lat, this.centerLatLng.lng)
      });

      //绑定点击事件
      this.map.on("click", this.mapClick)
    },

    mapClick(evt) {
      const lat = evt.latLng.getLat().toFixed(6);
      const lng = evt.latLng.getLng().toFixed(6);
      this.position = {lat, lng};
      console.log('mapClick', evt)
      this.getCity({lat, lng});
    },

    // 获取所有城市
    getCtiyList() {
      baseApi.getList().then(res => {
        console.log(res)
        this.cityList = res
      })
    },

    // 根据坐标点获取城市
    getCity(latLng) {
      baseApi.getCityByLocation({location: `${latLng.lat},${latLng.lng}`}).then(res => {
        console.log('getCity', res)

        this.createInfoWindow(this.position, res.address_component.province, 6)
      })
    },

    // 根据城市获取path
    getGeometries(cityId) {
      return baseApi.search({get_polygon: 2, keyword: cityId})
    },

    // 重新设置中心点和zoom
    setCenter() {
      var center = new window.TMap.LatLng(this.position.lat, this.position.lng);//设置中心点坐标
      //初始化地图
      this.map.easeTo({
        zoom: 7,
        center: center
      }, {
        duration: 2000
      })
    },

    // 绘制轮廓，遮罩
    draw(mapData, cityId, color = '#2ba2c8') {
      let geometries = []

      for (let i = 0; i < mapData.length; i++) {
        var path = []
        var mapj = mapData[i]
        if (mapj && mapj.length > 0) {
          for (let j = 0; j < mapj.length / 2; j++) {
            path.push(new window.TMap.LatLng(mapj[2 * j + 1], mapj[2 * j]))
          }
        }
        geometries.push({ paths: path, id: 'polygon', styleId: 'polygon' })
      }
      
      this.polygon = new window.TMap.MultiPolygon({
        id: cityId,
        map: this.map,
        styles: {
          'polygon': new window.TMap.PolygonStyle({
            'color': color,
            'showBorder': false
          })
        },
        geometries: geometries
      });


      this.infoWindow.close();
      this.setCenter()
    },

    // 创建信息窗口
    createInfoWindow(latLng, cityName, number) {
      this.infoWindow && this.infoWindow.close();
      
      const id = new Date().getTime()

      const infoWindowLocation = new window.TMap.LatLng(latLng.lat, latLng.lng);//创建一个坐标
      //创建InfoWindow实例，并进行初始化
      if (!this.infoWindow) {
        this.infoWindow = new window.TMap.InfoWindow({
          map: this.map,
          position: infoWindowLocation,
          //设置infoWindow，content支持直接传入html代码，以实现各类内容格式需求
          content: `
            <div class="lla" id="content-${id}">
              <p style="background: #fff;">Hello World!${cityName}, ${number}</p>
              <input type="button" value="按钮" id="button-${id}"/>
            </div>
          `
        });
      } else {
        this.infoWindow.setPosition(infoWindowLocation);//设置信息窗位置
        const html = `
            <div class="lla" id="content-${id}">
              <p style="background: #fff;">Hello World!${cityName}, ${number}</p>
              <input type="button" value="按钮" id="button-${id}"/>
            </div>
          `
        this.infoWindow.setContent(html);//设置信息窗内容
        this.infoWindow.open()
      }

      this.$nextTick(() => {
        this.setStyle(id, latLng, cityName, number)
      })
    },

    handleClick() {
      console.log('你点我了')
    },


    setStyle(id, latLng, cityName, number) {
      const ele = document.querySelector(`#content-${id}`)
      ele.parentElement.style.background = 'rgba(0,0,0,.5)'

      const oButton = document.querySelector(`#button-${id}`)
      oButton.onclick = () => {
        this.$message.success(`点击的坐标${latLng.lat},${latLng.lng},城市名称：${cityName},项目数量： ${number}`)

        const cityId = this.cityList[0].find(item => item.fullname === cityName).id;
        this.getGeometries(cityId).then(res => {
          const pathData = res[0][0].polygon;
          this.draw(pathData, cityId)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ysn-map {
  height: 100%;
  width: 100%;
}
</style>