<template>
  <!-- 分页列表 -->
  <van-list
      :loading="loadingType"
      :finished="finish"
      :finished-text="search?'':finishedTextProp"
      :offset="50"
      :immediate-check="false"
      @load="onLoad">
    <template v-for="(item,index) in listData">
      <div class="van-cell" v-if="!item.hide" :key="'mtype-'+mtype+(index+1)"
           :style="{'background-color': item.top === '1'?'#F7F9FD':''}"
           :class="{'van-cell-obj': (obj && list.length === 0),'van-cell-contract': (contact && contact.length > 0)}">
        <van-swipe-cell style="width: 100%;">
          <van-row class="app-pl-box" @click="rowClick(item)">
            <van-col span="24">
              <van-row type="flex" style="flex-direction: column;">
                <van-col class="app-pl-box-flex" :class="{'app-pl-box-point': (item.isRead === '7' && 0 === pageType)}" style="width: 79%;position: relative;">
<!--                  <span class="app-pl-box-f-bg" v-if="item.receiverCount">{{item.receiverCount}}</span>-->
                  <span class="app-pl-box-title cut-line1" :class="{'app-pl-box-t-fw': item.isRead === '7'}" v-html="item.topic" @click="showTip(item.topic)"></span>
                </van-col>
                <van-row v-if="list && list.length > 0" style="width: 79%;">
                  <van-col class="cut-line1">
                    <span v-if="pageType === 2" class="app-pl-box-f-cg cut-line1">{{item.content || '无内容描述'}}</span>
                    <span class="app-pl-box-f-cg" v-if="pageType !== 2 && userType === 1">{{pageType === 1?'收件人':'发件人'}}：{{ pageType === 1?(item.receiverName?item.receiverName:item.forwardNames):item.ownerName}}</span>
                    <span class="app-pl-box-f-cg" v-if="pageType !== 2 && userType === 2">{{pageType === 1?'收件人':'发件人'}}：{{ pageType === 1?(item.receiverName?item.receiverName:item.forwardNames):item.createName}}</span>
                  </van-col>
                  <van-col v-if="item.positionName && userType === 2" class="cut-line1" style="margin-left: 40px;max-width: 150px;">
                    <span class="app-pl-box-f-cg">岗位：</span>{{item.positionName}}
                  </van-col>
                </van-row>
                <van-row v-if="item.isForwardType === '0'" style="width: 79%;">
                  <van-col class="cut-line1">
                    <span v-if="pageType === 1 && userType === 2" class="app-pl-box-f-cg cut-line1">转发：{{item.forwardNames || ''}}</span>
                  </van-col>
                </van-row>
                <template v-if="listData.length > 0 && (!list || list.length === 0)">
                  <van-col v-if="userType === 1">
                    <span class="app-pl-box-f-cg">{{ pageType === 1?'收件人':'发件人'}}：</span>{{ pageType === 1? (item.receiverName?item.receiverName:item.forwardNames):item.ownerName}}
                  </van-col>
                  <van-col v-if="userType === 2">
                    <span class="app-pl-box-f-cg">{{ pageType === 1?'收件人':'发件人'}}：</span>{{ pageType === 1? (item.receiverName?item.receiverName:item.forwardNames):item.createName}}
                  </van-col>
                  <van-col v-if="item.positionName && userType === 2">
                    <span class="app-pl-box-f-cg">岗位：</span>{{item.positionName}}
                  </van-col>
                  <van-col v-if="item.mobilePhone && userType === 2">
                    <span class="app-pl-box-f-cg">联系方式：</span>{{item.mobilePhone}}
                  </van-col>
                </template>
                <van-col v-if="contact.length > 0 && userType === 2 && (pageType === 1)" style="padding-right: 25px;display: flex;position: relative;padding-bottom: 8px;"
                  :style="{'border-bottom': !noBorder?'':''}">
                  <span class="app-pl-box-f-cg" style="display: block;height: 2em;float: left;">转发：</span>
                  <div style="flex: 1;" :class="{'cut-line1': !moreContact}">
                    <span class="app-pl-box-c-c" v-for="(user,index) in contact" :key="index" @click.stop="showUser(user.receiverId)">{{user.receiverName}}{{(index === (contact.length - 1))?'':'；'}}</span>
                  </div>
                  <van-image class="msg-row-s-img" :class="{'msg-img-active': moreContact}" :src="iconUp" @click="showMore"></van-image>
                </van-col>
              </van-row>
            </van-col>
            <van-col style="position: absolute;right: 0.48rem;">
              <van-row class="app-pl-box-r">
                <van-col class="app-fec" :style="{'height': item.functionCode?'unset':'24px'}">
