<template>
  <div class="ranking-container">
    <div class="date-box" @click="hideTips">
      <my-date-picker @selectDateResult="selectDateResult" />
    </div>
    <div class="ranking-echarts-around">
      <div class="echarts-line-container">
        <div id="echarts-content" />
        <transition name="el-fade-in-linear">
          <div v-if="option.series[1].data.length > 0" :class="['g-line', tooltipPositon]">
            <div class="flow-container sale-flow-container">
              <div class="flow-title">{{ positionTitleInner }}</div>
              <div class="flow-circle" />
              <div class="flow-info">当月合计20.4亿</div>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="option.series[0].data.length > 0" :class="['b-line', tooltipPositon]">
            <div class="flow-container passenger-flow-container">
              <div class="flow-title">{{ positionTitleOuter }}</div>
              <div class="flow-circle" />
              <div class="flow-info">当月合计4,500万</div>
            </div>
          </div>
        </transition>
      </div>
      <div class="around-map">
        <div class="around-map-title">
          <el-row>
            <el-col :span="12">
              <div class="title">排名环图</div>
            </el-col>
            <el-col :span="12">
              <div class="title-right" />
            </el-col>
          </el-row>
        </div>
        <div class="around-map-list">
          <el-scrollbar style="height: 100%">
            <div
              v-for=" (item, index) in aroundList"
              :key="index"
              class="map-list-content"
            >
              <div class="radio-info-container clearfix">
                <div class="radio-content fl clearfix">
                  <div class="left fl">
                    <svg-icon v-if="!item.leftActive" icon-class="radio-default" class="icon" @click="handleClickLeft(item.id,item.title)" />
                    <svg-icon v-if="item.leftActive" icon-class="radio-active" class="icon" @click="handleClickLeft(item.id,item.title)" />
                  </div>
                  <div class="right fl">
                    <svg-icon v-if="!item.rightActive" icon-class="radio-default" class="icon" @click="handleClickRight(item.id,item.title)" />
                    <svg-icon v-if="item.rightActive" icon-class="radio-active" class="icon" @click="handleClickRight(item.id,item.title)" />
                  </div>
                </div>
                <div class="map-list-title fl text-truncate" :class="(item.rightActive || item.leftActive) ? 'active' : ''">
                  <!-- <div class="around-title" @click="handleClickRight(item.id,item.title)">
                    {{ item.title }}
                  </div> -->
                  <ysn-textTooltip :content="item.title" class="around-title-text" ref-name="supplierName" />
                  <div class="around-remove" @click="handleRemove(item, index)">
                    <i class="el-icon-remove" />
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <div class="table-content" style="height: 265px; overflow: hidden;">
        <div class="around-map-title">
          <el-row>
            <el-col :span="12">
              <div class="title">TOP5</div>
            </el-col>
            <el-col :span="12">
              <div class="title-right" />
            </el-col>
          </el-row>
        </div>
        <transition name="fade">
          <ysn-table :key="JSON.stringify(tableColumnsConfig)" :height="220" :data="tableData" :column="tableColumnsConfig" select-key="id" :checkbox="false" />
        </transition>
      </div>

    </div>
    <div class="ranking-project">
      <div class="ranking-map-content">
        <ysn-map-china
          v-if="!mapName"
          :china-data="showMapData"
        />
        <div class="ranking-map-search">
          <div class="search-top">
            <span>
              <svg-icon v-if="isShowRankingProject" icon-class="radio-default" class="icon" @click="handleChangeRanking" />
              <svg-icon v-if="!isShowRankingProject" icon-class="radio-active" class="icon" @click="handleChangeRanking" />
            </span>
            <span style="cursor: pointer;" @click="handleChangeRanking">显示排名中的项目</span>
          </div>
          <div class="search-bottom">
            <span>
              <svg-icon v-if="isShowDefineProject" icon-class="radio-default" class="icon" @click="handleChangeDefine" />
              <svg-icon v-if="!isShowDefineProject" icon-class="radio-active" class="icon" @click="handleChangeDefine" />
            </span>
            <span style="cursor: pointer;" @click="handleChangeDefine">自选项目</span>
            <!-- <svg-icon icon-class="down-arrow" class="down-arrow fr" @click="handleProjectDownClick" /> -->
            <i class="el-icon-arrow-down fr" @click="handleChangeDefine" />
            <el-collapse-transition>
              <div v-show="isShowForm" class="search-bottom-form">
                <el-form>
                  <el-form-item label="区域">
                    <el-select v-model="form.region1" placeholder="请选择" class="project-map-select" popper-class="define-select-option">
                      <el-option
                        v-for="item in regionList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="form.region2" placeholder="请选择" class="project-map-select" popper-class="define-select-option">
                      <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="归属">
                    <el-select v-model="form.region3" placeholder="请选择" class="project-map-select" popper-class="define-select-option">
                      <el-option
                        v-for="item in haveList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开业">
                    <el-select v-model="form.region4" placeholder="请选择" class="project-map-select" popper-class="define-select-option">
                      <el-option
                        v-for="item in openList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <div class="ranking-project-list">
        <div class="project-list-search">
          <el-input
            v-model="projectValue"
            placeholder="搜索项目名称"
            prefix-icon="el-icon-search"
            @input="handleInput"
          />
        </div>
        <div class="project-list-details">
          <el-scrollbar style="height: 100%;">
            <div
              v-for="(item, index) in projectList"
              :key="index"
              class="project-name-plus"
            >
              <div
                class="project-name text-truncate"
                :style="{'background-color': item.isRmove ? '#E5E2DE' : item.itemStyle.color, 'color': item.isRmove ? '#848382' : '#fff'}"
              >{{ item.title }}</div>
              <div class="project-plus down">
                <i v-if="!item.isRmove" class="el-icon-remove" @click="removeProject(item.id, index)" />
                <i v-if="item.isRmove" class="el-icon-circle-plus up" @click="addProject(item.id, index)" />
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import { resizeEchartContent } from '@/utils/echarts'
import MyDatePicker from '@/components/DatePicker/index'
import YsnMapChina from './components/ysn-map/ysn-map-china'
import { mapState } from 'vuex'
import roseChart from '@/store/roseChart'
import { TOP5Config, TOP5Data } from './rankingConfig.js'
export default {
  components: { MyDatePicker, YsnMapChina },
  // eslint-disable-next-line vue/require-prop-types
  props: ['around-list', 'around-map', 'switchList'], // 当前添加的列表
  data() {
    return {
      projectValue: '',
      isPlus: false,
      myChart: '',
      outerCompareId: 1,
      innerCompareId: 2,
      regionList: [
        { name: '上海，闵行', value: 1 },
        { name: '上海，徐汇', value: 2 },
        { name: '上海，浦东', value: 3 },
        { name: '江苏，南京', value: 4 }
      ],
      typeList: [
        { name: '购物中心', value: 1 }
      ],
      haveList: [
        { name: '自营', value: 1 }
      ],
      openList: [
        { name: '2018年1月' },
        { name: '2019年1月' },
        { name: '2020年1月' },
        { name: '2021年1月' }
      ],
      positionTitleOuter: '客流',
      positionTitleInner: '销售',
      isShowLeftRadio: false,
      isShowRightRadio: true,
      isShowRankingProject: false,
      isShowDefineProject: true,
      mapName: null,
      isShowForm: false,
      addProjectList: [],
      chinaMapData: [
        {
          name: '上海市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 1
        },
        {
          name: '江苏省',
          label: {
            show: true
          },
          value: 3,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 20
        },
        {
          name: '安徽省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 3
        },
        {
          name: '浙江省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 4
        },
        {
          name: '福建省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 5
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 6
        },
        {
          name: '山东省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 7
        },
        {
          name: '河南省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 8
        },
        {
          name: '四川省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 9
        },
        {
          name: '重庆市',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 10
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false,
          removeLimit: 18
        },
        {
          name: '南海诸岛',
          value: 0,
          itemStyle: {
            normal: {
              opacity: 0,
              label: {
                show: false
              }
            }
          },
          removeLimit: 20
        }
      ],
      removeCount: 0,
      radio: '2',
      input2: '',
      form: {
        region1: '',
        region2: '',
        region3: '',
        region: ''
      },
      tooltipPositon: 'default',

      // tableColumnsConfig: [
      //   { sortIndex: '排名', width: 65 },
      //   { project: '项目' },
      //   { flow: '客流(万人)', type: 'ten-thousand', algin: 'left' },
      //   { sale: '销售(万元)', type: 'money' }
      // ],
      tableData: TOP5Data
    }
  },
  computed: {
    ...mapState({
      option: state => state.home.roseOption,
      projectList: state => state.home.projectList, // 项目列表
      isShowOuter: state => state.home.isShowOuter,
      isShowInner: state => state.home.isShowInner
    }),

    showMapData() {
      return this.chinaMapData.filter(item => {
        return item.removeLimit > this.removeCount / 2
      })
    },

    tableColumnsConfig() {
      const select = this.aroundList.filter(item => (item.leftActive || item.rightActive))

      const defaultConfig = [{ sortIndex: '排名', width: 65 }, { name: '项目' }]

      const selectConfig = select.map(item => TOP5Config[item.title])

      return [...defaultConfig, ...selectConfig]
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
            this.setTableData(newVal)
          } else {
            this.myChart.setOption(oldVal)
            this.setTableData(oldVal)
          }
          this.myChart.dispatchAction({
            type: 'hideTip'
          })
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    },

    switchList: {
      handler(val) {
        if (val.length) {
          this.projectList.forEach(item => {
            this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id: item.id, isShowPlus: false, index: item.id - 1 })
          })
          this.removeCount = 0
          switch (val.filter(item => item.value).length) {
            case 0:
              this.projectList.forEach(item => {
                this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id: item.id, isShowPlus: true, index: item.id - 1 })
              })
              this.removeCount = 40
              break
            case 1:
              this.projectList.forEach(item => {
                item.id > 10 && this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id: item.id, isShowPlus: true, index: item.id - 1 })
              })
              this.removeCount = 30
              break
            case 2:
              this.projectList.forEach(item => {
                item.id < 10 && this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id: item.id, isShowPlus: true, index: item.id - 1 })
              })
              this.removeCount = 10
              break
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this

      resizeEchartContent('#echarts-content')
      this.myChart = echarts.init(document.getElementById('echarts-content'), null, { renderer: 'svg' })

      self.myChart.setOption(self.option)

      this.setTableData(self.option)
      self.myChart.on('click', 'series.pie.label', function(params) {
        const optionsNew = JSON.parse(JSON.stringify(self.option))
        self.myChart.dispatchAction({
          type: 'hideTip'
        })
        // 非背景系列点击触发前面一层的label显示
        if (params.seriesIndex === 1 || params.seriesIndex === 0) {
          if (!optionsNew.series[params.seriesIndex].data[params.dataIndex].label) {
            optionsNew.series[params.seriesIndex].data[params.dataIndex].label = {}
            optionsNew.series[params.seriesIndex].data[params.dataIndex].labelLine = {}
          }
          optionsNew.series[params.seriesIndex].data[params.dataIndex].label = {
            ...optionsNew.series[params.seriesIndex].data[params.dataIndex].label,
            show: true,
            overflow: 'breakAll'
          }
          optionsNew.series[params.seriesIndex].data[params.dataIndex].labelLine = {
            ...optionsNew.series[params.seriesIndex].data[params.dataIndex].labelLine,
            length: params.seriesIndex === 1 ? 80 : 10,
            legnth2: 10,
            show: true
          }
          self.myChart.setOption(optionsNew)
          const roseCheckInfo = roseChart.state.roseCheckInfo[`${params.seriesIndex}-${params.dataIndex}`] || {}
          console.log('roseCheckInfo', roseCheckInfo)
          const zoom = window.innerWidth < 1440 ? window.innerWidth / 1440 : 1
          if (roseCheckInfo.labelRect) {
            // 判断左右显示位置
            if (roseCheckInfo.labelRect.x > self.myChart.getWidth() / 2) {
              roseChart.commit('SET_POSITION', 'left')
              self.tooltipPositon = 'right'
            } else {
              roseChart.commit('SET_POSITION', 'right')
              self.tooltipPositon = 'left'
            }

            if (roseCheckInfo.labelRect.y < 350 * zoom) {
              self.tooltipPositon = 'default'
            }

            self.myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: roseCheckInfo.seriesIndex,
              // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
              dataIndex: roseCheckInfo.dataIndex,
              // position: [roseCheckInfo.labelRect.x < 110 ? roseCheckInfo.labelRect.x + 65 : roseCheckInfo.labelRect.x, roseCheckInfo.labelRect.y]
              // position: [roseCheckInfo.labelRect.x < 110 ? roseCheckInfo.labelRect.x + 45 : roseCheckInfo.labelRect.x, roseCheckInfo.labelRect.y]
              position: [roseCheckInfo.labelRect.x, roseCheckInfo.labelRect.y]
            })
          }
          return
        }
      })
      self.myChart.getZr().on('click', params => {
        // 空白区域点击事件
        if (!params.target) {
          self.myChart.dispatchAction({
            type: 'hideTip'
          })
          const optionsNew = JSON.parse(JSON.stringify(self.option))
          self.myChart.setOption(optionsNew)
        }
      })
    },
    handleClickLeft(id, title) {
      // 如果当前操作的外圈ID和内圈选中ID相同 终止
      if (this.innerCompareId === id) return
      // 外圈选中ID
      this.outerCompareId = id
      // 定位标题赋值
      this.positionTitleOuter = title
      // 抛出选择外圈adio事件
      this.$emit('handleChangeLeftRadio', id)
      // this.option.series[0].data = this.outerData1
      // this.option.series[1].data = this.outerData2
      // this.mayChartRose.dispatchAction({
      //   type: 'hideTip'
      // })
    },
    handleClickRight(id, title) {
      // 如果当前操作的内圈ID和外圈选中ID相同 终止
      if (this.outerCompareId === id) return
      // 内圈选中ID
      this.innerCompareId = id
      // 定位标题赋值
      this.positionTitleInner = title
      // 抛出选择右侧radio事件
      this.$emit('handleChangeRightRadio', id)
      // this.mayChartRose.dispatchAction({
      //   type: 'hideTip'
      // })
    },
    handleRemove(item, index) {
      if (item.leftActive) this.handleClickLeft(item.id, item.title)
      if (item.rightActive) this.handleClickRight(item.id, item.title)
      // 删除选项事件
      this.$emit('removeAround', index)
    },
    removeProject(id, index) {
      // 移除右侧的项目选项
      this.removeCount++
      this.isPlus = false
      this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id, isShowPlus: true, index })
    },
    addProject(id, index) {
      // 添加右侧的项目选项
      this.removeCount--
      this.isPlus = true
      this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id, isShowPlus: false, index })
    },
    // 未使用方法
    // handleClick(active, idx) {
    //   this.aroundList.forEach((ele, index) => {
    //     if (idx === index && !active || (idx === index && active)) {
    //       ele.active = true
    //       return
    //     }
    //     ele.active = false
    //   })
    //   this.$emit('handleSearch', idx)
    // },
    selectDateResult() {
      // 时间选择
    },
    handleChangeRanking() {
      // 显示排名中的选项 单选按钮
      this.isShowRankingProject = false
      this.isShowDefineProject = true
      this.isShowForm = false
    },
    handleChangeDefine() {
      // 自选项目 单选按钮
      // if (this.isShowDefineProject) {
      //   this.isShowForm = true
      // } else {
      //   this.isShowForm = false
      // }
      this.isShowForm = !this.isShowForm
      this.isShowDefineProject = false
      this.isShowRankingProject = true
    },
    handleInput(val) {
      // 搜索内容变更事件
      this.$store.commit('home/UPDATE_PROJECT_LIST', val)
    },
    // 点击时隐藏tip
    hideTips() {
      this.myChart.dispatchAction({
        type: 'hideTip'
      })
    },
    // 自选项目点击
    handleProjectDownClick() {
      this.isShowForm = !this.isShowForm
      this.handleChangeDefine()
    },
    setTableData(data) {
      // const name = ['项目A', '项目B', '项目C', '项目D', '项目E']
      // this.tableData = data.series[0].data.map((item, index) => {
      //   return {
      //     sortIndex: index + 1,
      //     project: item.name.split(':')[1] ? item.name.split(':')[1] : name[index],
      //     flow: item.value,
      //     sale: item.value
      //   }
      // }).slice(0, 5)

      // this.tableData = [
      //   { sortIndex: 1, project: '安溪', flow: '458', sale: '758' },
      //   { sortIndex: 2, project: '蚌埠', flow: '438', sale: '708' },
      //   { sortIndex: 3, project: '上海罗店', flow: '358', sale: '658' },
      //   { sortIndex: 4, project: '上海宝杨', flow: '308', sale: '628' },
      //   { sortIndex: 5, project: '天津滨海', flow: '298', sale: '608' }
      // ]
    }
  }
}
</script>
<style lang="scss" scoped>
.ranking-container {
  height: 100%;
  position: relative;
  .ranking-row {
    height: 100%;
    .ranking-left-col,.ranking-right-col {
      height: 100%;
    }
  }
  .date-box{
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    top: 152px;
    left: 233px;
    z-index: 2;
    box-shadow: 0 3px 0 #575757;
    ::v-deep .my-date-picker {
      height: 100%;
      width: 100%;
      padding-top: 25px;
    }
  }
  .ranking-echarts-around {
    width: 586px;
    float: left;
    position: relative;
    // top: -25px;
    .echarts-line-container {
      position: relative;
      .g-line {
        width: 2px;
        height: 235px;
        border-left: 2px dashed #485F47;
        position: absolute;
        top: 290px;
        left: 348px;
        transform: rotate(-28deg);
      }
      .b-line {
        width: 2px;
        height: 100px;
        border-left: 2px dashed $subMenuHover;
        position: absolute;
        top: 358px;
        left: 380px;
        transform: rotate(-30deg);
      }

      .g-line.default {
        transform: rotate(-10deg);
        left: 278px;
        .flow-container {
          transform: rotate(10deg);
          bottom: -12px;
          left: 5px;
        }
      }
      .b-line.default {
        transform: rotate(-10deg);
        left: 309px;
        .flow-container {
          bottom: -10px;
          transform: rotate(10deg);
          left: 5px;
        }
      }

      .g-line.right {
        transform: rotate(10deg);
        left: 320px;
        .flow-container {
          left: -113px;
          bottom: -8px;
          transform: rotate(-10deg);
          color: $subMenuHover;
          text-align: right;
          .flow-title {
            text-align: right;
          }
          .flow-circle {
            right: -8px;
            left: auto;
          }
        }
      }

      .b-line.right {
        transform: rotate(10deg);
        left: 296px;
        .flow-container {
          left: -113px;
          bottom: -3px;
          transform: rotate(-10deg);
          color: $subMenuHover;
          text-align: right;
          .flow-title {
            text-align: right;
          }
          .flow-circle {
            right: -8px;
            left: auto;
          }
        }
      }
      .b-line .flow-container {
        left: 3px;
      }
      .flow-container {
        width: 106px;
        height: 20px;
        position: absolute;
        left: 3px;
        bottom: -27px;
        transform: rotate(28deg);
        color: $subMenuHover;
        text-align: center;
        .flow-title {
          white-space:  nowrap;
          font-size: $font-title-size;
          padding-bottom: 4px;
          border-bottom: 2px solid $subMenuHover;
          text-align: left;
          padding-left: 5px;
        }
        .flow-info {
          font-size: 12px;
          margin-top: 4px;
        }
        .flow-circle {
          width: 8px;
          height: 8px;
          background-color: $subMenuHover;
          border-radius: 50%;
          position: absolute;
          top: 21px;
          left: -8px;
        }
      }

      .sale-flow-container {
        color: #485F47;
        .flow-title {
          white-space: nowrap;
          border-color: #485F47;
          text-align: left;
          padding-left: 7px;
        }
        .flow-circle {
          background: #485F47;
        }
      }
      .passenger-flow-container {
        transform: rotate(30deg);
        bottom: -31px;
        left: 2px;
      }
    }
    #echarts-content {
      width: 586px;
      height: 430px;
      margin: 0 auto;
    }
    .around-map {
      width: 168px;
      margin-left: 24px;
      margin-top: -75px;
      .map-list-content {
        padding-top: 14px;
      }
      .around-map-list {
        height: 160px;
        .radio-content {
          padding-top: 2px;
          .icon {
            font-size: 24px;
            cursor: pointer;
          }
        }
        .map-list-title {
          padding: 0 6px;
          line-height: 24px;
          font-size: $font-base-size;
          color: $font-word-color;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          &.active, &:hover {
            background: #E5E2DE;
            .around-remove {
              display: block;
            }
          }
          .text-tooltip {
            max-width: 70px;
          }
        }
        .around-title {
          cursor: pointer;
          float: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .around-remove {
          float: right;
          margin-left: 24px;
          display: none;
          i {
            color: #6F120C;
            cursor: pointer;
          }
        }
      }
    }
    .around-map-title {
      .title {
        font-size: 16px;
        padding-bottom: 8px;
        color: $font-word-color;
        border-bottom: 1px solid $font-word-color;
        margin-top: 1px;
      }
      .title-right {
        height: 28px;
        padding-bottom: 8px;
        border-bottom: 1px solid #D1CEC9;
        text-align: center;
      }
    }

    .table-content {
      padding-left: 24px;
      padding-right: 26px;
      margin-top: 30px;
      box-sizing: border-box;
      .around-map-title {
        margin-bottom: 16px;
        width: 168px;
      }
    }
  }
  .ranking-project {
    width: 268px;
    height: 100%;
    min-height: 608px;
    max-height: 100%;
    float: left;
    .ranking-map-content {
      height: 336px;
      border-left: 1px solid #E5E2DE;
      position: relative;
      padding-top: 58px;
      .ranking-map-search {
        width: 90%;
        position: absolute;
        left: 22px;
        top: 0;
        z-index: 10;
        .search-top {
          margin-bottom: 18px;
          span {
            vertical-align: middle;
          }
        }
        .search-bottom {
          span {
            vertical-align: middle;
          }
          .down-arrow {
            cursor: pointer;
            margin-right: 24px;
          }
        }
        .icon  {
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .ranking-project-list {
      height: calc(100% - 336px);
      display: flex;
      flex-direction: column;
      .project-list-search {
        padding-left: 14px;
        padding-bottom: 4px;
        border-left: 1px solid #E5E2DE;
      }
      .project-list-details {
        flex: 1;
        height: 0;
        max-height: 457px;
        border-left: 1px dashed #E5E2DE;
        padding-left: 14px;
        .project-name-plus {
          overflow: hidden;
          margin-top: 4px;
          .project-plus {
            float: left;
            padding-top: 4px;
            margin-left: 4px;
            cursor: pointer;
            i {
              font-size: 16px;
            }
          }
        }
        .project-name {
          width: 220px;
          height: 24px;
          line-height: 24px;
          background: #485F47;
          color: #fff;
          border-radius: 18px;
          text-align: left;
          font-size: 12px;
          float: left;
          padding:0 8px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.search-bottom-form {
  margin-top: 10px;
  padding-left: 20px;
}
::v-deep .el-select .el-input .el-select__caret {
  color: #606266;
}
.search-bottom-form .el-form-item{
  margin-bottom: 8px;
}
::v-deep  .search-bottom-form .el-form-item__label{
  font-weight: inherit !important;
  color: #000;
}
::v-deep .el-scrollbar__wrap{
  // overflow-x: hidden !important;
}

.project-map-select {
  ::v-deep.el-input__inner {
    font-family: MicrosoftYaHei;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
