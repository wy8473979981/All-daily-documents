/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import { homeApi } from '@/api'
import roseStore from '@/store/roseChart'

// 用于接收玫瑰图变量位置
window.roseStore = roseStore

const state = {
  roseOption: {
    tooltip: {
      trigger: 'item',
      triggerOn: 'none',
      padding: 0,
      borderWidth: 0,
      backgroundColor: 'rgba(50,50,50,0)',
      extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
      transitionDuration: 0,
      position: function(pos, params, dom, rect, size) {
        console.log('rect', rect)
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = { top: 60 }
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
        return [rect.x + rect.width, rect.y]
      },
      formatter: function(params) {
        console.log(params)
        const { position, roseDetailId } = roseStore.state
        console.log('position', position)
        // 单个弹框跳转详情
        let url = window.location.href
        url = url.split('#')[0] + '#/Home/ProjectHome'
        var html = `<div id="${roseDetailId}"  class="ranking-dialog" style="display: none">
                        <p class="title">负责人： XXX</p>
                        <p class="info">出租率： 95%</p>
                        <p class="info">开业率： 93%</p>
                        <p class="info">租金收入： XXXX</p>
                        <p class="info">销售额： XXXX</p>
                        <a  href="${url}" class="link">点击进入项目详情</a>
                    </div>`
        return `<div class="rose-label-data ${position}" onClick="roseStore.commit('SHOW_MORE')">
                    <div class="top-data">
                        <span class="color-blue">当月25/</span>
                        <span class="color-red">-20%</span>
                    </div>
                    <div class="name" style="background: ${params.color};border:1px solid #fff">${params.data.name || '测试名称'}</div>
                    ${html}
                </div>`
      }
    },
    animation: true,
    animationDuration: 200,
    animationEasing: 'quadraticOut',
    series: [
      {
        name: '客流排名bg',
        type: 'pie',
        // selectedMode: 'multiple',
        radius: ['58%', '90%'],
        selectedOffset: 0,
        hoverAnimation: false,
        roseType: 'area',
        labelLine: {
          show: false,
          smooth: false
        },
        animation: true,
        animationDuration: 200,
        animationEasing: 'quadraticOut',
        label: {
          normal: {
            show: false,
            position: 'outside',
            // animation: true,
            // transitionDuration: 0,
            // height: 50,
            // formatter: function(params) {
            //   return `{c|当月${params.value}\/}{b|${params.percent}%}\n{a|${params.name}}`
            // },
            formatter: '',
            rich: {
              c: {
                padding: [3, 0]
              },
              b: {
                color: '#6F120C',
                padding: [3, 0]
              },
              a: {
                fontSize: 12,
                color: '#FFFFFF',
                fontFamily: 'Microsoft Yahei',
                backgroundColor: '#20384A',
                borderColor: '#20384A',
                borderWidth: 1,
                borderRadius: 13,
                lineHeight: 16,
                padding: [3, 12]
              }
            }
          }
        },
        labelLayout: function(params) {
          if (params.labelRect.x) {
            roseStore.commit('SET_ROSE_CHECK_INFO', params)
          }
        },
        itemStyle: { borderWidth: 10, borderColor: '#F6F5EE' },
        z: 0,
        data: []
      },
      // {
      //   name: '客流排名',
      //   tooltip: {
      //     show: true
      //   },
      //   type: 'pie',
      //   // selectedMode: 'multiple',
      //   radius: ['58%', '90%'],
      //   selectedOffset: 0,
      //   roseType: 'area',
      //   labelLine: {
      //     show: false,
      //     smooth: false
      //   },
      //   label: {
      //     normal: {
      //       show: false,
      //       position: 'outside',
      //       fontSize: 12,
      //       color: '#FFFFFF',
      //       formatter: '{b}',
      //       fontFamily: 'Microsoft Yahei',
      //       backgroundColor: '#20384A',
      //       borderColor: '#20384A',
      //       borderWidth: 1,
      //       borderRadius: 13,
      //       lineHeight: 16,
      //       padding: [0, 12]
      //     }
      //   },
      //   itemStyle: { borderWidth: 10, borderColor: '#F6F5EE' },
      //   data: [],
      //   z: 1
      // },
      {
        name: '销售排名bg',
        type: 'pie',
        radius: ['32%', '54%'],
        selectedOffset: 10,
        roseType: 'area',
        labelLine: {
          show: false,
          height: 200,
          length: 55,
          length2: 30,
          smooth: false
        },
        animation: true,
        animationDuration: 200,
        animationEasing: 'quadraticOut',
        label: {
          normal: {
            show: false,
            position: 'outside',
            height: 60,
            formatter: '',
            // formatter: function(params) {
            //   return `{c|当月${params.value}\/}{b|${params.percent}%}\n{a|${params.name}}`
            // },
            rich: {
              c: {
                padding: [3, 0]
              },
              b: {
                color: '#6F120C',
                padding: [3, 0]
              },
              a: {
                fontSize: 12,
                color: '#FFFFFF',
                fontFamily: 'Microsoft Yahei',
                backgroundColor: '#20384A',
                borderColor: '#20384A',
                borderWidth: 1,
                borderRadius: 13,
                lineHeight: 16,
                padding: [3, 12]
              }
            }
          }
        },
        labelLayout: function(params) {
          if (params.labelRect.x) {
            roseStore.commit('SET_ROSE_CHECK_INFO', params)
          }
        },
        itemStyle: { borderWidth: 5, borderColor: '#F6F5EE' },
        data: [],
        z: 3
      }
      // {
      //   name: '销售排名',
      //   type: 'pie',
      //   radius: ['32%', '54%'],
      //   selectedOffset: 10,
      //   roseType: 'area',
      //   labelLine: {
      //     show: false,
      //     height: 200,
      //     smooth: false
      //   },
      //   label: {
      //     normal: {
      //       show: false,
      //       position: 'outside',
      //       fontSize: 12,
      //       color: '#FFFFFF',
      //       formatter: '{b}',
      //       fontFamily: 'Microsoft Yahei',
      //       backgroundColor: '#20384A',
      //       borderColor: '#20384A',
      //       borderWidth: 1,
      //       borderRadius: 13,
      //       lineHeight: 16,
      //       padding: [0, 12]
      //     }
      //   },
      //   itemStyle: { borderWidth: 5, borderColor: '#F6F5EE' },
      //   data: [],
      //   z: 4
      // }
    ]
  },
  projectList: [],
  projectList1: [],
  innerData: [],
  outerData1: [],
  outerData2: [],
  homeState: {
    cheliu: {
      dangnian: '',
      dangyue: '',
      dangyuetb: '',
      zuori: '',
      zuoritb: ''
    },
    huiyuan: {
      dangnian: '',
      dangyue: '',
      dangyuetb: '',
      leiji: '',
      zuiritb: '',
      zuori: ''
    },
    keliu: {
      dangnian: '',
      dangri: '',
      dangyue: '',
      dangyuetb: '',
      zuori: '',
      zuoritb: ''
    },
    qianfei: {
      dangnian: '',
      lishi: ''
    },
    sr: {
      srData: []
    },
    xiaoshou: {
      dangnian: '',
      dangyue: '',
      dangyuetb: '',
      yuexiaoshou: '',
      zuori: '',
      zuoritb: ''
    },
    yabudizhu: {
      leiji: '',
      rithtyuan: ''
    },
    yujing: {
      leftweilai: '',
      leftyuan: '',
      rightweilai: '',
      rightyuan: ''
    },
    zs: {
      kh: { cclData: '', ccltb: '', kylData: '', kylbt: '' },
      pjzj: { pjzjData: '', pjzjtb: '' },
      qcczl: { ccl: '', ccltb: '' },
      qckyl: { kyl: '', kyltb: '' }
    }
  },
  middleTop: {
    jzmj: '',
    jzpw: '',
    khpw: '',
    projectNum: ''
  },
  leftDetailOption: {
    series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#1C4C7F'
        }
      },
      radius: '100%',
      progress: {
        show: true,
        overlap: false,
        roundCap: false,
        clip: false,
        itemStyle: {
          borderWidth: 1
        }
      },
      axisLine: {
        lineStyle: {
          width: 8,
          color: [
            [1, '#E5E2DE']
          ]
        }
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        distance: 50
      },
      data: [{
        value: 89,
        detail: {
          offsetCenter: ['0%', '-20%']
        }
      }],
      title: {
        fontSize: 14
      },
      detail: {
        fontSize: 18,
        color: '#050101',
        formatter: '{value}%'
      }
    }]
  },
  isShowOuter: true,
  isShowInner: true,
  headerInfoList: []
}

