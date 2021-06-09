<template>
  <!-- 商业公司发起的商务条件  物管费 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'物管费',subText:'',secondText:'查看预算与标准'}" :height="`24px`" link :className="'dark-blue'" :mianTextStyle="{width:'80px',fontSize:'14px'}" />
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="item-left">空调使用情况</div>
          <div class="item-right">
            <span class="tag-box">
              <customTags :data="{mainText:'不含空调',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">物业费中是否含中央空调</div>
          <div class="item-right">
            <span class="tag-box">
              <customTags :data="{mainText:'否',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
            </span>
          </div>
        </div>
      </div>
      <div class="table-list-content">
        <div class="table-header">
          <div class="table-header-item">
            <div class="top top-switch">对比标准</div>
            <div class="bottom">
              <van-switch v-model="checked" size="20px" active-color="#465F48" />
            </div>
          </div>
          <div class="table-header-item">
            <div class="top">月租</div>
            <div class="bottom">(元/m²/月)</div>
          </div>

          <div class="table-header-item">
            <div class="top">年租</div>
            <div class="bottom">(元/m²/月)</div>
          </div>
        </div>
        <div class="table-content">
          <div class="table-content-list">
            <div class="table-content-item">第1年</div>
            <div class="table-content-item">
              <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
            <div class="table-content-item">
              <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
          </div>
          <div class="table-content-list">
            <div class="table-content-item">第2年</div>
            <div class="table-content-item">
              <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
            <div class="table-content-item">
              <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
          </div>
          <div class="table-content-list">
            <div class="table-content-item">第3年</div>
            <div class="table-content-item">
              <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
            <div class="table-content-item">
              <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
          </div>
          <template v-if="more">
            <div class="table-content-list">
              <div class="table-content-item">第4年</div>
              <div class="table-content-item">
                <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
              <div class="table-content-item">
                <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
            </div>
            <div class="table-content-list">
              <div class="table-content-item">第5年</div>
              <div class="table-content-item">
                <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
              <div class="table-content-item">
                <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
            </div>
            <div class="table-content-list">
              <div class="table-content-item">第6年</div>
              <div class="table-content-item">
                <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
              <div class="table-content-item">
                <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
            </div>
            <div class="table-content-list">
              <div class="table-content-item">第7年</div>
              <div class="table-content-item">
                <customTags :data="{mainText:'34.00',subText:'55.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
              <div class="table-content-item">
                <customTags :data="{mainText:'141,240.00',subText:'62% / 228,480.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </div>
            </div>
          </template>
        </div>
        <div class="table-footer">
          <div class="table-footer-left">
            <div class="handel-box" @click="moreHandleClick">
              <van-image :class="[more?'handel-icon handel-icon-more':'handel-icon']" :src="spread"></van-image>
              <span class="handel-text">查看全部(7年)</span>
            </div>
          </div>
          <div class="table-footer-right">
            <div class="total-text">合计</div>
            <div class="tag-box">
              <customTags :data="{mainText:'167,356.00',subText:'98%/1018,318.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'110px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </div>
          </div>
        </div>
      </div>

    </ysSection>
  </div>
</template>
<script>
import spread from "../../assets/images/spread.png";
export default {
  name: 'ysNWgfModule',
  components: {
  },
  data () {
    return {
      spread: spread,
      checked: true,
      more: false,
      dataList: []
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    moreHandleClick () {
      this.more = !this.more
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.module-content {
  font-family: PingFangSC-Regular, PingFang SC;
  .list-content {
    padding-bottom: 10px;
    border-bottom: 1px solid RGBA(217, 217, 209, 1);
    .list-item {
      display: flex;
      height: 30px;
      .item-left {
        display: flex;
        align-items: center;
        height: 100%;
        width: 168px;
        margin-right: 5px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
      }
      .item-right {
        height: 100%;
        width: calc(100% - 173px);
        display: flex;
        align-items: center;
        // border-bottom: 1px solid RGBA(217, 217, 209, 1);

        .main-text {
          display: inline-block;
          width: calc(100% - 52px);
          padding-left: 8px;
          font-size: 14px;
          font-weight: 400;
          color: #575757;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .main-text-range {
          width: 100%;
        }
        .sub-text {
          display: inline-block;
          width: 116px;
          height: 19px;
          line-height: 22px;
          padding-right: 5px;
          font-size: 10px;
          font-weight: 400;
          color: #575757;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &:last-child {
        .item-right {
          border: none;
        }
      }
    }
  }

  .table-list-content {
    width: 100%;
    margin-top: 14px;
    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .table-header-item {
        text-align: right;
        padding-right: 9px;
        &:nth-child(1) {
          flex: 0 0 57px;
        }
        &:nth-child(2) {
          flex: 0 0 68px;
        }
        &:last-child {
          flex: 0 0 187px;
        }
        .top {
          font-size: 12px;
          font-weight: 400;
          color: #000000;
        }
        .top-switch {
          font-size: 10px;
          font-weight: 400;
          color: #4f4f4f;
        }
        .bottom {
          font-size: 10px;
          font-weight: 400;
          color: #000000;
        }
      }
    }
    .table-content {
      margin-bottom: 9px;
      .table-content-list {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .table-content-item {
          font-size: 14px;
          font-weight: 400;
          color: #575757;
          text-align: right;
          &:nth-child(1) {
            flex: 0 0 48px;
            text-align: left;
            color: #000000;
          }
          &:nth-child(2) {
            flex: 0 0 59px;
            display: flex;
            justify-content: flex-end;
          }
          &:last-child {
            flex: 0 0 169px;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);
      .table-footer-left {
        .handel-box {
          width: 128px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          background: #7f7f81;
          border-radius: 13px;
          font-size: 12px;
          font-weight: 400;
          color: #ffffff;
          .handel-icon {
            width: 11px;
            height: 9px;
            margin-right: 10px;
            transform: rotate(180deg);
            transition: transform 250ms;
          }
          .handel-icon-more {
            transform: rotate(0deg);
            transition: transform 250ms;
          }
        }
      }
      .table-footer-right {
        width: calc(100% - 163px);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: 35px;
        padding: 12px 0;
        border-top: 1px solid RGBA(217, 217, 209, 1);
        .total-text {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
