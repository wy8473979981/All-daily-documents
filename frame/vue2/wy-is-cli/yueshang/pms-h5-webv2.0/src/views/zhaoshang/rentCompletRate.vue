<template>
  <div class="home" v-webTitle :data-title="`已招租金达成率柱状图`">
    <div class="header-top">
      <ys-n-nav-bar :title="`已招租金达成率柱状图`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selected" @projeSelected="projeSelected" :dilogShow="false" :disabledAll="true"></ys-n-project-select>
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
        selectedCode: 5,
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
          code: 5
        },
        {
          name: "进场审图进度-品牌数",
          url: "/zhaoshang/brandNum",
        },
        {
          name: "待开业项目招商进度-品牌数",
          url: "/zhaoshang/noMakebusinessBrandNum",
        },
        ],
      }],
      collapseable: false,
      chartsTitle: "已招租金达成率柱状图",
      selected: {
        projectId: this.$route.query.projectId || '',
        label: this.$route.query.projectName || "全部",
      },
      params: {
        bisProjectId:this.$route.query.projectId || '',
		yearAndMonth:'',
		projectId:'',
		projectName:''
      },
      options: {},
    }
  },
  created() {
    this.getEchartData()
  },
  methods: {
    projeSelected(item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
		["params.bisProjectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
      });
      this.getEchartData()
    },
    searchType(item) { },
    async getEchartData() {
      let res = await this.$axios.zhaoshangServe.getRentCompleteRate(this.params)
      let chartData = res.data;
      let titleData = [],
        //底部文字
        zjdcl = [],
        //数据
        average = ""; //平均

      chartData.forEach((item) => {
        titleData.push(item.primaryforms);
        zjdcl.push(item.dcl);

        if (item.primaryforms === "平均") {
          average = item.dcl;
        }
      });
      const setData = {
        options: {
          grid: {
            bottom: "50px",
            containLabel: false,
          },
          tooltip: {
            show: false,
          },
          dataZoom: [
            {
              type: "inside",
              start: 1,
              end: 30,
              moveOnMouseWheel: true,
            },
          ],
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: titleData,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: "12",
                color: "#333F4F",
              },
              interval: 0,
              rotate: "45",
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            show: false,
          },
          series: [
            {
              type: "bar",
              data: zjdcl,
              //设置柱状图大小
              barWidth: 20,
              barGap: "0%",
              markLine: {
                symbol: "none",
                data: [
                  {
                    type: "average",
                    name: "平均值",
                    yAxis: average,
                  },
                ],
                lineStyle: {
                  color: "#71C381",
                },
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    if (params.name !== "平均") {
                      return "#4EABD3";
                    } else {
                      return "#6DD882";
                    }
                  },
                  label: {
                    show: true,
                    position: "top",

                    formatter(value) {
                      return value.data + "%";
                    },
                  },
                },
              },
            },
          ],
        },
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
