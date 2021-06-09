<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="home-container"> 
    <el-container>
      <el-aside width="263px">
        <LeftDetail ref="LeftDetail" @handleAroundMap="handleAroundMap" />
      </el-aside>
      <el-container>
        <el-header height="187px">
          <Header @handleChangeSwitch="handleChangeSwitch" @handleIsShow="handleIsShow" />
          <div class="user-container">
            <yueNavSetting class="text-right mb-16" />
            <ysn-glbSearch />
          </div>
        </el-header>
        <el-main>
          <transition name="el-fade-in-linear">
            <Ranking
              v-if="isShowRanking"
              ref="ranking"
              :around-list="aroundList"
              :around-radio="aroundRadio"
              @removeAround="removeAround"
              @handleSearch="handleSearch"
              @handleChangeLeftRadio="handleChangeLeftRadio"
              @handleChangeRightRadio="handleChangeRightRadio"
            />
          </transition>
          <transition name="el-fade-in-linear">
            <HomeList v-if="isShowHomeList" />
          </transition>
          <transition name="el-fade-in-linear">
            <HomeMap v-if="isShowHomeMap" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import LeftDetail from './leftDetail'
import Header from './header'
import Ranking from './ranking'
import yueNavSetting from '../../components/ysn-navSetting/index'
import HomeList from './components/homeList'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { LeftDetail, Ranking, Header, yueNavSetting, HomeList},
  data() {
    return {
      isShowRanking: true,
      isShowHomeList: false,
      isShowHomeMap: false,
      aroundRadio: '客流0',
      aroundList: [
        { id: 1, title: '客流', leftActive: true, rightActive: false },
        { id: 2, title: '销售', leftActive: false, rightActive: true },
        { id: 3, title: '租金收入', leftActive: false, rightActive: false },
        { id: 4, title: '物管收入', leftActive: false, rightActive: false }
      ]
    }
  },
  computed: {
    ...mapState({
      leftDetailOption: state => state.home.leftDetailOption
    })
  },
  created() {
    this.$store.dispatch('home/getRoseData').then(res => {
      this.init(res)
    })
  },
  mounted() {
  },
  methods: {
    determine(){
      console.log('点击了确定')
    },
    pmscancel(){
      console.log('点击了取消')
    },
    handleIsShow(title) {
      // console.log(title)
      if (title === '排名') {
        this.isShowRanking = true
        this.isShowHomeList = false
        this.isShowHomeMap = false
      } else if (title === '列表') {
        this.isShowRanking = false
        this.isShowHomeList = true
        this.isShowHomeMap = false
      } else if (title === '地图') {
        this.isShowRanking = false
        this.isShowHomeList = false
        this.isShowHomeMap = true
      } else {
        window.location.href = 'https://amptest-s.yueworld.cn/dist/index.html#/home'
      }
    },
    init(res) {
      const self = this
      const myChart = echarts.init(document.getElementById('investment-left-echarts'))
      const myChart1 = echarts.init(document.getElementById('investment-right-echarts'))
      const myChart2 = []
      const myChart3 = []
      const myChart4 = echarts.init(document.getElementById('warning-left-echarts'))
      const myChart5 = echarts.init(document.getElementById('warning-right-echarts'))
      const myChart6 = echarts.init(document.getElementById('warning-bottom-echarts'))
      document.querySelectorAll('#income-left-echarts').forEach(ele => { myChart2.push(echarts.init(ele)) })
      document.querySelectorAll('#income-right-echarts').forEach(ele => { myChart3.push(echarts.init(ele)) })
      self.leftDetailOption.series[0].data[0].value = res.zs.kh.cclData
      self.leftDetailOption && myChart.setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = res.zs.kh.kylData
      self.leftDetailOption && myChart1.setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].detail.offsetCenter[1] = '0%'
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[0].leftDataHb
      self.leftDetailOption && myChart2[0].setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[1].leftDataHb
      self.leftDetailOption && myChart2[1].setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[2].leftDataHb
      self.leftDetailOption && myChart2[2].setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = 20
      self.leftDetailOption && myChart4.setOption(self.leftDetailOption)
      self.leftDetailOption && myChart5.setOption(self.leftDetailOption)
      self.leftDetailOption && myChart6.setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].detail.offsetCenter[1] = '-20%'
      self.leftDetailOption.series[0].data[0].value = 89
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[0].rightDataHb
      self.leftDetailOption && myChart3[0].setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[1].rightDataHb
      self.leftDetailOption && myChart3[1].setOption(self.leftDetailOption)
      self.leftDetailOption.series[0].data[0].value = res.sr.srData[2].rightDataHb
      self.leftDetailOption && myChart3[2].setOption(self.leftDetailOption)
    },
    handleAroundMap(data, isPlus) {
      let id = this.aroundList[this.aroundList.length - 1].id
      const aroundData = { id: ++id, title: data, active: false }
      if (isPlus) {
        this.aroundList.push(aroundData)
      } else {
        this.aroundList.splice(this.aroundList.findIndex(ele => ele.title === data), 1)
      }
    },
    removeAround(index) {
      this.aroundList.splice(index, 1)
    },
    handleSearch(idx) {
      const activeObj = this.aroundList.find((ele, index) => index === idx)
      if (activeObj) {
        this.aroundRadio = activeObj.title + '1'
      }
    },
    handleChangeLeftRadio(id) {
      const index = this.aroundList.findIndex(ele => ele.id === id)
      this.aroundList[index].leftActive = !this.aroundList[index].leftActive
      if (!this.aroundList[index].leftActive) {
        this.$store.commit('home/SET_ROSE_OPTION_IS_SHOW', { isShow: false, isLeft: true })
      } else {
        this.$store.commit('home/SET_ROSE_OPTION_IS_SHOW', { isShow: true, isLeft: true })
      }
      this.aroundList.forEach((ele, idx) => {
        if (index !== idx) {
          ele.leftActive = false
        }
      })
    },
    handleChangeRightRadio(id) {
      const index = this.aroundList.findIndex(ele => ele.id === id)
      this.aroundList[index].rightActive = !this.aroundList[index].rightActive
      if (!this.aroundList[index].rightActive) {
        this.$store.commit('home/SET_ROSE_OPTION_IS_SHOW', { isShow: false, isLeft: false })
      } else {
        this.$store.commit('home/SET_ROSE_OPTION_IS_SHOW', { isShow: true, isLeft: false })
      }
      this.aroundList.forEach((ele, idx) => {
        if (index !== idx) {
          ele.rightActive = false
        }
      })
    },
    handleChangeSwitch(val) {
      // console.log(val)
      if (val) {
        this.$refs.LeftDetail.option.series[0].data[0].value = 69
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    background: #F6F5EE;
    aside {
      background: none;
      padding: 0;
    }
    .el-container {
        height: 100%;
        .el-header {
            position: relative;
            padding-top: 34px;
            padding-left: 16px;
            padding-right: 16px;
            .user-container {
              position: absolute;
              top: 34px;
              right: 24px;
            }
        }
        .el-main {
          padding-left: 0;
          padding-right: 0;
        }
    }
}
</style>
