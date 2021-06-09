/*
*author: wjh
*date：2020-11-13
*desc：审批记录组件
*/
<template>
  <div :class="{'content-box':true}">
    <div class="record-title">
      <h1>
        <span>审批记录</span>
        <span v-if="approveDetail.approveRejectList && approveDetail.approveRejectList.length > 0" class="reject-num">已驳回过{{ approveDetail.approveRejectList.length }}次</span>
      </h1>
      <van-button v-if="approveDetail.approveRejectList && approveDetail.approveRejectList.length > 0" plain type="info" @click="$router.push('/rejectHistory')">驳回历史</van-button>
    </div>
    <div :class="{'step-list':true, 'notcheck': !j.approveOpinion ? true : false}" v-for="(j,k) in recordList" :key="k">
      <div class="step">
        <!-- <van-icon class="checkicon" name="checked" /> -->
        <i class="not-sp" v-if="j.approveType == 1 && !j.currStepFlg"></i>
        <van-icon class="checkicon" name="checked" v-if="j.approveOpinion && j.approveType != 1"/>
        <i class="now-sp" v-if="j.currStepFlg"></i>
        <div class="content">
          <p>
            <span class="disno">{{j.displayNumber}}</span>
            <span class="name">{{j.approveUserName}}</span>
            <span class="split">  |</span><span>{{j.stepName}}</span>
            <span v-if="j.stepGroupName">
								/  <span class="step-group">{{j.stepGroupName}}</span>
							</span>
            <span v-else></span>
            <span v-if="j.approvePositionName">{{'. '+ j.approvePositionName}}</span>
            <span v-if="j.lockFlg">（锁定）</span>
            <span v-else style="color:#1e5494">（由发起人手动选择）</span>
            <span v-if="(j.approveType == 2 || j.approveType == 3) && approveDetail.pmApprove.status == '审批中' && '|' + userInfo.userid + '|' == j.approveUserId" class="append" @click="$emit('showRepDialogZ', j)">追加</span>
            <span></span>
          </p>
        </div>
      </div>
      <div class="remark-box">
        <p class="remark">
          <span class="remark-time" v-if="j.approveDate">{{j.approveDate | filterDate}}</span>
          <!-- {{j.approveOpinion ? '已签批' : '未签批'}}  -->
          {{j.approveType | filterApproveType}}
          <span class="label" v-show="j.nodeNum > 0">{{j.nodeNum}}个二级审批</span> 
          <span class="label" v-if="j.messageList && j.messageList.length > 0" @click="toggleMessageList(k)">
            留言
            <van-icon v-if="j.showMessageList" name="arrow-up" />
            <van-icon v-else  name="arrow-down" />
          </span>
        </p>
        <p class="remark-message" v-show="j.approveRemark">{{j.approveType == 1 && j.approveRemark ?  '【上次审批意见：' + (j.updatedDate ? '(' + j.updatedDate.slice(2,16) + ')' : '')  +j.approveRemark + '】' : j.approveRemark}}</p>
        <div class="message-list" v-if="!j.showMessageList && j.messageList && j.messageList.length > 0">
          <div v-for="(s,v) in (j.messageList)" :key="v">
            <div v-if="s.msgType == 'Z'">
              <p class="title">
                <span class="name">{{s.createdUserName}}</span>
                <span class="type">追加</span>
              </p>
              <p class="time">{{s.updatedDate | filterTime}}</p>
              <p class="content">{{s.content}}</p>
            </div>
            <div v-else>
              <p class="title">
                <span class="name">{{s.createdUserName}}</span>
                <span class="type">{{s.referMsgId ? '发送给' : '共享给'}}</span>
                <span class="name">{{s.userNames}}</span>
                <span @click="replayMessage(s)" class="replay">
                  <img class="replay-icon" src="@/assets/images/replay.png" alt="">
                  回复
                </span>
              </p>
              <p class="time">{{s.updatedDate | filterTime}}</p>
              <p class="content">{{s.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: {
    recordList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['approveDetail', 'userInfo'])
  },
  methods: {
    toggleMessageList(index) {
      this.$set(this.recordList[index],'showMessageList',!this.recordList[index].showMessageList)
    },
    replayMessage(s) {
      this.$emit('showRepDialog',s)
    }
  },
  filters: {
    filterDate(val) {
      if(val) {
        return val.slice(0,16)
      } else {
        return ''
      }
    },
    filterTime(val) {
      if(val) {
        return val.slice(5,16)
      } else {
        return ''
      }
    },
    filterApproveType(val) {
      const obj = {1: '未签批', 2: '已签批',3: '系统自动跳过'};
      return obj[val];
    }
	}
};
</script>
<style lang="scss" scoped>
  .content-box {
    padding: 10px;
    border-bottom: 10px solid #ECF0F2;
  }
  .content-box.noborder {
    border: 0;
  }
  .record-title {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 16px;
      color: #333333;
      font-weight: 400;
      height: 16px;
      line-height: 16px;
      border-left: 3px solid #468CEB;
      padding-left: 5px;
      margin: 0 0 10px;
      .reject-num {
        font-size: 12px;
        color: #F5A623;
        font-weight: 400;
        padding-left: 5px;
      }
    }
  }
  .step-list {
    .step {
      display: flex;
      i {
        color: #3F8DE9;
      }
      i::before {
        vertical-align: middle;
      }
      .content {
        flex: 1;
        p {
          font-size: 12px;
          color: #333;
          .disno {
            font-size: 14px;
          }
          .name {
            margin-left: 5px;
            font-size: 16px;
          }
          .split {
            font-size: 15px;
            margin: 0 5px;
          }
          .step-group {
            color: #F5A623;
          }
          .append {
            color: #468CEB;
            cursor: pointer;
            font-size: 14px;
          }
        }
      }
    }
     .remark-box {
      padding-bottom: 20px;
      border-left: 2px solid #3F8DE9;
      margin-left: 7px;
      padding-left: 25px;
    }
    .remark-message {
      padding: 10px;
      background: #F4F5F5;   
      font-size: 12px;
      color: #656565;
    }
    .message-list {
      margin-top: 2px;
      div:last-child {
        border: none;
      }
      div {
        padding: 5px;
        background: #F4F5F5;
        border-bottom: 1px solid #DBDDDD;
        font-size: 12px;
        .title {
          .name {
            color: #333;
            font-weight: 600;
          }
          .type {
            color: #656565;
            margin: 0 5px;
          }
          .replay {
            float: right;
            margin-right: 10px;
            color: #3F8DE9;
            img {
              vertical-align: text-top;
            }
          }
        }

        .time {
          color: #999999;
        }

        .content {
          color: #656565;
          word-wrap: break-word;
           word-break: normal;
        }
      }
    }
    .remark {
      font-size: 12px;
      color: #A9A9A9;
      margin: 5px 0 10px 0;
      .remark-time {
        margin-right: 5px;
      }
      .label {
        float: right;
        height: 23px;
        line-height: 23px;
        padding: 0 7px;
        background: #F4F5F5;
        color: #468CEB;
      }
      .label:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
  .step-list:last-child {
    .remark-box {
      border-color: transparent;
      padding-bottom: 0;
    }
  }
  .step-list.notcheck:last-child {
    .remark-box {
      border-color: transparent;
    }
  }
  .step-list.notcheck {
    .checkicon {
      color: #ccc;
    }
    .remark-box {
      border-color: #ccc;
    }
  }
  .checkicon {
    text-align: center;
    position: relative;
    top: 3px;
  }
  .already-sp {
    font-size: 20px;
    color: #3F8DE9;
    vertical-align: text-top;
    position: relative;
    top: 3px;
  }
  .not-sp {
    display: inline-block;
    height: 16px;
    width: 16px;
    border: 1px solid #ccc;
    border-radius: 50%;
    vertical-align: text-top;
    position: relative;
    top: 3px;
  }
  .now-sp{
    display: inline-block;
    background: url('../../../assets/images/now-sp.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 18px;
    height: 18px;
    vertical-align: text-top;
    cursor: pointer;
    position: relative;
    top: 3px;
  }
</style>
