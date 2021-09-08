<template>
	<!-- 收件箱列表 -->
  <div class="app-page-get">
    <app-ysn-nav-bar title="收件箱" :left-arrow="true"></app-ysn-nav-bar>
    <van-row type="flex" class="app-search-box">
      <van-col span="6">
        <app-ysn-common-type :modelD="query.type" :titleD="title2" duty @changeSelect="dutySelect" />
      </van-col>
      <van-col span="6">
        <app-ysn-common-type :model="pageType" />
      </van-col>
      <van-col span="12">
        <app-ysn-search :search="query.search" @changeText="changeText" :showBg="false"></app-ysn-search>
      </van-col>
    </van-row>
    <!-- 搜索模块 -->
    <!-- 功能模块 - 涉及职能 -->
    <van-row class="">
      <van-col span="17">
        <app-ysn-tabs :model="tabIndex" :options="status" :full-width="true" @changeTab="changeTab">
          <template slot-scope="{data,index}">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" ref="pullFresh" id="pullFresh">
              <app-ysn-page-list :list="emailListBox[index]" :mtype="(index+1)" :loading="loading" :finished="finished" @setTop="setTop" :pageType="pageType"
                                 showDel show-top
                               @delItem="delItem" @rowClick="rowClick" @onLoad="onLoad"></app-ysn-page-list>
            </van-pull-refresh>
          </template>
        </app-ysn-tabs>
      </van-col>
      <van-col span="7">
        <div style="background-color: #FFFFFF;width: 100%;height: 48px;"></div>
<!--        <app-ysn-drop-down-menu :model="query.type" :title="title2" :options="dutys" type="tab" border getContainerClass="filterImg" @changeSelect="dutySelect">-->
<!--        </app-ysn-drop-down-menu>-->
      </van-col>
    </van-row>
  </div>
</template>

