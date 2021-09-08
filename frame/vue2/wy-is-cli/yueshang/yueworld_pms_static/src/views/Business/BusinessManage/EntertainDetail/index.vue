<!--
 * @Author: zsj
 * @Date: 2021-07-03 15:46:57
 * @LastEditTime: 2021-08-17 09:25:17
 * @LastEditors: xueyx
-->
<template>
  <div class="app-page-main pr-24">
    <ysn-tabs
      :active="0"
      :list="list.tabsList"
      :dynamic="false"
      @change="tabsChange"
    />
    <div class="tabss">
      <ysn-flod id="基础信息" title="基础信息" :show-flod="false">
        <div class="shopinformations">
          <div class="shopinformation">
            <p>商铺信息</p>
            <p v-if="!list.buildingName" />
            <p v-else>{{ (list.buildingName|| "")+'/'+(list.spaceName||"")+'/'+(list.leasableArea||"")+'㎡' }}</p>
          </div>
          <div class="shopinformation">
            <p>品牌</p>
            <p>{{ list.brandName || "" }}</p>
          </div>
          <div class="shopinformation">
            <p>招商负责人</p>
            <p>{{ list.principal || "" }}</p>
          </div>
          <div class="shopinformation">
            <p>招商协调人</p>
            <p>{{ list.coordinator || "" }}</p>
          </div>
        </div>
      </ysn-flod>
    </div>
    <ysn-title :title="title">
      <div class="box">
        <div class="box_box one" /><div class="mr-40 pr-2">已完成</div>
        <div class="box_box two" /><div class="mr-40 pr-2">进行中</div>
        <div class="box_box three" /><div>未进行</div>
      </div>
    </ysn-title>
    <ysn-progress :list="progress_list" :active="progress_active">
      <div slot-scope="scope">
        <div v-if="scope.rows.DiscussId" class="label_title">洽谈编号</div>
        <div class="label_content contentNo" @click="toInfo('discussId')">{{ scope.rows.DiscussId }}</div>
        <div v-if="scope.rows.negotiationDate" class="label_title">洽谈日期</div>
        <div class="label_content">{{ scope.rows.negotiationDate }}</div>
        <div v-if="scope.rows.negotiationMethod" class="label_title">洽谈方式</div>
        <div class="label_content">{{ scope.rows.negotiationMethod }}</div>
        <div v-if="scope.rows.contactor" class="label_title">联系人</div>
        <div class="label_content">{{ scope.rows.contactor }}</div>
        <div v-if="scope.rows.tel" class="label_title">联系电话</div>
        <div class="label_content">{{ scope.rows.tel }}</div>
        <div v-if="scope.rows.contents" class="label_title">沟通内容</div>
        <div class="label_content">{{ scope.rows.contents }}</div>
        <div v-if="scope.rows.contNoIntent" class="label_title">意向编号</div>
        <div class="label_content contentNo " @click="toInfo('intentNo')">{{ scope.rows.contNoIntent }}</div>
        <div v-if="scope.rows.contractdate" class="label_title">意向签约日期</div>
        <div class="label_content">{{ scope.rows.contractdate }}</div>
        <div v-if="scope.rows.contNo&&scope.rows.status=='3'" class="label_title">合同编号</div>
        <div v-if="scope.rows.contNo&&scope.rows.status=='3'" class="label_content contentNo" @click="toInfo('tozContract')">{{ scope.rows.contNo }}</div>
        <div v-if="scope.rows.contNo&&scope.rows.status=='4'" class="label_title">合同编号</div>
        <div v-if="scope.rows.contNo&&scope.rows.status=='4'" class="label_content contentNo" @click="toInfo('toContract')">{{ scope.rows.contNo }}</div>
        <div v-if="scope.rows.contBeginDate" class="label_title">合同开始日期</div>
        <div class="label_content">{{ scope.rows.contBeginDate }}</div>
        <div v-if="scope.rows.contEndDate" class="label_title">合同结束日期</div>
        <div class="label_content">{{ scope.rows.contEndDate }}</div>
        <div v-if="scope.rows.decorationEnterDate&&scope.rows.label=='合同'" class="label_title">合同进场日期</div>
        <div v-if="scope.rows.label=='合同'" class="label_content">{{ scope.rows.decorationEnterDate }}</div>
        <div v-if="scope.rows.openDate&&scope.rows.label=='合同'" class="label_title">合同开业日期</div>
        <div v-if="scope.rows.label=='合同'" class="label_content">{{ scope.rows.openDate }}</div>
        <div v-if="scope.rows.status==4" class="label_title">双签日期</div>
        <div v-if="scope.rows.signatureDate" class="label_content">{{ scope.rows.signatureDate }}</div>
        <div v-if="scope.rows.decorationEnterNo" class="label_title">进场装修编号</div>
        <div class="label_content contentNo" @click="toInfo('enter')">{{ scope.rows.decorationEnterNo }}</div>
        <div v-if="scope.rows.decorationEnterDate&&scope.rows.label!=='合同'" class="label_title">进场开始日期</div>
        <div v-if="scope.rows.label!=='合同'" class="label_content">{{ scope.rows.decorationEnterDate }}</div>
        <div v-if="scope.rows.decorateEndDate" class="label_title">进场结束日期</div>
        <div class="label_content">{{ scope.rows.decorateEndDate }}</div>
        <div v-if="scope.rows.acceptanceDate" class="label_title">验收日期</div>
        <div class="label_content">{{ scope.rows.acceptanceDate }}</div>
        <div v-if="scope.rows.expectOpenDate" class="label_title">预计开业日期</div>
        <div class="label_content">{{ scope.rows.expectOpenDate }}</div>
        <div v-if="scope.rows.renterOpenNo" class="label_title">开业审批编号</div>
        <div class="label_content contentNo" @click="toInfo('examine')">{{ scope.rows.renterOpenNo }}</div>
        <div v-if="scope.rows.openDate&&scope.rows.label!=='合同'" class="label_title">实际开业日期</div>
        <div v-if="scope.rows.label!=='合同'" class="label_content">{{ scope.rows.openDate }}</div>
      </div>
    </ysn-progress>
  </div>