<!--                  <span v-if="item.functionCode" class="app-pl-box-t" :style="{'background-color': (colors[getClass3(item.functionCode,depart)]?colors[getClass3(item.functionCode,depart)] : '#5D76BD')}">{{item.functionCode | getClass(depart,1) }}</span>-->
                  <span>{{item.functionCode | getClass(depart) }}</span>
                </van-col>
                <van-col class="app-pl-box-f-cg app-pl-time">{{ item.createTime | ftime}}</van-col>
              </van-row>
            </van-col>
          </van-row>
          <template #right>
            <van-button class="app-pl-box-s-btn" v-if="showTop" square type="warning" :text="(item.top && item.top === '1')?'取消置顶':'置顶'" @click="setTop(item)" />
            <van-button class="app-pl-box-s-btn" v-if="showCancel" square type="info" text="恢复" @click="cancelItem(item)" />
            <van-button class="app-pl-box-s-btn" v-if="showDel" square type="danger" text="删除" @click="delItem(item)" />
          </template>
        </van-swipe-cell>
      </div>
    </template>
    <app-ysn-holder v-if="listData.length === 0 && (search || pageType === 9) && current === 1" :height="10"></app-ysn-holder>
    <div class="app-pl-list-empty" v-if="listData.length === 0 && search && current === 1">
<!--      <van-image :src="iconEmpty"></van-image>-->
      <p>没有搜索到与"{{search}}"相关的{{tabText}}邮件</p>
    </div>
    <app-ysn-popup-user :show="showUserStatus" :userId="openUserId" @hidePopUser="hidePopUser"></app-ysn-popup-user>
  </van-list>
