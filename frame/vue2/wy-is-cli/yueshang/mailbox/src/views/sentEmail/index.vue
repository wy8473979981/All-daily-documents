<template>
  <!-- 已发送列表 -->
  <div class="app-page-sent">
    <app-ysn-nav-bar title="已发送" :left-arrow="true"></app-ysn-nav-bar>
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
    <van-row style="background-color: #FFFFFF;border-bottom: 1px solid #F2F2F2;display: none;">
      <van-col span="17">

      </van-col>
      <van-col span="7">
        <div style="background-color: #FFFFFF;width: 100%;height: 48px;"></div>
<!--        <app-ysn-drop-down-menu :model="query.type" :title="title2" :options="dutys" type="tab" getContainerClass="filterImg" @changeSelect="dutySelect">-->
<!--        </app-ysn-drop-down-menu>-->
      </van-col>
    </van-row>
    <van-pull-refresh v-model="refreshing" @refresh="reset">
      <app-ysn-page-list :list="emailList" :loading="loading" :finished="finished" :pageType="pageType" @setTop="setTop" :showTop="false" showDel
                         @delItem="delItem" @rowClick="rowClick" @onLoad="onLoad"></app-ysn-page-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import iconFilter from "../../assets/images/icon-filter.png";
export default {
  name: "app-page-sent",
  data() {
    return {
      pageType: 1,
      query: {
        search: ''
      },
      active: 0,
      iconFilter: iconFilter,
      emailList: [],
      loading: false,
      finished: false
    }
  },
  mounted() {
    this.initData()
  },
  created() {
  },
  methods: {
    async initData() {
      await this.$axios.user.selectSend(this.query, null, false).then(res => {
        console.log('获取已发送列表：', res)
        this.refreshing = false
        this.loading = false
        if(res && res.data && res.data.resultData && res.data.resultData.records) {
          const records = res.data.resultData.records
          records.forEach(item => {
            if(item.forwardPersonList) {
              let forwardPersonStr = ''
              item.forwardPersonList.forEach(son => {
                forwardPersonStr += son.receiverName + ';'
              })
              item.forwardPersonStr = forwardPersonStr
            }
            if(this.query.search) {
              item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
            }
          })
          if(this.query.current === 1) {
            this.emailList = records
          } else {
            this.emailList = this.emailList.concat(records)
          }
          if(this.emailList.length >= res.data.resultData.total) {
            this.finished = true
          }else{
            this.finished = false
          }
        } else {
          this.emailList = []
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
      this.$router.push({path: '/sentDetail',query: item})
    },
    changeText(val) {
      this.query.search = val
      this.reset()
      // this.emailList.forEach(item => {
      //   item.topic = item.topic.replace(this.query.search,`<span style="color: #32A5D1;">${this.query.search}</span>`)
      // })
      // if(!val || val == '') {
      //   this.emailList.forEach(item => {
      //     item.hide = false
      //   })
      // }
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
</style>
