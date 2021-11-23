<template>
  <div class="echarts" ref="heatMap"></div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
export default {
  name: "heatMap",
  mixins: [resize],
  data() {
    return {
      myCharts: null,
      geoJson: {
        features: [],
      },
      data: [
        {
          name: "武汉",
          x: "114.31",
          y: "30.52",
        },
        {
          name: "汉阳",
          x: "114.02",
          y: "30.57",
        },
        {
          name: "黄石",
          x: "115.09",
          y: "30.2",
        },
        {
          name: "十堰",
          x: "110.79",
          y: "32.65",
        },
        {
          name: "宜昌",
          x: "111.3",
          y: "30.7",
        },
        {
          name: "孝感",
          x: "113.91",
          y: "31.92",
        },
        {
          name: "汉川",
          x: "113.59",
          y: "30.63",
        },
        {
          name: "应山",
          x: "113.81",
          y: "31.62",
        },
        {
          name: "黄冈",
          x: "114.87",
          y: "30.44",
        },
        {
          name: "麻城",
          x: "115",
          y: "31.17",
        },
        {
          name: "黄梅",
          x: "115.93",
          y: "30.09",
        },
        {
          name: "通山",
          x: "114.52",
          y: "29.6",
        },
        {
          name: "荆门",
          x: "112.19",
          y: "31.02",
        },
        {
          name: "监利",
          x: "112.9",
          y: "29.83",
        },
      ],
    };
  },
  mounted() {
    this.getGeoJson(340800);
  },
  methods: {
    //获取geoJson数据
    getGeoJson(adcode) {
      let that = this;
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          that.geoJson.features = Json;
          console.log(JSON.stringify(Json))
          that.getMapData();
        });
      });
    },
    //获取数据   为了效果好看，这里造点假数据
    getMapData() {
      let mapData = this.geoJson.features.map((item, index) => {
        return {
          name: item.properties.name,
          value: [
            item.properties.center[0],
            item.properties.center[1],
            Math.random() * 4000000,
          ],
        };
      });
      // this.data.forEach((item) => {
      //   mapData.push({
      //     name: item.name,
      //     value: [item.x, item.y, Math.random() * 40],
      //   });
      // });
      console.log(mapData, "mapData");
      //去渲染echarts
      this.initEcharts(mapData);
    },
    initEcharts(mapData) {
      this.myChart = echarts.init(this.$refs.heatMap);
      echarts.registerMap("Map", this.geoJson); //注册
      this.myChart.setOption(
        {
          tooltip: {
            trigger: "item",
          },
          title: {
            show: true,
            left: "center",
            top: "15",
            text: "热力图(不可下钻)",
            textStyle: {
              color: "rgb(179, 239, 255)",
              fontSize: 16,
            },
          },
          // toolbox: {
          //   feature: {
          //     restore: {
          //       show: false,
          //     },
          //     dataView: {
          //       show: false,
          //     },
          //     saveAsImage: {
          //       name: "热力图",
          //     },
          //     dataZoom: {
          //       show: false,
          //     },
          //     magicType: {
          //       show: false,
          //     },
          //   },
          //   iconStyle: {
          //     normal: {
          //       borderColor: "#1990DA",
          //     },
          //   },
          //   top: 15,
          //   right: 35,
          // },

          visualMap: {
            show: true,
            left: "2%",
            bottom: "1%",
            min: 0,
            max: 4000,
            text: ["40000", "0"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["#41A7DE", "#eac736", "#fffc00", "#ff2600"],
            },
          },
          geo: {
            show: true,
            map: "Map", //使用
            roam: true,
            itemStyle: {
              normal: {
                show: false,
                areaColor: "#ffffff",
                borderType: "dotted",
                borderColor: "#53D9FF",
                borderWidth: 1.3,
                // shadowBlur: 15,
                // shadowColor: "rgb(58,115,192)",
                // shadowOffsetX: 7,
                // shadowOffsetY: 6,
              },
              //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              emphasis: {
                show: false,
                areaColor: "#ffffff",
                // borderWidth: 1.6,
                // shadowBlur: 25,
              },
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                color: "#f75a00",
              },
            },
            zoom: 1.15,
          },
          series: [
            {
              name: "地图",
              type: "heatmap",
              data: mapData,
              coordinateSystem: "geo",
              pointSize: 13, //修改热力图点的半径
              blurSize: 15, //阴影的大小
            },
          ],
        },
        true
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../assets/bg1.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
