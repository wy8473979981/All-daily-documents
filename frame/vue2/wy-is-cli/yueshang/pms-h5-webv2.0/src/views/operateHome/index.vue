<template>
  <div class="home" v-webTitle :data-title="`营运数据(首页)`">
    <div class="header-top header-top-padding-top">
      <!-- <ys-n-nav-bar :title="`营运数据(首页)`" /> -->
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'yysj'" :selected="selected" @touchstart="touchPick" @projeSelected="projeSelected" :disabledAll="true">
            </ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @touchstart="touchPick" @close="closePick" @selected="dateSelected" :selected="params.yearMonth">
            </ys-n-date-pick>
          </div>
        </div>
      </div>
      <div class="tab-container">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :loading-text="' '">
      <div class="app-main">
        <!-- 整体情况 -->
        <ys-n-section title="整体情况">
          <div class="index-item-box">
            <div class="index-item-inner min" v-if="!params.projectId">
              <div class="item-inner-label">项目总数</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(merchants.openProjectNum , {precision: 0, unit: '', type: false}) }}</div>
                <div class="inner-data-unit" v-if="merchants.openProjectNum">个</div>
              </div>
            </div>
            <div class="index-item-inner min">
              <div class="item-inner-label">总计租面积</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(merchants.storeRentSquare )}}</div>
                <div class="inner-data-unit" v-if="merchants.storeRentSquare">万㎡</div>
              </div>
            </div>
            <div class="index-item-inner min">
              <div class="item-inner-label">计租铺位总数</div>
              <div class="item-inner-data">
                <div class="inner-data-num"> {{$util.numberFormat( merchants.storeNum , {precision: 0, unit: '', type: false}) }}</div>
                <div class="inner-data-unit" v-if="merchants.storeNum">个</div>
              </div>
            </div>
            <div class="index-item-inner min">
              <div class="item-inner-label">考核计租铺位</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(merchants.assessStoreNum , {precision: 0, unit: '', type: false}) }}</div>
                <div class="inner-data-unit" v-if="merchants.assessStoreNum">个</div>
              </div>
            </div>
          </div>
        </ys-n-section>

        <ys-n-section title="招商" type="1" url="/makeBusiness/index" skip="/makeBusiness/detail" @navigation="navigation">
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">当月考核出租率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{$util.absoluteValue( merchants.leaseRate, 2 ) }}</div>
                <div :class="'inner-data-comparison ' + (merchants.leaseRateHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(merchants.leaseRateHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="merchants.leaseRateHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="merchants.leaseRateHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(merchants.leaseRateHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月出租率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(merchants.leaseRateQc )}}</div>
                <div :class="'inner-data-comparison ' + (merchants.leaseRateQcHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(merchants.leaseRateQcHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="merchants.leaseRateQcHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="merchants.leaseRateQcHb < 0" />
                  </div>
                  <div class="comparison-number"> {{ $util.absoluteValue(merchants.leaseRateQcHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">全场出租率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( merchants.leaseRateQcAll ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月考核开业率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(merchants.openRate )}}</div>
                <div :class="'inner-data-comparison ' + (merchants.openRateHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(merchants.openRateHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="merchants.openRateHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="merchants.openRateHb < 0" />
                  </div>
                  <div class="comparison-number"> {{ $util.absoluteValue(merchants.openRateHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月开业率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.absoluteValue( merchants.openRateQc ) }}
                </div>
                <!-- <div class="inner-data-unit">元/㎡/月</div> -->
                <div :class="'inner-data-comparison ' + (merchants.openRateQcHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(merchants.openRateQcHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="merchants.openRateQcHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="merchants.openRateQcHb < 0" />
                  </div>
                  <div class="comparison-number"> {{ $util.absoluteValue(merchants.openRateQcHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">全场开业率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( merchants.openRateQcAll ) }}</div>
              </div>
            </div>
            <div class="index-item-inner-max">
              <div class="item-inner-label">平均租金(元/㎡/月)(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.numberFormat( merchants.averageRent , {precision: 0, unit: '', type: false}) }}
                </div>
                <!-- <div class="inner-data-unit">元/㎡/月</div> -->
                <div :class="'inner-data-comparison ' + (merchants.averageRentHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(merchants.averageRentHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="merchants.averageRentHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="merchants.averageRentHb < 0" />
                  </div>
                  <div class="comparison-number"> {{ $util.absoluteValue(merchants.averageRentHb) }}</div>
                </div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="租金收入" type="1" url="/shouru/zujin" skip="/shouru/shouruxq" @navigation="navigation">
          <span class="title-unit" slot="head-title">(万元)</span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">当月(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(rentalIncome.fixedQzFactMoney)}}</div>
                <div :class="'inner-data-comparison ' + (rentalIncome.fixedQzFactHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(rentalIncome.fixedQzFactHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.fixedQzFactHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.fixedQzFactHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(rentalIncome.fixedQzFactHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月收缴率(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( rentalIncome.fixedQzCollectionRate ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年累计(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( rentalIncome.fixedQzFactMoneyYtd ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">累计收缴率(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( rentalIncome.fixedQzCollectionRateYtd ) }}</div>
                <div :class="'inner-data-comparison ' + (rentalIncome.fixedQzCollectionRateHbYtd >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(rentalIncome.fixedQzCollectionRateHbYtd)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.fixedQzCollectionRateHbYtd >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.fixedQzCollectionRateHbYtd < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(rentalIncome.fixedQzCollectionRateHbYtd)  }}</div>
                </div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">年预算完成率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.absoluteValue( rentalIncome.fixedQzCompletionRateYtd ) }}
                </div>
              </div>
            </div> -->
            <div class="index-item-inner">
              <div class="item-inner-label">月收缴率(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.absoluteValue(rentalIncome.fixedContCollectionRate) }}
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">月累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(  rentalIncome.fixedContCollectionRateYtd ) }}</div>
                <div :class="'inner-data-comparison ' + (rentalIncome.contCollectionRateHbYtd >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(rentalIncome.contCollectionRateHbYtd)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.contCollectionRateHbYtd >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="rentalIncome.contCollectionRateHbYtd < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(rentalIncome.contCollectionRateHbYtd)  }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">年累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num"> {{ $util.absoluteValue( rentalIncome.fixedContCollectionRateYtdAll ) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="物管收入" type="2" url="/shouru/zujin" skip="/shouru/shouruxq" @navigation="navigation">
          <span class="title-unit" slot="head-title">(万元)</span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">当月(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( propertyIncome.fixedQzFactMoney ) }}
                </div>
                <div :class="'inner-data-comparison ' + (propertyIncome.fixedQzFactHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(propertyIncome.fixedQzFactHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.fixedQzFactHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.fixedQzFactHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(propertyIncome.fixedQzFactHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月收缴率(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( propertyIncome.fixedQzCollectionRate ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年累计(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( propertyIncome.fixedQzFactMoneyYtd ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">累计收缴率(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( propertyIncome.fixedQzCollectionRateYtd ) }}</div>
                <div :class="'inner-data-comparison ' + (propertyIncome.fixedQzCollectionRateHbYtd >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(propertyIncome.fixedQzCollectionRateHbYtd)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.fixedQzCollectionRateHbYtd >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.fixedQzCollectionRateHbYtd < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(propertyIncome.fixedQzCollectionRateHbYtd) }}</div>
                </div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">年预算完成率</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.absoluteValue( propertyIncome.fixedQzCompletionRateYtd ) }}
                </div>
              </div>
            </div> -->
            <div class="index-item-inner">
              <div class="item-inner-label">月收缴率(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.absoluteValue(propertyIncome.fixedContCollectionRate) }}
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">月累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( propertyIncome.fixedContCollectionRateYtd ) }}</div>
                <div :class="'inner-data-comparison ' + (propertyIncome.contCollectionRateHbYtd >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(propertyIncome.contCollectionRateHbYtd)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.contCollectionRateHbYtd >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="propertyIncome.contCollectionRateHbYtd < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(propertyIncome.contCollectionRateHbYtd) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">年累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( propertyIncome.fixedContCollectionRateYtdAll ) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="多经收入" type="3" url="/shouru/zujin" skip="/shouru/shouruxq" @navigation="navigation">
          <span class="title-unit" slot="head-title">(万元)</span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">月收缴率(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(moreIncome.fixedContCollectionRate) }}</div>
                <div :class="'inner-data-comparison ' + (moreIncome.contFactHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(moreIncome.contCollectionRateHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="moreIncome.contCollectionRateHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="moreIncome.contCollectionRateHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(moreIncome.contCollectionRateHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年累计(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( moreIncome.fixedFactMoneyYtd ) }}</div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
            <div class="item-inner-label">实时收缴率(合同)</div>
            <div class="item-inner-data">
              <div class="inner-data-num">{{ $util.absoluteValue( moreIncome.currContCollectionRate ) }}
              </div>
            </div>
          </div> -->
            <div class="index-item-inner">
              <div class="item-inner-label">月累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( moreIncome.fixedContCollectionRateYtd ) }}</div>
                <div :class="'inner-data-comparison ' + (moreIncome.contCollectionRateHbYtd >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(moreIncome.contCollectionRateHbYtd)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="moreIncome.contCollectionRateHbYtd >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="moreIncome.contCollectionRateHbYtd < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(moreIncome.contCollectionRateHbYtd) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">年累计收缴进度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( moreIncome.fixedContCollectionRateYtdAll ) }}</div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">累计预算完成进度</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{$util.absoluteValue( moreIncome.fixedQzCompletionRateYtd ) }}
                </div>
              </div>
            </div> -->
          </div>
        </ys-n-section>
        <ys-n-section title="客流" type="1" url="/keliu/paiming" skip="/keliu/month" @navigation="navigation">
          <span class="title-unit" slot="head-title">(万人)</span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">昨日</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(   passengerFlowData.yesterdayPassengerFlow ) }}</div>
                <div class="inner-data-comparison comparison-up">
                  <div class="comparison-dire">
                    <div :class="'inner-data-comparison ' + (passengerFlowData.dayGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(passengerFlowData.dayGrowth)">
                      <div class="comparison-dire">
                        <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="passengerFlowData.dayGrowth >= 0" />
                        <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="passengerFlowData.dayGrowth < 0" />
                      </div>
                      <div class="comparison-number">{{ $util.absoluteValue(passengerFlowData.dayGrowth) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当日</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  passengerFlowData.todayPassengerFlow ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  passengerFlowData.curMonthPassengerFlow ) }}</div>
                <div :class="'inner-data-comparison ' + (passengerFlowData.monthGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(passengerFlowData.monthGrowth)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="passengerFlowData.monthGrowth >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="passengerFlowData.monthGrowth < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(passengerFlowData.monthGrowth) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  passengerFlowData.curYearPassengerFlow ) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="销售" type="1" url="/xiaoshou/paiming" skip="/xiaoshou/month" @navigation="navigation">
          <span class="title-unit" slot="head-title"></span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">昨日(万元)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( saleFlowData.yesterdaySales ) }}</div>
                <div :class="'inner-data-comparison ' + (saleFlowData.yesterdaySalesGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(saleFlowData.yesterdaySalesGrowth)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="saleFlowData.yesterdaySalesGrowth >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="saleFlowData.yesterdaySalesGrowth < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(saleFlowData.yesterdaySalesGrowth) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月(万元)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( saleFlowData.monthSales ) }}</div>
                <div :class="'inner-data-comparison ' + (saleFlowData.monthSalesGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(saleFlowData.monthSalesGrowth)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="saleFlowData.monthSalesGrowth >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="saleFlowData.monthSalesGrowth < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(saleFlowData.monthSalesGrowth) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年(万元)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( saleFlowData.yearSales ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">月销售平效(元)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( saleFlowData.benefitsPerSquareMeter, { precision: 2, unit: '', type: false} ) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="车流" type="1" url="/cheliu/paiming" skip="#" @navigation="navigation">
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">昨日</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.numberFormat(  carFlowData.yesterdayCarFlow , {precision: 0, unit: '', type: false} ) }}
                </div>
                <div :class="'inner-data-comparison ' + (carFlowData.dayGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(carFlowData.dayGrowth)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="carFlowData.dayGrowth >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="carFlowData.dayGrowth < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(carFlowData.dayGrowth) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.numberFormat(  carFlowData.curMonthCarFlow ,{ precision: 0, unit: '', type: false})}}
                </div>
                <div :class="'inner-data-comparison ' + (carFlowData.monthGrowth >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(carFlowData.monthGrowth)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="carFlowData.monthGrowth >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="carFlowData.monthGrowth < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(carFlowData.monthGrowth) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  carFlowData.curYearCarFlow , { precision: 0, unit: '', type: false}) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="欠费" type="1" url="/qianfei/list" skip="/qianfei/detail" @navigation="navigation">
          <span class="title-unit" slot="head-title">(万元)</span>
          <div class="index-item-box">
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">实时欠费(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( oweFeeData.nowOweFeeCont ) }}</div>
              </div>
            </div> -->
            <div class="index-item-inner">
              <div class="item-inner-label">年累计上月(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  oweFeeData.lastMonthOweFeeCont) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月清欠率(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num"> {{ $util.absoluteValue( oweFeeData.curMonthOweFeeContClearRate ) }}</div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">以前年度(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( oweFeeData.historyOweFeeCont ) }}</div>
              </div>
            </div> -->
            <div class="index-item-inner">
              <div class="item-inner-label">年累计当月(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat(  oweFeeData.yearOweFeeCont ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">年累计上月(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( oweFeeData.lastMonthOweFeeQz ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月清欠率(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num"> {{ $util.absoluteValue( oweFeeData.curMonthOweFeeQzClearRate ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">以前年度(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( oweFeeData.historyOweFeeQz ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">年累计当月(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.numberFormat( oweFeeData.yearOweFeeQz ) }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="会员" type="1" url="/huiyuan/index" skip="/huiyuan/index" @navigation="navigation">
        <!-- <ys-n-section title="会员" type="1" url="/huiyuan/detail" skip="/huiyuan/detail" @navigation="navigation" v-if="params.projectId"> -->
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">昨日新增</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ memberDetail.yesterdayNewMemberNum || "-" }}</div>
                <div :class="'inner-data-comparison ' + (memberDetail.yesterdayNewMemberNumHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(memberDetail.yesterdayNewMemberNumHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="memberDetail.yesterdayNewMemberNumHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="memberDetail.yesterdayNewMemberNumHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(memberDetail.yesterdayNewMemberNumHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当月新增</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ memberDetail.curMonthNewMemberNum || "-" }}</div>
                <div :class="'inner-data-comparison ' + (memberDetail.curMonthNewMemberNumHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="$util.isEmpty(memberDetail.curMonthNewMemberNumHb)">
                  <div class="comparison-dire">
                    <img class="tb-icon" src="../../assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="memberDetail.curMonthNewMemberNumHb >= 0" />
                    <img class="tb-icon" src="../../assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="memberDetail.curMonthNewMemberNumHb < 0" />
                  </div>
                  <div class="comparison-number">{{ $util.absoluteValue(memberDetail.curMonthNewMemberNumHb) }}</div>
                </div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">当年新增</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ memberDetail.curYearNewMemberNum || "-" }}</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="租约到期" url="/rent/index" skip="/rent/detail" @navigation="navigation" type="1" bgc="rgba(255, 227, 153, 0.25)" borderColor="#FE1010">
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">三个月到期租户数</div>
              <div class="item-inner-data">
                <div class="inner-data-num">
                  {{ $util.numberFormat( leaseExpires.contNum , { precision: 0, unit: '', type: false}) }}
                </div>
                <div class="inner-data-unit" v-if="leaseExpires.contNum">个</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">三个月到期总面积</div>
              <div class="item-inner-data">
                <div class="inner-data-num comparison-down">
                  {{ $util.numberFormat( leaseExpires.rentSquare , { precision: 2, unit: '', type: false}) }}
                </div>
                <div class="inner-data-unit" v-if="leaseExpires.rentSquare">㎡</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">三月到期面积占比</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue( leaseExpires.rentSquareRate ) }}</div>
                <div class="inner-data-unit" v-if="leaseExpires.key">㎡</div>
              </div>
            </div>
          </div>
        </ys-n-section>
        <ys-n-section title="押不抵租" url="/cashForRent/index" skip="/cashForRent/detail" @navigation="navigation" type="wg" bgc="rgba(255, 227, 153, 0.25)" borderColor="#FE1010">
          <span class="title-unit title-sub">押不抵租=(租金履约保证金金额+综合管理履约保证金)-租金欠费-物管欠费</span>
          <div class="index-item-box">
            <div class="index-item-inner">
              <div class="item-inner-label">商户数占比(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(  coverRentContract.qzShopRate ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">累计差额(权责)</div>
              <div class="item-inner-data">
                <div class="inner-data-num comparison-down">{{ $util.numberFormat(  coverRentContract.qzBlanceSubOwe ) }}</div>
                <div class="inner-data-unit" v-if="coverRentContract.qzBlanceSubOwe">万元</div>
              </div>
            </div>
            <!-- <div class="index-item-inner">
              <div class="item-inner-label">商户数占比(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num">{{ $util.absoluteValue(  coverRentContract.shopRate ) }}</div>
              </div>
            </div>
            <div class="index-item-inner">
              <div class="item-inner-label">累计差额(合同)</div>
              <div class="item-inner-data">
                <div class="inner-data-num comparison-down"> {{ $util.numberFormat( coverRentContract.blanceSubOwe ) }}</div>
                <div class="inner-data-unit" v-if="coverRentContract.blanceSubOwe">万元</div>
              </div>
            </div> -->
          </div>
        </ys-n-section>
      </div>
    </van-pull-refresh>

    <!-- <to-top class="go-top" /> -->
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Home",
  data () {
    return {
      isLoading: false,
      isLoadingCount: 0,
      routerParams: this.$route.query,
      showModal: false,
      currentTab: '', //tab选中项
      params: {
        chargeType: '',
        projectId: null,
        projectName: null,
        yearMonth: "",
      },
      tabList: [
        { code: "1", name: "购物中心", },
        { code: "2", name: "商业街", },
        { code: "", name: "全部", }
      ],
      dataDetail: {},
      passengerFlow: {},
      selected: {
        projectId: "",
        label: "",
      },
      hasPower: null,
      rentalIncome: { //租金收入汇总数据
        fixedQzFactMoney: null, //当月(权责)
        fixedQzFactHb: null, //当月环比
        fixedQzCollectionRate: null, //当月收缴率(权责)
        fixedQzFactMoneyYtd: null, //当年累计(权责)
        fixedQzCollectionRateYtd: null, //累计收缴率(权责)
        fixedQzCollectionRateHbYtd: null, //累计收缴率(权责)环比
        fixedQzCompletionRateYtd: null, //年预算完成率
        currContCollectionRate: null, //实时收缴率(合同)
        fixedContCollectionRate: null, //月收缴率（合同）
        fixedContCollectionRateYtd: null, //月累计收缴进度(合同)
        fixedContCollectionRateYtdAll: null, //年累计收缴进度(合同)
        contCollectionRateHbYtd: null, //累计收缴率(合同)环比
      },
      propertyIncome: { //物管收入汇总数据
        fixedQzFactMoney: null, //当月(权责)
        fixedQzFactHb: null, //当月环比
        fixedQzCollectionRate: null, //当月收缴率(权责)
        fixedQzFactMoneyYtd: null, //当年累计(权责)
        fixedQzCollectionRateYtd: null, //累计收缴率(权责)
        fixedQzCollectionRateHbYtd: null, //累计收缴率(权责)环比
        fixedQzCompletionRateYtd: null, //年预算完成率
        currContCollectionRate: null, //实时收缴率(合同)
        fixedContCollectionRate: null, //月收缴率（合同）
        fixedContCollectionRateYtd: null, //月累计收缴进度(合同)
        fixedContCollectionRateYtdAll: null, //年累计收缴进度(合同)
        contCollectionRateHbYtd: null, //累计收缴率(合同)环比
      },
      moreIncome: { //多经收入汇总数据
        fixedContCollectionRate: null, //月收缴率（合同）
        contCollectionRateHb: null, //	当月环比
        fixedFactMoneyYtd: null, //	当年累计（合同）
        currContCollectionRate: null, //	实时收缴率（合同）
        fixedContCollectionRateYtd: null, //月累计收缴进度（合同）
        fixedContCollectionRateYtdAll: null, //	年累计收缴进度（合同）
        contCollectionRateHbYtd: null, //	累计收缴率（合同）环比
        fixedQzCompletionRateYtd: null, //	累计预算完成进度
      },
      passengerFlowData: { // 客流汇总数据
        yesterdayPassengerFlow: null, //	昨日
        dayGrowth: null, //昨日环比
        todayPassengerFlow: null, //	当日
        curMonthPassengerFlow: null, //	当月
        monthGrowth: null, //当月环比
        curYearPassengerFlow: null, //当年
      },
      saleFlowData: { // 销售汇总数据
        yesterdaySales: null, //	昨日
        yesterdaySalesGrowth: null, //	昨日销售环比
        monthSales: null, //	当月
        monthSalesGrowth: null, //当月销售环比
        yearSales: null, //	当年
        benefitsPerSquareMeter: null, //月销售平效
      },
      merchants: { // 招商汇总数据


        openProjectNum: null, //项目总数
        storeRentSquare: null, //总计租面积
        storeNum: null, //计租铺位总数
        assessStoreNum: null, //考核计租铺位

        leaseRate: null,//当月考核出租率
        leaseRateHb: null,//当月考核出租率环比
        leaseRateQc: null,//当月出租率
        leaseRateQcHb: null,//当月出租率环比
        leaseRateQcAll: null,//全场出租率
        openRate: null,//当月考核开业率
        openRateHb: null,//当月考核开业率环比
        openRateQc: null,//当月开业率
        openRateQcHb: null,//当月开业率环比
        openRateQcAll: null,//全场开业率
        averageRent: null,//平均租金（元/㎡/月）（权责）
        averageRentHb: null,//平均租金（元/㎡/月）（权责）环比

      },
      carFlowData: { // 车流汇总数据
        yesterdayCarFlow: null, //	昨日
        dayGrowth: null, //昨日车流环比
        curMonthCarFlow: null, //当月
        monthGrowth: null, //	当月车流环比
        curYearCarFlow: null, //当年
      },
      oweFeeData: { //欠费汇总数据
        nowOweFeeCont: null, // 实时欠费（合同）
        lastMonthOweFeeCont: null, //	当月欠费（合同）
        curMonthOweFeeContClearRate: null, //	当月清欠率（合同）
        historyOweFeeCont: null, //	历史欠费（合同）
        yearOweFeeCont: null, //	年累计欠费（合同）
        lastMonthOweFeeQz: null, //当月欠费（权责）
        curMonthOweFeeQzClearRate: null, //	当月清欠率（权责）
        historyOweFeeQz: null, //	历史欠费（权责）
        yearOweFeeQz: null, //	年累计欠费（权责）
      },
      leaseExpires: { //租约到期汇总数据
        contNum: null, //三个月到期租户数
        rentSquare: null, //	三个月到期总面积
        rentSquareRate: null, //	三月到期面积占比
      },
      coverRentContract: { //押不抵租
        shopRate: null, //商户数占比（合同）
        blanceSubOwe: null, //累计差额（合同）
        qzShopRate: null, //商户数占比（权责）
        qzBlanceSubOwe: null, //累计差额（权责）
      },
      memberDetail: {
        curMonthNewMemberNum: null, //当月新增会员数
        curMonthNewMemberNumHb: null, //当月新增会员数环比
        curYearNewMemberNum: null, //当年新增会员数
        monthAcctCompletRate: null, //本月达成率
        totalMemberNum: null, //当前会员数
        yearAcctCompletRate: null, //本年达成率
        yesterdayNewMemberNum: null, //昨日新增会员数
        yesterdayNewMemberNumHb: null, //昨日新增会员数环比
      }, //会员
    };
  },
  watch: {
    '$store.state.hasToken' () {
      this.getProjectList()
    }
  },
  computed: {
    ...mapGetters(['getGroups', 'getHasAuth', 'getDictAssemble']),
  },
  created () {
    try {
      this.setProjectIdBol(null)
      this.tabList = this.getDictAssemble ? this.getDictAssemble.chargeTypeDict : this.tabList //物业类型
      this.params.yearMonth = this.$util.getDefaultDate("month");
      const { uiid, token } = this.routerParams
      if (token && uiid) {
        // 移动端 软件中 在运营数据首页的 url 上是有 登录信息的
        this.setCookie("uiid", uiid)
        this.setCookie("token", token)
        this.getProjectList()
      } else {
        // 本地是否 有 token  uiid
        if (!this.getCookie('token') && !this.getCookie('uiid')) {
          this.getToken()
        } else {
          this.getProjectList()
        }
      }
      if (!this.getGroups) {
        this.getGroupsFunc() //获取筛选内容
      }
    } catch (e) {
      console.log(e)
    }
  },
  mounted () {

  },
  methods: {
    ...mapMutations([
      'setProjectInfo',
      'setDictAssemble',
      'setGroups',
      'setProjectIdBol',
      'setHasAuth',
      'setWatermarkText',
    ]),
    async getToken () {
      try {
        if (this.$isWxwork) {
          return
        }
        let params = {
          "uiid": "wangjt2",
          "sing": "aa488217894e38730728946b34a7d3a6",
          "device": "",
          "product": "pdm",
          "command": "eMail"
        }
        await this.$axios.externalLinkServe.getToken({ data: params }, false).then(res => {
          this.setCookie("uiid", res.userId)
          this.setCookie("token", res.token)
          this.getProjectList()
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectList () {
      try {
        let uiid = this.getCookie('uiid')
        let token = this.getCookie('token')
        let params = { uiid: uiid, token: token, source: 'yysj' }
        await this.$axios.externalLinkServe.getProjectList(params, true).then(res => {
          if (res.code == 0) {
            this.setHasAuth(true)
            let { projectList, grade } = res.data.projectInfo
            if (grade && grade == 2) {
              // grade=0，有全部，grade=2 没有全部
              if (projectList && projectList.length > 0) {
                let firstItem = projectList[0];
                // grade=2 默认使用第一个 项目
                this.setData({
                  ["params.projectId"]: firstItem.bisProjectId,
                  ["params.projectName"]: firstItem.shortName,
                  ["selected.projectId"]: firstItem.bisProjectId,
                  ["selected.label"]: firstItem.shortName,
                });

              }
            } else {
              this.setData({
                ["params.projectId"]: "",
                ["params.projectName"]: "",
                ["selected.projectId"]: "",
                ["selected.label"]: "全部",
              });
            }
            let userName = ''
            let mobilePhone = ''
            if (res.data && res.data.userInfo && res.data.userInfo.acct) {
              userName = res.data.userInfo.acct.userName
              mobilePhone = res.data.mobilePhone ? res.data.mobilePhone.substr(7) : ''
            }
            let watermarkText = userName + mobilePhone
            this.setWatermarkText(watermarkText)
            this.setProjectInfo(res.data.projectInfo);
            this.initData() // 汇总数据
          }else{
            this.setHasAuth(false)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getGroupsFunc () {
      try {
        await this.$axios.commonServe.getGroups({}, false).then(res => {
          let groups = res.data
          groups.label = groups.detail
          groups.children.map(item => {
            item.label = item.detail
            item.value = 'chargeType-' + item.code
          })

          groups.items = groups.children
          this.setGroups(groups)
        });
      } catch (e) {
        console.log(e)
      }
    },
    projeSelected (item) {
      try {
        if (!this.getHasAuth) {
          return
        }
        this.setData({
          ["params.projectId"]: (item && item.projectId) || "",
          ["params.projectName"]: (item && item.shortName) || "",
        });
        this.$util.showTabStatus('true', 'true')
        this.initData()
      } catch (e) {
        console.log(e)
      }
    },
    touchPick () {
      try {
        this.$util.showTabStatus('false', 'false')
      } catch (e) {
        console.log(e)
      }
    },
    closePick () {
      try {
        this.$util.showTabStatus('true', 'true')
      } catch (e) {
        console.log(e)
      }
    },
    dateSelected (date) {
      try {
        if (!this.getHasAuth) {
          return
        }
        this.$util.showTabStatus('true', 'true')
        this.setData({
          ["params.yearMonth"]: date,
        });
        this.initData('date')
      } catch (e) {
        console.log(e)
      }
    },
    onRefresh () {
      if (!this.getHasAuth) {
        this.isLoading = false;
        return
      }
      this.initData()
      setTimeout(() => {
        this.isLoading = false
      }, 0)
    },
    addIsLoadingCount () {
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount () {
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    setIsLoading () {
      this.isLoading = false;
    },
    initData (type) {
      if (!this.getHasAuth) {
        return
      }
      // if (!type || type != 'date') {
      //   this.isLoading = true;
      //   setTimeout(() => {
      //     this.isLoading = false
      //   }, 0)
      // }
      this.queryZsTotal(); //整体情况 招商 首页 汇总数据
      this.queryRentFeeTotal(1); //查询 租金收入 汇总数据
      this.queryRentFeeTotal(2, false); //查询 物管收入 汇总数据
      this.queryRentFeeTotal(3, false); //查询 多经收入 汇总数据
      this.queryPassengerFlowData(false); //查询客流模块汇总数据
      this.querySaleFlowData(false); //查询销售模块汇总数据
      this.queryCarFlowData(false); //查询车流模块汇总数据
      this.queryOweFeeData(false); //查询欠费模块汇总数据
      this.queryLeaseExpires(false); //租约到期 汇总数据
      this.queryCoverRent(1, false); //押不抵租 合同 / 权责 汇总数据
      // if (this.params && this.params.projectId) {
      //   this.getYunYingGeneralMemberInfo(false); // 获取会员信息
      // }
      this.getYunYingGeneralMemberInfo(false); // 获取会员信息
    },
    search (item) {
      console.log(item);
    },
    comparisonSelect (ids) {
      console.log(ids);
    },
    tabClickFunc (data) {
      if (!this.getHasAuth) {
        return
      }
      this.params.chargeType = data;
      this.currentTab = data;
      this.initData()
    },
    async queryRentFeeTotal (feeType, showLoading = true) {
      try {
        // // 根据年月、物业类型、费项(1租金,2物管,3多经,默认1),查询 租金收入、物管收入、 多经收入 汇总数据
        let req = { ...this.params, feeType: feeType, };
        this.addIsLoadingCount()
        await this.$axios.homeServe.queryRentFeeTotal(req, showLoading).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let {
              data
            } = res;
            if (feeType == 1) {
              let rentalIncome = { //租金收入汇总数据
                fixedQzFactMoney: data.fixedQzFactMoney, //当月(权责)
                fixedQzFactHb: data.fixedQzFactHb, //当月环比
                fixedQzCollectionRate: data.fixedQzCollectionRate, //当月收缴率(权责)
                fixedQzFactMoneyYtd: data.fixedQzFactMoneyYtd, //当年累计(权责)
                fixedQzCollectionRateYtd: data.fixedQzCollectionRateYtd, //累计收缴率(权责)
                fixedQzCollectionRateHbYtd: data.fixedQzCollectionRateHbYtd, //累计收缴率(权责)环比
                fixedQzCompletionRateYtd: data.fixedQzCompletionRateYtd, //年预算完成率
                currContCollectionRate: data.currContCollectionRate, //实时收缴率(合同)
                fixedContCollectionRate: data.fixedContCollectionRate, //月收缴率（合同）
                fixedContCollectionRateYtd: data.fixedContCollectionRateYtd, //月累计收缴进度(合同)
                fixedContCollectionRateYtdAll: data.fixedContCollectionRateYtdAll, //年累计收缴进度(合同)
                contCollectionRateHbYtd: data.contCollectionRateHbYtd, //累计收缴率(合同)环比
              }
              this.setData({
                rentalIncome: rentalIncome
              })
            } else if (feeType == 2) {
              let propertyIncome = { //物管收入汇总数据
                fixedQzFactMoney: data.fixedQzFactMoney, //当月(权责)
                fixedQzFactHb: data.fixedQzFactHb, //当月环比
                fixedQzCollectionRate: data.fixedQzCollectionRate, //当月收缴率(权责)
                fixedQzFactMoneyYtd: data.fixedQzFactMoneyYtd, //当年累计(权责)
                fixedQzCollectionRateYtd: data.fixedQzCollectionRateYtd, //累计收缴率(权责)
                fixedQzCollectionRateHbYtd: data.fixedQzCollectionRateHbYtd, //累计收缴率(权责)环比
                fixedQzCompletionRateYtd: data.fixedQzCompletionRateYtd, //年预算完成率
                currContCollectionRate: data.currContCollectionRate, //实时收缴率(合同)
                fixedContCollectionRate: data.fixedContCollectionRate, //月收缴率（合同）
                fixedContCollectionRateYtd: data.fixedContCollectionRateYtd, //月累计收缴进度(合同)
                fixedContCollectionRateYtdAll: data.fixedContCollectionRateYtdAll, //年累计收缴进度(合同)
                contCollectionRateHbYtd: data.contCollectionRateHbYtd, //累计收缴率(合同)环比
              }
              this.setData({
                propertyIncome: propertyIncome
              })
            } else if (feeType == 3) {
              let moreIncome = { //多经收入汇总数据
                fixedContCollectionRate: data.fixedContCollectionRate, //当月（合同）
                contCollectionRateHb: data.contCollectionRateHb, //	当月环比
                fixedFactMoneyYtd: data.fixedFactMoneyYtd, //	当年累计（合同）
                currContCollectionRate: data.currContCollectionRate, //	实时收缴率（合同）
                fixedContCollectionRateYtd: data.fixedContCollectionRateYtd, //月累计收缴进度（合同）
                fixedContCollectionRateYtdAll: data.fixedContCollectionRateYtdAll, //	年累计收缴进度（合同）
                contCollectionRateHbYtd: data.contCollectionRateHbYtd, //	累计收缴率（合同）环比
                fixedQzCompletionRateYtd: data.fixedQzCompletionRateYtd, //	累计预算完成进度
              }
              this.setData({
                moreIncome: moreIncome
              })
            }
          }
        });
      } catch (e) {
        console.log(e)
      }
    },
    async queryPassengerFlowData (showLoading = true) {
      try {
        // 查询客流模块汇总数据
        // this.addIsLoadingCount()
        await this.$axios.homeServe.queryPassengerFlowData(this.params, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let {
              data
            } = res;
            let passengerFlowData = {
              yesterdayPassengerFlow: data.yesterdayPassengerFlow, //	昨日客流量
              dayGrowth: data.dayGrowth, //昨日客流量环比增长率
              todayPassengerFlow: data.todayPassengerFlow, //	当日客流量
              curMonthPassengerFlow: data.curMonthPassengerFlow, //	当月客流量
              monthGrowth: data.monthGrowth, //当月客流量环比增长率
              curYearPassengerFlow: data.curYearPassengerFlow, //当年客流量
            }
            this.setData({
              passengerFlowData: passengerFlowData
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async querySaleFlowData (showLoading = true) {
      try {
        // 查询销售模块汇总数据
        // this.addIsLoadingCount()
        await this.$axios.homeServe.querySaleFlowData(this.params, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let saleFlowData = {
              yesterdaySales: data.yesterdaySales, //	昨日销售额
              yesterdaySalesGrowth: data.yesterdaySalesGrowth, //	昨日销售额同比增长率
              monthSales: data.monthSales, //	当月销售额
              monthSalesGrowth: data.monthSalesGrowth, //当月同比增长率
              yearSales: data.yearSales, //	当年销售额
              benefitsPerSquareMeter: data.benefitsPerSquareMeter, //月销售平效
            }
            this.setData({
              saleFlowData: saleFlowData
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async queryCarFlowData (showLoading = true) {
      try {
        // 查询车流模块汇总数据
        // this.addIsLoadingCount()
        await this.$axios.homeServe.queryCarFlowData(this.params, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let carFlowData = {
              yesterdayCarFlow: data.yesterdayCarFlow, //	昨日车流量
              dayGrowth: data.dayGrowth, //昨日车流量环比增长率
              curMonthCarFlow: data.curMonthCarFlow, //当月车流量
              monthGrowth: data.monthGrowth, //	当月车流量环比增长率
              curYearCarFlow: data.curYearCarFlow, //当年车流量
            }
            this.setData({
              carFlowData: carFlowData
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async queryZsTotal (showLoading = true) {
      try {
        // 招商 首页 汇总数据
        this.addIsLoadingCount()
        await this.$axios.homeServe.queryZsTotal(this.params, showLoading).then(res => {
          this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let merchants = {

              leaseRate: data.leaseRate,//当月考核出租率
              leaseRateHb: data.leaseRateHb,//当月考核出租率环比
              leaseRateQc: data.leaseRateQc,//当月出租率
              leaseRateQcHb: data.leaseRateQcHb,//当月出租率环比
              leaseRateQcAll: data.leaseRateQcAll,//全场出租率
              openRate: data.openRate,//当月考核开业率
              openRateHb: data.openRateHb,//当月考核开业率环比
              openRateQc: data.openRateQc,//当月开业率
              openRateQcHb: data.openRateQcHb,//当月开业率环比
              openRateQcAll: data.openRateQcAll,//全场开业率
              averageRent: data.averageRent,//平均租金（元/㎡/月）（权责）
              averageRentHb: data.averageRentHb,//平均租金（元/㎡/月）（权责）环比

              openProjectNum: data.openProjectNum, //项目总数
              storeRentSquare: data.storeRentSquare, //总计租面积
              storeNum: data.storeNum, //计租铺位总数
              assessStoreNum: data.assessStoreNum, //考核计租铺位
            }
            this.setData({
              merchants: merchants
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async queryOweFeeData (showLoading = true) {
      try {
        // 查询欠费模块汇总数据
        // this.addIsLoadingCount()
        await this.$axios.homeServe.queryOweFeeData(this.params, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let oweFeeData = { //欠费汇总数据
              nowOweFeeCont: data.nowOweFeeCont, // 实时欠费（合同）
              lastMonthOweFeeCont: data.lastMonthOweFeeCont, //	当月欠费（合同）
              curMonthOweFeeContClearRate: data.curMonthOweFeeContClearRate, //	当月清欠率（合同）
              historyOweFeeCont: data.historyOweFeeCont, //	历史欠费（合同）
              yearOweFeeCont: data.yearOweFeeCont, //	年累计欠费（合同）
              lastMonthOweFeeQz: data.lastMonthOweFeeQz, //当月欠费（权责）
              curMonthOweFeeQzClearRate: data.curMonthOweFeeQzClearRate, //	当月清欠率（权责）
              historyOweFeeQz: data.historyOweFeeQz, //	历史欠费（权责）
              yearOweFeeQz: data.yearOweFeeQz, //	年累计欠费（权责）
            }
            this.setData({
              oweFeeData: oweFeeData
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async queryLeaseExpires (showLoading = true) {
      try {
        // 根据物业类型查询,租约到期汇总数据
        // this.addIsLoadingCount()
        await this.$axios.homeServe.queryLeaseExpires(this.params, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let leaseExpires = {
              contNum: data.contNum, //三个月到期租户数
              rentSquare: data.rentSquare, //	三个月到期总面积
              rentSquareRate: data.rentSquareRate, //	三月到期面积占比
            }
            this.setData({
              leaseExpires: leaseExpires
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async queryCoverRent (showLoading = true) {
      try {
        // 根据物业类型查询,押不抵租汇总数据
        let req = { ...this.params };
        // this.addIsLoadingCount()
        await this.$axios.homeServe.queryCoverRent(req, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let coverRentContract = {
              shopRate: data.shopRate, //商户数占比（合同）
              blanceSubOwe: data.blanceSubOwe, //累计差额（合同）
              qzShopRate: data.qzShopRate, //商户数占比（权责）
              qzBlanceSubOwe: data.qzBlanceSubOwe, //累计差额（权责）
            }
            this.setData({
              coverRentContract: coverRentContract
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getYunYingGeneralMemberInfo (showLoading = true) {
      try {
        // 获取会员信息
        // if (!this.params.projectId) {
        //   return false;
        // }
        let req = {
          yearMonth: this.params.yearMonth,
          storeType: this.params.chargeType,
          bisProjectId: this.params.projectId,
        };
        // this.addIsLoadingCount()
        await this.$axios.homeServe.getYunYingGeneralMemberInfo(req, showLoading).then(res => {
          // this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let { data } = res;
            let memberDetail = {
              curMonthNewMemberNum: data.curMonthNewMemberNum, //
              curMonthNewMemberNumHb: data.curMonthNewMemberNumHb, //
              curYearNewMemberNum: data.curYearNewMemberNum, //
              monthAcctCompletRate: data.monthAcctCompletRate, //
              totalMemberNum: data.totalMemberNum, //
              yearAcctCompletRate: data.yearAcctCompletRate, //
              yesterdayNewMemberNum: data.yesterdayNewMemberNum, //
              yesterdayNewMemberNumHb: data.yesterdayNewMemberNumHb, //
            }
            this.setData({
              memberDetail: memberDetail
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    navigation ({ url, type, skip }) {
      try {
        // 跳转
        if (!this.getHasAuth) {
          return
        }
        if (this.params.projectId) {
          // 首页选择了 项目
          this.setProjectIdBol(1)
          if (skip !== "#") {
            this.$util.pageGo(skip, { ...this.params, feeType: type, })
          }
        } else {
          if (url) {
            this.setProjectIdBol(null)
            this.$util.pageGo(url, { ...this.params, feeType: type, })
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
  },

  activated () {
    // console.log(this.selected)
  }
};
</script>
<style type="text/css" lang="scss" scoped>
.go-top {
  position: fixed;
  bottom: 2rem;
  right: 0.2667rem;
}

// .app-main {
//   height: 20rem;
// }
.comparison {
  width: 1rem;
  height: 1rem;
  background-color: #f00;
  line-height: 1rem;
  position: fixed;
  bottom: 0.6667rem;
  right: 0.2667rem;
  text-align: center;
  border-radius: 50%;
  color: #fff;
}

.title-unit {
  font-size: 20px;
  color: #b0b0b0;
}

.index-item-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  /* justify-content: space-between; */
}

.index-item-inner {
  width: 48%;
  margin-bottom: 15px;
  line-height: 1.3;
}

.title-sub {
  /* line-height: 14px; */
  /* margin-top: -10px; */
  display: block;
  margin-top: 0px;
  margin-bottom: 15px;
  padding: 0 15px;
}

.min {
  width: 33%;
}

.index-item-inner-1 {
  width: 45%;
  margin-bottom: 10px;
}

.item-inner-label {
  color: #616161;
  font-size: 24px;
}

.item-inner-data {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: baseline;
  -webkit-align-items: baseline;
  align-items: baseline;
}

.inner-data-num {
  font-size: 42px;
  color: #333333;
}

.inner-data-unit {
  color: #616161;
  font-size: 24px;
}

.comparison-up {
  color: #5bbb35;
}

.comparison-down {
  color: #fe1010;
}

.comparison-number {
}

.inner-data-comparison {
  font-size: 28px;
  display: flex;
  align-items: center;
}

.index-item-inner-max {
  width: 52%;
}

.tb-icon {
  width: 14px;
  height: 20px;
  margin: 0 5px 0 10px;
}

.skip .item-inner-label {
  color: #3992ba;
}

.skip .inner-data-num {
  color: #3992ba;
}

.project-leader {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.project-leader-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
}

.select-indicator {
  display: flex;
  justify-content: flex-end;
}

.line {
  margin: 0 7px;
}

.active {
  color: #3992ba;
  font-weight: 600;
}
</style>