<script>
import iconFilter from "../../assets/images/icon-filter.png";
export default {
  name: "app-page-get",
  data() {
    return {
      pageType: 0,
      query: {
        search: '',
        type: 0
      },
      active: 0,
      iconFilter: iconFilter,
      emailListBox: [],
      emailList: [],
      loading: false,
      finished: false,
      isLoading: false,
      tabIndex: 0,
    }
  },
  activated() {
    if(this.$store.state.detailItem) {
      const dItem = this.$store.state.detailItem
      this.delItem(dItem)
    }
    this.pageType = 0
    this.initData()
    const top = this.$store.state.scrollTops.getTop
    this.$nextTick(() => {
      setTimeout(() => {
        if(top && top > 0) this.$refs.pullFresh.$el.scrollTop = top
        // this.$refs.pullFresh.$el.scroll({
        //   top: top,
        //   left: 0,
        //   behavior: "smooth" //滚动条平滑滚动
        // });
      }, 0);
    })
  },
  beforeRouteLeave(to,from,next){
    console.log('to===',to)
    if(to.path === '/getDetail') {
      from.meta.keepAlive = true
      const scrollTops = this.$store.state.scrollTops
      const scrollObj = document.querySelector("#pullFresh")
      this.$store.commit('setScrollTops',{...scrollTops,...{getTop: scrollObj.scrollTop}})
    }else{
      from.meta.keepAlive = false
      this.title2 = '涉及职能'
      this.query.type = 0
      this.query.functionCode = ''
      this.emailListBox = []
      this.initData()
    }
    next()
  },
  created() {
    this.tabIndex = this.$store.state.tabIndex || 0
    this.initData()
  },
  methods: {
    async initData() {
      if(this.tabIndex === 0) {
        await this.$axios.common.selectReceiver(this.query, null, false).then(res => {
          console.log('获取收件箱列表：', res)
          this.refreshing = false
          this.isLoading = false
          if(res && res.data && res.data.resultData && res.data.resultData.records) {
            const records = res.data.resultData.records
            records.forEach(item => {
              if(this.query.search) {
                item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
              }
            })
            if(this.query.current === 1) {
              this.emailList = records
              this.$set(this.emailListBox,0,this.emailList)
            } else {
              this.emailList = this.emailList.concat(records)
              this.$set(this.emailListBox,0,this.emailList)
            }
          }else{
            this.$set(this.emailListBox,0,[])
          }
          if(this.emailList.length >= res.data.resultData.total) {
            this.finished = true
          }else{
            this.finished = false
          }
        })
      }
      if(this.tabIndex === 1) this.selectNoRead()
      if(this.tabIndex === 2) this.selectIsRead()
      if(this.tabIndex === 3) this.selectNoReply()
      if(this.tabIndex === 4) this.selectReply()
    },
    async selectNoRead() {
      await this.$axios.common.selectNoRead(this.query, null, false).then(res => {
        console.log('获取未读列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,1,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,1,this.emailList)
          }
        }else{
          this.$set(this.emailListBox,1,[])
        }
        if(this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    async selectIsRead() {
      await this.$axios.common.selectIsRead(this.query, null, false).then(res => {
        console.log('获取已读列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,2,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,2,this.emailList)
          }
        }else{
          this.$set(this.emailListBox,2,[])
        }
        if(this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    async selectNoReply() {
      await this.$axios.common.selectNoReply(this.query, null, false).then(res => {
        console.log('获取未回复列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,3,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,3,this.emailList)
          }
        }else{
          this.$set(this.emailListBox,3,[])
        }
        if(this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    async selectReply() {
      await this.$axios.common.selectReply(this.query, null, false).then(res => {
        console.log('获取已回复列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,4,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,4,this.emailList)
          }
        }else{
          this.$set(this.emailListBox,4,[])
        }
        if(this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    setTop(item) {
      console.log('setTop=',item)
      if(item.top && item.top === '1') {
        this.onRefresh()
        return
      }
      const index = this.emailList.findIndex(obj => obj.mainId === item.mainId)
      const obj = this.emailList[index]
      obj.top = '1'
      this.emailList.splice(index,1)
      this.emailList.unshift(obj)
    },
    delItem(item) {
      const index = this.emailList.findIndex(obj => obj.mainId.toString() === item.mainId.toString())
      this.emailList.splice(index,1)
      this.$store.commit('setDetailItem', null)
    },
    rowClick(item) {
      console.log('rowClick=',item)
      const elist = this.emailListBox[this.tabIndex]
      elist.forEach(ite => {
        if(ite.receiverId === item.receiverId) {
          ite.isRead = '8'
        }
      })
      this.$set(this.emailListBox,this.tabIndex,elist)
      this.$router.push({path: 'getDetail',query: item})
    },
    changeText(val) {
      this.query.search = val
      this.onRefresh()
      // this.emailListBox[this.tabIndex].forEach(item => {
      //   if(item.topic_old.indexOf(val) > -1) {
      //     item.topic = item.topic_old.replace(val,`<span style="color: #32A5D1;">${val}</span>`)
      //     item.hide = false
      //   }else{
      //     item.topic = item.topic_old
      //     item.hide = true
      //   }
      // })
      // if(!val || val == '') {
      //   this.emailListBox[this.tabIndex].forEach(item => {
      //     item.hide = false
      //   })
      // }
    },
    onRefresh() {
      this.isLoading = true
      this.reset()
      this.initData(this.tabIndex)
    },
    changeTab({val,index}) {
      this.tabIndex = index
      this.$store.commit('setTabIndex', index)
      this.query.current = 1
      // console.log('tab-click:',val)
      this.initData(index)
    }
  },
  beforeDestroy() {
    this.title2 = '涉及职能'
    this.query.functionCode = ''
    this.$store.commit('setDutyIndex', null)
  }
}
</script>
<style lang="scss" scoped>
.filterImg {
  background-color: #FFFFFF;
  height: 88px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #32A5D1;

  /deep/ .van-image__img {
    width: 30px;
    height: 30px;
    margin-right: 14px;
  }
}
/deep/ .van-tab {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #32A5D1;
  line-height: 34px;
}
/deep/ .van-tabs__line {
  display: none;
}

/* pull */
/deep/ .van-pull-refresh {
  height: 82vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
