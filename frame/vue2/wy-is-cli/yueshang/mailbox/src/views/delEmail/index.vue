<template>
  <!-- 已删除列表 -->
  <div class="app-page-del">
    <app-ysn-nav-bar title="已删除" :left-arrow="true"></app-ysn-nav-bar>
    <van-row type="flex" class="app-search-box">
      <van-col span="6">
        <app-ysn-common-type :modelD="query.type" :titleD="title2"  duty @changeSelect="dutySelect" />
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
    <van-row>
      <van-col span="24">
        <app-ysn-tabs :model="tabIndex" :options="userType === 2?status4:status3" :full-width="true" :small="small" @changeTab="changeTab">
          <template slot-scope="{data,index}">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <app-ysn-page-list :list="emailListBox[index]" :loading="loading" :finished="finished" showCancel :pageType="index===1?1:pageType" @setTop="setTop"
                                 @delItem="delItem" @rowClick="rowClick" @cancelItem="onRefresh"></app-ysn-page-list>
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
  name: "app-page-del",
  data() {
    return {
      pageType: 3,
      query: {
        search: '',
        delType: '5'
      },
      active: 0,
      iconFilter: iconFilter,
      emailListBox: [],
      emailList: [],
      loading: false,
      finished: false,
      isLoading: false,
      tabIndex: this.$store.state.delIndex || 0,
      small: true
    }
  },
  mounted() {
    this.query.delType = this.status3[this.tabIndex].value
    this.initData()
  },
  created() {
  },
  methods: {
    async initData() {
      await this.$axios.common.selectDelete(this.query, null, false).then(res => {
        console.log('获取删除列表：', res)
        this.refreshing = false
        this.isLoading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          console.log("this.tabIndex==",this.tabIndex)
          if(this.query.current === 1) {
            this.emailList = records
            this.$set(this.emailListBox,this.tabIndex,this.emailList)
          } else {
            this.emailList = this.emailList.concat(records)
            this.$set(this.emailListBox,this.tabIndex,this.emailList)
          }
        }else{
          this.finished = true
          this.$set(this.emailListBox,0,[])
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
    },
    delItem(item) {
      console.log('delItem=',item)
    },
    rowClick(item) {
      console.log('rowClick=',item)
      item.pageType = this.tabIndex == 2?3:this.tabIndex
      this.$router.push({path: '/delDetail',query: item})
    },
    changeText(val) {
      this.query.search = val
      this.reset()
    },
    onRefresh() {
      this.reset()
      this.initData()
    },
    changeTab({val,index}) {
      console.log("val===",val)
      this.tabIndex = index
      this.$store.commit('setDelIndex', index)
      this.query.delType = val
      this.finished = false
      this.initData(val)
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
