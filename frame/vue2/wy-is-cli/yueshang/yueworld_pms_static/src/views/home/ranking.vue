<template>
  <div class="ranking-container">
    <div class="date-box" @click="hideTips">
      <my-date-picker @selectDateResult="selectDateResult" />
    </div>
    <div class="ranking-echarts-around">
      <div class="echarts-line-container">
        <div id="echarts-content" />
        <transition name="el-fade-in-linear">
          <div v-if="option.series[2].data.length > 0" class="g-line">
            <div class="flow-container sale-flow-container">
              <div class="flow-title">{{ positionTitleInner }}</div>
              <div class="flow-circle" />
              <div class="flow-info">当月合计20.4亿</div>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div v-if="option.series[0].data.length > 0" class="b-line">
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
              <div class="title-left">排名环图</div>
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
                <div class="map-list-title fl" :class="item.rightActive ? 'active' : ''">
                  <div class="around-title" @click="handleClickRight(item.id,item.title)">
                    {{ item.title }}
                  </div>
                  <div v-if="item.rightActive" class="around-remove" @click="handleRemove(index)">
                    <i class="el-icon-remove" />
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="ranking-project">
      <div class="ranking-map-content">
        <ysn-map-china
          v-if="!mapName"
          :china-data="chinaMapData"
        />
        <div class="ranking-map-search">
          <div class="search-top">
            <span>
              <svg-icon v-if="isShowRankingProject" icon-class="radio-default" class="icon" @click="handleChangeRanking" />
              <svg-icon v-if="!isShowRankingProject" icon-class="radio-active" class="icon" @click="handleChangeRanking" />
            </span>
            <span>显示排名中的项目</span>
          </div>
          <div class="search-bottom">
            <span>
              <svg-icon v-if="isShowDefineProject" icon-class="radio-default" class="icon" @click="handleChangeDefine" />
              <svg-icon v-if="!isShowDefineProject" icon-class="radio-active" class="icon" @click="handleChangeDefine" />
            </span>
            <span>自选项目</span>
            <svg-icon icon-class="down-arrow" class="down-arrow fr" @click="isShowForm = !isShowForm" />
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
          <el-scrollbar style="height: 100%">
            <div
              v-for="(item, index) in projectList"
              :key="index"
              class="project-name-plus"
            >
              <div
                class="project-name"
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
import MyDatePicker from '../../components/DatePicker/index'
import YsnMapChina from './components/ysn-map/ysn-map-china'
import { mapState } from 'vuex'
export default {
  components: { MyDatePicker, YsnMapChina },
  props: ['around-list'],
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
      isShowRankingProject: true,
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
          switchValue: false
        },
        {
          name: '江苏省',
          label: {
            show: true
          },
          value: 3,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '安徽省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '浙江省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '福建省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '山东省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '河南省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '四川省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '重庆市',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
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
          }
        }
      ],
      radio: '2',
      input2: '',
      form: {
        region1: '',
        region2: '',
        region3: '',
        region: ''
      }
    }
  },
  computed: {
    ...mapState({
      option: state => state.home.roseOption,
      projectList: state => state.home.projectList,
      isShowOuter: state => state.home.isShowOuter,
      isShowInner: state => state.home.isShowInner
    })
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      this.myChart = echarts.init(document.getElementById('echarts-content'), null, { renderer: 'svg' })
      self.myChart.setOption(self.option)
      self.myChart.on('click', 'series.pie.label', function(params) {
        console.log('click==', params)
        const optionsNew = JSON.parse(JSON.stringify(self.option))
        self.myChart.dispatchAction({
          type: 'hideTip'
        })
        // 非背景系列点击触发前面一层的label显示
        if (params.seriesIndex % 2) {
          if (!optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label) {
            optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label = {}
            optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].labelLine = {}
          }
          optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].label.show = true
          optionsNew.series[params.seriesIndex - 1].data[params.dataIndex].labelLine.show = true
          self.myChart.setOption(optionsNew)
          return
        }
        // label 点击位置
        // if (params.event.target.style && params.event.target.style.lineWidth != 1) {
        let position = []
        const target = params.event.target
        if (target.transform) {
          let offsetX = 0
          if (target.style.text) {
            // 文字x轴往右边偏移25px
            offsetX = 20
          }
          position = [target.transform[4] + target._rect.width + offsetX, target.transform[5] - 10]
        } else {
          position = [0, 30]
        }
        self.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: params.seriesIndex,
          // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
          dataIndex: params.dataIndex,
          // 屏幕上的 x 坐标
          // x: number,
          // 屏幕上的 y 坐标
          // y: number,
          // 本次显示 tooltip 的位置。只在本次 action 中生效。
          // 缺省则使用 option 中定义的 tooltip 位置。
          position: position
        })
        // const index = params.dataIndex
        if (params.data) {
          // alert('点击：' + params.data.name)
        }
      })
    },
    handleClickLeft(id, title) {
      if (this.innerCompareId === id) return
      this.outerCompareId = id
      this.positionTitleOuter = title
      this.$emit('handleChangeLeftRadio', id)
      // this.option.series[0].data = this.outerData1
      // this.option.series[1].data = this.outerData2
      // this.mayChartRose.dispatchAction({
      //   type: 'hideTip'
      // })
    },
    handleClickRight(id, title) {
      if (this.outerCompareId === id) return
      this.innerCompareId = id
      this.positionTitleInner = title
      this.$emit('handleChangeRightRadio', id)
      // this.mayChartRose.dispatchAction({
      //   type: 'hideTip'
      // })
    },
    removeProject(id, index) {
      this.isPlus = false
      this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id, isShowPlus: true, index })
    },
    addProject(id, index) {
      this.isPlus = true
      this.$store.commit('home/UPDATA_HOME_PROJECT_LIST', { id, isShowPlus: false, index })
    },
    handleClick(active, idx) {
      this.aroundList.forEach((ele, index) => {
        if (idx === index && !active || (idx === index && active)) {
          ele.active = true
          return
        }
        ele.active = false
      })
      this.$emit('handleSearch', idx)
    },
    handleRemove(index) {
      this.$emit('removeAround', index)
    },
    selectDateResult() {
    },
    handleChangeRanking() {
      this.isShowRankingProject = !this.isShowRankingProject
      this.isShowDefineProject = true
    },
    handleChangeDefine() {
      if (this.isShowDefineProject) {
        this.isShowForm = true
      } else {
        this.isShowForm = false
      }
      this.isShowDefineProject = !this.isShowDefineProject
      this.isShowRankingProject = true
    },
    handleInput(val) {
      this.$store.commit('home/UPDATE_PROJECT_LIST', val)
    },
    // 点击时隐藏tip
    hideTips() {
      this.myChart.dispatchAction({
        type: 'hideTip'
      })
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
        width: 135px;
        height: 135px;
        border-radius: 135px;
        top: 180px;
        left: 226px;
        z-index: 2;
        box-shadow: 0 3px 0 #000;
    }
    .ranking-echarts-around {
        width: 586px;
        float: left;
        position: relative;
        .echarts-line-container {
            position: relative;
            .g-line {
                width: 2px;
                height: 207px;
                border-left: 2px dashed #485F47;
                position: absolute;
                top: 338px;
                left: 299px;
                transform: rotate(-28deg);

            }
            .b-line {
                width: 2px;
                height: 70px;
                border-left: 2px dashed #1C4C7F;
                position: absolute;
                top: 423px;
                left: 357px;
                transform: rotate(-39deg);
            }

            .flow-container {
                width: 106px;
                height: 20px;
                position: absolute;
                left: 5px;
                bottom: -27px;
                transform: rotate(28deg);
                color: #1C4C7F;
                text-align: center;
                .flow-title {
                    font-size: $font-title-size;
                    padding-bottom: 4px;
                    border-bottom: 2px solid #1C4C7F;
                }
                .flow-info {
                    font-size: 12px;
                    margin-top: 4px;
                }
                .flow-circle {
                    width: 8px;
                    height: 8px;
                    background-color: #1C4C7F;
                    border-radius: 50%;
                    position: absolute;
                    top: 21px;
                    left: -8px;
                }
            }

            .sale-flow-container {
                color: #485F47;
                .flow-title {
                    border-color: #485F47;
                }
                .flow-circle {
                    background: #485F47;
                }
            }
            .passenger-flow-container {
                transform: rotate(38deg);
                bottom: -31px;
                left: 2px;
            }
        }
        #echarts-content {
            width: 500px;
            height: 500px;
            margin: 0 auto;

        }
        .around-map {
            width: 168px;
            margin-left: 24px;
            .around-map-title {
                .title-left {
                    font-size: 16px;
                    padding-bottom: 8px;
                    color: $font-word-color;
                    border-bottom: 2px solid $font-word-color;
                }
                .title-right {
                    height: 28px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #D1CEC9;
                    text-align: center;

                }

            }
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
                    min-width: 100px;
                    padding: 0 6px;
                    line-height: 24px;
                    font-size: $font-base-size;
                    color: $font-word-color;
                    border-radius: 12px;
                    overflow: hidden;

                    &.active {
                        background: #E5E2DE;
                    }
                }
                .around-title {
                    width: 70px;
                    cursor: pointer;
                    float: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .around-remove {
                    float: right;
                    i {
                        color: #6F120C;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .ranking-project {
        width: 268px;
        height: 100%;
        float: left;
        .ranking-map-content {
            height: 50%;
            border-left: 1px solid #E5E2DE;
            position: relative;
            padding-top: 58px;
            .ranking-map-search {
                width: 90%;
                position: absolute;
                left: 22px;
                top: 0;
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
            height: 50%;
            .project-list-search {
                padding-left: 10px;
                padding-bottom: 4px;
                border-left: 1px solid #E5E2DE;
            }
            .project-list-details {
                height: 287px;
                border-left: 1px dashed #E5E2DE;
                padding-left: 10px;
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
                    line-height: 24px;
                    background: #485F47;
                    color: #fff;
                    border-radius: 18px;
                    text-align: center;
                    font-size: 12px;
                    float: left;

                }
            }
        }
    }
}

</style>