const mutations = {
  SET_ROSE_OPTION: (state, data) => {
    state.roseOption.series[0].data = data.outerData1.sort((pre, cur) => cur.value - pre.value)
    state.roseOption.series[1].data = data.outerData2.sort(() => 0.5 - Math.random())
    // state.roseOption.series[2].data = data.innerData.sort(() => 0.5 - Math.random())
    // state.roseOption.series[3].data = data.innerData.sort(() => 0.5 - Math.random())
    state.projectList = data.outerData1.sort((pre, cur) => cur.value - pre.value)
    state.projectList1 = data.outerData1.sort(() => 0.5 - Math.random())
    state.innerData = data.innerData.sort(() => 0.5 - Math.random())
    state.outerData1 = data.outerData1.sort((pre, cur) => cur.value - pre.value)
    state.outerData2 = data.outerData2.sort(() => 0.5 - Math.random())
  },
  SET_LEFT_DETAIL_DATA: (state, data) => {
    for (const key in state.homeState) {
      state.homeState[key] = data[key]
    }
    state.middleTop = data.middleData.middleTop
    state.headerInfoList = [
      { title: '个项目', value: data.middleData.middleTop.projectNum },
      { title: '平计租面积', value: data.middleData.middleTop.jzmj },
      { title: '个计租铺位', value: data.middleData.middleTop.jzpw },
      { title: '个考核铺位', value: data.middleData.middleTop.khpw }
    ]
  },
  UPDATA_HOME_PROJECT_LIST: (state, { id, isShowPlus, index }) => {
    const index1 = state.outerData1.findIndex(ele => ele.id === id)
    state.projectList[index].isRmove = isShowPlus
    state.outerData1[index1].isRmove = isShowPlus
    state.outerData2[index1].isRmove = isShowPlus
    state.innerData[index1].isRmove = isShowPlus
    if (state.isShowOuter) {
      state.roseOption.series[0].data = state.outerData1.filter(ele => !ele.isRmove)
      state.roseOption.series[1].data = state.outerData2.filter(ele => !ele.isRmove)
    }
    // if (state.isShowInner) {
    //   state.roseOption.series[2].data = state.innerData.filter(ele => !ele.isRmove)
    //   state.roseOption.series[3].data = state.innerData.filter(ele => !ele.isRmove)
    // }
  },
  SET_ROSE_OPTION_IS_SHOW: (state, { isShow, isLeft }) => {
    if (isShow && isLeft) {
      state.isShowOuter = true
      state.roseOption.series[0].data = state.outerData1.filter(ele => !ele.isRmove)
      state.roseOption.series[1].data = state.outerData2.filter(ele => !ele.isRmove)
    } else if (isShow && !isLeft) {
      state.isShowInner = true
      // state.roseOption.series[3].data = state.innerData.filter(ele => !ele.isRmove)
      // state.roseOption.series[2].data = state.innerData.filter(ele => !ele.isRmove)
    } else if (!isShow && isLeft) {
      state.isShowOuter = false
      state.roseOption.series[0].data = []
      state.roseOption.series[1].data = []
    } else {
      state.isShowInner = false
      // state.roseOption.series[2].data = []
      // state.roseOption.series[3].data = []
    }
  },
  UPDATE_PROJECT_LIST: (state, val) => {
    const copyList = state.projectList1.slice()
    if (val) {
      const list = copyList.filter(ele => ele.title.toUpperCase().includes(val.toUpperCase()))
      state.projectList = list
    } else {
      state.projectList = copyList
    }
  }
}

const actions = {
  getRoseData({ commit }) {
    return new Promise(resolve => {
      homeApi.homeData().then(res => {
        commit('SET_LEFT_DETAIL_DATA', res)
        commit('SET_ROSE_OPTION', res.middleData.middleBottom)
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
