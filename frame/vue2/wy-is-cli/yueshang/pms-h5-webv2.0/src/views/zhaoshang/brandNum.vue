<template>
  <div class="home" v-webTitle :data-title="`进场审图进度-品牌数`">
    <div class="header-top">
      <ys-n-nav-bar :title="`进场审图进度-品牌数`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selected" @projeSelected="projeSelected" :dilogShow="false"  :disabledAll="true"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.queryDate"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <ys-n-section :title="chartsTitle" :collapseable="collapseable">
      <div class="head-actions_left_view" slot="head-actions_left">
        <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
        <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
        <ys-n-filter-chart-dialog :searchList="searchTypeList" @search="searchType" :leftLink="true" @linkUrl="goLink"></ys-n-filter-chart-dialog>
      </div>
      <ys-n-echart :options="options" canvasId="completId"></ys-n-echart>
    </ys-n-section>
  </div>
</template>

<script>

const columnList = [{
  label: '序号',
  width: '1.5rem',
  align: 'left'
}, {
  label: '项目',
  key: 'bisProjectName',
  width: '2rem',
  color: '#3B96BE',
  align: 'left'
}, {
  label: '实际计租面积(㎡)',
  key: 'rentArea',
  width: '3.2rem',
  align: 'right',
  sortable: true
}, {
  label: '占比',
  key: 'rentAreaRatio',
  width: '1.7rem',
  align: 'right',
  sortable: true
}, {
  label: '实际品牌数',
  key: 'brandNumber',
  width: '2.4rem',
  align: 'right',
  sortable: true
}, {
  label: '占比',
  key: 'brandNumberRatio',
  width: '1.7rem',
  align: 'right',
  sortable: true
}]
export default {
  name: "Home",
  data() {
    return {
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 6,
        values: [{
          name: "筹备招商进度",
          url: "/zhaoshang/process/index",
        },
        {
          name: "筹备期网批驳回率统计",
          url: "/zhaoshang/reject",
        },
        {
          name: "筹备期全面抽成统计",
          url: "/zhaoshang/commissionTotal",
        }, // {
        // 	label: "项目铺位分解",
        // 	url: "/pages/zhaoshang/pwfj/pwfj"
        // },
        {
          name: "招商业绩考核",
          url: "/zhaoshang/perfCheck/index",
        },
        {
          name: "总部联发品牌数据监控",
          url: "/zhaoshang/linkBrand/index",
        },
        {
          name: "已招租金达成率柱状图",
          url: "/zhaoshang/yzzj/yzzj",
        },
        {
          name: "进场审图进度-品牌数",
          url: "/zhaoshang/brandNum",
          code: 6
        },
        {
          name: "待开业项目招商进度-品牌数",
          url: "/zhaoshang/noMakebusinessBrandNum",
        },
        ],
      }],
      collapseable: false,
      chartsTitle: "进场审图进度-品牌数",
      selected: {
        projectId: this.$route.query.projectId || '',
        label: this.$route.query.projectName || "全部",
      },
      params: {
        queryDate: this.$route.query.yearAndMonth || new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
        projectId:this.$route.query.projectId || '',
		projectName:this.$route.query.projectName,
		yearAndMonth:this.$route.query.yearAndMonth || ''
      },
      options: {},
    }
  },
  created() {
    this.getEchartData()
  },
  methods: {
    dateSelected(date) {
      console.log(date);
      this.setData({
        ["params.queryDate"]: date,
		["params.yearAndMonth"]:date
      });
      this.getEchartData()
      // },
    },
    projeSelected(item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
      });
      this.getEchartData()
    },
    searchType(item) { },
    async getEchartData() {
      let res = await this.$axios.zhaoshangServe.getBrandNum(this.params)
      let chartData = res.data.list;
      console.log(chartData);
      let titleData = [],
        //底部文字
        jcRateData = [],
        //进场数据
        stRateData = [],
        //审图数据
        jcAverage = '',
        stAverage = '';
      chartData.forEach(item => {
        titleData.push(item.primaryForms);
        jcRateData.push(item.jcRate);
        stRateData.push(item.stRate);

        if (item.primaryForms === '平均') {
          jcAverage = item.jcRate;
          stAverage = item.stRate;
        }
      }); // console.log(chartData);
      // console.log(jcRateData, stRateData);

      const setData = {
        'options': {
          color: ['#4EABD3', '#32B667'],
          legend: {
			selectedMode: true,
			padding: [30, 0, 0, 0],
			itemWidth: 12,
			itemHeight: 12,
			itemGap: 12,
			data:[  {name:'进场',icon:'rect'}, {name:'审图',icon:'rect'}],
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '4%',
            top: '10%',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            start: 1,
            end: 30
          }],
          tooltip: {
            show: false
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: titleData,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '12',
                color: '#333F4F'
              },
              interval: 0,
              rotate: '45'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: [{
            type: 'value',
            max: 100,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          }],
          series: [{
            type: 'bar',
            name: '进场',
            data: jcRateData,
            barWidth: 10,
            //设置柱状图大小
            markLine: {
              symbol: 'none',
              data: [{
                type: 'average',
                name: '平均值',
                yAxis: jcAverage
              }],
              lineStyle: {
                color: '#55C6FF'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name !== '平均') {
                    return '#4EABD3';
                  } else {
                    return '#4CCCDA';
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 9,

                  formatter(value) {
                    return value.data + '%';
                  }

                }
              }
            }
          }, {
            type: 'bar',
            name: '审图',
            data: stRateData,
            //设置柱状图大小
            barWidth: 10,
            barGap: '140%',
            markLine: {
              symbol: 'none',
              data: [{
                type: 'average',
                name: '平均值',
                yAxis: stAverage
              }],
              lineStyle: {
                color: '#78D232'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name !== '平均') {
                    return '#32B667';
                  } else {
                    return '#48BD19';
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 9,

                  formatter(value) {
                    return value.data + '%';
                  }

                }
              }
            }
          }]
        }
      };
      this.setData(setData);
    },
    goLink(url) {
      this.$router.push({ path: url, query: this.params })
    }
  },
}
</script>

<style scoped>
.home {
  min-height: 90%;
  background-color: #fff;
}
</style>
