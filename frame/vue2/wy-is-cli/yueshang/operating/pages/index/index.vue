<template>
	<div class="full-page">
		<view class="index-main">
			<app-header>
				<app-project-selector @selected="onProjectSelected" :selected="selected"></app-project-selector>
				<view slot="right">
					<app-picker @changed="onDateChanged" fields="month" :fromDate="params.yearMonth"></app-picker>
				</view>
			</app-header>
			<view class="tab-list-box">
				<view v-for="(item, index) in tabList" :key="index" :class="'tab-list-item ' + (item.code === params.storeType ? 'border-current' : '')"
				 :data-type="item.code" @tap="changeTab">
					{{ item.name }}
				</view>
			</view>
			<!-- 整体情况 -->
			<app-section title="整体情况">
				<view class="index-item-box">
					<view class="index-item-inner min" v-if="!params.bisProjectId">
						<view class="item-inner-label">项目总数</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.mallCount || "-" }}</view>
							<view class="inner-data-unit" v-if="dataDetail.mallCount">个</view>
						</view>
					</view>
					<view class="index-item-inner min">
						<view class="item-inner-label">总计租面积</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.allSquare || "-" }}</view>
							<view class="inner-data-unit">万㎡</view>
						</view>
					</view>
					<view class="index-item-inner min">
						<view class="item-inner-label">铺位总数</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.storeAllNum || "-" }}</view>
							<view class="inner-data-unit">个</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当月开业率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.kyRate || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.kyRateTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.kyRate)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.kyRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.kyRateTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.kyRateTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">出租率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.czRate || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.czRateTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.czRateTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.czRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.czRateTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.czRateTb) }}</view>
							</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="租金收入" url="/pages/shouru/zujin" type="zj" @navigation="navigation" skip="/pages/shouru/shouruxq/shouruxq">
				<text class="title-unit" slot="head-title">（万元）</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.rentFactTotal || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.zjFactHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.zjFactHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.zjFactHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.zjFactHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.zjFactHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年累计</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.rentFactTotalLj || "-" }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年收缴率(合同)</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.sjHtRateLj || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.sjhtYearHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.sjhtYearHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.sjhtYearHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.sjhtYearHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.sjhtYearHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年收缴率(权责)</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.sjRateLj || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.sjRateLjTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.sjRateLjTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.sjRateLjTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.sjRateLjTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.sjRateLjTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">预算达成率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.zjComRate || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="物管收入" url="/pages/shouru/zujin" type="wg" @navigation="navigation" skip="/pages/shouru/shouruxq/shouruxq">
				<text class="title-unit" slot="head-title">（万元）</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.propFactTotal || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.wgFactHb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.wgFactHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.wgFactHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.wgFactHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.wgFactHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年累计</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.propFactTotalLj || "-" }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年收缴率(合同)</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.wgHtRateLj || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.wghtYearHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.wghtYearHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.wghtYearHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.wghtYearHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.wghtYearHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年收缴率(权责)</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.p_sjRateLj || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.p_sjRateLjTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.p_sjRateLjTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.p_sjRateLjTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.p_sjRateLjTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.p_sjRateLjTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">预算达成率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.wgComRate || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="多经收入" url="/pages/shouru/zujin" type="dj" @navigation="navigation" skip="/pages/shouru/shouruxq/shouruxq">
				<text class="title-unit" slot="head-title">（万元）</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.djFactMonth || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.djFactMonthHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.djFactMonthHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.djFactMonthHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.djFactMonthHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.djFactMonthHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年累计</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.djFactYtd || "-" }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年收缴率(合同)</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.djHtRateLj || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.djhtYearHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.djhtYearHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.djhtYearHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.djhtYearHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.djhtYearHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">预算达成率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.djComRate || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="客流" url="/pages/keliu/paiming/paiming" @navigation="navigation" type="1" skip="/pages/keliu/month/month">
				<text class="title-unit" slot="head-title">（万人）</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">昨日</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ passengerFlow.ipvaYesterday || "-" }}</view>
							<view class="inner-data-comparison comparison-up">
								<view class="comparison-dire">
									<view :class="'inner-data-comparison ' + (passengerFlow.ipvaYesterdayTb >= 0 ? 'comparison-up' : 'comparison-down')"
									 v-if="fn.isEmpty(passengerFlow.ipvaYesterdayTb)">
										<view class="comparison-dire">
											<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="passengerFlow.ipvaYesterdayTb >= 0"></image>
											<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="passengerFlow.ipvaYesterdayTb < 0"></image>
										</view>
										<view class="comparison-number">{{ fn.absoluteValue(passengerFlow.ipvaYesterdayTb) }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当日</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ passengerFlow.currFlow || "-" }}</view>
							<!-- <view class="inner-data-comparison comparison-up">
            <view class="comparison-dire">
              <view class="inner-data-comparison {{dataDetail.currFlow >= 0? 'comparison-up':'comparison-down'}}" wx:if="{{fn.isEmpty(dataDetail.ipvaYesterdayTb)}}">
                <view class="comparison-dire">
                  <image class="tb-icon" src="@/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" wx:if='{{dataDetail.ipvaYesterdayTb >= 0}}'></image>
                  <image class="tb-icon" src="@/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" wx:if='{{dataDetail.ipvaYesterdayTb < 0}}'></image>
                </view>
            <view class="comparison-number">{{fn.absoluteValue (dataDetail.ipvaYesterdayTb) }}</view>

              </view>
            </view>
          </view> -->
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ passengerFlow.ipvaNum || "-" }}</view>
							<view :class="'inner-data-comparison ' + (passengerFlow.ipvaRate >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(passengerFlow.ipvaRate)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="passengerFlow.ipvaRate >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="passengerFlow.ipvaRate < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(passengerFlow.ipvaRate) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ passengerFlow.ipvaNumLj || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="销售" url="/pages/xiaoshou/paiming/paiming" @navigation="navigation" type="1" skip="/pages/xiaoshou/month/month">
				<text class="title-unit" slot="head-title">（万元）</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">昨日</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.yesterdaySales || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.yesterdaySalesTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.yesterdaySalesTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.yesterdaySalesTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.yesterdaySalesTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.yesterdaySalesTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.salesMonth || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.salesRateTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.salesRateTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.salesRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.salesRateTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.salesRateTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.salesToMonth || "-" }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">月销售平效</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.saleEffect || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="招商" url="/pages/kaiye/index" @navigation="navigation" skip="/pages/kaiye/details/details" type="1">
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">出租率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.czRate || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.czRateTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.czRateTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.czRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.czRateTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.czRateTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">空铺率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.emptyRate || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.emptyRateTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.emptyRateTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.emptyRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.emptyRateTb < 0"></image>
								</view>
								<view class="comparison-number"> {{ fn.absoluteValue(dataDetail.emptyRateTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">开业率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.kyRate || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.kyRateTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.kyRateTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.kyRateTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.kyRateTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.kyRateTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner-max">
						<view class="item-inner-label">平均租金</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.avgRent || "-" }}</view>
							<view class="inner-data-unit">元/㎡/月</view>
							<view :class="'inner-data-comparison ' + (dataDetail.avgRentTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="fn.isEmpty(dataDetail.avgRentTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.avgRentTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.avgRentTb < 0"></image>
								</view>
								<view class="comparison-number"> {{ fn.absoluteValue(dataDetail.avgRentTb) }}</view>
							</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="车流" :url="params.bisProjectId ? '' : '/pages/shuju/cheliu/paiming'" @navigation="navigation"
			 skip="#" type="1">
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">昨日</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.carNumberYesterday || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.carNumberYesterdayTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.carNumberYesterdayTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.carNumberYesterdayTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.carNumberYesterdayTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.carNumberYesterdayTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当月</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.carNumberMonth || "-" }}</view>
							<view :class="'inner-data-comparison ' + (dataDetail.carNumberMonthTb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(dataDetail.carNumberMonthTb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="dataDetail.carNumberYesterdaytTb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="dataDetail.carNumberMonthTb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(dataDetail.carNumberMonthTb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.carNumberYear || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="欠费" url="/pages/shuju/qiankuan/list" @navigation="navigation" skip="/pages/shuju/qiankuan/details"
			 type="wg" borderColor="#FE1010">
				<text class="title-unit" slot="head-title">（万元）</text>
				<view class="index-item-box">
					<!-- <view class="index-item-inner">
        <view class="item-inner-label">当月</view>
        <view class="item-inner-data">
          <view class="inner-data-num comparison-down">{{dataDetail.oweMonthTotal || '-'}}</view>
          <view class="inner-data-comparison {{dataDetail.oweMonthTotalTb >= 0? 'comparison-up':'comparison-down'}}" wx:if="{{fn.isEmpty(dataDetail.oweMonthTotalTb)}}">
            <view class="comparison-dire">
              <image class="tb-icon" src="@/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" wx:if='{{dataDetail.oweMonthTotalTb >= 0}}'></image>
              <image class="tb-icon" src="@/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" wx:if='{{dataDetail.oweMonthTotalTb < 0}}'></image>
            </view>
            <view class="comparison-number">{{fn.absoluteValue (dataDetail.oweMonthTotalTb) }}</view>
          </view>
          <view class="inner-data-comparison comparison-up">
            <view class="comparison-dire"></view>
            <view class="comparison-number"></view>
          </view>
        </view>
      </view> -->
					<view class="index-item-inner">
						<view class="item-inner-label">当月清欠率</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.oweRate }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">历史欠费</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.oweTotal }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">年累计欠费</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.oweYearTotal || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="会员" url="/pages/huiyuan/huiyuan" @navigation="navigation" type="1" skip="/pages/huiyuan/huiyuan"
			 v-if="params.bisProjectId">
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">昨日新增</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ memberDetail.yesterdayNewMemberNum || "-" }}</view>
							<view :class="'inner-data-comparison ' + (memberDetail.yesterdayNewMemberNumHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(memberDetail.yesterdayNewMemberNumHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="memberDetail.yesterdayNewMemberNumHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="memberDetail.yesterdayNewMemberNumHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(memberDetail.yesterdayNewMemberNumHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当月新增</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ memberDetail.curMonthNewMemberNum || "-" }}</view>
							<view :class="'inner-data-comparison ' + (memberDetail.curMonthNewMemberNumHb >= 0 ? 'comparison-up' : 'comparison-down')"
							 v-if="fn.isEmpty(memberDetail.curMonthNewMemberNumHb)">
								<view class="comparison-dire">
									<image class="tb-icon" src="/static/assets/images/tongbi-up.png" mode="widthFix" lazy-load="false" v-if="memberDetail.curMonthNewMemberNumHb >= 0"></image>
									<image class="tb-icon" src="/static/assets/images/tongbi-down.png" mode="widthFix" lazy-load="false" v-if="memberDetail.curMonthNewMemberNumHb < 0"></image>
								</view>
								<view class="comparison-number">{{ fn.absoluteValue(memberDetail.curMonthNewMemberNumHb) }}</view>
							</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">当年新增</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ memberDetail.curYearNewMemberNum || "-" }}</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="租约到期" url="/pages/zuyue/zuyue" @navigation="navigation" type="1" skip="/pages/zuyue/xiangqing/zyxq"
			 bgc="rgba(255, 227, 153, 0.25)" borderColor="#FE1010">
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">三个月内到期租户数</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.expireContNum || "-" }}</view>
							<view class="inner-data-unit" v-if="dataDetail.mallCount">个</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">到期总面积</view>
						<view class="item-inner-data">
							<view class="inner-data-num comparison-down">{{ dataDetail.expireContSquare || "-" }}</view>
							<view class="inner-data-unit" v-if="dataDetail.mallCount">㎡</view>
						</view>
					</view>
				</view>
			</app-section>
			<app-section title="押不抵租" url="/pages/ybdz/ybdz" @navigation="navigation" skip="/pages/ybdz/xiangqing/ybdzxq" type="wg"
			 bgc="rgba(255, 227, 153, 0.25)" borderColor="#FE1010">
				<text class="title-unit title-sub">押不抵租=（租金履约保证金金额+综合管理履约保证金）-租金欠费-物管欠费</text>
				<view class="index-item-box">
					<view class="index-item-inner">
						<view class="item-inner-label">累计比例</view>
						<view class="item-inner-data">
							<view class="inner-data-num">{{ dataDetail.oweVsBondRate || "-" }}</view>
						</view>
					</view>
					<view class="index-item-inner">
						<view class="item-inner-label">累计差额</view>
						<view class="item-inner-data">
							<view class="inner-data-num comparison-down">{{ dataDetail.oweVsBondSub || "-" }}</view>
							<view class="inner-data-unit" v-if="dataDetail.mallCount">万元</view>
						</view>
					</view>
				</view>
			</app-section>
		</view>
		<div class="no-power">
			<div v-if="hasPower === false">
				<div>
					<image :src="empty" class="empty-map"></image>
				</div>
				<div>
					您没有目前页面的权限<br />
					请联系智慧商业部
				</div>
			</div>
		</div>
	</div>
</template>

<script module="fn" lang="wxs" src="./fn.wxs"></script>

<script>
	const app = getApp();
	import empty from "@/assets/images/no-power.png";
	import regeneratorRuntime from "@/utils/runtime";
	import appSection from "@/components/container/section";
	import appHeader from "@/components/common/header";
	import appProjectSelector from "@/components/selector/project";
	import appPicker from "@/components/selector/datepicker";

	export default {
		data() {
			return {
				empty: empty,
				hasPower: null,
				tabList: [],
				currentTab: "0",
				label: "",
				params: {
					storeType: "0",
					bisProjectId: app.globalData.bisProjectId || "",
					yearMonth: "",
				},
				selected: {
					label: "全部",
					value: "",
				},
				defaultDate: "",
				showLeader: false,
				dataDetail: {},
				passengerFlow: {},
				memberDetail: {},
				leaderDetail: "",
			};
		},

		components: {
			appSection,
			appHeader,
			appProjectSelector,
			appPicker,
		},
		props: {},

		onLoad: function() {
			// console.log()
			if (app.globalData.power) {
				this.hasPower = this.getPower;
			} else {
				app.getPower = this.getPower;
			}

			this.setData({
				["params.yearMonth"]: app.globalData.getDefaultDate("month"),
			});
			if (app.globalData.userInfo && app.globalData.userInfo != "") {
				this.setData({
					"params.bisProjectId": app.globalData.bisProjectId,
					"params.projectName": app.globalData.projectName,
					"selected.label": app.globalData.projectName,
					"selected.value": app.globalData.bisProjectId,
				});
			} else {
				app.testDataCallback = (testData) => {
					console.log(testData);
					if (testData != "") {
						this.setData({
							"params.bisProjectId": testData.value || testData.bisProjectId,
							"params.projectName": testData.label || testData.projectName,
							"selected.label": testData.label || testData.projectName,
							"selected.value": testData.value || testData.bisProjectId,
						});
					}

					this.getStoreType();
					this.getdata();
				};
			}

			this.getStoreType();
			this.getdata(); // this.getMember();
			this.getFlow();
			const _this = this;
			uni.$on("onProjectSelected", (e) => {
				_this.onProjectSelected(e);
			});

			// 启动app桥接
			this.connectWebViewJavascriptBridge();
			this.connectWebViewJavascriptBridge();
		},
		methods: {
			getPower(power) {
				this.hasPower = power;
			},
			// 获取项目总信息
			async getLeaderInner() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get(`/open/bis-open-report!bisProjectPrincipalInfo.action?bisProjectId=${this.params.bisProjectId}`);

				if (res.data) {
					this.setData({
						leaderDetail: res.data,
						showLeader: true,
					});
				} else {
					uni.showToast({
						title: "职位空缺",
						duration: 2000,
					});
				}
			},

			closeModal() {
				this.setData({
					showLeader: false,
				});
			},

			showLeaderDetail() {
				this.getLeaderInner();
			},

			async getdata() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-statistics!getTotalInfo.action", this.params);
				this.setData({
					dataDetail: res.data,
				});
			},

			// 获取会员信息
			async getMember() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-statistics!getYunYingGeneralMemberInfo.action?yearMonth=2020-10", this.params);
				this.setData({
					memberDetail: res.data,
				});
			},

			// 切换tab
			changeTab(e) {
				this.setData({
					["params.storeType"]: e.currentTarget.dataset.type,
				});
				this.getdata();
				this.getFlow();
			},

			onProjectSelected(e) {
				let title = "运营数据（首页）";

				if (!e.detail.value) {
					title = "运营数据（首页）";
				} else {
					title = "运营数据（在营)";
				}

				uni.setNavigationBarTitle({
					title: title,
				});
				this.setData({
					label: e.detail.label,
					["params.bisProjectId"]: (e.detail.value && e.detail.value.bisProjectId) || "",
				});
				this.setData({
					selected: e.detail,
				});
				this.getdata();
				this.getFlow();
				this.getMember();
			},

			onDateChanged(e) {
				this.setData({
					["params.yearMonth"]: e.detail.value,
				});
				this.getdata();
				this.getFlow();
			},

			// 获取搜索物业类型枚举
			async getStoreType() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-dict!chargeTypeList.action");
				this.setData({
					tabList: res.data,
				});
			},
			// 获取客流相关
			async getFlow() {
				let res = await app.globalData.request.get("/open/bis-open-statistics!getCurrYesterday.action?yearMonth=2020-10",
					this.params);
				this.setData({
					passengerFlow: res.data,
				});
			},
			// 跳转
			navigation({
				url,
				type,
				skip
			}) {
				// let url = e.currentTarget.dataset.url;
				// let type = e.currentTarget.dataset.type;
				// let skip = e.currentTarget.dataset.skip;
				let projectName = this.label;
				if (this.params.bisProjectId) {
					if (skip !== "#") {
						this.$util.pageGo(skip, { ...this.params,
							type,
							projectName
						});
					}
				} else {
					if (url) {
						this.$util.pageGo(url, { ...this.params,
							type,
							projectName
						});
					}
				}
			},

			gotoYS() {
				app.globalData.page.go("/pages/yusuan/zyzb/index");
			},

			gotoZB() {
				app.globalData.page.go("/pages/zhibiao/index");
			},

			connectWebViewJavascriptBridge(callback) {
				console.log("准备与APP搭桥：");
				if (window.WebViewJavascriptBridge) {
					console.log("桥接：window.WebViewJavascriptBridge");
					callback(WebViewJavascriptBridge);
				} else {
					document.addEventListener(
						"WebViewJavascriptBridgeReady",
						function() {
							console.log("桥接：document.addEventListener");
							callback(WebViewJavascriptBridge);
						},
						false,
					);
					console.log("桥接失败！");
				}
			},
			connectWebViewJavascriptBridge(bridge) {
				try {
					console.log("执行：bridge.init！");
					bridge.init(function(message, responseCallback) {
						console.log("JS got a message", message);
						var data = {
							"Javascript Responds": "测试中文!",
						};

						if (responseCallback) {
							console.log("JS responding with", data);
							responseCallback(data);
						}
					});
				} catch (e) {
					console.log("ERROR：执行：bridge.init===失败！！！");
				}
			},
		},
	};
</script>
<style>
	@import "./index.css";
</style>
