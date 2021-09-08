<template>
  <div class="home" v-webTitle :data-title="`待开业项目招商进度 - 品牌数`">
    <div class="header-top" :style="!$isWxwork ? 'padding-top:1.2rem':''">
      <ys-n-nav-bar :title="`待开业项目招商进度 - 品牌数`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'zhaoshang'" :selected="selected" @projeSelected="projeSelected" :dilogShow="false" :disabledAll="true">
            </ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.queryDate">
            </ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section :collapseable="collapseable" :hasTable="true" style="background-color: #fff;padding: 0.32rem 0.4rem;box-sizing: content-box;margin: 0;">
        <div class="head-actions_left_view" slot="head-actions_left">
          <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchTypeList" @search="searchType" @linkUrl="goLink" :type="'zhaoshang'"></ys-n-filter-chart-dialog>
        </div>
        <ys-n-echart height="290px" :options="businessBrand" canvasId="swid"></ys-n-echart>
        <ys-n-table identity="tab1" :fixednum="1" :columns="businessColumns" :values="businessRows" :total-row="businessTotalRow" class="table-wrapper"></ys-n-table>
      </ys-n-section>
      <div class="ys-n-section" style="background-color: #fff;padding: 0.32rem 0.4rem;box-sizing: content-box;margin-top: 0.2rem;">
        <ys-n-echart :options="contractBrand" canvasId="htId" height="290px"></ys-n-echart>
        <ys-n-table identity="tab2" :fixednum="1" :columns="contractColumns" :values="contractRows" :total-row="contractTotalRow" class="table-wrapper"></ys-n-table>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>

