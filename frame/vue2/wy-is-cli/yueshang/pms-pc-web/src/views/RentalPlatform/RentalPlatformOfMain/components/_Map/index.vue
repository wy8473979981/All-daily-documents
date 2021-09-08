<template>
  <div class="x-map">
    <div id="canvas"></div>
  </div>
</template>

<script>
import { rentalPlatform } from "api/modules/RentalPlatform";
import { TXenon as Xenon } from "./xenon.js";
import { mapState } from "vuex";
export default {
  name: "XMap",

  props: {
    // 接口请求参数
    params: {
      type: Object,
      required: true,
    },

    // map 配置参数
    mapConfig: {
      type: Object,
      default: () => ({}),
    },

    buildingId: {
      type: String,
      default: "021001",
    },
  },

  data() {
    return {
      tmap: null,
      mapData: [],
      // tmpPoiIds: [], // 缓存选中高亮的id
      tmpLabels: ['cooperativeBrand'], // 缓存显得labels
      mapZoom: 13, // 缩放等级

      defaultMapConfig: {
        buildingId: "021001",
        mapKey: "3dad5c57cf6511eba07a000c29b24e63",
        optUserId: "0",
        editorModel: false,
        zoom: 13,
        bgColor: "#FDFCFA", // 默认背景色
        defaultColor: "#FFFFFF", // 铺位默认颜色
        borderColor: "#AAB6D4", // 铺位默认边框轮廓颜色
        innerBottomColor: "#EBEEFF", // 室内区域底部颜色
        innerBottomLineColor: "#AAB6D4", // 室内区域边框颜色
        outerBottomColor: "#FDFCFA", // 外部区域底部颜色
        outerBottomLineColor: "#FDFCFA", // 外部区域边框颜色
        selectBorderColor: "#FF0000", // 铺位默认选中轮廓颜色
        domain: window.location.host === "pms.powerlong.com" ? "https://pmszk.powerlong.com" : "https://pmszktest.powerlong.com",
        // domain: "https://pmszk.powerlong.com",
        showLabels: ['cooperativeBrand'],
        selectedColor: "#D1D5E5",
        fontSize: 9,
        fontWeight: 350,
        angle: 300,
      },
    };
  },

  mounted() {
    this.tmap && this.tmap._clearCache()
    this.init();
  },

  beforeDestroy() {
    console.log('destroy', this.tmap)
    this.tmap._clearCache()
  },

  computed: {
    ...mapState({
      formatColorList: (state) => state.rentalPlatform.formatColorList,
    }),
  },

  methods: {
    initMap(mapArr) {
      const that = this;
      const colorArr = this.formatColorList.length
        ? this.formatColorList.map((item) => ({
            key: "formatCd",
            val: item.key,
            color: item.standardColor,
          }))
        : [];
      const config = Object.assign(
        {},
        this.defaultMapConfig,
        {
          buildingId: this.buildingId,
          busiData: mapArr,
          colorArr: colorArr,
        },
        this.mapConfig
      );

      new Xenon("canvas", config, function(map) {
        if (!that.tmap) {
          that.tmap = map;
          // this.updateMapLabels('cooperativeBrand')
          that.bindEvents();
        }
      });
    },
    init() {
      rentalPlatform.queryStoreList({ bisProjectId: this.params.bisProjectId }).then((res) => {
        const mapArr = res.map((item) => ({
          poiId: item.poiId,
          bid: item.bid,
          data: Object.assign(item.vo, { storeRentSquare: item.vo.storeRentSquare ? item.vo.storeRentSquare + '㎡' : '' }),
        }));
        this.mapData = mapArr;

        this.initMap(mapArr);
      });
    },

    bindEvents() {
      // 选中POI事件
      this.tmap.on("selected", (e) => {
        // console.log("选中对象 : ",e.detail, this.getSeletedData(e));
        this.selectMapPoiByArr(e.detail)
        // this.highLightByBids(e.detail)
        // 选中对象
        this.$emit("selected", this.getSeletedData(e));
      });
      // 取消选中POI事件
      this.tmap.on("unSelected", (e) => {
        // console.log('取消选中对象 : ', e)
        // 取消选中对象
        this.$emit("unSelected", e.detail);
      });

      // 楼层切换事件
      this.tmap.on("changeFloor", (e) => {
        // console.log('选中的楼层值 : ', e.detail)
        // 选中的楼层值  e.detail
        this.$emit("changeFloor", e.detail);
      });

      // 缩放事件
      this.tmap.on("changeZoom", (e) => {
        // console.log('缩放级别值 : ', e. detail)
        // 缩放级别值  e.detail 缩放级别值范围：6-20
        // this.mapZoom = e.detail
        // if (e.detail <= 11) {
        //   this.tmap.updateMapLabels([])
        // } else {
        //   this.updateMapLabels(this.tmpLabels)
        // }
        this.$emit("changeZoom", e.detail);
      });

      // 鼠标移入事件
      this.tmap.on("mouseoverpoi", (e) => {
        // console.log('鼠标移入值 : ', e)
        // 鼠标移入值  e.detail 地图POI标识
        this.$emit("mouseoverpoi", e.detail);
      });

      // 鼠标移出事件
      this.tmap.on("mouseoutpoi", (e) => {
        // console.log('鼠标移出值 : ', e)
        // 鼠标移出值   e.detail 地图POI标识
        this.$emit("mouseoutpoi", e.detail);
      });

      this.tmap.on("changeAngle", (e) => {
        // console.log('changeAngle', e)
        this.$emit("changeAngle", e);
      });
    },

    /* 接口API */
    // 通过业务字段poiNum高亮POI，color为空则使用默认高亮夜颜色
    highLight(value, color, borderColor) {
      /* "poiNum", "07550073F200107",color */
      this.tmap?.highLight('poiId', value, color, borderColor);
    },

    // Label显示业务字段name(POI名称)
    updateMapLabels(keyNames) {
      // console.log('keyName====>', keyNames)
      // this.tmpLabels = keyNames
      // if (this.mapZoom <= 11) return
      this.tmap?.updateMapLabels(keyNames);
    },

    // 更新POI数据
    updatePoi(pois, bindStatus = true) {
      this.tmap?.updatePoi(pois, bindStatus);
    },

    // 初始化地图颜色
    initMapColor(key, val, color) {
      /* "poiNum", "07550073F200107",color */
      this.tmap?.initMapColor(key, val, color);
    },
    // 按业务字段批量修改地图颜色
    initMapColorByArr(arr) {
      this.tmap?.initMapColorByArr(arr);
    },

    // 获取选中的铺位数据
    getSeletedData(e) {
      // if (this.selectedMode === 0)
      return e.detail
        ? [...e.detail].map(
            (id) => this.mapData.find((item) => item.poiId === id) || id
          )
        : e;
    },

    // 修改单多选,调用一次函数变成多选模式，再调用一次函数变单选模式
    updateSelect(isSingle = true) {
      this.tmap?.updateSelect(isSingle)
    },

    // 根据poiId 获取 店铺数据
    getStoreIdAddColors(poiIds, type = "highlightColor") {
      let colors = []
      poiIds.map((id) => {
        const data = this.mapData.find((item) => item.poiId === id)
        const currentItem = this.formatColorList.find(
          (ele) => ele.key === data?.data?.formatCd
        )
        colors.push({
          poiId: id,
          color: currentItem ? currentItem[type] : "#D1D5E5",
          borderColor: type == "highlightColor" ? "#FF0000" : "#AAB6D4",
        })
      })
      return colors
    },

    // 根据poiId 获取 店铺数据 高亮
    getStoreIdAddColorsHigh(poiIds, type = "highlightColor") {
      let colors = []
      poiIds.map((id) => {
        const data = this.mapData.find((item) => item.poiId === id)
        const currentItem = this.formatColorList.find(
          (ele) => ele.key === data?.data?.formatCd
        )
        colors.push({
          bid: data?.bid,
          // poiId: id,
          color: currentItem ? currentItem[type] : "#D1D5E5",
          // borderColor: currentItem ? currentItem[type] : "#D1D5E5",
          borderColor: type == "highlightColor" ? "#FF0000" : "#AAB6D4",
        })
      })
      return colors
    },

    // 批量分颜色高亮铺位
    highLightByBids(poiIds) {
      this.canceHighLight()
      this.tmap?.highLightByBids(this.getStoreIdAddColorsHigh(poiIds));
    },
    // 取消高亮
    canceHighLight() {
      this.tmap?.canceHighLight()
    },

    // 选中铺位
    selectMapPoiByArr(poiIds) {
      // this.canceHighLight()
      this.tmap?.selectMapPoiByArr(this.getStoreIdAddColors(poiIds));
    },

    // 取消选中
    unselectMapPoiByArr(poiIds) {
      this.tmap?.unselectMapPoiByArr(this.getStoreIdAddColors(poiIds, "standardColor"));
    },
  },

  watch: {
    formatColorList: {
      handler() {
        this.formatColorList.length &&
          this.tmap &&
          this.mapData.length &&
          this.tmap.initMapColorByArr(
            this.formatColorList.map((item) => ({
              key: "formatCd",
              val: item.key,
              color: item.standardColor,
            }))
          );
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./xenon.css";

.x-map {
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
