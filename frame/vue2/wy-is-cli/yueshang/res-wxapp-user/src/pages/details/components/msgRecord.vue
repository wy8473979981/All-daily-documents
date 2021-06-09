/*
*author: wjh
*date：2020-11-16
*desc：留言记录组件
*/

<template>
  <div class="content-box noborder message-box">
    <p class="title">留言记录</p>
    <div class="message-list">
      <div class="message-content" v-for="i in messageList" :key="i.id">
        <p class="name">{{i.createdUserName}}</p>
        <p class="cont">{{i.content}}</p>
        <p class="time">{{i.updatedDate}}</p>
      </div>
    </div>
    <p class="sub-title">发表留言<span>(这里填写的内容不具审批效力也不会被打印)</span></p>
    <van-field
      v-model="message"
      rows="4"
      autosize
      type="textarea"
      maxlength="300"
      show-word-limit
    />
    <p class="message-btn" @click="saveMess">留言</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';
import approval from '@/apis/apis/approval';
export default {
  props: ['currApproveStepId'],
  data() {
    return {
      message: '',
      messageList: [],
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.getMessages();
  }, 
  methods: {
     // 获取留言列表
    async getMessages() {
      const approveId = this.userInfo.approveId;
      if(!approveId) return;
      const param = {
        approveId,
        msgType: 'N'
      }
      await approval.getApproveMessageList(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.messageList = res.data;
        }
      });
    },
    // 留言
    async saveMess() {
      if(!this.message) {
        Toast('请先输入留言内容')
        return
      }
       const param = {
        content: this.message,
        createdUserCd: this.userInfo.userid,
        approveId: this.userInfo.approveId,
        msgType: 'N',
        currApproveStepId: this.currApproveStepId
      }
      await approval.saveApproveMessage(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          Toast('留言成功');
          this.message = '';
          this.getMessages();
        } else {
          Toast(res.message || '留言失败，请稍后重试')
        }
      });
    },
  },
  filters: {}
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
  .message-box {
    .title {
      font-size: 14px;
      color: #757575;
    }
    .message-list {
      .message-content {
        padding: 15px 0 10px;
        border-bottom: 1px solid #ECF0F2;
        .name {
          font-size: 12px;
          color: #333;
        }
        .cont {
          font-size: 14px;
          color: #333;
          word-break: break-word;
        }
        .time {
          font-size: 12px;
          color: #A9A9A9;
        }
      }
    }
    .sub-title {
      font-size: 12px;
      color: #333;
      margin: 10px 0;
      span {
        color: #F5A623;
      }
    }
    .message-btn {
      margin-top: 14px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: linear-gradient(298deg, #468CEB 0%, #35ABFF 100%);
      font-size: 16px;
      color: #fff;
    }
  }
</style>