</template>
<script>
import { entertainOfListApi } from '@/api'
import { selectList, configData, list, progress_list, lists, progress_list1 } from './data.js'
export default {
  name: 'EntertainDetail',
  components: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      // 进场装修详情页面id
      id: null,
      selectList,
      list,
      configData,
      progress_list,
      title: '进度信息',
      radio: '1',
      progress_active: 2 // 当前进度激活下标
    }
  },
  watch: {},
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      entertainOfListApi.entertainOfDetail(datas).then(res => {
        this.list = res.list
        this.progress_active = res.list.status
        this.progress_list = res.progress_list
      })
    }
  },
  methods: {
    // tab改变
    tabsChange(val) {
      if (val.index === '0') {
        entertainOfListApi.entertainOfDetail({ id: 2 }).then(res => {
          this.list = res.list
          this.progress_active = res.list.status
          this.progress_list = res.progress_list
        })
        this.update++
        return
      }
      this.list = lists
      this.progress_active = 1
      this.progress_list = progress_list1
    },
    toInfo(row) { // 跳转详情
      const that = this
      switch (row) {
        case 'enter':
          that.$router.push({ name: 'DecorationEnterDetail', query: { id: this.$route.query.id }})
          break
        case 'examine':
          that.$router.push({ name: 'BisExamineApproveDetail', query: { id: this.$route.query.id }})
          break
        case 'intentNo':
          that.$router.push({ name: 'AgreementOfIntentDetails', query: { id: this.$route.query.id }})
          break
        case 'toContract':
          that.$router.push({ name: 'StandingBookDetail', query: { id: this.$route.query.id }})
          break
        case 'discussId':
          that.$router.push({ name: 'Negotiation', query: { formData: that.progress_list[0].DiscussId }})
          break
        case 'tozContract':
          that.$router.push({ name: 'HoldinveStmentdueDetails', query: { id: this.$route.query.id }})
          break
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClicks(tab, event) {
      console.log(tab, event)
    },
    next() {
      if (this.active++ > 2) this.active = 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index';
.app-page-main{
  .tabss{
    margin:10px 0;
    .shopinformations{
      .shopinformation{
        width: 206px;
      }
    }
  }
  .label_title{
    color: #848382;
    font-size: 12px;
  }

  .label_content{
    color: #050101;
    font-size: 14px;
    margin-bottom:5px
  }
  .contentNo{
    color: #1C4C7F;
    cursor: pointer;
  }
  .box{
    line-height: 34px;
    .box_box{
      width: 16px;
      height: 16px;
      border-radius: 9px;
      margin-right: 10px;
      vertical-align:middle;
    }
    .one{
      background: #1C4C7F;
      border: 3px solid #48A0C3;
    }
    .two{
      background: #48A0C3;
      border: 3px solid #B3D9E8;
    }
    .three{
      background: #BECBD2;
      border: 3px solid #DAE7EE;
    }
  }
}
</style>
