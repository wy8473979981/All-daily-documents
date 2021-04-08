<template>
  <div class="x-chart">
    <div class="x-chart__title" v-if="title">
      <div class="x-chart__title-main">{{ title }}</div>
      <div class="x-chart__title-sub" v-show="subTitle">{{ subTitle }}</div>
    </div>
    <div
      ref="container"
      class="x-chart__container"
      style="height: 100%; width: 100%;"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "YsNChart",

  props: {
    type: {
      // 类型， circle， line
      type: String,
      default: "circle",
    },
    data: {
      // 数据
      type: [Object, Array],
      default: () => ({}),
    },
    title: String, // 标题
    subTitle: String, // 标题 辅助提示文字
    color: {
      type: Array,
      default: () => ["#5C9EFA", "#73DEB3"],
    }, // 配置颜色
    legend: Array, // 配置种类
    x: Array,
  },
  data() {
    return {
      option: [],

      myChart: null,
    };
  },

  mounted() {
    this.myChart = echarts.init(this.$refs.container);
    this.option = this.getOpitons();
    this.myChart.setOption(this.option, true);
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.update();
      },
    },
  },

  destroy() {
    console.log("destroy");
  },

  methods: {
    update() {
      if (this.type === "circle") {
        let option = {
          series: [
            {
              data: this.data,
            },
          ],
        };

        if (this.legend) {
          option.legend = {
            data: this.legend,
            right: "10%",
            icon: "circle",
          };
        }

        this.myChart.setOption(option);
      } else {
        let data = this.data;
        // if (this.data.length > 0) {
        //   data = this.data.map(item => Object.assign(item, { barWidth: '10%' }))
        // } else {
        //   data = Object.assign(this.data, { barWidth: '10%' })
        // }
        if (this.legend) {
          this.myChart.setOption({
            series: data,
            legend: {
              data: this.legend,
              top: '12'
            },
          });
        } else {
          this.myChart.setOption({
            series: data,
          });
        }
      }
    },

    getOpitons() {
      let option = {};
      if (this.type === "circle") {
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            right: "0",
            top: "middle",
            icon: "circle",
            orient: "vertical",
          },
          series: [
            {
              // name: this.title,
              type: "pie",
              // radius: '55%',
              radius: ["50%", "65%"],
              center: ["40%", "50%"],
              labelLine: {
                show: false,
              },
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              data: [],
              emphasis: {
                label: {
                  show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
            },
          ],
        };
      } else {
        option = {
          // title: {
          //   text: this.title,
          //   textStyle: {
          //     fontSize: 12
          //   }
          // },
          grid: {
            left: "0",
            right: "3%",
            bottom: "0",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          xAxis: [
            {
              type: "category",
              // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              data: this.x,
            },
          ],
          yAxis: [
            {
              type: "value",
              splitNumber: 10, // 分割的份数
              // scale: true, // 是否坐标从0开始
              minInterval: 1, // 坐标最小间隔
            },
          ],
          series: [],
        };
      }

      this.color && (option.color = this.color);
      if (this.legend) {
        option.legend = {
          data: this.legend,
          right: "10%",
          top: "1%",
          icon: "circle",
        };
      }

      return option;
    },
  },
};
</script>

<style lang="scss" scoped>
.x-chart {
  height: 100%;
  width: 100%;
  position: relative;

  &__title {
    position: absolute;
    width: 100%;
    top: 12px;
    left: 0;
    height: 20px;
    line-height: 20px;
    font-size: $font-base-size;
    color: $font-sub-color;
    display: flex;
    align-items: center;

    &-main {
    }

    &-sub {
      margin-left: 16px;
      color: #9b9b9b;
      padding-left: 20px;
      background-image: url(~assets/images/tips.png);
      background-repeat: no-repeat;
      background-position: 0 2px;
      background-size: 16px 16px;
    }
  }

  &__container {
    height: 100%;
    width: 100%;
  }
}
</style>
