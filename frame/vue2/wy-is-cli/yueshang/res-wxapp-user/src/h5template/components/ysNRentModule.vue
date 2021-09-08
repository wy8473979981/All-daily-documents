<template>
  <!-- 商业公司发起的商务条件  租金 模块 -->
  <div class="module-content">
    <ysSection :collapseable="true">
      <div slot="head-title">
        <customTags :data="{mainText:'租金',subText:'',secondText:'查看预算与标准'}" :height="`24px`" link :className="'dark-blue'" :mianTextStyle="{width:'80px',fontSize:'14px'}" @handleClick="showPopup = true;" />
      </div>
      <div class="list-content">
        <template v-if="billingType==0">
          <div class="list-item">
            <div class="item-left">计费类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'固定',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">支付周期</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'季付',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">付款模式</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'预付2月',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">最迟缴费日</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'每月25号',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">租金递增率</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
        </template>
        <template v-if="billingType==1">
          <div class="list-item">
            <div class="item-left">计费类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'固定',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">抽成类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'总额阶梯抽成',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">支付周期</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'季付',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">付款模式</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'预付2月',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">最迟缴费日</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'每月25号',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">销售额类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'含税',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">是否有品类扣</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'是',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">租金递增率</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
        </template>
        <template v-if="billingType==2">
          <div class="list-item">
            <div class="item-left">计费类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'固定',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">抽成类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'总额阶梯抽成',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">支付周期</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'季付',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">付款模式</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'预付2月',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">最迟缴费日</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'每月25号',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">销售额类型</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'含税',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">是否有品类扣</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'是',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
          <div class="list-item">
            <div class="item-left">租金递增率</div>
            <div class="item-right">
              <span class="tag-box main-text-range">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
              </span>
            </div>
          </div>
        </template>

        <div class="detail-content" v-if="billingType==1 || billingType==2">
          <span class="title">存在阶梯抽成、品类抽成</span>
          <span class="to-detail" @click="showDetail=true">查看详情<van-image class="to-detail-link" :src="arrowDown"></van-image></span>
        </div>

      </div>

      <div class="table-list-content" v-if="billingType==0">
        <div class="table-header">
          <van-col span="4" class="table-header-item">
            <div class="top top-switch">对比标准</div>
            <div class="bottom">
              <van-switch v-model="checked" size="20px" active-color="#465F48" />
            </div>
          </van-col>
          <van-col span="5" class="table-header-item">
            <div class="top">月租</div>
            <div class="bottom">(元/m²/月)</div>
          </van-col>
          <van-col span="10" class="table-header-item">
            <div class="top">年租</div>
            <div class="bottom">(元)</div>
          </van-col>
          <van-col span="5" class="table-header-item">
            <div class="top">免租期</div>
          </van-col>
        </div>

        <div class="table-content">
          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第1年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'180.00',subText:'170.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="10" class="table-content-item">
              <customTags :data="{mainText:'167,356.00',subText:'108%/148,264.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="5" class="table-content-item">
              30天
            </van-col>
          </div>

          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第2年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'200.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="10" class="table-content-item">
              <customTags :data="{mainText:'187,843.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="5" class="table-content-item">
              30天
            </van-col>
          </div>

          <div class="table-content-list">

            <van-col span="4" class="table-content-item">
              <div class="top">第3年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="10" class="table-content-item">
              <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="5" class="table-content-item">
              /
            </van-col>
          </div>
          <template v-if="more">
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第4年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="10" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="5" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第5年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="10" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="5" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第6年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="10" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="5" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第7年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="10" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="5" class="table-content-item">
                /
              </van-col>
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
      <div class="table-list-content" v-if="billingType==1">
        <div class="table-header">
          <van-col span="4" class="table-header-item">
            <div class="top top-switch">对比标准</div>
            <div class="bottom">
              <van-switch v-model="checked" size="20px" active-color="#465F48" />
            </div>
          </van-col>
          <van-col span="5" class="table-header-item">
            <div class="top">预估月租</div>
            <div class="bottom">(元/m²/月)</div>
          </van-col>
          <van-col span="4" class="table-header-item">
            <div class="top">扣率</div>
            <div class="bottom">(元)</div>
          </van-col>
          <van-col span="9" class="table-header-item">
            <div class="top">年租</div>
            <div class="bottom">(元)</div>
          </van-col>
          <van-col span="3" class="table-header-item">
            <div class="top">免租期</div>
          </van-col>
        </div>

        <div class="table-content">
          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第1年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'180.00',subText:'170.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'167,356.00',subText:'108%/148,264.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              30天
            </van-col>
          </div>

          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第2年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'200.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'187,843.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              30天
            </van-col>
          </div>
          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第3年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              /
            </van-col>
          </div>
          <template v-if="more">
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
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
      <div class="table-list-content" v-if="billingType==2">
        <div class="table-header">
          <van-col span="4" class="table-header-item">
            <div class="top top-switch">对比标准</div>
            <div class="bottom">
              <van-switch v-model="checked" size="20px" active-color="#465F48" />
            </div>
          </van-col>
          <van-col span="5" class="table-header-item">
            <div class="top">月租</div>
            <div class="bottom">(元/m²/月)</div>
          </van-col>
          <van-col span="4" class="table-header-item">
            <div class="top">扣率</div>
            <div class="bottom">(元)</div>
          </van-col>
          <van-col span="9" class="table-header-item">
            <div class="top">年租</div>
            <div class="bottom">(元)</div>
          </van-col>
          <van-col span="3" class="table-header-item">
            <div class="top">免租期</div>
          </van-col>
        </div>

        <div class="table-content">
          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第1年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'180.00',subText:'170.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'167,356.00',subText:'108%/148,264.00',secondText:''}" :type="'vertical'" :className="'blue'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              30天
            </van-col>
          </div>

          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第2年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'200.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'187,843.00',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              30天
            </van-col>
          </div>
          <div class="table-content-list">
            <van-col span="4" class="table-content-item">
              <div class="top">第3年</div>
            </van-col>
            <van-col span="5" class="table-content-item">
              <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="4" class="table-content-item">
              <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="9" class="table-content-item">
              <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
            </van-col>
            <van-col span="3" class="table-content-item">
              /
            </van-col>
          </div>
          <template v-if="more">
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
            </div>
            <div class="table-content-list">
              <van-col span="4" class="table-content-item">
                <div class="top">第3年</div>
              </van-col>
              <van-col span="5" class="table-content-item">
                <customTags :data="{mainText:'240.00',subText:'250.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="4" class="table-content-item">
                <customTags :data="{mainText:'8%',subText:'',secondText:''}" :type="'vertical'" :className="'none'" :mianTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="9" class="table-content-item">
                <customTags :data="{mainText:'202,761.00',subText:'98.00%/206,898.00',secondText:''}" :type="'vertical'" :className="'red'" :mianTextStyle="{width:'105px',textAlign:'right'}" :subTextStyle="{textAlign:'right'}" />
              </van-col>
              <van-col span="3" class="table-content-item">
                /
              </van-col>
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
    <centerPopup :type="'rent'" :showPopup.sync='showPopup' :title="'租金预算和标准'"></centerPopup>

    <van-popup v-model="showDetail" position="center" :close-on-click-overlay="false" class="detail-list">
      <customTags :data="{mainText:'抽成详情'}" :height="`24px`" :mianTextStyle="{fontSize:'14px'}" />
      <div class="content">
        <div class="content-header">
          <van-row>
            <van-col span="4">
              <p>租赁年度</p>
            </van-col>
            <van-col span="4">
              <p>品类</p>
            </van-col>
            <van-col span="7">
              <p>阶梯</p>
            </van-col>
            <van-col span="5">
              <p>申请折扣率(%)</p>
            </van-col>
            <van-col span="4">
              <p>预估月营业额(元)</p>
            </van-col>
          </van-row>
        </div>
        <div class="content-body">
          <van-row v-for="(item,index) in detailList" :key="index">
            <van-col span="4">
              <p>第{{item.key1}}年</p>
            </van-col>
            <van-col span="4">
              <p>{{item.key2}}</p>
            </van-col>
            <van-col span="7">
              <p>{{item.key3}}</p>
            </van-col>
            <van-col span="5">
              <p>{{item.key4}}</p>
            </van-col>
            <van-col span="4">
              <p>{{item.key5}}</p>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="operate-footer">
        <customTags :data="{mainText:'确定'}" :height="`24px`" :mianTextStyle="{fontSize:'14px',width:'160px'}" @mianHandleClick="detailFunc" />
      </div>
    </van-popup>

  </div>
