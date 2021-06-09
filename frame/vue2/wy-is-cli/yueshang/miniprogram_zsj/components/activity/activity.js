const utils = require('../../utils/util.js')
var app = getApp()
Component({
  data: {
    isEnroled: false,
    activityList: [
      // {
      //   imgUrl: './avatar.png',
      //   statusStr: '进行中',
      //   status: 'success',
      //   title: '深国投广场15周年庆',
      //   type: '促销活动',
      //   time: '2018.01.01-2019.01.01'
      // }
    ]
  },

  pageLifetimes: {
    show () {
      this.getList()
    }
  },
  methods: {
    getList() {
      let pages = getCurrentPages();
      let { options } = pages.pop();
      this.setData({
        isEnroled: this.options.isEnroled === '1'
      })
      let url = ''
      if (this.options.isEnroled === '1') {
        // 我的活动
        url = 'merchantOpen_web/mobileActivities/queryMerActivitySub.htm'
        wx.setNavigationBarTitle({
          title: '我的活动'
        })
      } else {
        // 所有活动
        url = 'merchantOpen_web/mobileActivities/queryActivities.htm'
      }
      const { clerkId, clerkOpenId } = app.globalData.detailInfo
      utils.ysRequest({   
        url,
        method: 'post',
        params: {
          clerkOpenId, clerkId
        },
        succ: (res) => {
          if (res.code === '0') {
            /**
             * {
                  imgUrl: './avatar.png',
                  statusStr: '已结束',
                  status: 'completed',
                  title: '深国投广场15周年庆2',
                  type: '促销活动',
                  time: '2018.01.01-2019.01.01'
                }
             */
            
            const list = res.params && res.params.length >= 0 ? res.params.map(item => {
              return {
                list: item.list.map(i => {
                  return {
                    title: i.activityName,
                    time: `${i.startDates}-${i.endDates}`,
                    content: i.activityDesc,
                    activityId: i.activityId,
                    id: i.id,
                    registrationStatus2: i.registrationStatus,   // 页面选择 取消选择
                    registrationStatus: i.registrationStatus,    // 显示用
                    hasEnroled: i.registrationStatus === '1',
                    // tagStatus: 'warning'
                    remark: i.remark
                  }
                }),
                imgUrl: item.merActivities.path,
                statusStr: item.merActivities.effectiveStatus === '2' ? '已结束' : '进行中',
                status: item.merActivities.effectiveStatus === '1' ? 'success' : '',
                title: item.merActivities.activityName,
                type: item.merActivities.activityType === '1' ? '促销活动' : '推广活动',
                time: item.merActivities.startTimes + '-' + item.merActivities.endTimes,
                expire: item.merActivities.signUpDates,
                id: item.merActivities.id,
                effectiveStatus: item.merActivities.effectiveStatus,
                signUpDate: item.merActivities.signUpDate,
                cancelStatus: item.merActivities.cancelStatus
              }
            }): []
            console.log(list, 'list data 555')
            this.setData({
              activityList: list
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        }
      })
    },
    checkDetail(e) {
      const { list, imgUrl, statusStr, title, type, time, expire, id, registrationStatus, status, effectiveStatus, signUpDate, cancelStatus } = e.currentTarget.dataset.item
      console.log(list, '---check detail--')
      if (effectiveStatus === '2' && !this.data.isEnroled) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none'
        })
        return
      }
      const info = {
        imgUrl, statusStr, title, type, time, expire, id, status, signUpDate, cancelStatus
      }
      const queryString = `info=${JSON.stringify(info)}&list=${JSON.stringify(list)}`
      if (this.data.isEnroled) {
        wx.navigateTo({
          url: `/pages/activityDetail/activityDetail?${queryString}`
        })
      } else {
        wx.navigateTo({
          url: `/pages/activityEnrol/activityEnrol?id=${info.id}`
        })
      }
    }
  }
})
