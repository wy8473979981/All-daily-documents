<template>
  <div class="root" v-webTitle :data-title="`会员`">

    <div class="header-top">
      <ys-n-nav-bar :title="`会员`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'yysj'" :selected="selectedProj" @projeSelected="onProjectSelected" :disabledAll="true"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`date`" @selected="onDateChanged" :selected="params.queryStartTime" :range="true" :selectedRange="params.queryEndTime" @selectedRange="onRangeDateChanged"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="updata-time">数据更新时间：2020-11-10 数据来源系统：PMS系统</div> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="整体概况">
        <div class="global-content">
          <div v-for="(item, index) in globalData" :key="index" class="global-title-content">
            <div class="global-title">
              {{item.title}}
            </div>
            <div class="global-value-content">
              <div class="global-value">
                {{item.value || '-'}}
              </div>
              <div class="global-unit">
                {{item.unit}}
              </div>
            </div>
          </div>
        </div>
      </ys-n-section>

      <div>
        <van-tabs v-model="currentRegisteredIndex" @click="registered">
          <van-tab v-for="(item, index) in registeredTitles" :title="item.name" :key="index"></van-tab>
        </van-tabs>
        <div class="registered-channels">
          <ys-n-echart class="pie" height="280px" :options="registeredChannels" canvasId="hy1" margin='20px'></ys-n-echart>
        </div>
      </div>
      <div class="line-bg"></div>

      <div>
        <van-tabs v-model="currentMembersIndex" @click="membersTap" :ellipsis="false">
          <van-tab v-for="(item, index) in membersTitles" :title="item.name" :key="index"></van-tab>
        </van-tabs>
        <div class="registered-channels">
          <ys-n-echart class="pie" :options="members" canvasId="hy2"></ys-n-echart>
        </div>
      </div>
      <div class="line-bg"></div>

      <ys-n-section title="会员年龄分布">
        <div class="members-bar">
          <ys-n-echart class="bar" :options="membersBar" canvasId="hy3"></ys-n-echart>
        </div>
      </ys-n-section>

      <div>
        <van-tabs v-model="currentIntegralOutputIndex" @click="integralOutputTap" :ellipsis="false">
          <van-tab v-for="(item, index) in integralOutputTitles" :title="item.name" :key="index"></van-tab>
        </van-tabs>
        <div class="integral-output">
          <ys-n-echart class="pie" height="320px" :options="integralOutput" canvasId="hy4"></ys-n-echart>
        </div>
      </div>
      <div class="line-bg"></div>

      <ys-n-section title="消费业态分布">
        <div class="consumption-mod">
          <ys-n-echart class="bar" :options="consumptionMod" canvasId="hy5"></ys-n-echart>
        </div>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      routerParams: this.$route.query,
      selectedProj: {
        label: null,
        projectId: null,
      },
      params: {
        queryStartTime: "",
        queryEndTime: "",
        projectId: "",
      },
      global: '整体概况',
      globalData: [],
      currentRegisteredIndex: 0,
      registeredTitles: [
        {
          name: '注册渠道占比'
        }, {
          name: '会员性别占比'
        }, {
          name: '会员等级占比'
        }
      ],
      currentRegisteredIndex: 0,
      membersTitles: [
        {
          name: '新增会员占累计会员'
        }, {
          name: '活跃会员占累计会员'
        }, {
          name: '消费会员占累计会员'
        }
      ],
      currentMembersIndex: 0,
      integralOutputTitles: [
        {
          name: '积分产出占比'
        }, {
          name: '消费积分产出业态'
        }, {
          name: '积分消耗占比'
        }
      ],
      currentIntegralOutputIndex: 0,
      consumeMemberRatio: 28.2,
      //消费会员占累计会员
      activeMemberRatio: 23,
      //活跃会员占累计会员
      newMemberRatio: 84,
      //新增会员占累计会员
      registeredChannels: {
        //注册渠道
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          },
          formatter: '{b}: {c} ({d}%)'
        },
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          top: 0,
          // left: 10,
          // right: 10,
          bottom: 0,
          containLabel: false
        },
        legend: {
          orient: 'horizontal',
          x: 'right',
          //可设定图例在左、右、居中
          y: 'bottom',
          //可设定图例在上、下、居中
          icon: 'circle',
          itemHeight: 7 // data: ['微信', '支付宝']

        },
        // tooltip: {
        //   show: false,
        // },
        series: [{
          // name: '访问来源',
          type: 'pie',
          minAngle: 20,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true,   //是否启用防止标签重叠策略
          minShowLabelAngle: 10,
          radius: ['60%', '70%'],
          avoidLabelOverlap: false,
          // hoverAnimation: false,
          // legendHoverLink: false,
          top: 20,
          bottom: 20,
          label: {
            show: true,
            position: 'center',
            color: '#949596',
            fontSize: 10,
            formatter: '{a}'
          },
          markArea: {
            silent: false
          },
          // emphasis: {
          //   show:false,
          //   label: {
          //     show: false,
          //     fontSize: '12',
          //     formatter: '{b}\n\n{d}%'
          //   }
          // },
          labelLine: {
            show: false
          } // data: [
          //   { value: 310, name: '微信', itemStyle: { normal: { color: '#38BE73' } } },
          //   { value: 335, name: '支付宝', itemStyle: { normal: { color: '#338CF0' } } },
          // ]

        }]
      },
      tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        },
        formatter: '{b}: {c} ({d}%)'
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        containLabel: false
      },
      legend: {
        orient: 'horizontal',
        x: 'right',
        y: 'bottom',
        icon: 'circle',
        itemHeight: 7
      },
      label: {
        show: true,
        position: 'center',
        color: '#949596',
        fontSize: 10,
        formatter: '{a}'
      },
      markArea: {
        silent: false
      },
      labelLine: {
        show: false
      },
      members: {
        //新增会员占比
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          top: 0,
          // left: 10,
          // right: 10,
          bottom: 0,
          containLabel: false
        },
        legend: {
          show: false
        },
        tooltip: {
          //是否显示提示框组件，包括提示框浮层和 axisPointe
          show: false,
          // 触发类型: item:数据项触发，axis：坐标轴触发
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
          name: '任务进度',
          type: 'pie',
          minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true,   //是否启用防止标签重叠策略
          // 饼图的半径，数组的第一项是内半径，第二项是外半径
          radius: ['70%', '80%'],
          // 是否启用防止标签重叠策略，默认开启
          avoidLabelOverlap: false,
          hoverAnimation: false,
          // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            // value: 80,
            name: '新增会员',
            itemStyle: {
              normal: {
                color: '#1CC2FF'
              }
            },
            // color: '#1CC2FF',
            selected: false,
            label: {
              normal: {
                // 是显示标签
                show: true,
                position: 'center',
                fontSize: 12,
                color: '#333333',
                formatter: '{b}\n\n{d}%'
              }
            }
          }, {
            // value: 20,
            selected: false,
            itemStyle: {
              normal: {
                color: '#EAEAEA'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }]
        }]
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        containLabel: false
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {
          name: '新增会员',
          itemStyle: {
            normal: {
              color: '#1CC2FF'
            }
          },
          selected: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              fontSize: 12,
              color: '#333333',
              formatter: '{b}\n\n{d}%'
            }
          }
        }, {
          selected: false,
          itemStyle: {
            normal: {
              color: '#EAEAEA'
            }
          },
          label: {
            normal: {
              show: false
            }
          }
        }
      ],
      membersBar: {
        //会员年龄分布柱状图
        grid: {
          top: 10,
          // left: 10,
          // right: 10,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          }
        },
        xAxis: {
          type: 'value',
          boundaryGap: true,
          // data: [0, 0.5, 1, 1.5, 2, 5],
          // "axisTick": {       //刻度线
          //   "show": false
          // },
          "splitLine": {
            //网格线
            "show": false
          },
          "axisLine": {
            //y轴
            "show": false
          }
        },
        yAxis: {
          type: 'category',
          boundaryGap: true,
          "splitLine": {
            //网格线
            "show": false
          },
          "axisLine": {
            //y轴
            "show": false
          }
        },
        series: [{
          barMaxWidth: 10,
          type: 'bar'
        }]
      },
      grid: {
        top: 10,
        bottom: 10,
        containLabel: false
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        }
      },
      xAxis: {
        type: 'value',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        "axisLine": {
          "show": false
        }
      },
      yAxis: {
        type: 'category',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        "axisLine": {
          "show": false
        }
      },
      integralOutput: {
        // 积分产出占比
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          },
          formatter: '{b}: {c} ({d}%)'
        },
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          // left: 10,
          // right: 10,
          top: 0,
          bottom: 0,
          containLabel: false
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          //可设定图例在左、右、居中
          y: 'bottom',
          //可设定图例在上、下、居中
          icon: 'circle',
          itemHeight: 7 // data: ['消费积分', '权益赠送', '转卡积分', '游戏奖励', '问券奖励']

        },
        series: [{
          type: 'pie',
          minAngle: 20,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true,   //是否启用防止标签重叠策略
          radius: '55%',
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          // hoverAnimation: false, //是否点击放大
          bottom: 0,
          label: {
            show: true,
            position: 'center',
            color: '#949596',
            fontSize: 10,
            formatter: '{a}'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '10',
          //     formatter: "{b}\n{d}%"
          //   }
          // },
          labelLine: {
            show: false
          }
        }]
      },
      tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        },
        formatter: '{b}: {c} ({d}%)'
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        bottom: 0,
        containLabel: false
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        y: 'bottom',
        icon: 'circle',
        itemHeight: 7
      },
      label: {
        show: true,
        position: 'center',
        color: '#949596',
        fontSize: 10,
        formatter: '{a}'
      },
      labelLine: {
        show: false
      },
      consumptionMod: {
        //消费业态分布
        barWidth: 15,
        color: '#399BFF',
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          }
        },
        /* grid: {
           top: 10,
           left: 0,
           right: 0,
           bottom: 0,
           containLabel: true
         },
         xAxis: {
           type: 'category',
           boundaryGap: true,
           "splitLine": {
             "show": false
           },
           axisLine: {
             //x轴
             show: false,
             lineStyle: {
               color: '#C9CCDA',
         fontSize:'10px'
             }
           }
         }, */
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 100,//控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: {
          boundaryGap: true,
          "splitLine": {
            "show": false
          },
          axisLine: {
            //x轴
            show: false,
            lineStyle: {
              color: '#C9CCDA',
              fontSize: '10px'
            }
          },
          type: 'category',
          //data: ['2015-2016', '2016-2017', '2017-2018', '2018-2019']
          axisLabel: {
            interval: 0,    //强制文字产生间隔
            rotate: 45,     //文字逆时针旋转45°
            textStyle: {    //文字样式
              color: "#646566",
              fontSize: 12,
              fontFamily: 'Microsoft YaHei'
            }
          }
        },
        yAxis: {
          type: 'value',
          "splitLine": {
            //网格线
            "show": false
          },
          axisLine: {
            //x轴
            show: false,
            lineStyle: {
              color: '#C9CCDA'
            }
          }
        },
        series: [{
          // data: [2000, 3000, 4000, 5000],
          type: 'bar',
          backgroundStyle: {
            color: '#399BFF' //柱条颜色

          }
        }]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        }
      },
      grid: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#C9CCDA'
          }
        }
      },
      yAxis: {
        type: 'value',
        "splitLine": {
          "show": false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#C9CCDA'
          }
        }
      },
      backgroundStyle: {
        color: '#399BFF'
      },

      fromDate: '2020/11/01',
      toDate: '2020/11/30',
      dataList: [],
      basicDateList: [],
      registerFrom: [],
      memberLevel: [],
      memberSex: [],
      pointsConsume: [],
      // 积分消耗占比
      // pointsConsumeName:['活动消耗', '游戏消耗', '商城消耗', '积分消耗总数', '停车消耗', '共享设备消耗 '],
      pointsGenerate: [],
      //积分产出占比
      // pointsGenerateName:['转卡积分', '游戏奖励', '积分产出总数', '权益赠送', '消费积分', '问卷奖励'],
      pointsGenerates: [
        {
          name: '转卡积分',
          key: 'oldPoints'
        }, {
          name: '游戏奖励',
          key: 'gamePoints'
        }, {
          name: '积分产出总数',
          key: 'totalPoints'
        }, {
          name: '权益赠送',
          key: 'powerPoints'
        }, {
          name: '消费积分',
          key: 'consumePoints'
        }, {
          name: '问卷奖励',
          key: 'questionPoints'
        }
      ],
      pointsConsumes: [
        {
          name: '活动消耗',
          key: 'activePoints'
        }, {
          name: '游戏消耗',
          key: 'gamePoints'
        }, {
          name: '商城消耗',
          key: 'jPoints'
        }, {
          name: '积分消耗总数',
          key: 'totalPoints'
        }, {
          name: '停车消耗',
          key: 'parkingPoints'
        }, {
          name: '共享设备消耗',
          key: 'sharePoints'
        }
      ],
      pointsCategory: [] // 消费积分产出业态
      ,
      projectName: "",
      selected: ""
    };
  },

  components: {},
  props: {},
  mounted () {
    try {
      let { projectId, projectName } = this.routerParams;
      let selectedProj = { label: projectName, projectId: projectId };
      let date = new Date();
      this.setData({
        'params.queryStartTime': this.startformatDate(date),
        'params.queryEndTime': this.endformatDate(date),
        'params.projectId': projectId,
        projectName: projectName,
        selectedProj
      });
      this.getData();
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    onRefresh () {
      this.getData();
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
    async getData () {
      this.getbasicMemberData(); //基础数据

      this.getChannels(); //注册渠道

      this.getHuiYuanPieData(); //累计会员占比

      this.getHuiYuanData();// 会员年龄分布

      this.getJifenCanchu();// 积分产出占比

      this.getConsumptionModData();// 消费业态分布
    },

    // 消费业态分布
    async getConsumptionModData () {
      try {
        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        await this.$axios.externalLinkServe.consumeCategoryDistribution(params).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 200) {
            let name = res.data.map(function (item) {
              return item.name;
            });
            let value = res.data.map(function (item) {
              return item.value;
            });
            let valueArr = [];
            let valueObjec = {};
            valueObjec.data = value;
            valueObjec.type = 'bar';
            valueArr.push(valueObjec);
            this.setData({
              'consumptionMod.xAxis.data': name,
              'consumptionMod.series': valueArr
            });
          }
        });

      } catch (e) {
        console.log(e)
      }
    },

    //整体概况
    async getbasicMemberData () {
      try {
        let titleArr = [
          {
            title: '消费金额',
            key: 'consumeMoneyNum',
            unit: '万元'
          }, {
            title: '消费笔数',
            key: 'consumeNum',
            unit: '笔'
          }, {
            title: '累计会员数',
            key: 'totalMemberNum',
            unit: '人'
          }, {
            title: '消费会员数',
            key: 'consumeMemberNum',
            unit: '人'
          }, {
            title: '新增会员数',
            key: 'registerMemberNum',
            unit: '人'
          }, {
            title: '活跃会员数',
            key: 'activeMemberNum',
            unit: '人'
          }, {
            title: '客流',
            key: 'flow',
            unit: '人'
          }
        ];
        // let res = await app.globalData.request.options({
        //   loading: true
        // }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/basicMemberData", this.params);

        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        let res = await this.$axios.externalLinkServe.basicMemberData(params, true);
        this.decreaseIsLoadingCount()
        if (res.code == 200) {
          let arr = [];
          titleArr.forEach((item, index) => {
            let value = 0;
            if (item.unit === '万元') {
              value = res.data[item.key] > 0 ? (res.data[item.key] / 1000000).toFixed(2) : 0;
            } else {
              value = res.data[item.key];
            }
            arr.push({ title: item.title, value: value, unit: item.unit });
          });
          this.setData({
            globalData: arr
          });
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取会员pie
    async getHuiYuanPieData () {
      try {

        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        await this.$axios.externalLinkServe.memberFeature(params).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 200) {
            if (res.data.newMemberRatio) {
              this.newMemberRatio = res.data.newMemberRatio;
            } else {
              this.newMemberRatio = 0;
            }
            if (res.data.activeMemberRatio) {
              this.activeMemberRatio = res.data.activeMemberRatio;
            } else {
              this.activeMemberRatio = 0;
            }
            if (res.data.consumeMemberRatio) {
              this.consumeMemberRatio = res.data.consumeMemberRatio;
            } else {
              this.consumeMemberRatio = 0;
            }
            this.setData({
              "members.series[0].data[0].name": "新增会员",
              "members.series[0].data[0].value": this.newMemberRatio,
              "members.series[0].data[1].value": 100 - this.newMemberRatio
            });
          }
        });
      } catch (e) {
        console.log(e)
      }
    },

    getHuiYuanPieClickData () {
      try {
        this.setData({
          "members.series[0].data[0].name": "新增会员",
          "members.series[0].data[0].value": this.newMemberRatio,
          "members.series[0].data[1].value": 100 - this.newMemberRatio
        });
      } catch (e) {
        console.log(e)
      }
    },

    getHuiYuanPieActiveData () {
      try {
        this.setData({
          "members.series[0].data[0].name": "活跃会员",
          "members.series[0].data[0].value": this.activeMemberRatio,
          "members.series[0].data[1].value": 100 - this.activeMemberRatio
        });
      } catch (e) {
        console.log(e)
      }
    },

    getHuiYuanPieConsumeData () {
      try {
        this.setData({
          "members.series[0].data[0].name": "消费会员",
          "members.series[0].data[0].value": this.consumeMemberRatio,
          "members.series[0].data[1].value": 100 - this.consumeMemberRatio
        });
      } catch (e) {
        console.log(e)
      }
    },

    // 获取会员年龄分布
    async getHuiYuanData () {
      try {
        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        await this.$axios.externalLinkServe.memberAge(params).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 200) {
            let name = res.data.map(function (item) {
              return item.name;
            });
            let value = res.data.map(function (item) {
              return item.value;
            });
            let valueArr = [];
            let valueObjec = {};
            valueObjec.data = value;
            valueObjec.type = 'bar';
            valueArr.push(valueObjec);
            this.setData({
              'membersBar.yAxis.data': name,
              'membersBar.series': valueArr
            });
          }
        });

      } catch (e) {
        console.log(e)
      }
    },

    onProjectSelected (item) {
      try {
        if (item.shortName !== "全部") {
          this.setData({
            ["params.projectId"]: (item && item.projectId) || "",
            ["params.projectName"]: (item && item.shortName) || "",
          });
          this.getData();
        }
      } catch (e) {
        console.log(e)
      }
    },

    onDateChanged (e) {
      try {
        // let startTime = e.detail.value.from;
        // let endTime = e.detail.value.to;
        let startTime = e
        if (!startTime) {
          startTime = "2020/11/20";
        } else {
          startTime = startTime.replace(/-/g, '/');
        }

        // if (!endTime) {
        //   endTime = "2020/11/20";
        // } else {
        //   endTime = endTime.replace(/-/g, '/');
        // }

        this.setData({
          ["params.queryStartTime"]: startTime
          // ["params.queryEndTime"]: endTime
        }); // this.setData(setData)

        this.setData({
          currentRegisteredIndex: 0,
          currentMembersIndex: 0,
          currentIntegralOutputIndex: 0
        });
        this.getData();
      } catch (e) {
        console.log(e)
      }
    },
    onRangeDateChanged (time) {
      console.log("time==",time)
      try {
        this.setData({
          "params.queryEndTime": time.replace(/-/g, '/')
        });

        if (this.params.queryStartTime && this.params.queryEndTime) {
          this.getData();
        }
      } catch (e) {
        console.log(e)
      }
    },

    bindselected (e) {
      try {
        e.detail.forEach(item => {
          let temp = item.split("-");
          let key = temp[0];
          let value = temp[1];

          if (key === "storeType") {
            this.setData({
              ["params.storeType"]: value
            });
          }

          if (key === "stage") {
            this.setData({
              "params.stage": value
            });
          }
        }); // this.getDataList();
      } catch (e) {
        console.log(e)
      }
    },

    // 注册渠道占比、会员性别占比、会员等级占比
    async getChannels () {
      try {
        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        await this.$axios.externalLinkServe.memberRatio(params).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 200) {
            this.registerFrom = res.data.registerFrom;
            this.memberLevel = res.data.memberLevel;
            this.memberSex = res.data.memberSex;
            let nameArr = res.data.registerFrom.map(function (item) {
              return item.name;
            });
            let valueArr = res.data.registerFrom.map(function (item) {
              return item.value;
            });
            let data = [];
            valueArr.forEach((one, index) => {
              let item = {};
              item.value = one;
              item.name = nameArr[index];
              data.push(item);
            });
            this.setData({
              "registeredChannels.series[0].name": '注册渠道占比',
              "registeredChannels.legend.data": nameArr,
              "registeredChannels.series[0].data": data
            });
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    registered (index) {
      try {
        let currentRegisteredIndex = index;
        let currentRegistered = this.registeredTitles[currentRegisteredIndex].name;
        this.setData({
          currentRegisteredIndex: currentRegisteredIndex
        });

        if ('注册渠道占比' == currentRegistered) {
          this.getChannelsClickData();
        } else if ('会员性别占比' == currentRegistered) {
          this.getSex();
        } else {
          this.getMemberPoints();
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 注册渠道占比
    getChannelsClickData () {
      try {
        let nameArr = this.registerFrom.map(function (item) {
          return item.name;
        });
        let valueArr = this.registerFrom.map(function (item) {
          return item.value;
        });
        let data = [];
        valueArr.forEach((one, index) => {
          let item = {};
          item.value = one;
          item.name = nameArr[index];
          data.push(item);
        });
        this.setData({
          "registeredChannels.series[0].name": '注册渠道占比',
          "registeredChannels.legend.data": nameArr,
          "registeredChannels.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },
    //会员性别占比
    async getSex () {
      try {
        let type = this.memberSex.map(function (item) {
          return item.name;
        });
        let value = this.memberSex.map(function (item) {
          return item.value;
        });
        let itemStyleArr = this.getItemStyle();
        let data = [];
        value.forEach((one, index) => {
          let item = {};
          item.value = one;
          item.name = type[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        });
        this.setData({
          "registeredChannels.series[0].name": '会员性别占比',
          "registeredChannels.legend.data": type,
          "registeredChannels.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },
    getItemStyle: function () {
      try {
        let jsonstyle1 = '{ "normal": { "color": "#38BE73" } }';
        let jsonstyle2 = '{ "normal": { "color": "#338CF0" } }';
        let jsonstyle3 = '{ "normal": { "color": "#F83200" } }';
        let jsonstyle4 = '{ "normal": { "color": "#56687D" } }';
        let jsonstyle5 = '{ "normal": { "color": "#54567D" } }';
        let jsonstyle6 = '{ "normal": { "color": "#57777D" } }';
        let jsonstyle7 = '{ "normal": { "color": "#FFea00" } }';
        let jsonObject = [];
        jsonObject.push(JSON.parse(jsonstyle1));
        jsonObject.push(JSON.parse(jsonstyle2));
        jsonObject.push(JSON.parse(jsonstyle3));
        jsonObject.push(JSON.parse(jsonstyle4));
        jsonObject.push(JSON.parse(jsonstyle5));
        jsonObject.push(JSON.parse(jsonstyle6));
        jsonObject.push(JSON.parse(jsonstyle7));
        return jsonObject;
      } catch (e) {
        console.log(e)
      }
    },
    //会员等级占比
    async getMemberPoints () {
      try {
        let type = this.memberLevel.map(function (item) {
          return item.name;
        });
        let value = this.memberLevel.map(function (item) {
          return item.value;
        });
        let itemStyleArr = this.getItemStyle();
        let data = [];
        value.forEach((one, index) => {
          let item = {};
          item.value = one;
          item.name = type[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        });
        this.setData({
          "registeredChannels.series[0].name": '会员等级占比',
          "registeredChannels.legend.data": type,
          "registeredChannels.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },

    membersTap (index) {
      try {
        let currentMembersIndex = index;
        let currentMembers = this.membersTitles[currentMembersIndex].name;
        this.setData({
          currentMembersIndex: currentMembersIndex
        });

        if ('新增会员占累计会员' === currentMembers) {
          this.getHuiYuanPieClickData();
        } else if ('活跃会员占累计会员' === currentMembers) {
          this.getHuiYuanPieActiveData();
        } else {
          this.getHuiYuanPieConsumeData();
        }
      } catch (e) {
        console.log(e)
      }
    },

    integralOutputTap (index) {
      try {
        let currentIntegralOutputIndex = index;
        let currentIntegralOutput = this.integralOutputTitles[currentIntegralOutputIndex].name;
        this.setData({
          currentIntegralOutputIndex: currentIntegralOutputIndex
        });

        if ('积分产出占比' === currentIntegralOutput) {
          this.getJifenCanchuClickData();
        } else if ('消费积分产出业态' === currentIntegralOutput) {
          this.getXfJfenCanChuYeTai();
        } else {
          this.getJifenXiaoHaoZhanBi();
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 积分产出占比
    async getJifenCanchu () {
      try {

        let params = {
          queryStartTime: this.params.queryStartTime,
          queryEndTime: this.params.queryEndTime,
          queryProjectId: this.params.projectId,
        }
        this.addIsLoadingCount()
        await this.$axios.externalLinkServe.pointsRatio(params).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 200) {
            this.pointsGenerates.forEach((item, index) => {
              // if (res.data.pointsGenerate[0][item.key]) {
              this.pointsGenerate.push({
                name: item.name,
                value: res.data.pointsGenerate[0][item.key]
              }); // }
            });
            this.pointsConsumes.forEach((item, index) => {
              if (res.data.pointsConsume[0][item.key]) {
                this.pointsConsume.push({
                  name: item.name,
                  value: res.data.pointsConsume[0][item.key]
                });
              }
            });
            this.pointsCategory = res.data.pointsCategory;
            let name = this.pointsGenerate.map(function (item) {
              return item.name;
            });
            let value = this.pointsGenerate.map(function (item) {
              return item.value;
            });
            let itemStyleArr = this.getItemStyle();
            let data = [];
            value.forEach((one, index) => {
              if (one) {
                let item = {};
                item.value = one;
                item.name = name[index];
                item.itemStyle = itemStyleArr[index];
                data.push(item);
              }
            });
            name = data.map(function (item) {
              return item.name;
            });
            this.setData({
              "integralOutput.series[0].name": "积分产出占比",
              "integralOutput.legend.data": name,
              "integralOutput.series[0].data": data
            });
          }
        });

      } catch (e) {
        console.log(e)
      }
    },

    //积分产出占比
    getJifenCanchuClickData () {
      try {
        let name = this.pointsGenerate.map(function (item) {
          return item.name;
        });
        let value = this.pointsGenerate.map(function (item) {
          return item.value;
        });
        let itemStyleArr = this.getItemStyle();
        let data = [];
        value.forEach((one, index) => {
          if (one) {
            let item = {};
            item.value = one;
            item.name = name[index];
            item.itemStyle = itemStyleArr[index];
            data.push(item);
          }
        });
        name = data.map(function (item) {
          return item.name;
        });
        this.setData({
          "integralOutput.series[0].name": "积分产出占比",
          "integralOutput.legend.data": name,
          "integralOutput.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },

    //消费积分产出业态
    async getXfJfenCanChuYeTai () {
      try {
        let name = Object.keys(this.pointsCategory[0]);
        let value = Object.values(this.pointsCategory[0]);
        let itemStyleArr = this.getItemStyle();
        let data = [];
        value.forEach((one, index) => {
          let item = {};
          item.value = one;
          item.name = name[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        });
        this.setData({
          "integralOutput.series[0].name": "消费积分产出业态",
          "integralOutput.legend.data": name,
          "integralOutput.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },

    //积分消耗占比
    async getJifenXiaoHaoZhanBi () {
      try {
        let name = this.pointsConsume.map(function (item) {
          return item.name;
        });
        let value = this.pointsConsume.map(function (item) {
          return item.value;
        });
        let itemStyleArr = this.getItemStyle();
        let data = [];
        value.forEach((one, index) => {
          if (one) {
            let item = {};
            item.value = one;
            item.name = name[index];
            item.itemStyle = itemStyleArr[index];
            data.push(item);
          }
        });
        name = data.map(function (item) {
          return item.name;
        });
        this.setData({
          "integralOutput.series[0].name": "积分消耗占比",
          "integralOutput.legend.data": name,
          "integralOutput.series[0].data": data
        });
      } catch (e) {
        console.log(e)
      }
    },

    endformatDate: function (data) {
      try {
        let date = data.getTime() - 3600 * 24 * 1000
        date = new Date(date)
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return [year, month, day].map(this.formatNumber).join('/');
      } catch (e) {
        console.log(e)
      }
    },
    startformatDate: function (date) {
      try {
        let endDate = this.endformatDate(date)
        let result = endDate.split('/')
        result[2] = '01'
        return result.join('/')
      } catch (e) {
        console.log(e)
      }
    },
    formatNumber: function (n) {
      try {
        n = n.toString();
        return n[1] ? n : '0' + n;
      } catch (e) {
        console.log(e)
      }
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
.updata-time {
  font-size: 22px;
  line-height: 74px;
  text-align: center;
  color: #c5c5c5;
}

.global-content {
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
}

.global-title-content {
  display: flex;
  flex-direction: column;
  width: 33%;
  align-items: center;
  padding: 10px;
}

.global-title {
  color: #757575;
  font-size: 24px;
}

.global-value-content {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.global-value {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 32px;
}

.global-unit {
  flex: 1;
  white-space: nowrap;
  color: #b0b0b0;
  font-size: 20px;
  padding: 5px;
}

.line-bg {
  width: 100%;
  height: 20px;
}

.registered-channels {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}

.members-bar {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}

.integral-output {
  width: 100%;
  /* height: 500px; */
  padding: 20px;
  background-color: #fff;
}

.consumption-mod {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}

.top-scroll {
  background-color: #fff;
}

.top-list {
  background-color: #fff;
  padding-top: 20px;
  padding-left: 20px;
}

.top-list {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 28px;
}

.list-item {
  padding: 0 20px;
  white-space: nowrap;
  color: #333333;
  font-size: 24px;
}

.list-item--selected {
  font-size: 30px;
  color: #3992ba;
}

.header-right-select {
  margin-left: 20px;
}

.slot-right {
  display: flex;
  align-items: center;
}

::v-deep .van-tabs--line .van-tabs__wrap {
  height: 64px;
}

::v-deep .van-tabs__nav--line {
  padding-bottom: 0px;
}

::v-deep .van-tab--active {
  font-size: 32px;
  color: #3992ba;
}

::v-deep .van-tabs__line {
  display: none;
}
</style>