export default {
  name: "Home",
  data () {
    return {
      isLoading: false,
      isLoadingCount: 0,
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 7,
        values: [{
          name: "筹备招商进度",
          url: "/zhaoshang/process/index",
          code:1
        },
        {
          name: "筹备期网批驳回率统计",
          url: "/zhaoshang/reject",
          code:2
        },
        {
          name: "筹备期全面抽成统计",
          url: "/zhaoshang/commissionTotal",
          code:3
        }, 
        {
          name: "招商业绩考核",
          url: "/zhaoshang/perfCheck/index",
          code:4
        },
        {
          name: "总部联发品牌数据监控",
          url: "/zhaoshang/linkBrand/index",
          code: 5
        },
        {
          name: "已招租金达成率柱状图",
          url: "/zhaoshang/rentCompletRate",
          code:6
        },
        {
          name: "进场审图进度-品牌数",
          url: "/zhaoshang/brandNum",
          code:7
        },
        {
          name: "待开业项目招商进度-品牌数",
          url: "/zhaoshang/noMakebusinessBrandNum",
          code:8
        },
        ],
      }],
      collapseable: false,
      chartsTitle: "待开业项目招商进度 - 品牌数",
      businessBrand: {},
      businessColumns: [],
      businessRows: [],
      businessTotalRow: null,
      contractBrand: {},
      contractColumns: [],
      contractRows: [],
      contractTotalRow: null,
      selected: {
        projectId: this.$route.query.projectId || '',
        label: this.$route.query.projectName || "全部",
      },
      params: {
        queryDate: this.$route.query.yearAndMonth || this.$util.getDefaultDate("month"),
        projectId: this.$route.query.projectId || '',
        projectName: this.$route.query.projectName,
        yearAndMonth: this.$route.query.yearAndMonth || ''
      },
    }
  },
  created () {
    this.getSWQP()
    this.getHTQS()
  },
  methods: {
    onRefresh () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 0)
      this.getSWQP()
      this.getHTQS()
    },
    addIsLoadingCount () {
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount () {
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    setIsLoading () {
      this.isLoading = false;
    },
    // 商务签批计划完成情况-品牌数
    async getSWQP () {
      /* app.globalData.request
        .options({
          loading: true,
        })
        .get("/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/swqplist", this.params)
        .then((res) => { */
      this.addIsLoadingCount()
      let res = await this.$axios.zhaoshangServe.getSwqplist(this.params)
      this.decreaseIsLoadingCount()
      let chartData = res.data.list.slice(1);
      let primaryForms = [],
        //底部文字
        wclRate = [],
        //完成率
        targetnum = [],
        //目标
        actualnum = [],
        //实际
        dsknum = []; //待收口

      let targetnumObj = {},
        actualnumObj = {},
        dsknumObj = {};
      let tableHeader = []; //根据后端数据获得表头

      let tableData = []; //根据后端数据筛选数据

      chartData.forEach((item, index) => {
        primaryForms.push(item.primaryForms);
        wclRate.push(item.wclRate);
        targetnum.push(item.targetnum);
        actualnum.push(item.actualnum);
        dsknum.push(item.dsknum);
        let header = {
          label: item.primaryForms,
          key: `index-${index}`,
          width: "2rem",
          align: "left",
        };
        tableHeader.push(header);
        targetnumObj.name = "目标";
        targetnumObj[`index-${index}`] = item.targetnumStr;
        actualnumObj.name = "实际";
        actualnumObj[`index-${index}`] = item.actualnumStr;
        dsknumObj.name = "待收口";
        dsknumObj[`index-${index}`] = item.dsknumStr;
      }); //给头部添加一个空值，方便显示 目标 实际 待收口

      tableHeader.unshift({
        label: "",
        key: "name",
        width: "2rem",
        align: "left",
      });
      tableData[0] = targetnumObj;
      tableData[1] = actualnumObj;
      tableData[2] = dsknumObj;
      console.log(tableHeader);
      console.log(primaryForms, wclRate, targetnum, actualnum, dsknum, tableData);
      let businessBrand = {
        title: {
          show: true,
          text: "商务签批计划完成情况-品牌数",
          textStyle: {
            color: "#333",
            fontSize: "12",
          },
        },
        color: ["#2D9FCB", "#AECFDD", "#3474B0", "#FAD961"],
        grid: {
          left: "0%",
          right: "0%",
          bottom: "10%",
          top: "14%",
          containLabel: true,
        },
        legend: {
          selectedMode: true,
          padding: [30, 0, 0, 0],
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 12,
          data: [{
            name: '完成率'
          }, {
            name: '目标',
            icon: 'rect'
          }, {
            name: '实际',
            icon: 'rect'
          }, {
            name: '待收口',
            icon: 'rect'
          }],
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b0} \n <br/> {a0}: {c0}% \n <br/>{a1}: {c1} \n<br/> {a2}: {c2} \n <br/>{a3}: {c3}",
          padding: [8, 10, 8, 10],
          borderColor: "rgba(45, 159, 203, 1)",
          borderWidth: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            color: "#333333",
            fontSize: 11,
          },
        },
        dataZoom: [{
          type: "inside",
          start: 1,
          end: 30,
          moveOnMouseWheel: true,
        },],
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: primaryForms,
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
        yAxis: [{
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}%",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        ],
        series: [{
          type: "line",
          data: wclRate,
          name: '完成率',
          //设置柱状图大小
          barWidth: 10,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              label: {
                show: true,

                formatter (value) {
                  return value.data + "%";
                },
              },
            },
          },
        },
        {
          type: "bar",
          data: targetnum,
          name: '目标',
          //设置柱状图大小
          barWidth: 10,
        },
        {
          type: "bar",
          data: actualnum,
          name: '实际',
          //设置柱状图大小
          barWidth: 10,
        },
        {
          type: "bar",
          data: dsknum,
          name: '待收口',
          //设置柱状图大小
          barWidth: 10,
        },
        ],
      }
      this.setData({
        businessBrand,
        businessColumns: tableHeader,
        businessRows: tableData,
      });

    },

    // 合同签署计划完成情况-品牌数
    async getHTQS () {
      this.addIsLoadingCount()
      console.log(this.param)
      let res = await this.$axios.zhaoshangServe.getHtbslist(this.params)
      this.decreaseIsLoadingCount()
      let chartData = res.data.list.slice(1);
      let primaryForms = [],
        //底部文字
        wclRate = [],
        //完成率
        targetnum = [],
        //目标
        actualnum = [],
        //实际
        dsknum = []; //待收口

      let targetnumObj = {},
        actualnumObj = {},
        dsknumObj = {};
      let tableHeader = []; //根据后端数据获得表头

      let tableData = []; //根据后端数据筛选数据

      chartData.forEach((item, index) => {
        primaryForms.push(item.primaryForms);
        wclRate.push(item.wclRate);
        targetnum.push(item.targetnum);
        actualnum.push(item.actualnum);
        dsknum.push(item.dsknum);
        let header = {
          label: item.primaryForms,
          key: `index-${index}`,
          width: "2rem",
          align: "left",
        };
        tableHeader.push(header);
        targetnumObj.name = "目标";
        targetnumObj[`index-${index}`] = item.targetnumStr;
        actualnumObj.name = "实际";
        actualnumObj[`index-${index}`] = item.actualnumStr;
        dsknumObj.name = "待收口";
        dsknumObj[`index-${index}`] = item.dsknumStr;
      }); //给头部添加一个空值，方便显示 目标 实际 待收口

      tableHeader.unshift({
        label: "",
        key: "name",
        width: "2rem",
        align: "left",
      });
      tableData[0] = targetnumObj;
      tableData[1] = actualnumObj;
      tableData[2] = dsknumObj;
      console.log(tableData);
      const contractBrand = {
        title: {
          show: true,
          text: "合同签署计划完成情况-品牌数",
          textStyle: {
            color: "#333",
            fontSize: "12",
          },
        },
        color: ["#2D9FCB", "#C6DFCC", "#6DD882", "#FAD961"],
        grid: {
          left: "0%",
          right: "0%",
          bottom: "10%",
          top: "14%",
          containLabel: true,
        },
        legend: {
          selectedMode: true,
          padding: [30, 0, 0, 0],
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 12,
          data: [{
            name: '完成率'
          }, {
            name: '目标',
            icon: 'rect'
          }, {
            name: '实际',
            icon: 'rect'
          }, {
            name: '待收口',
            icon: 'rect'
          }],
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b0} \n <br/> {a0}: {c0}% \n <br/>{a1}: {c1} \n<br/> {a2}: {c2} \n <br/>{a3}: {c3}",
          padding: [8, 10, 8, 10],
          borderColor: "rgba(45, 159, 203, 1)",
          borderWidth: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            color: "#333333",
            fontSize: 11,
          },
        },
        dataZoom: [{
          type: "inside",
          start: 1,
          end: 30,
          moveOnMouseWheel: true,
        },],
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: primaryForms,
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
        yAxis: [{
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}%",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
        },
        ],
        series: [{
          type: "line",
          data: wclRate,
          name: '完成率',
          //设置柱状图大小
          barWidth: 10,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              label: {
                show: true,

                formatter (value) {
                  return value.data + "%";
                },
              },
            },
          },
        },
        {
          type: "bar",
          data: targetnum,
          name: '目标',
          //设置柱状图大小
          barWidth: 10,
        },
        {
          type: "bar",
          data: actualnum,
          name: '实际',
          //设置柱状图大小
          barWidth: 10,
        },
        {
          type: "bar",
          data: dsknum,
          name: '待收口',
          //设置柱状图大小
          barWidth: 10,
        },
        ],
      }
      this.setData({
        contractBrand,
        contractColumns: tableHeader,
        contractRows: tableData,
      });
    },
    projeSelected (item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
      });
      this.getSWQP()
      this.getHTQS()
    },
    dateSelected (date) {
      console.log(date);
      this.setData({
        ["params.queryDate"]: date,
        ["params.yearAndMonth"]: date,
      });
      this.getSWQP()
      this.getHTQS()
      // },
    },
    searchType (item) { },
    goLink (url) {
     
      this.$router.push({ path: url, query: { ...this.params } })

    }
  },
}
</script>


<style>
</style>
