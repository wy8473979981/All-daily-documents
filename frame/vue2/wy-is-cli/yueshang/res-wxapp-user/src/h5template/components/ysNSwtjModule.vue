<template>
  <!-- 商业公司发起的商务条件  商务条件 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'商务条件',subText:'',secondText:'对比上一份合同单价'}"  :height="`24px`" link :mianTextStyle="{width:'80px',fontSize:'14px'}" @handleClick="handClick"/>
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="item-left">品牌</div>
          <div class="item-right">
            <span class="tag-box main-text-range">
              <customTags :data="{mainText:'MUJI无印良品',subText:'',secondText:'优衣库'}"  :className="'red'" :mianTextStyle="{width:'94px',justifyContent:'flex-start'}" />
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">业态</div>
          <div class="item-right">
            <span class="tag-box main-text-range">
              <customTags :data="{mainText:'零售配套',subText:'',secondText:'服装'}"  :className="'red'" :mianTextStyle="{width:'94px',justifyContent:'flex-start'}" />
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">计租面积(m²)</div>
          <div class="item-right">
            <span class="main-text main-text-range">80</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">租期(天)</div>
          <div class="item-right">
            <span class="main-text">2年0个月0天</span>
            <span class="sub-text">免租60天</span>
            <span class="tag-box">
              <customTags :data="{mainText:'有批注',subText:'',secondText:''}"  :className="'gray'" :mianTextStyle="{width:'52px',color:'#333333FF'}" @mianHandleClick="handPzClick"/>
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">交付日期</div>
          <div class="item-right">
            <span class="tag-box main-text-range">
              <customTags :data="{mainText:'2021-05-29',subText:'',secondText:'2021-04-01'}"  :className="'red'" :mianTextStyle="{width:'94px',justifyContent:'flex-start'}" />
            </span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">开业日期</div>
          <div class="item-right">
            <span class="main-text main-text-range">约定2021-05-29/最迟2021-05-29</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">租金起计日</div>
          <div class="item-right">
            <span class="main-text main-text-range">2021-05-29</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">产权属性</div>
          <div class="item-right">
            <span class="main-text main-text-range">销售/返租到期日 2024-05-31</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">签约类型</div>
          <div class="item-right">
            <span class="main-text main-text-range">续签</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">空置期(天)</div>
          <div class="item-right">
            <span class="main-text main-text-range">30</span>
          </div>
        </div>
        <div class="list-item">
          <div class="item-left">租押方式</div>
          <div class="item-right">
            <span class="main-text main-text-range">押2付3</span>
          </div>
        </div>
      </div>

    </ysSection>
	<centerPopup :showPopup.sync='showPopup' :content="content" :type="type" :title="title"></centerPopup>
  </div>
</template>
<script>
import centerPopup from '../../pages/details/components/centerPopup' // 头部按钮组件
export default {
  name: 'ysNSwtjModule',
  components: {
	  centerPopup
  },
  data () {
    return {
      dataList: [],
	  showPopup:false,
	  type:'',
	  content:'',
	  title:''
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
	  handClick() {
		  this.showPopup = true
		  this.type = 'db'
		  this.title = '对比上一份合同单价'
	  },
	  handPzClick() {
		this.showPopup = true
		this.type = ''
		this.title = '商务批注'
		this.content = '具体的批注内容，内容较多可滚动查看'  
	  }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.module-content {
  font-family: PingFangSC-Regular, PingFang SC;
  .list-content {
    border-bottom: 1px solid RGBA(217, 217, 209, 1);
  }
  .list-item {
    display: flex;
    height: 40px;
    .item-left {
      display: flex;
      align-items: center;
      height: 100%;
      width: 85px;
      margin-right: 5px;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
    .item-right {
      height: 100%;
      width: calc(100% - 90px);
      display: flex;
      align-items: center;
      border-bottom: 1px solid RGBA(217, 217, 209, 1);

      .main-text {
        display: inline-block;
        width: 98px;
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
</style>
