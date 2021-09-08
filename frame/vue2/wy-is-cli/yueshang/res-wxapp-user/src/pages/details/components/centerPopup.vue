<template>
  <!-- 居中弹窗 -->
  <van-popup v-model="show" position="center" style="width: 315px;" class="center-popup" @close="close">
    <customTags :data="{mainText:title}" :height="`24px`" :mianTextStyle="{fontSize:'14px'}" />
    <div class="content">
      <template v-if="type == 'rent'">
        <van-row class="year-rent">
          <van-col span="8"></van-col>
          <van-col span="8">
            <p>标准月租</p>
            <p>(元/m²/月)</p>
          </van-col>
          <van-col span="8">
            <p>预算月租</p>
            <p>(元/m²/月)</p>
          </van-col>
        </van-row>
        <van-row v-for="(item, i) in list" :key="i" class="year-rent">
          <van-col span="8">第{{i+1}}年({{2020 + i}})</van-col>
          <van-col span="8">170</van-col>
          <van-col span="8">180</van-col>
        </van-row>
      </template>
      <template v-if="type == 'db'">
        <van-row class="db">
          <van-col span="12">
            租金单价(元/m²/月)
          </van-col>
          <van-col span="12">
            <customTags :data="{mainText:'156.00',subText:'93% / 148,264.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{fontSize:'12px',width:'100px',textAlign:'right'}" />
          </van-col>
        </van-row>
        <van-row class="db">
          <van-col span="12">
            租金单价(元/m²/月)
          </van-col>
          <van-col span="12">
            <customTags :data="{mainText:'167.00',subText:'93% / 148,264.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{fontSize:'12px',width:'100px',textAlign:'right'}" />
          </van-col>
        </van-row>
      </template>
      <template v-else>
        {{content}}
      </template>
    </div>
    <div class="operate-footer">
      <customTags :data="{mainText:'确定'}" :height="`24px`" :mianTextStyle="{fontSize:'14px',width:'160px'}" />
    </div>
  </van-popup>
</template>

<script>
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: ''
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  watch: {
    showPopup: {
      handler: function (newValue) {
        this.show = newValue
      },
      // immediate: true,
      // deep: true,
    },
  },
  data () {
    return {
      show: false,
      list: [1, 1, 1, 1, 1, 1, 1]
    }
  },
  methods: {
    close () {
      this.$emit('update:showPopup', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.center-popup {
  min-height: 240px;
  padding: 20px 20px;
  text-align: center;
  .operate-footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 20px;
  }
  .content {
    align-items: center;
    margin: 0 auto;
    padding: 20px 0 40px;
  }
  .year-rent {
    line-height: 40px;
    &:not(:last-child) {
      border-bottom: solid 1px #bfbfb7;
    }
  }
  .db {
    margin-bottom: 10px;
    .van-col {
      &:last-child {
        .custom-tags {
          justify-content: flex-end;
        }
      }
    }
  }
  .van-col {
    text-align: right;
    color: #575757;
    font-size: 14px;
    p {
      text-align: right;
      margin: 0;
      display: block;
      font-size: 12px;
      &:nth-child(2) {
        font-size: 10px;
      }
    }
    &:nth-child(1) {
      color: #000000;
    }
  }
}
</style>
