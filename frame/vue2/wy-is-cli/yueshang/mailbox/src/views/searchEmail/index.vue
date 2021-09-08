<template>
	<!-- 搜索列表 -->
  <div class="app-page-get">
    <app-ysn-nav-bar title="联席总裁信箱" :left-arrow="true"></app-ysn-nav-bar>
    <van-row type="flex">
      <van-col span="24">
        <app-ysn-search :search="query.search" :pageType="9" @changeText="changeText"></app-ysn-search>
      </van-col>
    </van-row>
    <!-- 搜索模块 -->
    <!-- 功能模块 - 涉及职能 -->
    <van-row>
      <van-col span="24">
        <app-ysn-tabs :model="tabIndex" :options="status2" :full-width="true" :small="small" @changeTab="changeTab">
          <template slot-scope="{data,index}">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <app-ysn-page-list :list="emailListBox[index]" :loading="loading" :finished="finished" :pageType="pageType"
                                 :search="query.search" :current="query.current" :tabText="tabText"
                                 @setTop="setTop" @delItem="delItem" @rowClick="rowClick"></app-ysn-page-list>
            </van-pull-refresh>
          </template>
        </app-ysn-tabs>
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
      pageType: 9,
      query: {
        search: '',
        type: null
      },
      title2: '涉及职能',
      active: 0,
      iconFilter: iconFilter,
      emailListBox: [],
      emailList: [],
      loading: false,
      finished: false,
      isLoading: false,
      tabIndex: 0,
      small: true,
      tabText: this.status2?this.status2[0].text: ''
    }
  },
  created() {
    this.tabIndex = this.$store.state.tabIndex || 0
    this.initData()
  },
  methods: {
    async initData() {
      this.pageType = 0
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
          }
          if(this.emailList.length >= res.data.resultData.total) {
            this.finished = true
          }else{
            this.finished = false
          }
        })
      }
      if(this.tabIndex === 1) this.selectSend()
      if(this.tabIndex === 2) this.selectDelete()
    },
    async selectSend() {
      this.pageType = 1
      await this.$axios.user.selectSend(this.query, null, false).then(res => {
        console.log('获取已发送列表：', res)
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
        } else {
          this.$set(this.emailListBox,1,[])
        }
        if(this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    async selectDelete() {
      await this.$axios.common.selectDelete(this.query, null, false).then(res => {
        console.log('获取删除列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach((item,index) => {
            if(item) {
              if(this.query.search) {
                item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
              }
            }else{
              res.data.records[index] = {hide: false,topic: '',topic_old: ''}
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,2,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,2,this.emailList)
          }
        } else {
          this.$set(this.emailListBox,2,[])
        }
        if(res.data && this.emailList.length >= res.data.resultData.total) {
          this.finished = true
        }else{
          this.finished = false
        }
      })
    },
    setTop(item) {
      console.log('setTop=',item)
      const index = this.emailList.findIndex(obj => obj.mainId === item.mainId)
      const obj = this.emailList[index]
      this.emailList.splice(index,1)
      this.emailList.unshift(obj)
    },
    delItem(item) {
      console.log('delItem=',item)
      const index = this.emailList.findIndex(obj => obj.mainId === item.mainId)
      this.emailList.splice(index,1)
    },
    rowClick(item) {
      console.log('rowClick=',item)
      let path = '/getDetail'
      if(this.tabIndex === 1) {
        path = '/sentDetail'
      }else if(this.tabIndex === 2) {
        path = '/delDetail'
        // item.pageType = ？
      }
      this.$router.push({path: path,query: item})
    },
    changeText(val) {
      console.log("search="+val)
      this.query.search = val
      if(val) {
        this.onRefresh()
      }else{
        this.$set(this.emailListBox,0,[])
        this.$set(this.emailListBox,1,[])
        this.$set(this.emailListBox,2,[])
        this.onRefresh()
      }
    },
    onRefresh() {
      // this.isLoading = true
      this.reset()
      this.initData(this.tabIndex)
    },
    changeTab({val,index}) {
      console.log('tab-index=',index)
      this.tabIndex = index
      this.tabText = this.status2[index].text
      this.finished = false
      this.$store.commit('setTabIndex', index)
      // console.log('tab-click:',val)
      // if(this.query.search) this.initData(val)
      if(index === 2){
        this.query.delType = ''
      }else{
        delete this.query.delType
      }
      this.initData(index)
    }
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