</template>
<script>
import spread from "../../assets/images/spread.png";
import centerPopup from '../../pages/details/components/centerPopup' // 头部按钮组件

import arrowDown from "../../assets/images/more-arrow.png";
export default {
  name: 'ysNRentModule',
  components: {
    centerPopup
  },
  data () {
    return {
      arrowDown: arrowDown,
      spread: spread,
      checked: true,
      more: false,
      dataList: [],
      showPopup: false,
      billingType: 2,//计费类型 0:固定、 1：抽成、 2：两者去高
      showDetail: false,
      detailList: [
        {
          key1: 1,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 2,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 3,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 4,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 5,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 6,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
        {
          key1: 7,
          key2: '男装',
          key3: '0以上',
          key4: '8%',
          key5: '8000,000'
        },
      ]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    moreHandleClick () {
      this.more = !this.more
    },
    detailFunc () {
      this.showDetail = false
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

  .detail-content {
    height: 24px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #bfbfc2;
    border-radius: 13px;
    text-align: center;
    font-size: 14px;
    color: rgb(51, 51, 51);
    padding: 0 8px 0 5px;
    .to-detail {
      color: #0071c1;
    }
    .to-detail-link {
      width: 5px;
      height: 10px;
      margin-left: 5px;
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
        white-space: nowrap;
        &:nth-child(1) {
          text-align: left;
          padding: 0;
        }
        &:last-child {
          padding-right: 0;
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
          display: flex;
          justify-content: flex-end;
          &:nth-child(1) {
            justify-content: flex-start;
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
.detail-list {
  width: 315px;
  padding: 10px 20px;
  .content-header {
    text-align: center;
  }
}
</style>
