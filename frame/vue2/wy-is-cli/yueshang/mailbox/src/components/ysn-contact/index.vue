<template>
  <!-- 通讯录组件 -->
  <div class="app-contact-box" v-if="list">
    <div class="app-contact-list" v-for="(item,index) in list" :key="index" @click="callback(item)">
      <van-row type="flex" align="center" justify="center">
        <van-col span="2" @click="levelChange(item)" v-show="contactIndex !== 0">
          <div class="list-icon-box-l" v-if="item.orgOrUser !== '1'">
            <van-image v-if="item.selected" class="list-icon-left" :src="iconelected"></van-image>
          </div>
        </van-col>
        <van-col span="20" @click="levelChange(item)">
          <van-image class="list-icon-center" :src="item.userPic?item.userPic:(item.orgOrUser == '1'?iconGroup:iconUser)"></van-image>
          <div>
            <div class="list-title">{{item.orgOrUser == '1'?item.entityName:item.userName}}</div>
            <div class="list-title list-gray" v-if="item.orgOrUser !== '1'">{{item.position || item.workDutyDesc}}</div>
          </div>
        </van-col>
        <van-col class="app-contact-arrow" span="2" @click="levelChange(item)">
          <van-image class="list-icon-right" :src="iconArrowR" v-show="item.orgOrUser == '1'"></van-image>
        </van-col>
      </van-row>
    </div>
    <div class="app-contact-show">
      <van-row>
        <van-col :span="18" class="">
          <div class="show-gray">已选({{selectedUser?selectedUser.length:0}}人)：</div>
          <div class="cut-line1">{{selectedUserStr}}</div>
        </van-col>
        <van-col :span="6" style="display: flex;justify-content: flex-end;">
          <van-button class="show-button" type="info" @click="saveUserList">确定</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import iconelected from '../../assets/images/icon-selected.png'
import iconArrowR from '../../assets/images/icon-arrow-r.png'
import iconGroup from '../../assets/images/icon-group.png'
import iconUser from '../../assets/images/icon-user.png'

export default {
  data() {
    return {
      iconelected: iconelected,
      iconArrowR: iconArrowR,
      iconGroup: iconGroup,
      iconUser: iconUser,
      contactIndex: this.$store?this.$store.state.contactIndex: 0,
      selectedUser: this.$store?this.$store.state.selectedBox.selectedUser : [],
      selectedUserStr: this.$store?this.$store.state.selectedBox.selectedUserStr : ''
    }
  },
  props: {
    list: {
      type: Array,
      default: function(){
        return []
      }
    },
    dot: { // 是否显示小红点
      type: Boolean,
      default: false
    },
    badge: { // 显示角标，数值
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    '$store.state.contactIndex'(n) {
      console.log('level='+n)
      this.contactIndex = n
    },
    '$store.state.selectedBox'(n) {
      const {selectedUser,selectedUserStr} = n
      this.selectedUser = selectedUser || []
      this.selectedUserStr = selectedUserStr
    }
  },
  methods: {
    callback(item) {
      if(!item.url || item.call) {
        return this.$emit('callback',item)
      }
      this.$router.push(item.url)
    },
    levelChange(item) {
      if(item.orgOrUser === '1') {
        this.$emit('levelChange', item)
      }else{
        item.selected = !item.selected
        if (item.selected) {
          if(!this.selectedUser) this.selectedUser = []
          const delIndex = this.selectedUser.findIndex(ite => ite.receiverId === item.uiid)
          if(delIndex > -1) {
            this.selectedUser.splice(delIndex,1)
          } else {
            this.selectedUser.push({receiverId: item.uiid, receiverName: item.entityName?item.entityName:item.userName,
              createrId: item.uiid,createrName: item.entityName?item.entityName:item.userName})
          }
        }else{
          const delIndex = this.selectedUser.findIndex(ite => ite.receiverId === item.uiid)
          if(delIndex > -1) this.selectedUser.splice(delIndex,1)
        }
        if(this.selectedUser.length > 0){
          this.selectedUserStr = ''
          this.selectedUser.forEach((user,index) => {
            if(index>0) {
              this.selectedUserStr += ';'
            }
            this.selectedUserStr += user.receiverName
          })
        }else{
          this.selectedUserStr = ''
        }
        this.$store.commit('setSelectedBox', {selectedUser: this.selectedUser || [],selectedUserStr: this.selectedUserStr})
        this.$forceUpdate()
        this.$emit('selectItem',{id: item.id,selected: item.selected})
      }
    },
    saveUserList() {
      this.$emit('saveUserList',{})
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.app-contact-box {
  padding-bottom: 140px;
}
.app-contact-list {
  background-color: #FFFFFF;
  padding-left: 32px;
  padding-right: 32px;
  border-bottom: 1px solid #f2f2f2;
  .list-icon-box-l {
    width: 32px;
    height: 32px;
    border: 1px solid #DCDCDC;
    border-radius: 100%;
  }
  .list-icon-left {
    width: 32px;
    height: 32px;
    margin: -2px 0 0 -2px;
  }
  .list-icon-center {
    width: 72px;
    height: 72px;
    margin-right: 20px;
  }
  .list-icon-right {
    width: 10px;
    height: 18px;
  }
  .list-title{
    height: 44px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 44px;
  }
  .list-gray{
    height: 34px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #959595;
    line-height: 34px;
  }

  /deep/ .van-row--flex{
    height: 136px;
  }
  .van-col {
    display: flex;
    align-items: center;
  }
}
/deep/ .van-row--justify-center {
  justify-content: space-between;
}
.app-contact-arrow {
  justify-content: flex-end;
}
.app-contact-show {
  background: #F8F8F8;
  width: 100%;
  height: 140px;
  padding: 36px 32px;
  position: absolute;
  bottom: 0;

  .show-gray {
    margin-bottom: 16px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #908E94;
    line-height: 24px;
  }
  .show-button {
    width: 136px;
    line-height: 68px;
    height: 68px;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>
