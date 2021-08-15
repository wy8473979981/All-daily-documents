<template>
<div>
  <div v-if="showList || mode == 'A'" class="tem-con">
    <div style="padding: 0 20px;">
      <div class="set-search">
        <div class="lt">
          <div style="width:260px;">
            <el-input
              clearable
              prefix-icon="el-icon-search"
              v-model.trim="params.keyword"
              @keypress.enter.native="search">
            </el-input>
          </div>
          <div style="margin-left:0">
            <el-button type="primary" class="linear" @click="search()">搜索</el-button>
          </div>
          <div v-show="!seniorShow" class="level-search" @click="seniorShowClick()">
            <span>高级查询</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div v-show="seniorShow" class="level-search" @click="seniorShowClick()">
            <span>简单查询</span>
            <i class="el-icon-caret-top"></i>
          </div>
          <div class="keyword">
            <span>搜索关键词：</span>
            <label v-for="(item,i) in keywordList" :key="i" @click="keywordSel(item.val)" :class="{'active-b': params.mode===item.val}">
              {{item.label}}
            </label>
          </div>
        </div>
        <div class="rt">
          <div>
            <el-button @click="add" type="primary" class="linear">新增审批</el-button>
          </div>
        </div>
      </div>
      <!-- 高级查询 -->
      <div class="senior" :class="{'close': !seniorShow}">
        <ul>
          <li>
            <div>
              <!-- <span v-show="!title && !titleShow" @click.stop="titleShow=true">标题<i class="el-icon-edit" style="margin-left:5px;font-size:12px"></i></span>
              <input v-show="title || titleShow" placeholder="请输入标题" @blur.stop="titleShow=false" v-model="title" type="text"> -->
              <el-input
                title="标题"
                clearable
                placeholder="标题"
                suffix-icon="el-icon-edit"
                v-model="params.subject">
              </el-input>
            </div>
            <div>
              <el-input
                title="查询号"
                clearable
                placeholder="查询号"
                suffix-icon="el-icon-edit"
                v-model="params.approveNo">
              </el-input>
            </div>
            <!-- <div>
              <el-input
                title="随机码"
                clearable
                placeholder="随机码"
                prefix-icon="el-icon-edit"
                v-model="params.random_code">
              </el-input>
            </div> -->
            <!-- <div>
              <el-select v-model="params.sync_status" title="同步状态" clearable placeholder="同步状态">
                <el-option
                  v-for="item in syncStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div> -->
            <div>
              <el-input
                @focus="openUserApprove()"
                @clear="params.currApproveUserId=''"
                title="审批人"
                clearable
                placeholder="审批人"
                suffix-icon="el-icon-arrow-down"
                v-model="currApproveUserIdName">
              </el-input>
            </div>
            <div>
              <el-input
                @focus="openUserCreated()"
                @clear="params.createdUserId=''"
                title="发起人"
                clearable
                placeholder="发起人"
                suffix-icon="el-icon-arrow-down"
                v-model="createdUserIdName">
              </el-input>
            </div>
            <div>
              <el-input
                title="编号"
                clearable
                placeholder="编号"
                suffix-icon="el-icon-edit"
                v-model="params.id">
              </el-input>
            </div>
            <div>
              <el-input
                title="表单分类"
                clearable
                placeholder="表单分类"
                suffix-icon="el-icon-edit"
                v-model="params.processName">
              </el-input>
            </div>
            <div>
              <el-select v-model="params.status" title="审批状态" clearable placeholder="审批状态">
                <el-option
                  v-for="item in approvalStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- <div>
              <el-input
                title="项目"
                clearable
                placeholder="项目"
                prefix-icon="el-icon-edit"
                v-model="params.project">
              </el-input>
            </div> -->
            <div style="margin-left:20px;">
              <el-button type="primary" @click="seniorSearch()">搜索</el-button>
              <el-button @click="reset()">重置</el-button>
            </div>
          </li>
        </ul>
      </div>
      <!-- <p class="tips">当前选择表单：{{ptext}}</p> -->
      <el-row>
        <el-col>
          <span v-if="params.mode" style="margin-right:20px"><label v-for="(item,i) in nowQueryModeList" :key="i" @click="queryModeSel(item.val)" :class="{'active-label': params.queryMode===item.val,'query-label': true}">
            {{item.label}}
            <span v-show="i!==nowQueryModeList.length-1">
              <i class="cut">|</i>
            </span>
          </label></span>
          <span class="tips">当前选择{{ptype == 'M' ? '模块：' : '表单：'}}{{ptext || '(无)'}}</span></el-col>
      </el-row>
      <div class="tab-label">
        <span>点击排序：</span>
        <label v-for="(item,i) in sortData" :key="i" :class="{'active':item.val===params.orderParam}" @click="itemTabSwitch(item)">
          {{item.label}}
          <span v-show="i!==sortData.length-1">
            <i v-show="item.order==='asc'" class="el-icon-caret-top"></i>
            <i v-show="item.order==='desc'" class="el-icon-caret-bottom"></i>
            <i class="cut" v-show="i!==sortData.length -2">|</i>
          </span>
        </label>
      </div>
    </div>
    <!-- 列表数据 -->
    <div class="list">
      <ul class="list-data">
        <li class="list-li" @click="viewDetail(item)" v-for="(item,i) in listData" :key="i">
          <div class="f-sb-c">
            <div class="list-h">
              <i :class="statusType[item.status]">{{item.status}}</i>
              <h4>{{item.subject}}{{'【'+ item.processName + '】'}}</h4>
              <!-- <span v-show="item.processName">【{{item.processName}}】</span> -->
              <h5 class="name" style="margin-left:15px;" v-show="item.currApproveUserName" :title="item.currApproveUserName">{{item.currApproveUserName}}</h5>
              <h5 style="margin-left:15px;" v-show="item.statusMark">会签中</h5>
              <h5 style="margin-left:15px;" v-show="item.delayFlag == 1">[延期申请]</h5>
              <h5 style="margin-left:15px;" v-show="item.delayFlag == 2">[延期通过]</h5>
              <h5 style="margin-left:15px;" v-show="item.delayFlag == 3">[延期驳回]</h5>
              <img style="margin-left:15px" v-show="item.shareFlag === 0" src="@/assets/images/newshare3.png" width="14" title="已共享" alt="已共享">
              <img style="margin-left:15px" v-show="item.shareFlag === 1" src="@/assets/images/newreply2.png" width="14" title="已回复" alt="已回复">
              <span v-if="item.stepEndDate">
                <img style="margin-left:15px" v-if="new Date(item.stepEndDate.replace(/-/g, '/')).valueOf() - Date.now() > 0 && new Date(item.stepEndDate).valueOf() - Date.now() < 10800000" src="@/assets/images/nDelay.png" width="14" title="即将过期" alt="即将过期">
                <img style="margin-left:15px" v-if="item.stepEndDate && new Date(item.stepEndDate.replace(/-/g, '/')).valueOf() - Date.now() < 0" src="@/assets/images/delay.png" width="14" title="已过期" alt="已过期">
              </span>
              <!-- <img style="margin-left:15px" v-show="item.delayFlag" src="@/assets/images/delaydone.png" title="延期完成" alt="延期完成"> -->
            </div>
            <div class="list-date">
              {{item.status == '已完成' ? item.completeDate : item.lastApproveDate}}
            </div>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col class="list-msg">
              <span class="no">{{item.approveNo}}</span>
              <span>{{item.landProject}}</span>
              <span>{{item.startUserName}}</span>
              <span v-show="item.secondApproveFlg" style="color:red">二级已批</span>
              <!-- <span>{{item.project}}</span>
              <span>{{item.createdUserName}}</span> -->
            </el-col>
            <el-col align="right" class="time-box">
              <img style="margin-right:10px" v-show="item.attachFlag == 1" src="@/assets/images/fujian.png" alt="有附件" title="有附件">
              <!-- <span class="over-time" v-show="item.stepExpiration == 0 && item.stepTimeBalance">已过期:{{item.stepTimeBalance}}</span>
              <span class="in-time" v-show="item.stepExpiration == 1 && item.stepTimeBalance">剩余:{{item.stepTimeBalance}}</span> -->
              <span v-if="item.stepEndDate">
                <span class="over-time" v-if="new Date(item.stepEndDate.replace(/-/g, '/')).valueOf() - Date.now() < 0">{{item.stepEndDate | computedTime}}</span>
                <span class="in-time" v-else>{{item.stepEndDate | computedTime}}</span>
              </span>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <p v-if="params.keyword && !listData[0]" class="no-searchList">您查询的编号不存在</p>
    <div style="padding:0 20px">
      <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
    </div>

    <search-user :open="openUser" @close="checkUser"></search-user>
  </div>
  <div v-if="!showList && mode != 'A'" class="no-content">
    <p>抱歉，该表单暂未上线</p>
  </div>