</template>
<script>
import iconUp from "../../assets/images/icon-up.png"
// import iconEmpty from "../../assets/images/icon-empty.png"
export default {
  data() {
    return {
      loadingType: false,
      finish: false,
      colors: {'招': '#32A5D1','运': '#90A0C4','工': '#F59A61','企': '#66CA96','其': '#5D76BD'},
      listData: [],
      finishedTextProp: '没有更多了',
      depart: this.$store.state.opList.depart,
      moreContact: false,
      iconUp: iconUp,
      // iconEmpty: iconEmpty,
      showUserStatus: false,
      openUserId: null
    }
  },
  mixins: {
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    obj: {
      type: Object
    },
    contact: {
      type: Array,
      default: function() {
        return []
      }
    },
    detailList: {
      type: Array,
      default: function() {
        return []
      }
    },
    pageType: {
      type: Number
    },
    methodDel: {
      type: Function
    },
    methodTop: {
      type: Function
    },
    showDel: {
      type: Boolean,
      default: false
    },
    showTop: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    mtype: {
      type: Number,
      default: 1
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    zfb: { // 不显示转发border
      type: Boolean,
      default: false
    },
    search: { // 查询值
      type: String,
      default: ''
    },
    current: { // 页码
      type: Number,
      default: 0
    },
    tabText: { // tab文字描述
      type: String,
      default: ''
    }
  },
  filters: {
    getClass: (val, depart, type = null) => {
      if( val && depart && type) {
        return depart[val].slice(0,1)
      }
      return depart[val]
    }
  },
  watch: {
    loading: {
      handler(n, o) {
        console.log('loadingT ======= ',n)
        this.loadingType = n
      },
      deep: true,
      immediate: true
    },
    finished: {
      handler(n, o) {
        this.finish = n
      },
      deep: true,
      immediate: true
    },
    list: {
      handler(n, o) {
        if(n) {
          this.listData = n
        }
      },
      deep: true,
      immediate: true
    },
    finishedText(n){
      if(n) {
        this.finishedTextProp = n
      }
    },
    obj: {
      handler(n, o) {
        if(n) {
          // console.log('obj-n:',n)
          this.finishedTextProp = ''
          this.listData = [n]
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  methods: {
    callback() {

    },
    onLoad() {
      // console.log('on-load')
      this.$emit('onLoad',{})
    },
    async setTop(item) {
      const {uiid, userName} = this.$store.state.userInfo
      const query = {userId: uiid, userName: userName, mainId: item.mainId,source: item.source}
      if(this.methodTop) {
        console.log('Execute custom events')
        await this.methodDel(query).then(res => {
          console.log('custom-del：', res)
          this.$emit('setTop',item)
        })
      }else{
        if(item.top && item.top === '1') {
          await this.$axios.common.updateIsNoTop(query).then(res => {
            console.log('取消置顶：', res)
            this.$emit('setTop',item)
          })
        }else{
          await this.$axios.common.updateIsTop(query).then(res => {
            console.log('置顶：', res)
            this.$emit('setTop',item)
          })
        }
      }
    },
    delItem(item) {
      this.$Dialog.confirm({
        title: '确认删除邮件?',
        message: '删除之后可以在已删除查看与恢复'
      }).then(() => {
        this.makeDelItem(item)
      }).catch(() => {

      })
    },
    async makeDelItem(item) {
      const {uiid, userName} = this.$store.state.userInfo
      // delType 删除类型,收件箱='5',已发送='2',草稿箱='1'
      let delType = ''
      if(this.pageType === 0)delType = '5'
      if(this.pageType === 2)delType = '1'
      if(this.pageType === 1)delType = '2'
      const query = {userId: uiid, userName: userName, mainId: item.mainId,source: item.source,delType: delType}
      if(this.methodDel) {
        console.log('Execute custom events')
        await this.methodDel(query).then(res => {
          console.log('custom-del：', res)
          if(res && res.code === '1') {
            this.$emit('delItem',item)
          }
        })
      }else{
        await this.$axios.user.deleteMailBox(query).then(res => {
          console.log('删除草稿：', res)
          if(res && res.code === '1') {
            this.$emit('delItem',item)
          }
        })
      }
    },
    async cancelItem(item) {
      let delType = ''
      if(this.pageType === 0)delType = '5'
      if(this.pageType === 2)delType = '1'
      if(this.pageType === 1)delType = '2'
      const {uiid, userName} = this.$store.state.userInfo
      const query = {userId: uiid, userName: userName, mainId: item.mainId,source: item.source,delType: delType}
      await this.$axios.user.cancelDelete(query).then(res => {
        console.log('恢复删除草稿：', res)
        if(res && res.code === '1') {
          this.$emit('cancelItem',item)
        }
      })
    },
    rowClick(item) {
      this.$emit('rowClick',item)
    },
    showMore() {
      this.moreContact = !this.moreContact
    },
    getClass3: (val, depart) => {
      if( val && depart) {
        return depart[val].slice(0,1)
      }
    },
    showUser(id) {
      this.openUserId = id
      this.showUserStatus = true
    },
    hidePopUser() {
      this.openUserId = null
      this.showUserStatus = false
    },
    showTip(text) {
      if(this.obj) {
        this.$toast(text)
      }
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.app-pl-box {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.app-pl-box-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 8px;
}
.app-pl-box-f-bg {
  background: #D1D5DD;
  border-radius: 14px;
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 28px;
  min-width: 48px;
  margin-right: 8px;
  display: inline-block;
  text-align: center;
  height: 28px;
}
.app-pl-box-point {
  &:before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #FF0505;
    border-radius: 100%;
    position: absolute;
    top: 18px;
    left: -16px;
  }
}
.app-pl-box-title {
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.app-pl-box-t-fw {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.app-pl-box-f-cg {
  font-size: 24px;
  font-weight: 400;
  color: #908E94;
}
.app-pl-box-c-c {
  height: 24px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #32A5D1;
  line-height: 24px;
}
.app-pl-box-r {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  span {
    text-align: right;
  }
  .van-col {
    width: 100%;
  }
  .app-pl-time {
    padding-top: 8px;
  }
}
.app-pl-box-t {
  margin-right: 8px;
  width: 34px;
  height: 34px;
  border-radius: 100%;
  text-align: center!important;
  color: #FFFFFF;
  display: inline-block;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 34px;
  padding-top: 2px;
  transform: scale(0.9);
}

/deep/ .van-cell {
  //padding: 0 0 0 36px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.van-cell {
  padding: 0 0 0 0;
  /deep/ .van-swipe-cell__wrapper {
    padding: 28px 36px 20px 36px;
    .van-button {
      height: 100%;
    }
    /deep/ .van-button--danger {
      font-size: 24px;
      font-weight: 400;
      color: #FFFFFF;
    }
    /deep/ .van-button--warning {
      font-size: 24px;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
}
.van-cell-contract {
  .van-swipe-cell__wrapper {
    padding-bottom: 0;
  }
}
/deep/ .van-cell::after{
  //border-bottom: 1px solid #ECF0F3;
  border-bottom: unset;
  right: 0;
}
/deep/ .van-cell-obj::after{
  border-bottom: none!important;
}

/* message */
.msg-row-s-img {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  padding: 8px 20px 20px;
  margin-left: 12px;
  /deep/ .van-image__img{
    width: 20px;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }
}
.msg-img-active {
  /deep/ .van-image__img{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }
}
.app-pl-box-s-btn {
  width: 140px;
}

/deep/ .van-button--normal {
  padding: 0;
}

.app-pl-list-empty {
  display: flex;
  background-color: #FFFFFF;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  &>p {
    margin-top: 36px;
    padding: 0 40px;
    text-align: center;
    word-break: break-all;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BCBCBC;
    line-height: 34px;
  }
}
</style>
