<template>
  <!-- 头部按钮模板 -->
  <div class="operate-content">
    <div class="opinion-box" @click="showSpjl = true">
      <customTags :data="{mainText:'已填意见',subText:'点击查看审批流'}" :type="'vertical'" :className="'blue'" :mianTextStyle="{width:'80px'}" :subTextStyle="{paddingRight:'0',color: '#575757'}" />
    </div>
    <div class="button-list-box">
      <div class="btn-item" @click="getPopup('agree')">
        <van-image class="second-text-link" :src="agree"></van-image>
        <span>同意</span>
      </div>
      <div class="btn-item" @click="getPopup('reject')">
        <van-image class="second-text-link" :src="reject"></van-image>
        <span>驳回</span>
      </div>
      <div class="btn-item" @click="getPopup('share')">
        <van-image class="second-text-link" :src="share"></van-image>
        <span>共享</span>
      </div>
      <div class="btn-item" @click="showMoreOperat=true">
        <van-image class="second-text-link second-text-link-more" :src="moreCircle"></van-image>
      </div>
    </div>

    <!-- 审批记录 -->
    <ysNSpjlStep :showSpjl.sync="showSpjl" />
    <!-- 更多操作按钮 弹窗 -->
    <ysNMoreOperate :showMoreOperat.sync="showMoreOperat" />
    <!-- 弹出层 -->
    <ysNPopup :showPopup="showPopup" :type="'popup'" :background="background" :buttonList="buttonList" :placeholder="placeholder" @onCancel="onCancel" @onSave="onSave" @onCurrentSave="onCurrentSave">
      <div slot="topSelect" v-if="selectShow">
        <van-field readonly clickable name="picker" :value="value" label="驳回到节点：" placeholder="请选择" @click="showPicker = true" right-icon="arrow-down" class="selectFile" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </div>
    </ysNPopup>
  </div>
</template>
<script>
import agree from "../../../assets/images/agree.png";
import reject from "../../../assets/images/reject.png";
import share from "../../../assets/images/share.png";
import moreCircle from "../../../assets/images/more-circle.png";
export default {
  components: {
  },
  data () {
    return {
      selectShow: false,
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      showSpjl: false,
      showMoreOperat: false,
      agree: agree,
      reject: reject,
      share: share,
      moreCircle: moreCircle,
      showPopup: false,
      background: '',
      buttonList: [],
      placeholder: ''
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    onConfirm (value) {
      this.value = value;
      this.showPicker = false;
    },
    getPopup (type) {
      this.showPopup = true
      if (type == 'agree') {
        this.placeholder = '填写审批意见'
        this.background = '#F7FCFF'
        this.buttonList = [
          {
            name: '取消',
            style: {
              color: '#333',
              background: 'transparent',
              marginRight: '10px'
            },
            fc: 'cancel'
          },
          {
            name: '暂存',
            style: {
              color: '#fff',
              background: '#F7FCFF',
              color: '#0071C1',
              border: '1px solid #0071C1',
              marginRight: '10px'

            },
            fc: 'currentSave'
          },
          {
            name: '保存',
            style: {
              color: '#fff',
              background: '#0071C1',
              width: '120px'
            },
            fc: 'save'
          }
        ]
      } else if (type == 'reject') {
        this.selectShow = true
        this.placeholder = '填写审批意见'
        this.background = '#FCF6F5'
        this.buttonList = [
          {
            name: '取消',
            style: {
              color: '#333',
              background: 'transparent',
              marginRight: '10px'
            },
            fc: 'cancel'
          },
          {
            name: '暂存',
            style: {
              background: '#fff',
              color: '#6F120C',
              border: '1px solid #6F120C',
              marginRight: '10px'

            },
            fc: 'currentSave'
          },
          {
            name: '驳回',
            style: {
              color: '#fff',
              background: '#6F120C',
              width: '120px'
            },
            fc: 'save'
          }
        ]
      }
    },
    onCancel (attrment) {
      this.showPopup = false
    },
    onSave (attrment) {

    },
    onCurrentSave (attrment) {

    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.operate-content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  .selectFile {
    background-color: transparent;
    border: none;
    padding-bottom: 15px;
    line-height: 36px;
    ::v-deep .van-field__label {
      color: #333;
      font-size: 14px;
      margin-right: 0;
    }
    ::v-deep .van-cell__value {
      background-color: #fff !important;
      border: solid 1px #c0c0b8;
      font-size: 14px;
      color: rgba(120, 120, 120, 0.32);
      background: #fdfcfa;
      border-radius: 8px;
      border: 1px solid #c0c0b8;
      line-height: 24px;
      padding: 5px 13px;
    }
  }
  .opinion-box {
    flex: 0 0 80px;
    text-align: center;
    .btn-blue {
      width: 100%;
      height: 18px;
      background: #0071c1;
      border-radius: 13px;
      border: 1px solid #0071c1;
      font-size: 12px;
      color: #ffffff;
      line-height: 24px;
    }
    .btn-gray {
      background: #bfbfc2;
      border: 1px solid #bfbfc2;
      color: #ffffff;
    }
    .view-link {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      font-size: 10px;
      color: #575757;
      line-height: 24px;
    }
  }
  .button-list-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 41px;
    font-size: 16px;
    color: #020b14;
    line-height: 24px;
    .btn-item {
      display: flex;
      align-items: center;
      .second-text-link {
        width: 15px;
        height: 14px;
        margin-right: 3px;
      }
      .second-text-link-more {
        width: 24px;
        height: 24px;
        margin-right: 0px;
      }
    }
  }
}
</style>