</div>
</template>

<script>
  import { handle_paginator } from '@/mixins';
  import formList from '@/apis/apis/formList';
  import reference from '@/apis/apis/reference';
  import { mapState } from 'vuex';

  export default {
    mixins: [handle_paginator],
    props: ['showL','mode','pid','ptype','processCode','processSysCode','ptext','templateContentId','refreshTime'],
    data() {
      return {
        text: '',
        showList: false,
        pId: '',
        id: '',
        title: '',
        openUserStatus: '',
        currApproveUserIdName: '', //审批人
        createdUserIdName: '', //发起人
        titleShow: false,
        seniorShow: false,
        openUser: false,
        pageInfo: {
          rows: 10,
          page: 1,
          sum_num: 0
        },
        params: {
          id: '',
          mode: '',
          keyword: '',
          subject: '',
          currApproveUserId: '',
          createdUserId: '',
          processName: '',
          processId: '',
          status: '',
          orderParam: '',
          order: '', // asc  desc
        },
        keywordList: [
          {label: '我的待办', val: 'A'},
          {label: '我发起的', val: 'C'},
          {label: '我审批的', val: 'H'},
        ],
        todoList: [
          {label: '当前审批', val: 'AC'},
          {label: '即将审批', val: 'AP'},
          {label: '其他授权人', val: 'AA'},
        ],
        startList: [
          {label: '草稿', val: 'CN'},
          {label: '审批中', val: 'CA'},
          {label: '完成', val: 'CD'},
          {label: '驳回', val: 'CB'},
          {label: '推送给我', val: 'CP'},
        ],
        approvavList: [
           {label: '签批', val: 'HA'},
          {label: '驳回', val: 'HB'},
          {label: '延期处理', val: 'HD'},
          {label: '留言', val: 'HM'},
        ],
        nowQueryModeList: [
          {label: '当前审批', val: 'AC'},
          {label: '即将审批', val: 'AP'},
          {label: '其他授权人', val: 'AA'},
        ],
        statusType: {
          '新增': 'add',
          '审批中': 'ing',
          '驳回': 'err',
          '完成': 'suc',
          '作废': 'dis',
        },
        approvalStatusList: [
          {value: 'N', label: '新增'},
          {value: 'A', label: '审批中'},
          {value: 'B', label: '驳回'},
          {value: 'D', label: '完成'},
          {value: 'C', label: '作废'},
        ],
        sortData: [
          // {label: '项目/中心', val: '1'},
          {label: '发起人', val: '0'},
          {label: '类型', val: '1'},
          {label: '标题', val: '2'},
          {label: '审批人', val: '3'},
          // {label: '到达时间', val: '6'},
          {label: '剩余时间', val: '4'},
          {label: '重置', val: ''},
        ],
        listData: []
      }
    },
    mounted() {
      window.name = ''
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.addEventListener('message', (e)  =>{
        if(e.data.type == 'refresh' || e.data.type == 'done') {
          this.getList();
        }
      }, false);
      // window.addEventListener('message', function (e) {
      //   if(e.data == 'refresh') {
      //     // 调用列表刷新
      //   }
      // }, false);
    },
    created() {
      this.getApproveStatus();
    },
    destroyed () {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    watch: {
      showL: {
        immediate: true,
        handler: function(val) {
          this.showList = val;
        }
      },
      pid: {
        immediate: true,
        handler: function(val) {
          this.pId = val;
          const param = JSON.parse(localStorage.getItem('spqt_list_param'));
          //  if(val && !this.params.queryMode && !param) {
          //   this.getList();
          // }
          if(val && this.params.queryMode) {
            this.params.queryMode = '';
            this.params.mode = '';
            this.getList();
            console.log('详情1')
            return;
          }
          if(val) {
            this.getList();
          }
          if(param) {
            // let m = param.mode;
            // this.params = param;
            // if(m == 'A') {
            //   this.nowQueryModeList = this.todoList;
            // } else if(m == 'C') {
            //   this.nowQueryModeList = this.startList;
            // } else {
            //   this.nowQueryModeList = this.approvavList;
            // }
            // this.getList();
            console.log('详情2')
          }
        }
      },
      mode: {
        immediate: true,
        handler: function(val) {
          const param = JSON.parse(localStorage.getItem('spqt_list_param'));
          if(val) {
            this.params.mode = val;
            this.params.queryMode = this.nowQueryModeList[0].val;
            this.getList(); 
          }
        }
      },
      refreshTime: {
        handler: function(val) {
          this.getList();
        }
      },
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      beforeunloadHandler(e) {
        // 刷新时去除pid等参数
        localStorage.removeItem('spqt_param');
        localStorage.removeItem('spqt_list_param');
      },
      add() {
        if(this.ptype !== 'P') {
          this.$message.closeAll()
          this.$message.error('请先选择左侧表单')
          return
        }
        let routeData = this.$router.resolve({path:'detail',query: {type: 'createLocal'}});
        window.open(routeData.href, this.pid);
        // this.$router.push({path: 'detail', query: {type: 'create'}})
      },
      viewDetail(val) {
        localStorage.setItem('spqt_list_param',JSON.stringify(this.params));
        // this.$router.push({path: 'detail', query: {id: val.approveId,processId: val.processId}});
        let routeData = this.$router.resolve({path:'detail',query: {id: val.approveId,processId: val.processId}});
        window.open(routeData.href, val.approveId);
      },
      getList() {
        this.params.processId = this.pid;
        this.params.processFlag = this.ptype;
        this.params.processCode = this.processCode;
        this.params.processSysCode = this.processSysCode;
        if(this.params.processCode) {
          this.params.processName = '';
        }
        let params = {
          ...this.pageInfo,
          ...this.params,
          enterpriseId: this.userInfo.enterpriseId,
          userId: this.userInfo.userid,
        }
        params.orderParam = params.orderParam ?  + params.orderParam : '';
        formList.getList(params).then(res => {
          if(res.message === 'success' && res.data) {
            this.listData = res.data.content;
            this.pageInfo.sum_num = res.data.totalElements;
          } else {
            this.listData = []
            this.pageInfo.sum_num = 0
          }
        });
      },
      getApproveStatus() {
        reference.getApproveStatus().then(res => {
          if(res.message === 'success') {
            this.approvalStatusList = [];
            try {
              res.data.approveStatus.forEach(item => {
                this.approvalStatusList.push({
                  value: item.dictCd,
                  label: item.dictName
                })
              })
            } catch (err) {
              console.log(err)
            }
          }
        })
      },
      itemTabSwitch(item) {
        this.params.orderParam = item.val;
        this.sortData.forEach(o => {
          if(o.val !== item.val) {
            o.order = ''
          }
        })
        if(item.val) {
          this.params.order = item.order = item.order==='asc' ? 'desc' : 'asc';
        }else{
          this.params.order = '';
          this.params.orderParam = '';
        }
        this.pageInfo.page = 1;
        this.getList()
      },
      seniorShowClick() {
        this.seniorShow = !this.seniorShow;
      },
      keywordSel(m) {
        this.clearSeniorQuery();
        if(m == 'A') {
          this.nowQueryModeList = this.todoList;
          this.params.queryMode = this.todoList[0].val;
        } else if(m == 'C') {
          this.nowQueryModeList = this.startList;
          this.params.queryMode = this.startList[0].val;
        } else {
          this.nowQueryModeList = this.approvavList;
          this.params.queryMode = this.approvavList[0].val;
        }
        this.params.mode = m;
        this.pageInfo.page = 1;
        this.getList()
      },
      clearSeniorQuery() {
        // 选择快速标签时置空高级查询参数关闭高级搜索
        this.params.subject = '';
        this.params.approveNo = '';
        this.params.currApproveUserIdName = '';
        this.params.createdUserId = '';
        this.params.id = '';
        this.params.processName = '';
        this.params.status = '';
        this.seniorShow = false;
      },
      queryModeSel(m) {
        this.clearSeniorQuery();
        this.params.queryMode = m;
        this.pageInfo.page = 1;
        this.getList()
      },
      search() {
        this.params.mode = '';
        this.params.queryMode = '';
        this.getList()
        console.log(process.env)
        console.log(process.env.VUE_APP_URL)
      },
      // 高级搜索
      seniorSearch() {
        this.params.mode = '';
        this.params.queryMode = '';
        this.getList();
      },
      reset() {
        this.pageInfo.page = 1;
        this.currApproveUserIdName = '';
        this.createdUserIdName = '';
        for(let item in this.params) {
          this.params[item] = ''
        }
        this.getList()
      },
      openUserApprove() {
        this.openUserStatus = 'currApproveUserId';
        this.openUser = true;
      },
      openUserCreated() {
        this.openUserStatus = 'createdUserId';
        this.openUser = true;
      },
      checkUser(res) {
        console.log(res)
        if(res) {
          this.params[this.openUserStatus] = res.userCd;
          this[this.openUserStatus+'Name'] = res.userName;
        }
        this.openUser = false;
        this.openUserStatus = '';
      }
    },
    filters: {
      // formatDate(time) {
      //   return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      // },
      computedTime(val) {
        if(!val) return;
        const time = new Date(val.replace(/-/g, '/')).valueOf();
        const now = Date.now();
        let computedTime = now - time;
        const desc = computedTime < 0 ? '剩余' : '已过期';
        let second = Math.abs(computedTime) / 1000;
        var day = 0;
        var hour = 0;
        var minute = 0;
        minute = Math.floor(second / (60))
        if (parseInt(minute) > 60) {
          hour = parseInt(minute / 60);
          minute %= 60; //算出有多分钟
        }
        if (parseInt(hour) >= 24) {
          day = parseInt(hour / 24);
          hour %= 24; //算出有多分钟
        }
        const daydesc = day > 0 ? day + '天' : '';
        const hourdesc = hour > 0 ? hour + '小时' : '';
        const minudesc = minute > 0 ? minute + '分钟' : '';
        return `${desc}: ${daydesc}${hourdesc}${minudesc}`
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@/assets/styles/common.scss';
  .keyword{
    margin-left: 20px;
    >label{
      margin-right: 8px;
      color: #6E7982;
      cursor: pointer;
    }
    label:not(.active-b) {
       &:hover {
        color: #333;
        font-weight: 600;
      }
    }
  }
  ::v-deep .senior{
    transition: all .3s;
    max-height: 200px;
    margin: 30px 0 20px;
    overflow: hidden;
    // input{
    //   border-bottom: 1px solid #3285E8;
    //   padding: 3px;
    // }
    >ul{
      >li{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        >div{
          margin:0 10px 10px 0;
          width: 150px;
        }
        // .el-input__inner{
        //   width: 150px;
        // }
      }
    }
    &.close{
      overflow: hidden;
      max-height: 0;
      margin: 0;
      // display: none;
    }
  }
  .tips{
    color: #F5A623;
    height: 30px;
    line-height: 30px;
    // margin-left: 20px;
  }
  .tab-label{
    margin-bottom: 12px;
    label:not(.active) {
       &:hover {
        color: #333;
        font-weight: 600;
      }
    }
    label{
      color: #6E7982;
      i.cut{
        margin-left: 5px;
        color: #6E7982;
      }
    }
    label:last-child{
      margin-left: 5px;
    }
  }
   ::v-deep .time-box {
    position: relative;
    top: 7px;
    font-size: 12px !important;
  }
  .list{
    .list-data{
      li:nth-child(1) {
        border-top: 1px solid #DEE5E8;
      }
      >li{
        transition: all .3s;
        padding: 12px 0;
        margin: 0 20px;
        border-bottom: 1px dashed #dddbdc;
        cursor: pointer;
        .list-h{
          display: flex;
          align-items: center;
          .name {
            max-width: 200px;
            line-height: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          >h4{
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
          >span{}
          >i{
            // margin-left: 12px;
            font-size: 12px;
            color: #fff;
            background-color: #468CEB;
            // border-radius:2px;
            // padding: 2px 5px;
            // margin-left: 10px;
            width: 46px;
            text-align: center;
            line-height: 16px;
             margin-right: 10px;
            &.err{
              background:#FB4343;
            }
            &.suc{
              background:#5AB46E;
            }
            &.ing{
              background:#F5A623;
            }
            &.dis{
              background:#9B9B9B;
            }
          }
        }
        .list-date{
          color: #6E7982;
          font-size: 12px;
          margin-bottom: 2px;
        }
        .list-msg{
          font-size: 12px;
          margin-top: 10px;
          >span{
            color: #9B9B9B;
            margin-right: 12px;
          }
          .no{
            color: #468CEB;
          }
        }
        &:hover{
          background:rgba(241,241,241,1);
        }
        .over-time {
          color: #EF2941;
          font-size: 12px;
        }
        .in-time {
          color: #F6B03C;
          font-size: 12px;
        }
      }
      // .list-li:nth-child(2n) {
      //   background-color: #F2F4F6;
      // }
    }
  }
  .active-b{
    color: #468CEB !important;
    font-weight: 500 !important;
  }
  .query-label {
    color: #333;
    font-size: 14px;
    margin-right: 3px;
    cursor: pointer;
    .cut {
      color: #333;
      font-size: 14px;
    }
  }

  .query-label:not(.active-label) {
    &:hover {
      color: #333;
      font-weight: 600;
    }
  }
  .active-label {
    color: #3285E8;
    font-size: 18px;
    font-weight: 600;
  }
  .no-searchList {
    padding-left: 20px;
    line-height: 40px;
    color: #EF2941;
  }
  .no-content {
    color: #F5A623;
    margin-top: 20px;
    padding-left: 50px;
    p {
      font-size: 20px;
    }
  }
</style>
