<template>
  <!-- 由商业公司发起的商务条件 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]" style="min-width: 1120px;">
    <el-row v-if="$route.query.id && form.status != '草稿'">
      <dl-col :span="24" place="title top right">
        <h2>商务条件预警情况</h2>
      </dl-col>
      <div v-if="budgetStoreInfo.storeInfo.shopName && budgetStoreInfo.storeInfo.shopName != form.bizEntityJson.purposeStoreDesc">
        <dl-col :span="3">
          <p class="explain-p-one-title">品牌</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">对比</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">预算</p>
        </dl-col>
        <dl-col :span="5">
          <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.shopName }}</p>
        </dl-col>
        <dl-col :span="12" place="tag right">
          <p class="explain-p-one-tagRed">不一致</p>
        </dl-col>
      </div>
      <div v-if="form.bizEntityJson.oper2 && form.bizEntityJson.oper4 != form.bizEntityJson.oper2.split('-')[0]">
        <dl-col :span="3">
          <p class="explain-p-one-title">业态</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">对比</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">标准</p>
        </dl-col>
        <dl-col :span="5">
          <p class="explain-p-one">{{ form.bizEntityJson.oper4 }}</p>
        </dl-col>
        <dl-col :span="12" place="tag right">
          <p class="explain-p-one-tagRed">不一致</p>
        </dl-col>
      </div>
      <div v-if="budgetStoreInfo.storeInfo.contStartDate && new Date(form.bizEntityJson.conOpenDate2).getTime() > new Date(budgetStoreInfo.storeInfo.contStartDate).getTime()">
        <dl-col :span="3">
          <p class="explain-p-one-title">交付日期</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">对比</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">预算</p>
        </dl-col>
        <dl-col :span="5">
          <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.contStartDate }}</p>
        </dl-col>
        <dl-col :span="12" place="tag right">
          <p class="explain-p-one-tagRed">有延期</p>
        </dl-col>
      </div>
      <dl-col :span="3">
        <p class="explain-p-one-title">租金</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">标准</p>
      </dl-col>
      <dl-col :span="5">
        <p class="explain-p-one">
          合同期达成率
          <span :class="sumRentFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumRentFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p :class="sumRentFeeList.sumYearRentRate < 1 ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ sumRentFeeList.sumYearRentRate &lt; 1 ? '未达标' : '有提高' }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">租金</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">预算</p>
      </dl-col>
      <dl-col :span="5">
        <p v-if="budgetStoreInfo.storeInfo.annualIncomeZj" class="explain-p-one">
          首年
          <span :class="Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeZj) ? 'span-red' : 'span-green'">{{ Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) &lt; Number(budgetStoreInfo.storeInfo.annualIncomeZj) ? '↓' : '↑' }}</span>
          <span :class="Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeZj) ? 'span-red' : 'span-green'">{{ Math.abs((Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) - Number(budgetStoreInfo.storeInfo.annualIncomeZj)) / Number(budgetStoreInfo.storeInfo.annualIncomeZj)).toFixed(2) }}%</span>
        </p>
        <p v-else class="explain-p-one" style="color: #C0C4CC;">该铺位无预算信息</p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p v-if="budgetStoreInfo.storeInfo.annualIncomeZj" :class="Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeZj) ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ Number(form.bizEntityJson.rentFeeList[0].totalPriceActual) &lt; Number(budgetStoreInfo.storeInfo.annualIncomeZj) ? '未达成' : '有提高' }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">租金</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">上一份合同</p>
      </dl-col>
      <dl-col :span="5">
        <template v-if="previousContInfo.rentType">
          <p v-if="previousContInfo.rentType == 2" class="explain-p-one" style="color: #C0C4CC;">历史抽成合同无租金单价</p>
          <p v-else-if="form.bizEntityJson.rentFeeType != 2 && previousContInfo.rentLastPrice" class="explain-p-one">
            单价递增率
            <span :class="Number(form.bizEntityJson.rentFeeList[0].priceActual) < Number(previousContInfo.rentLastPrice) ? 'span-red' : 'span-green'">{{ Number(form.bizEntityJson.rentFeeList[0].priceActual) &lt; Number(previousContInfo.rentLastPrice) ? '↓' : '↑' }}</span>
            <span :class="Number(form.bizEntityJson.rentFeeList[0].priceActual) < Number(previousContInfo.rentLastPrice) ? 'span-red' : 'span-green'">{{ Math.abs((Number(form.bizEntityJson.rentFeeList[0].priceActual) - Number(previousContInfo.rentLastPrice)) / Number(previousContInfo.rentLastPrice) * 100).toFixed(2) }}%</span>
          </p>
          <p v-else class="explain-p-one" style="color: #C0C4CC;">申请抽成合同无租金单价</p>
        </template>
        <p v-else class="explain-p-one" style="color: #C0C4CC;">无历史合同</p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p v-if="form.bizEntityJson.rentFeeType != 2 && previousContInfo.rentLastPrice" :class="Number(form.bizEntityJson.rentFeeList[0].priceActual) < Number(previousContInfo.rentLastPrice) ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ Number(form.bizEntityJson.rentFeeList[0].priceActual) &lt; Number(previousContInfo.rentLastPrice) ? '未达成' : '有提高' }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">物管费</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">标准</p>
      </dl-col>
      <dl-col :span="5">
        <p class="explain-p-one">
          合同期达成率
          <span :class="sumPropertyFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumPropertyFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p :class="sumPropertyFeeList.sumYearRentRate < 1 ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ sumPropertyFeeList.sumYearRentRate &lt; 1 ? '未达标' : '有提高' }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">物管费</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">预算</p>
      </dl-col>
      <dl-col :span="5">
        <p v-if="budgetStoreInfo.storeInfo.annualIncomeWg" class="explain-p-one">
          首年
          <span :class="Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeWg) ? 'span-red' : 'span-green'">{{ Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) &lt; Number(budgetStoreInfo.storeInfo.annualIncomeWg) ? '↓' : '↑' }}</span>
          <span :class="Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeWg) ? 'span-red' : 'span-green'">{{ Math.abs((Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) - Number(budgetStoreInfo.storeInfo.annualIncomeWg)) / Number(budgetStoreInfo.storeInfo.annualIncomeWg)).toFixed(2) }}%</span>
        </p>
        <p v-else class="explain-p-one" style="color: #C0C4CC;">该铺位无预算信息</p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p v-if="budgetStoreInfo.storeInfo.annualIncomeWg" :class="Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) < Number(budgetStoreInfo.storeInfo.annualIncomeWg) ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ Number(form.bizEntityJson.propertyFeeList[0].totalPriceActual) &lt; Number(budgetStoreInfo.storeInfo.annualIncomeWg) ? '未达成' : '有提高' }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">物管费</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">对比</p>
      </dl-col>
      <dl-col :span="2">
        <p class="explain-p-one">上一份合同</p>
      </dl-col>
      <dl-col :span="5">
        <p v-if="previousContInfo.mrgLastPrice" class="explain-p-one">
          单价递增率
          <span :class="Number(form.bizEntityJson.propertyFeeList[0].priceActual) < Number(previousContInfo.mrgLastPrice) ? 'span-red' : 'span-green'">{{ Number(form.bizEntityJson.propertyFeeList[0].priceActual) &lt; Number(previousContInfo.mrgLastPrice) ? '↓' : '↑' }}</span>
          <span :class="Number(form.bizEntityJson.propertyFeeList[0].priceActual) < Number(previousContInfo.mrgLastPrice) ? 'span-red' : 'span-green'">{{ Math.abs((Number(form.bizEntityJson.propertyFeeList[0].priceActual) - Number(previousContInfo.mrgLastPrice)) / Number(previousContInfo.mrgLastPrice) * 100).toFixed(2) }}%</span>
        </p>
        <p v-else class="explain-p-one" style="color: #C0C4CC;">无历史合同</p>
      </dl-col>
      <dl-col :span="12" place="tag right">
        <p v-if="previousContInfo.mrgLastPrice" :class="Number(form.bizEntityJson.propertyFeeList[0].priceActual) < Number(previousContInfo.mrgLastPrice) ? 'explain-p-one-tagRed' : 'explain-p-one-tagBlue'">{{ Number(form.bizEntityJson.propertyFeeList[0].priceActual) &lt; Number(previousContInfo.mrgLastPrice) ? '未达成' : '有提高' }}</p>
      </dl-col>
      <div v-show="item.seizureRate && item.seizureRate < 1 && index < 7" v-for="(item, index) in form.bizEntityJson.bondFeeVOList" :key="index">
        <dl-col :span="3">
          <p class="explain-p-one-title">{{ item.name }}</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">对比</p>
        </dl-col>
        <dl-col :span="2">
          <p class="explain-p-one">标准</p>
        </dl-col>
        <dl-col :span="5">
          <p class="explain-p-one">
            比例
            <span class="span-red">{{ (item.seizureRate * 100).toFixed(2) }}%</span>
          </p>
        </dl-col>
        <dl-col :span="12" place="tag right">
          <p class="explain-p-one-tagRed">未达标</p>
        </dl-col>
      </div>
      <div v-if="form.bizEntityJson.special == 1 || form.bizEntityJson.special == 2">
        <dl-col :span="3">
          <p class="explain-p-one-title">特殊条款</p>
        </dl-col>
        <dl-col :span="2" />
        <dl-col :span="2" />
        <dl-col :span="5" />
        <dl-col :span="12" place="tag right">
          <p class="explain-p-one-tagRed">存在</p>
        </dl-col>
      </div>
    </el-row>
    <div v-if="$route.query.id && form.status != '草稿' && budgetStoreInfo.storeInfo.status != 1 && budgetStoreInfo.storeInfo.status != 2" class="padding-row">
      <el-alert
        title="暂无该铺位对应预算信息"
        type="warning"
        description="原因：未规划该铺位的预算或因拆/合铺位造成预实铺位号不一致;"
        show-icon
        :closable="false">
      </el-alert>
    </div>
    <el-row v-if="budgetStoreInfo.storeInfo.status == 1 || budgetStoreInfo.storeInfo.status == 2" class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>铺位预算信息(本年)</h2>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">指标</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">预算单价(元/㎡/月)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">申请单价(元/㎡/月)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">预算年收入(元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">申请后年收入(元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">年收入差异额(元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">年收入达成率</p>
      </dl-col>
      <dl-col :span="3" place="right">
        <p class="explain-p-one-title">达成状态</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">租金</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.priceZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.applyPriceZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.annualIncomeZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualIncomeZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualDiffZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualReachZj }}</p>
      </dl-col>
      <dl-col :span="3" place="right">
        <p class="explain-p-one">
          <span v-if="budgetStoreInfo.annualReachZj" :class="budgetStoreInfo.complateStatusZj == 1 ? 'span-round-green' : 'span-round-red'"></span>
        </p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">物管</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.priceWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.applyPriceWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.annualIncomeWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualIncomeWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualDiffWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.annualReachWg }}</p>
      </dl-col>
      <dl-col :span="3" place="right">
        <p class="explain-p-one">
          <span v-if="budgetStoreInfo.annualReachWg" :class="budgetStoreInfo.complateStatusWg == 1 ? 'span-round-green' : 'span-round-red'"></span>
        </p>
      </dl-col>
    </el-row>
    <el-row v-if="budgetStoreInfo.storeInfo.status == 1 || budgetStoreInfo.storeInfo.status == 2 || budgetStoreInfo.storeInfo.status == 3" class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>项目预算信息(本年)</h2>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">指标</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">预算收入(万元)</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one-title">当前累计达成额(万元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">当前达成率</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one-title">申请后累计达成额(万元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">申请后达成率</p>
      </dl-col>
      <dl-col :span="4" place="right">
        <p class="explain-p-one-title">达成率变化</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">租金</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.projectIncomeZj }}</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one">{{ budgetStoreInfo.completionRNumZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.completionRateZj }}</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one">{{ budgetStoreInfo.addAllZj }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.addRateZj }}</p>
      </dl-col>
      <dl-col :span="4" place="right">
        <p v-if="budgetStoreInfo.addRateZj" class="explain-p-one">
          <span :class="budgetStoreInfo.complateStatusRateZj == 1 ? 'span-green' : 'span-red'">{{ budgetStoreInfo.complateStatusRateZj == 1 ? '↑' : '↓' }}</span>
          <span :class="budgetStoreInfo.complateStatusRateZj == 1 ? 'span-green' : 'span-red'">{{ budgetStoreInfo.addRateDiffZj }}</span>
        </p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">物管</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.storeInfo.projectIncomeWg }}</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one">{{ budgetStoreInfo.completionRNumWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.completionRateWg }}</p>
      </dl-col>
      <dl-col :span="4">
        <p class="explain-p-one">{{ budgetStoreInfo.addAllWg }}</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one">{{ budgetStoreInfo.addRateWg }}</p>
      </dl-col>
      <dl-col :span="4" place="right">
        <p v-if="budgetStoreInfo.addRateWg" class="explain-p-one">
          <span :class="budgetStoreInfo.complateStatusRateWg == 1 ? 'span-green' : 'span-red'">{{ budgetStoreInfo.complateStatusRateWg == 1 ? '↑' : '↓' }}</span>
          <span :class="budgetStoreInfo.complateStatusRateWg == 1 ? 'span-green' : 'span-red'">{{ budgetStoreInfo.addRateDiffWg }}</span>
        </p>
      </dl-col>
    </el-row>
    <table class="tl-row margin-table">
      <tr>
        <th colspan="6">
          <span>项目及商家信息</span>
        </th>
      </tr>
      <tr>
        <td class="title">
          <span>项目名称</span>
        </td>
        <td>
          <el-input :class="{'novalue': !form.bizEntityJson.projectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </td>
        <td class="title">
          <span>地产项目名称</span>
        </td>
        <td>
          <el-input :class="{'novalue': !form.bizEntityJson.dcProjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.dcProjectName" @focus="showSearchOrg2 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </td>
        <td class="title">
          <span>
            项目归属
            <el-tooltip class="item" effect="dark" content="通过'项目名称'自动勾选" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
        </td>
        <td>
          <div :class="{'novalue': !form.bizEntityJson.projectType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.projectType" :disabled="projectTypeDisabled">
              <el-radio label="1">地产</el-radio>
              <el-radio label="2">置地</el-radio>
              <el-radio label="3">轻资产</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title">
          <span>意向商户</span>
        </td>
        <td>
          <el-input v-if="$route.query.id && form.status != '草稿'" v-model="form.bizEntityJson.purposeStoreDesc" readonly />
          <el-select
            v-else
            :class="{'novalue': !form.bizEntityJson.purposeStoreDesc, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.bisShopId"
            filterable
            remote
            clearable
            @change="purposeStoreDescChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in purposeStoreDescOptions"
              :key="item.bisShopId"
              :label="item.shopName"
              :value="item.bisShopId">
              <p>{{ item.projectName }} {{ item.shopName }} {{ item.companyName }} {{ item.hqAddr }}</p>
            </el-option>
          </el-select>
        </td>
        <td class="title">
          <span>商标注册名</span>
        </td>
        <td>
          <el-select :class="{'novalue': !form.bizEntityJson.registeredBrand, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.registeredBrand" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="(item, index) in registeredBrandOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </td>
        <td colspan="2">
          <span v-if="form.bizEntityJson.bisShopId && form.bizEntityJson.bisShopNameCn" class="span-open" @click="openCooperation">历史合作数据</span>
        </td>
      </tr>
      <tr>
        <td class="title">
          <span>经销商</span>
        </td>
        <td colspan="3">
          <el-input v-if="bisShopConnIdOptions.length < 1" :class="{'novalue': !form.bizEntityJson.bisShopConnId, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bisShopConnName" readonly />
          <el-select v-else :class="{'novalue': !form.bizEntityJson.bisShopConnId, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bisShopConnId" @change="bisShopConnIdChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="(item, index) in bisShopConnIdOptions" :key="index" :label="item.shopConnName + '　' + item.shortName + '　公司性质：' + item.shopConnType" :value="item.bisShopConnId"></el-option>
          </el-select>
        </td>
        <td class="title">
          <span>签约类型</span>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.signType" readonly />
        </td>
      </tr>
      <tr>
        <td class="title">
          <span>
            店型
            <el-tooltip class="item" effect="dark" content="通过经销商自动勾选" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
        </td>
        <td colspan="5">
          <div :class="{'novalue': !form.bizEntityJson.operTypeCd, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.operTypeCd" :disabled="operTypeCdDisabled">
              <el-radio label="1">主力店</el-radio>
              <el-radio label="2">次主力店</el-radio>
              <el-radio label="3">大商铺</el-radio>
              <el-radio label="4">小商铺</el-radio>
              <el-radio label="5">一般商铺</el-radio>
              <el-radio label="6">中型商铺</el-radio>
              <el-radio label="7">商业街</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title">
          <span>业态</span>
        </td>
        <td>
          <el-input :class="{'novalue': !form.bizEntityJson.oper2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.oper2" readonly />
        </td>
        <td class="title">
          <span>标准</span>
        </td>
        <td>
          <div :class="{'novalue': !form.bizEntityJson.yetaiCd, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.yetaiCd">
              <el-radio label="1">业态满足</el-radio>
              <el-radio label="2">业态变更</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td class="title">
          <span>品牌</span>
        </td>
        <td>
          <div :class="{'novalue': !form.bizEntityJson.brandCd, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.brandCd">
              <el-radio label="1">品牌满足</el-radio>
              <el-radio label="2">品牌变更</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title">
          <span>项目类型</span>
        </td>
        <td>
          <div :class="{'novalue': !form.bizEntityJson.isProjectTypeB, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.isProjectTypeB" @change="isProjectTypeBChange">
              <el-radio label="1">B类项目</el-radio>
              <el-radio label="2">非B类项目</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td class="title">
          <span>在营在建</span>
        </td>
        <td colspan="3">
          <div :class="{'novalue': !form.bizEntityJson.isBuildCd, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.isBuildCd" @change="isBuildCdChange" :disabled="form.bizEntityJson.isProjectTypeB == 1">
              <el-radio label="1">在建</el-radio>
              <el-radio label="2">在营</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
    </table>
    <table class="tl-row margin-table">
      <tr>
        <th colspan="4">
          <span>商务基本信息</span>
        </th>
      </tr>
      <tr>
        <td class="title-header" :style="{width: 3 / 24 * 100 + '%'}"></td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>标准</span>
        </td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>申请条件</span>
        </td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>备注</span>
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>1.租赁区域</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input :class="{'novalue': !form.bizEntityJson.rentArea2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rentArea2" @focus="rentArea2Focus" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <p v-if="form.bizEntityJson.bisContId" class="p-open" @click="openMerchants">历史招商数据</p>
          <p v-if="form.bizEntityJson.bisContId" class="p-open" @click="openSame">同项目同楼层同业态数据</p>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-if="shopTip" :class="{'novalue': !form.bizEntityJson.rentArea3, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rentArea3" type="textarea" resize="none" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          <el-input v-else v-model="form.bizEntityJson.rentArea3" type="textarea" resize="none" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>2.相关合同/网批</span>
        </td>
        <td colspan="2" :style="{width: 14 / 24 * 100 + '%'}">
          <p v-if="contNoOptions.length > 0" style="padding-left: 12px;">
            合同号:
            <span v-for="(item, index) in contNoOptions" :key="index" class="span-open" @click="openCont(item)">{{ item.contNo }}</span>
          </p>
          <p v-if="approveNoOptions.length > 0" style="padding-left: 12px;">
            网批号:
            <span v-for="(item, index) in approveNoOptions" :key="index" class="span-open" @click="openUrlGlobal(item.displayNo, item.resApproveInfoId, item.processId)">{{ item.displayNo }}</span>
          </p>
          <p style="color: #EF2941; padding-left: 12px;">{{ shopTip }}</p>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>3.合同类型/业态</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex">
            <span class="title">合同类型</span>
            <el-select :class="{'novalue': !form.bizEntityJson.contTypeCd, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.contTypeCd" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
              <el-option label="自持商铺合同" value="1"></el-option>
              <el-option label="销售商铺合同" value="2"></el-option>
            </el-select>
          </div>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex">
            <span class="title">签批业态</span>
            <el-input v-model="form.bizEntityJson.oper4" readonly />
          </div>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>4.计租面积</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex">
            <span class="title">建筑面积(㎡)</span>
            <el-input v-model="form.bizEntityJson.calcArea11" readonly />
          </div>
          <div class="div-flex">
            <span class="title">套内面积(㎡)</span>
            <el-input v-model="form.bizEntityJson.calcArea12" readonly />
          </div>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex">
            <span class="title">实际计租面积(㎡)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.calcArea2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.calcArea2" readonly />
          </div>
          <div class="div-flex">
            <span class="title">实际计费面积(㎡)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.prMgrArea2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.prMgrArea2" readonly />
          </div>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.calcArea3" type="textarea" resize="none" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>5.租期</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>{{ form.bizEntityJson.lease }}</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>{{ form.bizEntityJson.rentPeroid }}</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>6.空置期</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>{{ form.bizEntityJson.vacancyPeriod }}</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>7.交付日期</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.handDate2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.handDate2" @change="handDate2Change" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.handDate3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>8.开业日期</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.openDate1" readonly></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex" :class="{'novalue': !form.bizEntityJson.periods, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.periods" @change="periodsChange">
              <el-radio label="1">同期开业</el-radio>
              <el-radio label="2">不同期开业</el-radio>
            </el-radio-group>
          </div>
          <div v-if="form.bizEntityJson.periods != 1" class="div-flex">
            <span class="title">约定最迟开业日</span>
            <el-date-picker :class="{'novalue': !form.bizEntityJson.openDate2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.openDate2" @change="openDate2Change" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
          </div>
          <div v-if="form.bizEntityJson.periods != 1" class="div-flex">
            <span class="title">乙方约定开业日</span>
            <el-date-picker :class="{'novalue': !form.bizEntityJson.appointLastOpenDate2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.appointLastOpenDate2" @change="appointLastOpenDate2Change" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
          </div>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.openDate3" type="textarea" resize="none" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>9.租赁起始规则</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-select :class="{'novalue': !form.bizEntityJson.leaseStartRule1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.leaseStartRule1" @change="leaseStartRule1Change" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-if="form.bizEntityJson.isBuildCd == 1" label="自本合同约定的最迟开业日或乙方租赁场所实际开业日较早发生之日开始计算" value="1"></el-option>
            <el-option label="自租赁场所实际交付之日开始计算" value="2"></el-option>
            <el-option v-if="form.bizEntityJson.isBuildCd == 1" label="自乙方租赁场所实际开业日开始计算" value="3"></el-option>
          </el-select>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.leaseStartRule3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>10.租金起计日</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input :class="{'novalue': !form.bizEntityJson.conOpenDate2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.conOpenDate2" readonly />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.conOpenDate3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>11.返租到期日</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.showLastDate" readonly />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>产权性质：
            <span v-if="form.bizEntityJson.equityNature == 1">自持</span>
            <span v-if="form.bizEntityJson.equityNature == 2">可售</span>
            <span v-if="form.bizEntityJson.equityNature == 3">自持/销售</span>
            <span v-if="form.bizEntityJson.equityNature == 4">委托管理</span>
          </span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>12.合同结束时间</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.conEndDate2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.conEndDate2" @change="conEndDate2Change" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.conEndDate3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>13.免租期</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <table v-if="form.bizEntityJson.freePeriod211 || form.bizEntityJson.freePeriod311 || form.bizEntityJson.freePeriod411" class="tl-row no-header" style="width: 50%; margin: 0 auto;">
            <tr>
              <td>
                <el-input v-model="form.bizEntityJson.freePeriod211" readonly>
                  <template slot="prepend">第一年:</template>
                  <template slot="append">个月</template>
                </el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-input v-model="form.bizEntityJson.freePeriod311" readonly>
                  <template slot="prepend">第二年:</template>
                  <template slot="append">个月</template>
                </el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-input v-model="form.bizEntityJson.freePeriod411" readonly>
                  <template slot="prepend">第三年:</template>
                  <template slot="append">个月</template>
                </el-input>
              </td>
            </tr>
          </table>
        </td>
        <td colspan="1" :style="{width: 7 / 24 * 100 + '%'}">
          <table class="tl-row no-header" style="width: 100%;">
            <tr v-for="(item, index) in form.bizEntityJson.bisContFreeDayList" :key="index">
              <td>
                <el-input v-model="item.yearIndex" @blur="yearIndexBlur(index, $event)" maxlength="2" v-limit-number="0" :readonly="item.daySum ? true : false">
                  <template slot="prepend">第</template>
                  <template slot="append">年</template>
                </el-input>
              </td>
              <td>
                <el-input v-model="item.quarterIndex" @blur="quarterIndexBlur(index, $event)" maxlength="1" v-limit-number="0">
                  <template slot="prepend">第</template>
                  <template slot="append">季度</template>
                </el-input>
              </td>
              <td>
                <el-input v-model="item.daySum" @input="clearRentInput" @blur="daySumBlur(index, $event)" maxlength="2" v-limit-number="0">
                  <template slot="prepend">免</template>
                  <template slot="append">天</template>
                </el-input>
              </td>
              <td v-if="!form.bizEntityJson.disabled" style="width: 50px; text-align: center;">
                <i v-if="index == 0" class="el-icon-circle-plus" @click="addList" style="display: block; color: #468CEB; font-size: 20px; margin-top: 3px; cursor: pointer;"></i>
                <i v-else class="el-icon-remove" @click="remove(index)" style="display: block; color: #EF2941; font-size: 20px; margin-top: 3px; cursor: pointer;"></i>
              </td>
            </tr>
          </table>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>14.计费起始日</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.billingStartDay1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.billingStartDay1" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.billingStartDay3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>15.签约时间</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.deliveryDay1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.deliveryDay1" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.deliveryDay3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 3 / 24 * 100 + '%'}">
          <span>16.租押方式</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-select v-model="form.bizEntityJson.rentMortgage" filterable allow-create default-first-option :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in rentMortgageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}"></td>
      </tr>
    </table>
    <el-row class="padding-row red-box-fix">
      <dl-col :span="24" place="title top right">
        <h2>租金</h2>
      </dl-col>
      <dl-col :span="10" title="计费类型">
        <el-select :class="{'novalue': !form.bizEntityJson.rentFeeType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rentFeeType" @change="standardFeeCalc" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="固定" :value="1"></el-option>
          <el-option label="抽成" :value="2"></el-option>
          <el-option label="两者取高" :value="3"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.rentTypeRemark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <div v-if="form.bizEntityJson.rentFeeType == 3">
        <dl-col :span="24" place="title right">
          <h2>固定部分</h2>
        </dl-col>
        <dl-col :span="10" title="支付周期">
          <el-select :class="{'novalue': !form.bizEntityJson.fixRentPaymentCycle, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fixRentPaymentCycle" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-if="form.bizEntityJson.operTypeCd == 1 || form.bizEntityJson.operTypeCd == 2" label="月付" value="1"></el-option>
            <el-option v-if="form.bizEntityJson.rentFeeType == 1" label="两月付" value="2"></el-option>
            <el-option v-if="form.bizEntityJson.rentFeeType == 1" label="季付" value="3"></el-option>
            <el-option label="半年付" value="6"></el-option>
            <el-option label="年付" value="12"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="14" place="right" />
        <dl-col :span="10" title="付款模式">
          <el-cascader :class="{'novalue': !form.bizEntityJson.fixPayModeArray[0], 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fixPayModeArray" :options="payModeArrayOptions" :disabled="form.bizEntityJson.disabled" />
        </dl-col>
        <dl-col :span="14" place="right" />
        <dl-col :span="10" title="最迟缴费日">
          <el-select :class="{'novalue': !form.bizEntityJson.fixLatestPaymentDate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fixLatestPaymentDate" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in latestPaymentDateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="14" place="right" />
        <dl-col :span="24" place="title right">
          <h2>抽成部分</h2>
        </dl-col>
      </div>
      <dl-col :span="10" title="支付周期">
        <el-select :class="{'novalue': !form.bizEntityJson.rentPaymentCycle1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rentPaymentCycle1" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-if="form.bizEntityJson.operTypeCd == 1 || form.bizEntityJson.operTypeCd == 2" label="月付" value="1"></el-option>
          <el-option v-if="form.bizEntityJson.rentFeeType == 1" label="两月付" value="2"></el-option>
          <el-option v-if="form.bizEntityJson.rentFeeType == 1" label="季付" value="3"></el-option>
          <el-option label="半年付" value="6"></el-option>
          <el-option label="年付" value="12"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.rentPaymentCycle3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <div v-if="form.bizEntityJson.rentFeeType == 2 || form.bizEntityJson.rentFeeType == 3">
        <dl-col :span="10" title="抽成类型">
          <el-select :class="{'novalue': !form.bizEntityJson.pumpingType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.pumpingType" @change="standardFeeCalc" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="固定抽成" value="1001"></el-option>
            <el-option label="总额阶梯抽成" value="1002"></el-option>
            <el-option label="从低到高阶梯抽成" value="1003"></el-option>
          </el-select>
        </dl-col>
        <dl-col v-if="form.bizEntityJson.rentPaymentCycle1 == 6 || form.bizEntityJson.rentPaymentCycle1 == 12" :span="14" title="抽成计算规则" place="right">
          <el-select :class="{'novalue': !form.bizEntityJson.percentRuleShow, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.percentRuleShow" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="每月计算" value="1"></el-option>
            <el-option label="每月计算末月补差额" value="2"></el-option>
            <el-option label="按支付周期计算" value="3"></el-option>
          </el-select>
        </dl-col>
        <dl-col v-else :span="14" place="right" />
      </div>
      <dl-col :span="10" title="付款模式">
        <el-cascader :class="{'novalue': !form.bizEntityJson.payModeArray[0], 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payModeArray" :options="payModeArrayOptions" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="14" place="right"></dl-col>
      <dl-col :span="10" title="最迟缴费日">
        <el-select :class="{'novalue': !form.bizEntityJson.latestPaymentDate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.latestPaymentDate" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-for="item in latestPaymentDateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.rentLastDateRule3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <div v-if="form.bizEntityJson.rentFeeType == 2 || form.bizEntityJson.rentFeeType == 3">
        <dl-col :span="10" title="销售额类型">
          <el-select :class="{'novalue': !form.bizEntityJson.salesType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.salesType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="含税" value="0"></el-option>
            <el-option label="不含税" value="1"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="14" place="right"></dl-col>
      </div>
      <dl-col v-if="form.bizEntityJson.rentFeeList.length > 0" :span="10" place="title">
        <h2>租金表</h2>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.rentFeeList.length > 0" :span="14" place="right">
        <div class="explain-p">
          <p class="explain-p-one" style="height: 36px;">
            <el-button v-if="!form.bizEntityJson.disabled" type="primary" @click="feeCalc(1)" :loading="loading" style="margin-top: 3px;">计算</el-button>
          </p>
        </div>
      </dl-col>
    </el-row>
    <table v-if="form.bizEntityJson.rentFeeList.length > 0 && form.bizEntityJson.rentFeeType == 1" class="tl-row" style="width: 100%;">
      <tr>
        <td class="title" style="width: 160px;">
          <span>租赁年度</span>
        </td>
        <td class="title">
          <span>租金标准(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>申请租金单价(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>标准年租(元)</span>
        </td>
        <td class="title">
          <span>申请年租(元)</span>
        </td>
        <td class="title">
          <span>每年总租金差异额(元)</span>
        </td>
        <td class="title">
          <span>每年总租金折扣率</span>
        </td>
        <td class="title">
          <span>合同期递增率</span>
        </td>
        <td class="title">
          <span>免租期(天)</span>
        </td>
      </tr>
      <tr v-show="item.yearIndex" v-for="(item, index) in form.bizEntityJson.rentFeeList" :key="index">
        <td class="title">
          <span>第{{ item.yearIndex }}年</span>
        </td>
        <td>
          <span>{{ item.priceStandard }}</span>
        </td>
        <td>
          <el-input :class="{'novalue': !item.priceActual, 'required': !form.bizEntityJson.disabled}" v-model="item.priceActual" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <span>{{ item.totalPriceStandard }}</span>
        </td>
        <td>
          <span>{{ item.totalPriceActual }}</span>
        </td>
        <td>
          <span>{{ item.yearRentDiff }}</span>
        </td>
        <td>
          <span :class="item.yearRentRate < 1 ? 'span-red' : 'span-green'">{{ (item.yearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td>
          <span v-if="index == 0">/</span>
          <span v-else>{{ (item.increasingRate * 100).toFixed(2) }}%</span>
        </td>
        <td>
          <span>{{ item.freeDayNum }}</span>
        </td>
      </tr>
      <tr v-if="sumRentFeeList.sumTotalPriceStandard">
        <td class="title">
          <span>合计</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceStandard }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceActual }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumYearRentDiff }}</span>
        </td>
        <td>
          <span class="span-sum" :class="sumRentFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumRentFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumFreeDayNum }}</span>
        </td>
      </tr>
    </table>
    <table v-if="form.bizEntityJson.rentFeeList.length > 0 && (form.bizEntityJson.rentFeeType == 2 || form.bizEntityJson.rentFeeType == 3) && form.bizEntityJson.pumpingType == 1001" class="tl-row" style="width: 100%;">
      <tr>
        <td class="title" style="width: 160px;">
          <span>租赁年度</span>
        </td>
        <td class="title">
          <span>租金标准(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>标准年租(元)</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3" class="title">
          <span>申请租金单价(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>申请扣率(%)</span>
        </td>
        <td class="title">
          <span>预估月营业额(元)</span>
        </td>
        <td class="title">
          <span>申请年租(元)</span>
        </td>
        <td class="title">
          <span>每年总租金差异额(元)</span>
        </td>
        <td class="title">
          <span>每年总租金折扣率</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3" class="title">
          <span>合同期递增率</span>
        </td>
        <td class="title">
          <span>免租期(天)</span>
        </td>
      </tr>
      <tr v-show="item.yearIndex" v-for="(item, index) in form.bizEntityJson.rentFeeList" :key="index">
        <td class="title">
          <span>第{{ item.yearIndex }}年</span>
        </td>
        <td>
          <span>{{ item.priceStandard }}</span>
        </td>
        <td>
          <span>{{ item.totalPriceStandard }}</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <el-input :class="{'novalue': !item.priceActual, 'required': !form.bizEntityJson.disabled}" v-model="item.priceActual" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <el-input :class="{'novalue': !item.deductionRate, 'required': !form.bizEntityJson.disabled}" v-model="item.deductionRate" @input="clearRentInput" v-limit-number="2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <el-input :class="{'novalue': !item.sales, 'required': !form.bizEntityJson.disabled}" v-model="item.sales" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <span>{{ item.totalPriceActual }}</span>
        </td>
        <td>
          <span>{{ item.yearRentDiff }}</span>
        </td>
        <td>
          <span :class="item.yearRentRate < 1 ? 'span-red' : 'span-green'">{{ (item.yearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <span v-if="index == 0">/</span>
          <span v-else>{{ (item.increasingRate * 100).toFixed(2) }}%</span>
        </td>
        <td>
          <span>{{ item.freeDayNum }}</span>
        </td>
      </tr>
      <tr v-if="sumRentFeeList.sumTotalPriceStandard">
        <td class="title">
          <span>合计</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceStandard }}</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceActual }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumYearRentDiff }}</span>
        </td>
        <td>
          <span class="span-sum" :class="sumRentFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumRentFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumFreeDayNum }}</span>
        </td>
      </tr>
    </table>
    <table v-if="form.bizEntityJson.rentFeeList.length > 0 && (form.bizEntityJson.rentFeeType == 2 || form.bizEntityJson.rentFeeType == 3) && (form.bizEntityJson.pumpingType == 1002 || form.bizEntityJson.pumpingType == 1003)" class="tl-row" style="width: 100%;">
      <tr>
        <td class="title" style="width: 160px;">
          <span>租赁年度</span>
        </td>
        <td class="title">
          <span>租金标准(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>标准年租(元)</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3" class="title">
          <span>申请租金单价(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>阶梯起点额</span>
        </td>
        <td class="title">
          <span>阶梯终点额</span>
        </td>
        <td v-if="!form.bizEntityJson.disabled" class="title">
          <span></span>
        </td>
        <td class="title">
          <span>申请扣率(%)</span>
        </td>
        <td class="title">
          <span>预估月营业额(元)</span>
        </td>
        <td class="title">
          <span>申请年租(元)</span>
        </td>
        <td class="title">
          <span>每年总租金差异额(元)</span>
        </td>
        <td class="title">
          <span>每年总租金折扣率</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3" class="title">
          <span>合同期递增率</span>
        </td>
        <td class="title">
          <span>免租期(天)</span>
        </td>
      </tr>
      <tr v-for="(item, index) in form.bizEntityJson.rentFeeList" :key="index">
        <td :rowspan="item.ladderLength" v-if="item.ladderLength" class="title">
          <span>第{{ item.yearIndex }}年</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span>{{ item.priceStandard }}</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span>{{ item.totalPriceStandard }}</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength && form.bizEntityJson.rentFeeType == 3">
          <el-input :class="{'novalue': !item.priceActual, 'required': !form.bizEntityJson.disabled}" v-model="item.priceActual" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <span>{{ item.ladderStart }}</span>
        </td>
        <td>
          <el-input :class="{'novalue': !item.ladderEnd, 'required': !form.bizEntityJson.disabled}" v-model="item.ladderEnd" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!item.last" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td v-if="!form.bizEntityJson.disabled">
          <p v-if="item.last" style="width: 66px; font-size: 20px;">
            <i class="el-icon-circle-plus" @click="addLadder(index)" style="color: #468CEB; padding-left: 9px;"></i>
            <i v-if="!item.yearIndex" class="el-icon-remove" @click="removeLadder(index)" style="color: #EF2941; padding-left: 9px;"></i>
          </p>
        </td>
        <td>
          <el-input :class="{'novalue': !item.ladderRate, 'required': !form.bizEntityJson.disabled}" v-model="item.ladderRate" @input="clearRentInput" v-limit-number="2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <el-input :class="{'novalue': !item.sales, 'required': !form.bizEntityJson.disabled}" v-model="item.sales" @input="clearRentInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span>{{ item.totalPriceActual }}</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span>{{ item.yearRentDiff }}</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span :class="item.yearRentRate < 1 ? 'span-red' : 'span-green'">{{ (item.yearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength && form.bizEntityJson.rentFeeType == 3">
          <span v-if="index == 0">/</span>
          <span v-else>{{ (item.increasingRate * 100).toFixed(2) }}%</span>
        </td>
        <td :rowspan="item.ladderLength" v-if="item.ladderLength">
          <span>{{ item.freeDayNum }}</span>
        </td>
      </tr>
      <tr v-if="sumRentFeeList.sumTotalPriceStandard">
        <td class="title">
          <span>合计</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceStandard }}</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td v-if="!form.bizEntityJson.disabled">
          <span class="span-sum"></span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumTotalPriceActual }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumYearRentDiff }}</span>
        </td>
        <td>
          <span class="span-sum" :class="sumRentFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumRentFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </td>
        <td v-if="form.bizEntityJson.rentFeeType == 3">
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumRentFeeList.sumFreeDayNum }}</span>
        </td>
      </tr>
    </table>
    <el-row>
      <dl-col :span="24" title="折扣原因" place="right">
        <el-input v-model="form.bizEntityJson.discountReason" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="24" title="补充说明" place="right">
        <el-input v-model="form.bizEntityJson.rentFeeAmt8" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <el-row class="padding-row red-box-fix">
      <dl-col :span="24" place="title top right">
        <h2>物管费</h2>
      </dl-col>
      <dl-col :span="10" title="计费类型">
        <el-select :class="{'novalue': !form.bizEntityJson.propFeeType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.propFeeType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="固定" :value="1"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.propFeeTypeRemark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="10" title="支付周期">
        <el-select :class="{'novalue': !form.bizEntityJson.managerFeePaymentCycle1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.managerFeePaymentCycle1" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="月付" value="1"></el-option>
          <el-option label="两月付" value="2"></el-option>
          <el-option label="季付" value="3"></el-option>
          <el-option label="半年付" value="6"></el-option>
          <el-option label="年付" value="12"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.managerFeePaymentCycle1Remark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="10" title="付款模式">
        <el-cascader :class="{'novalue': !form.bizEntityJson.propPayModeArray[0], 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.propPayModeArray" :options="payModeArrayOptions" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="14" place="right"></dl-col>
      <dl-col :span="10" title="最迟缴费日">
        <el-select :class="{'novalue': !form.bizEntityJson.propLatestPaymentDate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.propLatestPaymentDate" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-for="item in latestPaymentDateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.propLatestPaymentDateRemark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="10" title="物管费是否含中央空调">
        <el-select v-model="form.bizEntityJson.containAir" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="14" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.centAirRemark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.propertyFeeList.length > 0" :span="10" place="title">
        <h2>物管表</h2>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.propertyFeeList.length > 0" :span="14" place="right">
        <div class="explain-p">
          <p class="explain-p-one" style="height: 36px;">
            <el-button v-if="!form.bizEntityJson.disabled" type="primary" @click="feeCalc(2)" :loading="loading" style="margin-top: 3px;">计算</el-button>
          </p>
        </div>
      </dl-col>
    </el-row>
    <table v-if="form.bizEntityJson.propertyFeeList.length > 0 && form.bizEntityJson.propFeeType == 1" class="tl-row" style="width: 100%;">
      <tr>
        <td class="title" style="width: 160px;">
          <span>租赁年度</span>
        </td>
        <td class="title">
          <span>标准月物管费(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>实际月物管费(元/㎡/月)</span>
        </td>
        <td class="title">
          <span>目标年度总物管费(元)</span>
        </td>
        <td class="title">
          <span>实际年度总物管费(元)</span>
        </td>
        <td class="title">
          <span>每年总租金差异额(元)</span>
        </td>
        <td class="title">
          <span>每年总租金折扣率</span>
        </td>
      </tr>
      <tr v-show="item.yearIndex" v-for="(item, index) in form.bizEntityJson.propertyFeeList" :key="index">
        <td class="title">
          <span>第{{ item.yearIndex }}年</span>
        </td>
        <td>
          <span>{{ item.priceStandard }}</span>
        </td>
        <td>
          <el-input :class="{'novalue': !item.priceActual, 'required': !form.bizEntityJson.disabled}" v-model="item.priceActual" @input="clearPropertyInput" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td>
          <span>{{ item.totalPriceStandard }}</span>
        </td>
        <td>
          <span>{{ item.totalPriceActual }}</span>
        </td>
        <td>
          <span>{{ item.yearRentDiff }}</span>
        </td>
        <td>
          <span :class="item.yearRentRate < 1 ? 'span-red' : 'span-green'">{{ (item.yearRentRate * 100).toFixed(2) }}%</span>
        </td>
      </tr>
      <tr v-if="sumPropertyFeeList.sumTotalPriceStandard">
        <td class="title">
          <span>合计</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">/</span>
        </td>
        <td>
          <span class="span-sum">{{ sumPropertyFeeList.sumTotalPriceStandard }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumPropertyFeeList.sumTotalPriceActual }}</span>
        </td>
        <td>
          <span class="span-sum">{{ sumPropertyFeeList.sumYearRentDiff }}</span>
        </td>
        <td>
          <span class="span-sum" :class="sumPropertyFeeList.sumYearRentRate < 1 ? 'span-red' : 'span-green'">{{ (sumPropertyFeeList.sumYearRentRate * 100).toFixed(2) }}%</span>
        </td>
      </tr>
    </table>
    <el-row>
      <dl-col :span="24" title="折扣原因" place="right">
        <el-input v-model="form.bizEntityJson.propDiscountReason" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="24" title="补充说明" place="right">
        <el-input v-model="form.bizEntityJson.propNotes" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <el-row class="padding-row red-box-fix">
      <dl-col :span="24" place="title top right">
        <h2>预付款，保证金</h2>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">预付款，保证金</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">标准应收金额(元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">实收应收金额(元)</p>
      </dl-col>
      <dl-col :span="3">
        <p class="explain-p-one-title">比例</p>
      </dl-col>
      <dl-col :span="12" place="right">
        <p class="explain-p-one-title">备注</p>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.bondFeeVOList" :key="index">
        <dl-col :span="3">
          <p class="explain-p-one-title">{{ item.name }}</p>
        </dl-col>
        <dl-col :span="3">
          <div v-if="item.name != '履约保证金'" style="width: 100%;">
            <el-input v-if="item.required" :class="{'novalue': item.standardPrice === '', 'required': !form.bizEntityJson.disabled}" v-model="item.standardPrice" @change="standardPriceChange(index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            <el-input v-else v-model="item.standardPrice" @change="standardPriceChange(index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="index == 7 || index == 9 || index == 12 ? true : false" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </div>
          <p v-else class="explain-p-one">
            <span>{{ item.standardPrice }}</span>
          </p>
        </dl-col>
        <dl-col :span="3">
          <div v-if="item.name != '履约保证金'" style="width: 100%;">
            <el-input v-if="item.required" :class="{'novalue': item.actualPrice === '', 'required': !form.bizEntityJson.disabled}" v-model="item.actualPrice" @change="actualPriceChange(index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            <el-input v-else v-model="item.actualPrice" @change="actualPriceChange(index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </div>
          <p v-else class="explain-p-one">
            <span>{{ item.actualPrice }}</span>
          </p>
        </dl-col>
        <dl-col :span="3">
          <p v-if="item.required" class="explain-p-one">
            <span v-if="item.seizureRate !== '' &&  item.seizureRate !== '-'" :class="{'span-green': item.seizureRate > 1, 'span-red': item.seizureRate < 1}">{{ (item.seizureRate * 100).toFixed(2) }}%</span>
            <span v-if="item.seizureRate == '-'">{{ item.seizureRate }}</span>
          </p>
          <p v-else class="explain-p-one">
            <span v-if="item.seizureRate !== '' &&  item.seizureRate !== '-'" :class="{'span-green': item.seizureRate > 1, 'span-red': item.seizureRate < 1}">{{ (item.seizureRate * 100).toFixed(2) }}%</span>
            <span v-if="item.seizureRate == '-'">{{ item.seizureRate }}</span>
          </p>
        </dl-col>
        <dl-col :span="12" place="right">
          <el-input v-model="item.bondRemarks" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </div>
    </el-row>
    <table class="tl-row margin-table">
      <tr>
        <th :colspan="form.bizEntityJson.special == 1 || form.bizEntityJson.special == 2 ? '2' : '4'">
          <span>其他事项</span>
        </th>
        <th v-if="form.bizEntityJson.special == 1 || form.bizEntityJson.special == 2" colspan="2">
          <span>特商会签附件</span>
        </th>
      </tr>
      <tr>
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>条款类型</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div :class="{'novalue': !form.bizEntityJson.special, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.special">
              <el-radio label="1">重要特殊条款</el-radio>
              <el-radio label="2">一般特殊条款</el-radio>
              <el-radio label="3">无特殊条款</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td colspan="2" :style="{width: 13 / 24 * 100 + '%'}">
          <many-files v-if="form.bizEntityJson.special == 1" :form="form" value="attachment" />
          <many-files v-if="form.bizEntityJson.special == 2" :form="form" value="attachment1" />
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.special == 2">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>广告位、停车位（含停车卷）、外摆、仓库等</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex div-flex-100" :class="{'novalue': !form.bizEntityJson.term, 'required': !form.bizEntityJson.disabled}">
            <span class="title">年限</span>
            <el-radio-group v-model="form.bizEntityJson.term">
              <el-radio label="1">1年内(含)</el-radio>
              <el-radio label="2">1年外</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td colspan="2" :style="{width: 13 / 24 * 100 + '%'}">
          <div class="div-flex div-flex-100" :class="{'novalue': !form.bizEntityJson.money, 'required': !form.bizEntityJson.disabled}">
            <span class="title">金额</span>
            <el-radio-group v-if="form.bizEntityJson.isProjectTypeB == 1" v-model="form.bizEntityJson.money">
              <el-radio label="1">1万(含)以内</el-radio>
              <el-radio label="2">1万以上,10万(含)以内</el-radio>
              <el-radio label="3">10万元外</el-radio>
            </el-radio-group>
            <el-radio-group v-else v-model="form.bizEntityJson.money">
              <el-radio label="1">10万元内</el-radio>
              <el-radio label="2">10万元外</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
      <tr>
        <td class="title-header" :style="{width: 4 / 24 * 100 + '%'}"></td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>标准</span>
        </td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>申请条件</span>
        </td>
        <td class="title-header" :style="{width: 6 / 24 * 100 + '%'}">
          <span>备注</span>
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.isBuildCd == 1">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>装修期开始时间</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.fitmentStartDate1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fitmentStartDate1" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.fitmentStartDate3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.isBuildCd == 1">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>装修期结束时间</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-date-picker :class="{'novalue': !form.bizEntityJson.fitmentEndDate1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fitmentEndDate1" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.fitmentEndDate3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.isBuildCd == 1">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>装修管理费(元)</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <span>无</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div class="div-flex">
            <span class="title">每平方米(元/㎡)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.fitmentManageStandard1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fitmentManageStandard1" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </div>
          <div class="div-flex">
            <span class="title">合计(元)</span>
            <el-input v-model="form.bizEntityJson.totalFitmentManageStandard" readonly />
          </div>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.fitmentManageStandard3" type="textarea" resize="none" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>违约金(元)</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.defaultAmt1" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.defaultAmt2" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.defaultAmt3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>广告位</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.adverPos1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.adverPos2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.adverPos3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr>
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>停车位</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.parkDesc1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.parkDesc2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.parkDesc3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </td>
      </tr>
      <tr class="many-textarea">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>其他事项</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.otherItem1" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.otherItem2" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.otherItem3" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
    </table>
    <table class="tl-row margin-table">
      <tr>
        <th colspan="4">
          <span>工程条件</span>
        </th>
      </tr>
      <tr>
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>工程情况</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div :class="{'novalue': !form.bizEntityJson.projectChange, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.projectChange">
              <el-radio label="1">工程不变</el-radio>
              <el-radio label="2">工程变更</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td colspan="2" :style="{width: 13 / 24 * 100 + '%'}">
          <div v-if="form.bizEntityJson.projectChange == 2" class="div-flex">
            <span class="title">工程改造预算(元)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.projectBudget, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectBudget" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event); projectBudgetBlur($event)" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </div>
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.projectChange == 2">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>退铺约定</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <div :class="{'novalue': !form.bizEntityJson.recovery, 'required': !form.bizEntityJson.disabled}" style="height: 100%;">
            <el-radio-group v-model="form.bizEntityJson.recovery" disabled>
              <el-radio label="1">恢复原状</el-radio>
              <el-radio label="2">不恢复原状</el-radio>
            </el-radio-group>
          </div>
        </td>
        <td colspan="2" :style="{width: 13 / 24 * 100 + '%'}">
          <div class="div-flex" :class="{'novalue': !form.bizEntityJson.checkCd, 'required': !form.bizEntityJson.disabled}">
            <span class="title">涉及外观、效果改造</span>
            <el-radio-group v-model="form.bizEntityJson.checkCd">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </div>
          <div class="div-flex" :class="{'novalue': !form.bizEntityJson.flag, 'required': !form.bizEntityJson.disabled}">
            <span class="title">预算类型</span>
            <el-radio-group v-model="form.bizEntityJson.flag" :disabled="form.bizEntityJson.projectChange == 2 && form.bizEntityJson.isBuildCd == 2">
              <el-radio label="1">预算内</el-radio>
              <el-radio label="2">预算外</el-radio>
            </el-radio-group>
          </div>
          <div class="div-flex" :class="{'novalue': !form.bizEntityJson.department, 'required': !form.bizEntityJson.disabled}">
            <span class="title">费用承担</span>
            <el-radio-group v-model="form.bizEntityJson.department" :disabled="form.bizEntityJson.projectChange == 2 && form.bizEntityJson.isBuildCd == 2">
              <el-radio label="1">商业公司</el-radio>
              <el-radio label="2">地产公司</el-radio>
            </el-radio-group>
          </div>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz1 || form.bizEntityJson.sqtj1 || form.bizEntityJson.gzfy1 || form.bizEntityJson.bz2 || form.bizEntityJson.sqtj2 || form.bizEntityJson.gzfy2 || form.bizEntityJson.bz3 || form.bizEntityJson.sqtj3 || form.bizEntityJson.gzfy3 || form.bizEntityJson.bz4 || form.bizEntityJson.sqtj4 || form.bizEntityJson.gzfy4 || form.bizEntityJson.bz5 || form.bizEntityJson.sqtj5 || form.bizEntityJson.gzfy5 || form.bizEntityJson.bz6 || form.bizEntityJson.sqtj6 || form.bizEntityJson.gzfy6 || form.bizEntityJson.bz7 || form.bizEntityJson.sqtj7 || form.bizEntityJson.gzfy7 || form.bizEntityJson.bz8 || form.bizEntityJson.sqtj8 || form.bizEntityJson.gzfy8 || form.bizEntityJson.bz9 || form.bizEntityJson.sqtj9 || form.bizEntityJson.gzfy9 || form.bizEntityJson.bz10 || form.bizEntityJson.sqtj10 || form.bizEntityJson.gzfy10 || form.bizEntityJson.bz11 || form.bizEntityJson.sqtj11 || form.bizEntityJson.gzfy11 || form.bizEntityJson.bz12 || form.bizEntityJson.sqtj12 || form.bizEntityJson.gzfy12">
        <td class="title-header" :style="{width: 4 / 24 * 100 + '%'}"></td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>标准</span>
        </td>
        <td class="title-header" :style="{width: 7 / 24 * 100 + '%'}">
          <span>申请条件</span>
        </td>
        <td class="title-header" :style="{width: 6 / 24 * 100 + '%'}">
          <span>改造费用</span>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz1 || form.bizEntityJson.sqtj1 || form.bizEntityJson.gzfy1">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>1.结构</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy1" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz2 || form.bizEntityJson.sqtj2 || form.bizEntityJson.gzfy2">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>2.建筑</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy2" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz3 || form.bizEntityJson.sqtj3 || form.bizEntityJson.gzfy3">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>3.强电</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy3" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz4 || form.bizEntityJson.sqtj4 || form.bizEntityJson.gzfy4">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>4.弱电</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz4" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj4" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy4" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz5 || form.bizEntityJson.sqtj5 || form.bizEntityJson.gzfy5">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>5.给水</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz5" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj5" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy5" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz6 || form.bizEntityJson.sqtj6 || form.bizEntityJson.gzfy6">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>6.排水</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz6" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj6" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy6" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz7 || form.bizEntityJson.sqtj7 || form.bizEntityJson.gzfy7">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>7.空调</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz7" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj7" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy7" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz8 || form.bizEntityJson.sqtj8 || form.bizEntityJson.gzfy8">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>8.通风</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz8" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj8" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy8" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz9 || form.bizEntityJson.sqtj9 || form.bizEntityJson.gzfy9">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>9.燃气</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz9" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj9" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy9" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz10 || form.bizEntityJson.sqtj10 || form.bizEntityJson.gzfy10">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>10.店招</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz10" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj10" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy10" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz11 || form.bizEntityJson.sqtj11 || form.bizEntityJson.gzfy11">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}">
          <span>11.装修</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz11" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj11" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy11" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
      <tr v-if="!form.bizEntityJson.disabled || form.bizEntityJson.bz12 || form.bizEntityJson.sqtj12 || form.bizEntityJson.gzfy12">
        <td class="title" :style="{width: 4 / 24 * 100 + '%'}"> 
          <span>12.消防</span>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.bz12" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 7 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.sqtj12" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
        <td :style="{width: 6 / 24 * 100 + '%'}">
          <el-input v-model="form.bizEntityJson.gzfy12" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </td>
      </tr>
    </table>
    <el-row v-if="form.status == '完成' && form.psv.contractText">
      <dl-col :span="11" style="display: flex; justify-content: flex-end;">
        <p class="explain-p-one">
          <el-button type="success" @click="openContract" style="margin-top: 3px;">新建合同</el-button>
        </p>
      </dl-col>
      <dl-col :span="13" place="right">
        <p v-if="contractCode" class="explain-p-one">合同台账编号:<span class="openUrl-p" @click="openContractNo">{{ contractCode }}</span></p>
        <p v-else class="explain-p-one">请到合同文本库新建合同</p>
      </dl-col>
    </el-row>
    <el-row class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>附件：（品牌落位图、品牌介绍、品牌证照、工程改造费明细清单、广告位位置及方案附件仅支持上传PDF或者图片）</h2>
      </dl-col>
      <dl-col :span="24" title="备注说明" place="right" :novalue="!form.bizEntityJson.remarks">
        <el-input v-model="form.bizEntityJson.remarks" type="textarea" resize="none" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
      </dl-col>
      <dl-col :span="24" title="附件1：品牌落位图" place="right" :novalue="!form.bizEntityJson.file1">
        <many-files :form="form" value="file1" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
      <dl-col :span="24" title="附件2：品牌介绍" tip="品牌简介、设计效果图、材质说明等" place="right" :novalue="!form.bizEntityJson.file2">
        <many-files :form="form" value="file2" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
      <dl-col :span="24" title="附件3：品牌证照" tip="商标注册及品牌授权书、营业执照及组织机构代码证和税务登记证三证合一、法人身份证" place="right" :novalue="!form.bizEntityJson.file3">
        <many-files :form="form" value="file3" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
      <dl-col :span="24" title="附件4：工程改造费明细清单" place="right">
        <many-files :form="form" value="file4" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
      <dl-col :span="24" title="附件5：广告位位置及方案" place="right">
        <many-files :form="form" value="file5" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
      <dl-col :span="24" title="附件6：其他" place="right">
        <many-files :form="form" value="file6" action="image/jpeg,image/gif,image/png,application/pdf" />
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg" />
    <search-org :open="showSearchOrg2 && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd1" @close="closeSearhOrg2" />
    <select-shop :open="showSelectShop && !form.bizEntityJson.disabled" :projectCd="form.bizEntityJson.projectCd" :rentArea2="form.bizEntityJson.rentArea2" @close="closeSelectShop"></select-shop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      loading: false,
      projectTypeDisabled: false,
      operTypeCdDisabled: false,
      purposeStoreDescOptions: [],
      registeredBrandOptions: [],
      bisShopConnIdOptions: [],
      rentMortgageOptions: [
        {
          label: '押2付3',
          value: '押2付3'
        },
        {
          label: '押2付1',
          value: '押2付1'
        }
      ],
      payModeArrayOptions: [
        {
          label: '预付',
          value: '1001',
          children: [
            {
              label: '1月',
              value: '1'
            },
            {
              label: '2月',
              value: '2'
            },
            {
              label: '3月',
              value: '3'
            },
            {
              label: '4月',
              value: '4'
            },
            {
              label: '5月',
              value: '5'
            },
            {
              label: '6月',
              value: '6'
            },
            {
              label: '7月',
              value: '7'
            },
            {
              label: '8月',
              value: '8'
            },
            {
              label: '9月',
              value: '9'
            },
            {
              label: '10月',
              value: '10'
            },
            {
              label: '11月',
              value: '11'
            },
            {
              label: '12月',
              value: '12'
            }
          ]
        },
        {
          label: '当期',
          value: '1002',
          children: [
            {
              label: '1月',
              value: '1'
            },
            {
              label: '2月',
              value: '2'
            },
            {
              label: '3月',
              value: '3'
            },
            {
              label: '4月',
              value: '4'
            },
            {
              label: '5月',
              value: '5'
            },
            {
              label: '6月',
              value: '6'
            },
            {
              label: '7月',
              value: '7'
            },
            {
              label: '8月',
              value: '8'
            },
            {
              label: '9月',
              value: '9'
            },
            {
              label: '10月',
              value: '10'
            },
            {
              label: '11月',
              value: '11'
            },
            {
              label: '12月',
              value: '12'
            }
          ]
        },
        {
          label: '后付',
          value: '1003',
          children: [
            {
              label: '1月',
              value: '1'
            },
            {
              label: '2月',
              value: '2'
            },
            {
              label: '3月',
              value: '3'
            },
            {
              label: '4月',
              value: '4'
            },
            {
              label: '5月',
              value: '5'
            },
            {
              label: '6月',
              value: '6'
            },
            {
              label: '7月',
              value: '7'
            },
            {
              label: '8月',
              value: '8'
            },
            {
              label: '9月',
              value: '9'
            },
            {
              label: '10月',
              value: '10'
            },
            {
              label: '11月',
              value: '11'
            },
            {
              label: '12月',
              value: '12'
            }
          ]
        },
        {
          label: '次年',
          value: '1004',
          children: [
            {
              label: '1月',
              value: '1'
            },
            {
              label: '2月',
              value: '2'
            },
            {
              label: '3月',
              value: '3'
            },
            {
              label: '4月',
              value: '4'
            },
            {
              label: '5月',
              value: '5'
            },
            {
              label: '6月',
              value: '6'
            },
            {
              label: '7月',
              value: '7'
            },
            {
              label: '8月',
              value: '8'
            },
            {
              label: '9月',
              value: '9'
            },
            {
              label: '10月',
              value: '10'
            },
            {
              label: '11月',
              value: '11'
            },
            {
              label: '12月',
              value: '12'
            }
          ]
        }
      ],
      latestPaymentDateOptions: [
        {
          label: '每月1号',
          value: 1
        },
        {
          label: '每月2号',
          value: 2
        },
        {
          label: '每月3号',
          value: 3
        },
        {
          label: '每月4号',
          value: 4
        },
        {
          label: '每月5号',
          value: 5
        },
        {
          label: '每月6号',
          value: 6
        },
        {
          label: '每月7号',
          value: 7
        },
        {
          label: '每月8号',
          value: 8
        },
        {
          label: '每月9号',
          value: 9
        },
        {
          label: '每月10号',
          value: 10
        },
        {
          label: '每月11号',
          value: 11
        },
        {
          label: '每月12号',
          value: 12
        },
        {
          label: '每月13号',
          value: 13
        },
        {
          label: '每月14号',
          value: 14
        },
        {
          label: '每月15号',
          value: 15
        },
        {
          label: '每月16号',
          value: 16
        },
        {
          label: '每月17号',
          value: 17
        },
        {
          label: '每月18号',
          value: 18
        },
        {
          label: '每月19号',
          value: 19
        },
        {
          label: '每月20号',
          value: 20
        },
        {
          label: '每月21号',
          value: 21
        },
        {
          label: '每月22号',
          value: 22
        },
        {
          label: '每月23号',
          value: 23
        },
        {
          label: '每月24号',
          value: 24
        },
        {
          label: '每月25号',
          value: 25
        },
        {
          label: '每月26号',
          value: 26
        },
        {
          label: '每月27号',
          value: 27
        },
        {
          label: '每月28号',
          value: 28
        },
        {
          label: '每月29号',
          value: 29
        },
        {
          label: '每月30号',
          value: 30
        },
        {
          label: '每月31号',
          value: 31
        }
      ],
      showSearchOrg: false,
      showSearchOrg2: false,
      showSelectShop: false,
      ladderLength: 0,
      rentFeeList: [],
      sumRentFeeList: {},
      sumPropertyFeeList: {},
      budgetStoreInfo: {
        storeInfo: {}
      },
      contractUrl: {},
      contractCode: '',
      scContId: '',
      contNoOptions: [],
      approveNoOptions: [],
      shopTip: '',
      previousContInfo: {},
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  computed: {
    standardPriceLYBZJ() {
      if (this.form.bizEntityJson.bondFeeVOList === undefined) return
      if (this.form.bizEntityJson.bondFeeVOList[3].standardPrice === '' && this.form.bizEntityJson.bondFeeVOList[4].standardPrice === '') return
      return Number(this.form.bizEntityJson.bondFeeVOList[3].standardPrice) + Number(this.form.bizEntityJson.bondFeeVOList[4].standardPrice)
    },
    actualPriceLYBZJ() {
      if (this.form.bizEntityJson.bondFeeVOList === undefined) return
      if (this.form.bizEntityJson.bondFeeVOList[3].actualPrice === '' && this.form.bizEntityJson.bondFeeVOList[4].actualPrice === '') return
      return Number(this.form.bizEntityJson.bondFeeVOList[3].actualPrice) + Number(this.form.bizEntityJson.bondFeeVOList[4].actualPrice)
    },
    totalFitmentManageStandard() {
      if (this.form.bizEntityJson.prMgrArea2 === undefined) return
      if (this.form.bizEntityJson.fitmentManageStandard1 === undefined) return
      return Number(this.form.bizEntityJson.prMgrArea2) * Number(this.form.bizEntityJson.fitmentManageStandard1)
    },
    flagDisabled() {
      if (this.form.bizEntityJson.projectChange === undefined) return
      if (this.form.bizEntityJson.isBuildCd === undefined) return
      return Number(this.form.bizEntityJson.projectChange) + Number(this.form.bizEntityJson.isBuildCd)
    },
  },
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val
			}
    },
    standardPriceLYBZJ(val) {
      this.form.bizEntityJson.bondFeeVOList[5].standardPrice = val.toFixed(2)
      if (val == 0) {
        if (this.form.bizEntityJson.bondFeeVOList[5].actualPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = 1
        } else {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = '-'
        }
      } else {
        this.form.bizEntityJson.bondFeeVOList[5].seizureRate = Number(this.form.bizEntityJson.bondFeeVOList[5].actualPrice) / Number(val)
      }
    },
    actualPriceLYBZJ(val) {
      this.form.bizEntityJson.bondFeeVOList[5].actualPrice = val.toFixed(2)
      if (val == 0) {
        if (this.form.bizEntityJson.bondFeeVOList[5].standardPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = 1
        } else {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = 0.00.toFixed(2)
        }
      } else {
        if (this.form.bizEntityJson.bondFeeVOList[5].standardPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = '-'
        } else {
          this.form.bizEntityJson.bondFeeVOList[5].seizureRate = Number(val) / Number(this.form.bizEntityJson.bondFeeVOList[5].standardPrice)
        }
      }
    },
    totalFitmentManageStandard(val) {
      this.$set(this.form.bizEntityJson, 'totalFitmentManageStandard', val.toFixed(2))
    },
    flagDisabled(val) {
      if (val == 4) {
        this.$set(this.form.bizEntityJson, 'flag', '2')
        this.$set(this.form.bizEntityJson, 'department', '2')
      }
    },
  },
  /* end */
  created() {
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'randomId', new Date().getTime())
      this.$set(this.form.bizEntityJson, 'payModeArray', [])
      this.$set(this.form.bizEntityJson, 'fixPayModeArray', [])
      this.$set(this.form.bizEntityJson, 'propPayModeArray', [])
      this.$set(this.form.bizEntityJson, 'bisContFreeDayList', [
        {
          yearIndex: '',
          quarterIndex: '',
          daySum: ''
        }
      ])
      this.$set(this.form.bizEntityJson, 'rentFeeList', [])
      this.$set(this.form.bizEntityJson, 'propertyFeeList', [])
      this.$set(this.form.bizEntityJson, 'bondFeeVOList', [
        {
          name: '意向金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '预付租金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '预付物管费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '履约保证金-租金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '履约保证金-物管费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '履约保证金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '质量保证金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: true
        },
        {
          name: '装修保证金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '隔墙恢复保证金',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '推广服务费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '临时水费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '临时电费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        },
        {
          name: '消防改造泄水费',
          code: '',
          standardPrice: '',
          actualPrice: '',
          seizureRate: '',
          bondRemarks: '',
          required: false
        }
      ])
      this.$set(this.form.bizEntityJson, 'recovery', '1')
      this.$set(this.form.bizEntityJson, 'registeredBrand', '')
      this.$set(this.form.bizEntityJson, 'bisShopConnId', '')
      this.$set(this.form.bizEntityJson, 'operTypeCd', '')
    } else {
      if (this.form.bizEntityJson.projectType) {
        this.projectTypeDisabled = true
      }
      if (this.form.bizEntityJson.operTypeCd) {
        this.operTypeCdDisabled = true
      }
      // 数组深拷贝
      this.rentFeeList = JSON.parse(JSON.stringify(this.form.bizEntityJson.rentFeeList))
      if (this.form.status != '草稿') {
        let sumTotalPriceStandard = 0
        let sumTotalPriceActual = 0
        let sumYearRentDiff = 0
        let sumFreeDayNum = 0
        this.form.bizEntityJson.rentFeeList.forEach(item => {
          sumTotalPriceStandard += Number(item.totalPriceStandard)
          sumTotalPriceActual += Number(item.totalPriceActual)
          sumYearRentDiff += Number(item.yearRentDiff)
          sumFreeDayNum += Number(item.freeDayNum)
        })
        this.sumRentFeeList = {
          total: '合计',
          sumTotalPriceStandard: sumTotalPriceStandard.toFixed(2),
          sumTotalPriceActual: sumTotalPriceActual.toFixed(2),
          sumYearRentDiff: sumYearRentDiff.toFixed(2),
          sumYearRentRate: sumTotalPriceStandard ? sumTotalPriceActual / sumTotalPriceStandard : 1,
          sumFreeDayNum: sumFreeDayNum === 0 ? '' : sumFreeDayNum
        }
        let sumTotalPriceStandard2 = 0
        let sumTotalPriceActual2 = 0
        let sumYearRentDiff2 = 0
        this.form.bizEntityJson.propertyFeeList.forEach(item => {
          sumTotalPriceStandard2 += Number(item.totalPriceStandard)
          sumTotalPriceActual2 += Number(item.totalPriceActual)
          sumYearRentDiff2 += Number(item.yearRentDiff)
        })
        this.sumPropertyFeeList = {
          total: '合计',
          sumTotalPriceStandard: sumTotalPriceStandard2.toFixed(2),
          sumTotalPriceActual: sumTotalPriceActual2.toFixed(2),
          sumYearRentDiff: sumYearRentDiff2.toFixed(2),
          sumYearRentRate: sumTotalPriceStandard2 ? sumTotalPriceActual2 / sumTotalPriceStandard2 : 1
        }
      }
      // let newIndex = 0
      // for (let key in this.rentFeeList) {
      //   if (this.rentFeeList[key].ladderList.length > 0) {
      //     for (let keyy in this.rentFeeList[key].ladderList) {
      //       if (keyy == 0) {
      //         this.$set(this.form.bizEntityJson.rentFeeList[newIndex], 'ladderStart', this.rentFeeList[key].ladderList[0].ladderStart)
      //         this.$set(this.form.bizEntityJson.rentFeeList[newIndex], 'ladderEnd', this.rentFeeList[key].ladderList[0].ladderEnd)
      //         this.$set(this.form.bizEntityJson.rentFeeList[newIndex], 'ladderRate', this.rentFeeList[key].ladderList[0].ladderRate)
      //         this.$set(this.form.bizEntityJson.rentFeeList[newIndex], 'ladderLength', this.rentFeeList[key].ladderList.length)
      //         if (this.rentFeeList[key].ladderList.length == 1) {
      //           this.$set(this.form.bizEntityJson.rentFeeList[newIndex], 'last', true)
      //         }
      //       } else {
      //         this.form.bizEntityJson.rentFeeList.splice(newIndex, 0, {
      //           yearIndex: '',
      //           ladderIndex: this.rentFeeList[key].yearIndex,
      //           ladderStart: this.rentFeeList[key].ladderList[keyy].ladderStart,
      //           ladderEnd: this.rentFeeList[key].ladderList[keyy].ladderEnd,
      //           ladderRate: this.rentFeeList[key].ladderList[keyy].ladderRate,
      //           last: this.rentFeeList[key].ladderList.length - 1 == keyy ? true : false
      //         })
      //       }
      //       newIndex ++
      //     }
      //   }
      // }
      console.log(this.form.bizEntityJson.rentFeeList)
    }
    if (this.$route.query.id && this.form.status != '草稿') {
      this.getBudgetStoreInfo()
      this.getPreContByBisStoreId()
      this.getNewContParam()
      this.findContNo()
    }
  },
  mounted() {
    if ((!this.form.bizEntityJson.disabled || this.form.status == '草稿') && this.form.bizEntityJson.purposeStoreDesc && this.form.bizEntityJson.projectCd) {
      this.remoteMethod(this.form.bizEntityJson.purposeStoreDesc)
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        const param = {
          shopName: query,
          projectCd: this.form.bizEntityJson.projectCd
        }
        this.$approval.findBisShopList(param).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.purposeStoreDescOptions = res.data
            } else {
              this.purposeStoreDescOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.purposeStoreDescOptions = []
      }
    },
    purposeStoreDescChange(val) {
      console.log(val)
      if (val) {
        let obj = this.purposeStoreDescOptions.find(item => item.bisShopId == val)
        this.registeredBrandOptions = []
        if (obj.shopNameCn) {
          this.registeredBrandOptions.push({label: obj.shopNameCn, value: obj.shopNameCn})
        }
        if (obj.shopNameEn) {
          this.registeredBrandOptions.push({label: obj.shopNameEn, value: obj.shopNameEn})
        }
        this.form.bizEntityJson.purposeStoreDesc = obj.shopName
        this.form.bizEntityJson.registeredBrand = obj.shopNameCn
        this.form.bizEntityJson.bisShopNameCn = obj.shopNameCn
        this.form.bizEntityJson.bisShopId = obj.bisShopId
        const param = {
          bisShopId: obj.bisShopId,
          projectCd: this.form.bizEntityJson.projectCd
        }
        this.$approval.getNewMapShopConn(param).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.bisShopConnIdOptions = res.data
              this.form.bizEntityJson.bisShopConnId = res.data[0].bisShopConnId
              this.$set(this.form.bizEntityJson, 'bisShopConnName', res.data[0].shopConnName + '　' + res.data[0].shortName + '　公司性质：' + res.data[0].shopConnType)
              this.$set(this.form.bizEntityJson, 'partName', res.data[0].shopConnName)
              this.$set(this.form.bizEntityJson, 'partAddress', res.data[0].partAddress)
              this.operTypeCdDisabled = res.data[0].manageCd ? true : false
              this.form.bizEntityJson.operTypeCd = res.data[0].manageCd
            } else {
              this.bisShopConnIdOptions = []
              this.form.bizEntityJson.bisShopConnId = ''
              this.$set(this.form.bizEntityJson, 'bisShopConnName', '')
              this.$set(this.form.bizEntityJson, 'partName', '')
              this.$set(this.form.bizEntityJson, 'partAddress', '')
              this.operTypeCdDisabled = false
              this.form.bizEntityJson.operTypeCd = ''
            }
          } else {
            this.$message.error(res.message)
          }
        })
        this.$approval.getLayoutNameAndIdNew(param).then(res => {
          if(res.code == 1) {
            this.$set(this.form.bizEntityJson, 'oper2', res.data.sortNames)
            this.$set(this.form.bizEntityJson, 'oper2Ids', res.data.bisShopSortId)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        this.operTypeCdDisabled = false
        this.form.bizEntityJson.operTypeCd = ''
        this.form.bizEntityJson.purposeStoreDesc = ''
        this.form.bizEntityJson.bisShopId = ''
        this.form.bizEntityJson.registeredBrand = ''
        this.form.bizEntityJson.bisShopNameCn = ''
        this.registeredBrandOptions = []
        this.form.bizEntityJson.bisShopConnId = ''
        this.form.bizEntityJson.bisShopConnName = ''
        this.form.bizEntityJson.partName = ''
        this.form.bizEntityJson.partAddress = ''
        this.bisShopConnIdOptions = []
        this.form.bizEntityJson.oper2 = ''
        this.form.bizEntityJson.oper2Ids = ''
        this.$set(this.form.bizEntityJson, 'rentPaymentCycle1', '')
        this.$set(this.form.bizEntityJson, 'fixRentPaymentCycle', '')
      }
    },
    bisShopConnIdChange(val) {
      let obj = this.bisShopConnIdOptions.find(item => item.bisShopConnId == val)
      this.form.bizEntityJson.bisShopConnId = obj ? obj.bisShopConnId : ''
      this.form.bizEntityJson.bisShopConnName = obj ? obj.shopConnName + '　' + obj.shortName + '　公司性质：' + obj.shopConnType : ''
      this.form.bizEntityJson.partName = obj ? obj.shopConnName : ''
      this.form.bizEntityJson.partAddress = obj ? obj.partAddress : ''
      this.form.bizEntityJson.operTypeCd = obj ? obj.manageCd : ''
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
        this.$approval.getProjectInfo({projectCd: val.id}).then(res => {
          if(res.code == 1) {
            if (res.data) {
              this.$set(this.form.bizEntityJson, 'bisProjectId', res.data.bisProjectId)
              if (res.data.projectAdscription) this.projectTypeDisabled = true
              this.$set(this.form.bizEntityJson, 'projectType', res.data.projectAdscription)
              this.$set(this.form.bizEntityJson, 'openDate1', res.data.openDate)
            } else {
              this.$set(this.form.bizEntityJson, 'bisProjectId', '')
              this.projectTypeDisabled = false
              this.$set(this.form.bizEntityJson, 'projectType', '')
              this.$set(this.form.bizEntityJson, 'openDate1', '')
            }
          } else {
            this.$message.error(res.message)
          }
        })
        this.form.bizEntityJson.purposeStoreDesc = ''
        this.form.bizEntityJson.bisShopId = ''
        this.purposeStoreDescOptions = ''
        this.operTypeCdDisabled = false
        this.form.bizEntityJson.operTypeCd = ''
        this.form.bizEntityJson.registeredBrand = ''
        this.form.bizEntityJson.bisShopNameCn = ''
        this.registeredBrandOptions = []
        this.form.bizEntityJson.bisShopConnId = ''
        this.form.bizEntityJson.bisShopConnName = ''
        this.bisShopConnIdOptions = []
        this.form.bizEntityJson.oper2 = ''
        this.form.bizEntityJson.oper2Ids = ''
        this.$set(this.form.bizEntityJson, 'rentPaymentCycle1', '')
        this.$set(this.form.bizEntityJson, 'fixRentPaymentCycle', '')
        // 选择商铺后的回显,清空项目连带清空
        this.form.bizEntityJson.rentArea2 = ''
        this.contNoOptions = []
        this.approveNoOptions = []
        this.shopTip = ''
        this.form.bizEntityJson.equityNature = ''
        this.form.bizEntityJson.oper4 = ''
        this.form.bizEntityJson.calcArea11 = ''
        this.form.bizEntityJson.calcArea12 = ''
        this.form.bizEntityJson.calcArea2 = ''
        this.form.bizEntityJson.prMgrArea2 = ''
        this.form.bizEntityJson.lease = ''
        this.form.bizEntityJson.showLastDate = ''
        this.form.bizEntityJson.chargeType = ''
        this.form.bizEntityJson.bisContId = ''
        this.form.bizEntityJson.freePeriod211 = ''
        this.form.bizEntityJson.freePeriod311 = ''
        this.form.bizEntityJson.freePeriod411 = ''
      }
      this.showSearchOrg = false
    },
    closeSearhOrg2(val) {
      if (val) {
        this.form.bizEntityJson.dcProjectName = val.text
        this.form.bizEntityJson.dcProjectCd = val.id
      }
      this.showSearchOrg2 = false
    },
    rentArea2Focus() {
      if (!this.form.bizEntityJson.projectCd) return this.$message.error('请先选择项目')
      this.showSelectShop = true
    },
    // 添加免租期
    addList() {
      if (this.form.bizEntityJson.bisContFreeDayList.length >= this.rentFeeList.length * 4) {
        this.$message.error('免租年数不可超过租赁年数')
        return
      }
      let newData = {
        yearIndex: '',
        quarterIndex: '',
        daySum: ''
      }
      this.form.bizEntityJson.bisContFreeDayList.push(newData)
    },
    // 删除免租期
    remove(index) {
      if (this.form.bizEntityJson.bisContFreeDayList.length > 0) {
        this.form.bizEntityJson.rentFeeList.forEach(item => {
          if (item.yearIndex == this.form.bizEntityJson.bisContFreeDayList[index].yearIndex) {
            item.freeDayNum -= Number(this.form.bizEntityJson.bisContFreeDayList[index].daySum)
          }
        })
        this.form.bizEntityJson.bisContFreeDayList.splice(index, 1)
        let sumFreeDayNum = 0
        this.form.bizEntityJson.bisContFreeDayList.forEach(item => {
          sumFreeDayNum += Number(item.daySum)
        })
        this.sumRentFeeList.sumFreeDayNum = sumFreeDayNum
      }
    },
    yearIndexBlur(index, val) {
      if (this.rentFeeList.length < 1) {
        this.form.bizEntityJson.bisContFreeDayList[index].yearIndex = ''
        this.$message.error('请先获取租金列表')
      } else {
        for (let i = this.rentFeeList.length - 1; i >= 0; i--) {
          if (this.rentFeeList[i].yearIndex) {
            if (Number(val.target.value) > Number(this.rentFeeList[i].yearIndex)) {
              this.form.bizEntityJson.bisContFreeDayList[index].yearIndex = this.rentFeeList[i].yearIndex
            }
            return
          }
        }
      }
    },
    quarterIndexBlur(index, val) {
      if (val.target.value > 4) {
        this.form.bizEntityJson.bisContFreeDayList[index].quarterIndex = 4
      }
    },
    daySumBlur(index, val) {
      if (this.rentFeeList.length < 1) {
        this.form.bizEntityJson.bisContFreeDayList[index].daySum = ''
        this.$message.error('请先获取租金列表')
        return
      }
      if (!this.form.bizEntityJson.bisContFreeDayList[index].yearIndex) {
        this.form.bizEntityJson.bisContFreeDayList[index].daySum = ''
        this.$message.error('请先填写免租年度')
        return
      }
      if (val.target.value > 94) {
        this.form.bizEntityJson.bisContFreeDayList[index].daySum = 90
      }
      let sum = 0
      this.form.bizEntityJson.rentFeeList.forEach(item => {
        for (let key in this.form.bizEntityJson.bisContFreeDayList) {
          if (item.yearIndex == this.form.bizEntityJson.bisContFreeDayList[key].yearIndex && this.form.bizEntityJson.bisContFreeDayList[index].yearIndex == this.form.bizEntityJson.bisContFreeDayList[key].yearIndex) {
            sum += Number(this.form.bizEntityJson.bisContFreeDayList[key].daySum)
            console.log(sum)
          }
        }
        if (item.yearIndex == this.form.bizEntityJson.bisContFreeDayList[index].yearIndex) {
          item.freeDayNum = sum
        }
      })
      let sumFreeDayNum = 0
      this.form.bizEntityJson.bisContFreeDayList.forEach(item => {
        sumFreeDayNum += Number(item.daySum)
      })
      this.sumRentFeeList = {...this.sumRentFeeList, sumFreeDayNum: sumFreeDayNum}
    },
    async closeSelectShop(val) {
      if (val) {
        console.log(val)
        this.form.bizEntityJson.rentArea2 = val.storeNo
        this.form.bizEntityJson.bisStoreIds = val.bisStoreId
        this.$approval.getStoreInfo({bisStoreId: val.bisStoreId}).then(res => {
          if(res.code == 1) {
            if (res.data) {
              this.form.bizEntityJson.equityNature = res.data.equityNature
              this.form.bizEntityJson.oper4 = res.data.issuingLayoutName
              this.form.bizEntityJson.calcArea11 = res.data.square
              this.form.bizEntityJson.calcArea12 = res.data.innerSquare
              this.form.bizEntityJson.calcArea2 = res.data.rentSquare
              this.form.bizEntityJson.prMgrArea2 = res.data.feeSquare
              this.form.bizEntityJson.lease = res.data.lease
              this.form.bizEntityJson.showLastDate = res.data.lastDate
              this.form.bizEntityJson.chargeType = res.data.chargeType
              this.form.bizEntityJson.freePeriod211 = res.data.freeLease1
              this.form.bizEntityJson.freePeriod311 = res.data.freeLease2
              this.form.bizEntityJson.freePeriod411 = res.data.freeLease3
            } else {
              this.form.bizEntityJson.equityNature = ''
              this.form.bizEntityJson.oper4 = ''
              this.form.bizEntityJson.calcArea11 = ''
              this.form.bizEntityJson.calcArea12 = ''
              this.form.bizEntityJson.calcArea2 = ''
              this.form.bizEntityJson.prMgrArea2 = ''
              this.form.bizEntityJson.lease = ''
              this.form.bizEntityJson.showLastDate = ''
              this.form.bizEntityJson.chargeType = ''
              this.form.bizEntityJson.freePeriod211 = ''
              this.form.bizEntityJson.freePeriod311 = ''
              this.form.bizEntityJson.freePeriod411 = ''
            }
          } else {
            this.$message.error(res.message)
          }
        })
        let res1 = await this.$approval.getContByIds({bisStoreId: val.bisStoreId})
        let res2 = await this.$approval.getApproveContent({bisStoreId: val.bisStoreId})
        if (res1.code == 1 && res2.code == 1) {
          this.contNoOptions = res1.data
          this.approveNoOptions = res2.data
          if (res1.data[0] && res1.data[0].bisContId) {
            this.$set(this.form.bizEntityJson, 'bisContId', res1.data[0].bisContId)
          } else {
            this.$set(this.form.bizEntityJson, 'bisContId', '')
          }
          if (!res1.data || !res1.data[0]) {
            if (!res2.data || !res2.data[0]) {
              console.log('网批不存在,可以发起当前网批')
              this.shopTip = ''
            } else {
              if (res2.data.length < 2) {
                this.shopTip = '一个网批已占用该商铺，请填写再次发起网批原因。'
                this.$alert('请在备注填写原因！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                })
              } else {
                this.shopTip = '该商铺包含多个网批，按照招商要求，该商铺不能再次发起网批。'
              }
            }
          } else {
            if (res1.length < 2) {
              if (!res2.data || !res2.data[0]) {
                this.shopTip = '一个网批已占用该商铺，请填写再次发起网批原因。'
                this.$alert('请在备注填写原因！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                })
              } else {
                this.shopTip = '该商铺包含多个网批，按照招商要求，该商铺不能再次发起网批。'
              }
            } else {
              this.shopTip = '该商铺包含多个网批，按照招商要求，该商铺不能再次发起网批。'
            }
          }
        } else {
          this.shopTip = ''
          this.$message.error('系统异常,请稍后重试')
        }
      }
      this.showSelectShop = false
    },
    isProjectTypeBChange(val) {
      if (val == 1) {
        this.$set(this.form.bizEntityJson, 'isBuildCd', '2')
        this.leaseStartRule1Change('2')
      }
    },
    isBuildCdChange(val) {
      if (val == 2) {
        this.$set(this.form.bizEntityJson, 'leaseStartRule1', '2')
        this.leaseStartRule1Change('2')
      }
    },
    handDate2Change(val) {
      if (this.form.bizEntityJson.leaseStartRule1 == 2) {
        this.$set(this.form.bizEntityJson, 'conOpenDate2', val)
      }
      this.countYMD()
      this.getMapShopHis()
    },
    periodsChange(val) {
      if (val == 1) {
        if (this.form.bizEntityJson.leaseStartRule1 == 1 || this.form.bizEntityJson.leaseStartRule1 == 3) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.openDate1)
        }
        if (this.form.bizEntityJson.leaseStartRule1 == 2) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.handDate2)
        }
      } else {
        this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.handDate2)
      }
      this.countYMD()
      this.getMapShopHis()
    },
    openDate2Change(val) {
      if (this.form.bizEntityJson.leaseStartRule1 == 1) {
        if (new Date(val).getTime() <= new Date(this.form.bizEntityJson.appointLastOpenDate2).getTime()) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', val)
        } else {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.appointLastOpenDate2)
        }
      }
      this.countYMD()
      this.getMapShopHis()
    },
    appointLastOpenDate2Change(val) {
      if (this.form.bizEntityJson.leaseStartRule1 == 1) {
        if (new Date(this.form.bizEntityJson.openDate2).getTime() <= new Date(val).getTime()) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.openDate2)
        } else {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', val)
        }
      }
      if (this.form.bizEntityJson.leaseStartRule1 == 3) {
        this.$set(this.form.bizEntityJson, 'conOpenDate2', val)
      }
      this.countYMD()
      this.getMapShopHis()
    },
    leaseStartRule1Change(val) {
      if (val == 1) {
        if (this.form.bizEntityJson.periods == 1) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.openDate1)
        }
        if (this.form.bizEntityJson.periods == 2) {
          if (new Date(this.form.bizEntityJson.openDate2).getTime() <= new Date(this.form.bizEntityJson.appointLastOpenDate2).getTime()) {
            this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.openDate2)
          } else {
            this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.appointLastOpenDate2)
          }
        }
      }
      if (val == 2) {
        this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.handDate2)
      }
      if (val == 3) {
        if (this.form.bizEntityJson.periods == 1) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.openDate1)
        }
        if (this.form.bizEntityJson.periods == 2) {
          this.$set(this.form.bizEntityJson, 'conOpenDate2', this.form.bizEntityJson.appointLastOpenDate2)
        }
      }
      this.countYMD()
      this.getMapShopHis()
    },
    getMapShopHis() {
      if (this.form.bizEntityJson.conOpenDate2 && this.form.bizEntityJson.bisStoreIds) {
        const param = {
          rentStartDate: this.form.bizEntityJson.conOpenDate2,
          bisStoreId: this.form.bizEntityJson.bisStoreIds
        }
        this.$approval.getMapShopHis(param).then(res => {
          if(res.code == 1) {
            if (res.data.contToFaiDate) {
              // 空置期
              this.$set(this.form.bizEntityJson, 'vacancyPeriod', (new Date(this.form.bizEntityJson.conOpenDate2).getTime() - new Date(res.data.contToFaiDate).getTime()) / 86400000 - 1 + '天')
            } else if (res.data.contEndDate) {
              // 空置期
              this.$set(this.form.bizEntityJson, 'vacancyPeriod', (new Date(this.form.bizEntityJson.conOpenDate2).getTime() - new Date(res.data.contEndDate).getTime()) / 86400000 - 1 + '天')
            } else {
              this.$set(this.form.bizEntityJson, 'vacancyPeriod', '')
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
      if (this.form.bizEntityJson.conOpenDate2 && this.form.bizEntityJson.bisStoreIds && this.form.bizEntityJson.bisShopId) {
        const param = {
          rentStartDate: this.form.bizEntityJson.conOpenDate2,
          bisShopId: this.form.bizEntityJson.bisShopId,
          bisStoreId: this.form.bizEntityJson.bisStoreIds
        }
        this.$approval.getMapShopHis(param).then(res => {
          if(res.code == 1) {
            if (!res.data) return this.$set(this.form.bizEntityJson, 'signType', '新签')
            if (res.data.contEndDate) {
              if (new Date(res.data.contEndDate).getTime() + 86400000 == new Date(this.form.bizEntityJson.conOpenDate2).getTime()) {
                this.$set(this.form.bizEntityJson, 'signType', '续签')
              } else {
                this.$set(this.form.bizEntityJson, 'signType', '新签')
              }
            } else {
              this.$set(this.form.bizEntityJson, 'signType', '新签')
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    countYMD() {
      if (!this.form.bizEntityJson.conOpenDate2) return
      if (!this.form.bizEntityJson.conEndDate2) return
      this.spacingText(this.form.bizEntityJson.conOpenDate2, this.form.bizEntityJson.conEndDate2)
      return
      // 下面方法弃用
      var Month1, Month2, iYears = 0, iMonths = 0, iDays = 0
      var beginDate = this.form.bizEntityJson.conOpenDate2 // 合同开始时间
      var endDate = this.form.bizEntityJson.conEndDate2 // 合同结束时间
      Month1 = parseInt(beginDate.split('-')[0], 10) * 12 + parseInt(beginDate.split('-')[1], 10)
      Month2 = parseInt(endDate.split('-')[0], 10) * 12 + parseInt(endDate.split('-')[1], 10)
      var day1 = parseInt(beginDate.split('-')[2], 10)
      var day2 = parseInt(endDate.split('-')[2], 10)
      iMonths = Month2 - Month1
      iDays = day2 - day1 + 1
      if (iDays < 0) {
        iMonths -= 1
        iDays += 30
      }
      iYears = parseInt(iMonths / 12)
      iMonths = parseInt(iMonths % 12)
      if (isNaN(iYears)) {
        iYears = 0
      }
      if (isNaN(iMonths)) {
        iMonths = 0
      }
      if (isNaN(iDays)) {
        iDays = 0
      }
      let yearName = ''
      let monthName = ''
      let dayName = ''
      if (iYears != 0) {
        yearName = iYears + '年'
      }
      monthName = iMonths + '个月'
      if (iDays != 0) {
        dayName = iDays + '天'
      }
      if (iYears == 0 && iMonths == 0) {
        monthName = ''
      }
      if (iMonths == 0 && iDays == 0) {
        monthName = ''
      }
      this.$set(this.form.bizEntityJson, 'rentPeroid', yearName + monthName + dayName)
      this.standardFeeCalc()
      this.propStandardFeeCalc()
      console.log(iYears + '年' + iMonths + '个月' + iDays + '天')
    },
    spacingText(start, end, format) {
      if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
        return '0天'
      } else {
        const result = this.compare(start, end)
        // console.log(result)
        if (!format) {
          format = ''
          if (result.year > 0) {
            format = 'y年'
          }
          if (result.month > 0) {
            format += 'm个月'
          }
          if (result.day > 0) {
            format += 'd天'
          }
        }
        this.$set(this.form.bizEntityJson, 'rentPeroid', format.replace('y', result.year).replace('m', result.month).replace('d', result.day))
        this.standardFeeCalc()
        this.propStandardFeeCalc()
        console.log(format.replace('y', result.year).replace('m', result.month).replace('d', result.day))
        // return format.replace('y', result.year).replace('m', result.month).replace('d', result.day)
      }
    },
    format(expr, date) {
      date = new Date(date)
      const o = {
        'ms': date.getMilliseconds(), // 毫秒
        'md': new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), // 当月最后一天 MaxDay
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
      }
      if (/(y+)/.test(expr)) {
        expr = expr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(expr)) {
          expr = expr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return expr
    },
    compare(start, end) {
      let min = start
      let max = end
      if (new Date(min).getTime() > new Date(max).getTime()) {
        min = end
        max = start
      }

      const result = { start: min, end: max, year: '', month: '', day: '' }
      let year = this.format('yyyy', max) - this.format('yyyy', min)
      let month = this.format('MM', max) - this.format('MM', min) - 1 // 不算起止月
      let day = parseInt(this.format('dd', max)) + (parseInt(this.format('md', min)) - parseInt(this.format('dd', min)) + 1) // 起始月天数(=当月最大天数-当月已过天数+1)+截至月天数
      // 1.如果同年同月，则相差天数相减即为最后天数，month置为0
      if (year === 0 && month < 0) {
        month = 0
        day = parseInt(this.format('dd', max)) - parseInt(this.format('dd', min)) + 1
      } else if (parseInt(this.format('dd', max)) === parseInt(this.format('md', max))) {
        // 2.如果起始日为月初即parseInt(this.format("dd", min)==1，则月份加一，天数为截至月日期（与第一条互斥）
        month = month + 1
        day = parseInt(this.format('md', min)) - parseInt(this.format('dd', min)) + 1
      }
      // 3.day天数大于起始月总天数时，月份加一，多出天数为天数差
      if (day >= parseInt(this.format('md', min))) {
        month = month + 1
        day = day - parseInt(this.format('md', min))
      }
      // 4.如果月份相同 month==-1且day=0，则年数减一，月数=11
      if (month < 0) {
        month = (month + 12) % 12
        year--
      }
      if (month === 12) {
        year = year + 1
        month = 0
      }

      result.year = year
      result.month = month
      result.day = day
      result.totalDay = new Date(result.end).getTime() - new Date(result.start).getTime()
      console.log(result)
      return result
    },
    conEndDate2Change() {
      this.form.bizEntityJson.bisContFreeDayList = [{
        yearIndex: '',
        quarterIndex: '',
        daySum: ''
      }]
      this.countYMD()
      // this.standardFeeCalc()
      // if (!this.form.bizEntityJson.rentFeeType) {
      //   this.$set(this.form.bizEntityJson, 'rentFeeType', 1)
      // }
      // this.propStandardFeeCalc()
      // if (!this.form.bizEntityJson.propFeeType) {
      //   this.$set(this.form.bizEntityJson, 'propFeeType', 1)
      // }
    },
    standardFeeCalc() {
      this.$message.closeAll()
      if (!this.form.bizEntityJson.bisProjectId) return this.$message.error('请选择项目名称')
      if (!this.form.bizEntityJson.bisStoreIds) return this.$message.error('请选择租赁区域')
      if (!this.form.bizEntityJson.calcArea2) return this.$message.error('请填写实际计租面积')
      if (!this.form.bizEntityJson.conOpenDate2) return this.$message.error('请选择租金起计日')
      if (!this.form.bizEntityJson.conEndDate2) return this.$message.error('请选择返租到期日')
      if (!this.form.bizEntityJson.rentFeeType) {
        this.$set(this.form.bizEntityJson, 'rentFeeType', 1)
      }
      if (!this.form.bizEntityJson.propFeeType) {
        this.$set(this.form.bizEntityJson, 'propFeeType', 1)
      }
      if (this.form.bizEntityJson.rentFeeType == 2 || this.form.bizEntityJson.rentFeeType == 3) {
        if (!this.form.bizEntityJson.pumpingType) this.form.bizEntityJson.pumpingType = '1001'
        this.form.bizEntityJson.rentPaymentCycle1 = ''
        this.form.bizEntityJson.fixRentPaymentCycle = ''
      }
      this.rentFeeList = []
      this.sumRentFeeList = {}
      this.form.bizEntityJson.rentFeeList = []
      const param = {
        projectId: this.form.bizEntityJson.bisProjectId,
        storeId: this.form.bizEntityJson.bisStoreIds,
        approveId: this.form.bizEntityJson.randomId,
        feeType: '1',
        conOpenDate2: this.form.bizEntityJson.conOpenDate2,
        conEndDate2: this.form.bizEntityJson.conEndDate2,
        calcArea2: this.form.bizEntityJson.calcArea2
      }
      this.$approval.standardFeeCalc(param).then(res => {
        if(res.code == 1) {
          if (res.data.length > 0) {
            this.form.bizEntityJson.rentFeeList = []
            for (let key in res.data) {
              this.rentFeeList = res.data
              this.form.bizEntityJson.rentFeeList.push({
                yearIndex: res.data[key].yearIndex, // 租赁年度
                priceStandard: res.data[key].price, // 租金标准
                priceActual: '', // 申请租金单价
                totalPriceStandard: res.data[key].yearTotal, // 标准年租
                totalPriceActual: '', // 申请年租
                yearRentDiff: '', // 每年总租金差异额
                yearRentRate: '', // 每年总租金折扣率
                increasingRate: '', // 合同期递增率
                freeDayNum: 0, // 免租期
                deductionRate: '', // 申请扣率
                sales: '', // 预估月营业额
                estimatePrice: '', // 手机端需要 抽成类型的预估单价
                // ladderList: [
                //   {
                //     ladderStart: '', // 阶梯起点
                //     ladderEnd: '', // 阶梯终点
                //     ladderRate: '' // 申请扣率
                //   }
                // ],
                ladderStart: '0',
                ladderEnd: '',
                ladderRate: '',
                ladderList: [],
                last: true,
                ladderLength: 1,
              })
            }
            if (this.form.bizEntityJson.bisContFreeDayList[0].daySum) {
              this.form.bizEntityJson.rentFeeList.forEach((item, index) => {
                for (let key in this.form.bizEntityJson.bisContFreeDayList) {
                  if (item.yearIndex == this.form.bizEntityJson.bisContFreeDayList[key].yearIndex) {
                    item.freeDayNum += Number(this.form.bizEntityJson.bisContFreeDayList[key].daySum)
                  }
                }
              })
            }
            console.log(this.form.bizEntityJson.rentFeeList)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    propStandardFeeCalc() {
      this.$message.closeAll()
      if (!this.form.bizEntityJson.bisProjectId) return this.$message.error('请选择项目名称')
      if (!this.form.bizEntityJson.bisStoreIds) return this.$message.error('请选择租赁区域')
      if (!this.form.bizEntityJson.calcArea2) return this.$message.error('请填写实际计租面积')
      if (!this.form.bizEntityJson.conOpenDate2) return this.$message.error('请选择租金起计日')
      if (!this.form.bizEntityJson.conEndDate2) return this.$message.error('请选择返租到期日')
      this.sumPropertyFeeList = {}
      this.form.bizEntityJson.propertyFeeList = []
      const param = {
        projectId: this.form.bizEntityJson.bisProjectId,
        storeId: this.form.bizEntityJson.bisStoreIds,
        approveId: this.form.bizEntityJson.randomId,
        feeType: '2',
        conOpenDate2: this.form.bizEntityJson.conOpenDate2,
        conEndDate2: this.form.bizEntityJson.conEndDate2,
        calcArea2: this.form.bizEntityJson.calcArea2
      }
      this.$approval.standardFeeCalc(param).then(res => {
        if(res.code == 1) {
          if (res.data.length > 0) {
            this.form.bizEntityJson.propertyFeeList = []
            for (let key in res.data) {
              this.form.bizEntityJson.propertyFeeList.push({
                yearIndex: res.data[key].yearIndex, // 租赁年度
                priceStandard: res.data[key].price, // 租金标准
                priceActual: '', // 申请租金单价
                totalPriceStandard: res.data[key].yearTotal, // 标准年租
                totalPriceActual: '', // 申请年租
                yearRentDiff: '', // 每年总租金差异额
                yearRentRate: '', // 每年总租金折扣率
              })
            }
            console.log(this.form.bizEntityJson.propertyFeeList)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    addLadder(index) {
      if (!this.form.bizEntityJson.rentFeeList[index].ladderEnd) return this.$message.error('请填写阶梯终点额')
      if (!this.form.bizEntityJson.rentFeeList[index].ladderRate) return this.$message.error('请填写申请扣率')
      let newData = {
        yearIndex: '',
        ladderIndex: '',
        ladderStart: this.form.bizEntityJson.rentFeeList[index].ladderEnd,
        ladderEnd: '',
        ladderRate: '',
        last: true
      }
      for (let i = index; i >= 0; i--) {
        if (this.form.bizEntityJson.rentFeeList[i].yearIndex) {
          this.form.bizEntityJson.rentFeeList[i].ladderLength ++
          newData.ladderIndex = this.form.bizEntityJson.rentFeeList[i].yearIndex
          this.form.bizEntityJson.rentFeeList.splice(index + 1, 0, newData)
          console.log(this.form.bizEntityJson.rentFeeList)
          if (this.form.bizEntityJson.rentFeeList[index].last) {
            this.form.bizEntityJson.rentFeeList[index].last = false
          }
          return
        }
      }
    },
    removeLadder(index) {
      for (let i = index; i >= 0; i--) {
        if (this.form.bizEntityJson.rentFeeList[i].yearIndex) {
          this.form.bizEntityJson.rentFeeList[i].ladderLength --
          if (this.form.bizEntityJson.rentFeeList.length > 0) {
            this.form.bizEntityJson.rentFeeList.splice(index, 1)
          }
          this.form.bizEntityJson.rentFeeList[index - 1].last = true
          return
        }
      }
      console.log(this.form.bizEntityJson.rentFeeList)
    },
    clearRentInput() {
      if (this.sumRentFeeList.total) {
        this.form.bizEntityJson.rentFeeList.forEach(item => {
          if (item.yearIndex) {
            item.totalPriceActual = ''
            item.yearRentDiff = ''
            item.yearRentRate = ''
            item.increasingRate = ''
          }
        })
        this.sumRentFeeList = {}
      }
    },
    clearPropertyInput() {
      if (this.sumPropertyFeeList.total) {
        this.form.bizEntityJson.propertyFeeList.forEach(item => {
          if (item.yearIndex) {
            item.totalPriceActual = ''
            item.yearRentDiff = ''
            item.yearRentRate = ''
          }
        })
        this.sumPropertyFeeList = {}
      }
    },
    async feeCalc(num) {
      this.$message.closeAll()
      if (!this.form.bizEntityJson.conOpenDate2) return this.$message.error('请选择租金起计日')
      var bisContFreeDayList = []
      if (this.form.bizEntityJson.bisContFreeDayList[0].daySum) {
        const paramdate = {
          conOpenDate2: this.form.bizEntityJson.conOpenDate2,
          bisContFreeDayList: this.form.bizEntityJson.bisContFreeDayList
        }
        await this.$approval.builderFreeDay(paramdate).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              bisContFreeDayList = res.data
              this.form.bizEntityJson.bisContFreeDayList = res.data
            } else {
              bisContFreeDayList = []
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
      if (!this.form.bizEntityJson.bisProjectId) return this.$message.error('请选择项目名称')
      if (!this.form.bizEntityJson.bisStoreIds) return this.$message.error('请选择租赁区域')
      if (!this.form.bizEntityJson.calcArea2) return this.$message.error('请填写实际计租面积')
      if (!this.form.bizEntityJson.conEndDate2) return this.$message.error('请选择返租到期日')
      if (num == 1) {
        if (!this.form.bizEntityJson.rentFeeType) return this.$message.error('请选择计费类型')
        if (!this.form.bizEntityJson.rentPaymentCycle1) return this.$message.error('请选择支付周期')
        if (!this.form.bizEntityJson.payModeArray[0]) return this.$message.error('请选择付款模式')
        if (this.form.bizEntityJson.rentFeeType == 2 || this.form.bizEntityJson.rentFeeType == 3) {
          if (!this.form.bizEntityJson.pumpingType) return this.$message.error('请选择抽成类型')
          if (this.form.bizEntityJson.rentPaymentCycle1 == 6 || this.form.bizEntityJson.rentPaymentCycle1 == 12) {
            if (!this.form.bizEntityJson.percentRuleShow) return this.$message.error('请选择抽成计算规则')
          }
          if (!this.form.bizEntityJson.salesType) return this.$message.error('请选择销售额类型')
        }
        if (this.form.bizEntityJson.rentFeeType == 3) {
          if (!this.form.bizEntityJson.fixRentPaymentCycle) return this.$message.error('请选择支付周期')
          if (!this.form.bizEntityJson.fixPayModeArray[0]) return this.$message.error('请选择付款模式')
        }
        
        for (let key in this.form.bizEntityJson.rentFeeList) {
          if (this.form.bizEntityJson.rentFeeType == 1) {
            if (this.form.bizEntityJson.rentFeeList[key].priceActual === '') return this.$message.error('请输入申请租金单价')
          } else {
            if (this.form.bizEntityJson.pumpingType == 1001) {
              if (this.form.bizEntityJson.rentFeeType == 3) {
                if (this.form.bizEntityJson.rentFeeList[key].priceActual === '') return this.$message.error('请输入申请租金单价')
              }
              if (!this.form.bizEntityJson.rentFeeList[key].deductionRate) return this.$message.error('请输入申请扣率')
              if (!this.form.bizEntityJson.rentFeeList[key].sales) return this.$message.error('请输入预估月营业额')
            } else {
              if (!this.form.bizEntityJson.rentFeeList[key].ladderEnd) return this.$message.error('请输入预阶梯终点额')
              if (!this.form.bizEntityJson.rentFeeList[key].ladderRate) return this.$message.error('请输入申请扣率')
              this.form.bizEntityJson.rentFeeList[key].ladderList = []
              if (this.form.bizEntityJson.rentFeeList[key].yearIndex) {
                if (this.form.bizEntityJson.rentFeeType == 3) {
                  if (this.form.bizEntityJson.rentFeeList[key].priceActual === '') return this.$message.error('请输入申请租金单价')
                }
                if (!this.form.bizEntityJson.rentFeeList[key].sales) return this.$message.error('请输入预估月营业额')
                this.form.bizEntityJson.rentFeeList[key].ladderList.push({
                  ladderStart: this.form.bizEntityJson.rentFeeList[key].ladderStart,
                  ladderEnd: this.form.bizEntityJson.rentFeeList[key].ladderEnd,
                  ladderRate: this.form.bizEntityJson.rentFeeList[key].ladderRate,
                })
              }
              for (let keyy in this.form.bizEntityJson.rentFeeList) {
                if (this.form.bizEntityJson.rentFeeList[key].yearIndex == this.form.bizEntityJson.rentFeeList[keyy].ladderIndex) {
                  this.form.bizEntityJson.rentFeeList[key].ladderList.push({
                    ladderStart: this.form.bizEntityJson.rentFeeList[keyy].ladderStart,
                    ladderEnd: this.form.bizEntityJson.rentFeeList[keyy].ladderEnd,
                    ladderRate: this.form.bizEntityJson.rentFeeList[keyy].ladderRate
                  })
                }
              }
            }
          }
        }
        var priceList = []
        this.form.bizEntityJson.rentFeeList.forEach(item => {
          if (item.yearIndex) {
            priceList.push({
              yearIndex: item.yearIndex,
              rentPrice: item.priceActual,
              deductionRate: item.deductionRate,
              sales: item.sales,
              ladderList: item.ladderList
            })
          }
        })
        console.log(this.form.bizEntityJson.rentFeeList)
      } else {
        if (!this.form.bizEntityJson.propFeeType) return this.$message.error('请选择计费类型')
        if (!this.form.bizEntityJson.managerFeePaymentCycle1) return this.$message.error('请选择支付周期')
        if (!this.form.bizEntityJson.propPayModeArray[0]) return this.$message.error('请选择付款模式')
        for (let key in this.form.bizEntityJson.propertyFeeList) {
          if (this.form.bizEntityJson.propertyFeeList[key].priceActual === '') return this.$message.error('请输入实际月物管费')
        }
        var priceList = []
        this.form.bizEntityJson.propertyFeeList.forEach(item => {
          priceList.push({
            yearIndex: item.yearIndex,
            mgrPrice: item.priceActual
          })
        })
        console.log(this.form.bizEntityJson.propertyFeeList)
      }
      this.loading = true
      if (num == 1) {
        var param = {
          projectId: this.form.bizEntityJson.bisProjectId,
          storeId: this.form.bizEntityJson.bisStoreIds,
          approveId: this.form.bizEntityJson.randomId,
          rentFeeType: this.form.bizEntityJson.rentFeeType,
          feeType: num,
          pumpingType: this.form.bizEntityJson.pumpingType,
          percentRuleShow: this.form.bizEntityJson.percentRuleShow,
          conOpenDate2: this.form.bizEntityJson.conOpenDate2,
          conEndDate2: this.form.bizEntityJson.conEndDate2,
          latestPaymentDate: this.form.bizEntityJson.latestPaymentDate,
          rentPaymentCycle1: this.form.bizEntityJson.rentPaymentCycle1,
          payModeArray: this.form.bizEntityJson.payModeArray,
          calcArea2: this.form.bizEntityJson.calcArea2,
          salesType: this.form.bizEntityJson.salesType,
          priceList: priceList,
          bisContFreeDayList: bisContFreeDayList
        }
        if (this.form.bizEntityJson.rentFeeType == 3) {
          let fixParam = {
            fixRentPaymentCycle: this.form.bizEntityJson.fixRentPaymentCycle,
            fixPayModeArray: this.form.bizEntityJson.fixPayModeArray,
            fixLatestPaymentDate: this.form.bizEntityJson.fixLatestPaymentDate
          }
          param = {... param, ...fixParam}
        }
      } else {
        var param = {
          projectId: this.form.bizEntityJson.bisProjectId,
          storeId: this.form.bizEntityJson.bisStoreIds,
          approveId: this.form.bizEntityJson.randomId,
          rentFeeType: this.form.bizEntityJson.propFeeType,
          feeType: num,
          conOpenDate2: this.form.bizEntityJson.conOpenDate2,
          conEndDate2: this.form.bizEntityJson.conEndDate2,
          latestPaymentDate: this.form.bizEntityJson.propLatestPaymentDate,
          rentPaymentCycle1: this.form.bizEntityJson.managerFeePaymentCycle1,
          payModeArray: this.form.bizEntityJson.propPayModeArray,
          calcArea2: this.form.bizEntityJson.calcArea2,
          priceList: priceList,
          bisContFreeDayList: bisContFreeDayList
        }
      }
      await this.$approval.feeCalc(param).then(res => {
        if(res.code == 1) {
          if (res.data.length > 0) {
            res.data.forEach((item, index) => {
              if (num == 1) {
                for (let key in this.form.bizEntityJson.rentFeeList) {
                  if (this.form.bizEntityJson.rentFeeList[key].yearIndex == item.yearIndex) {
                    this.form.bizEntityJson.rentFeeList[key].totalPriceActual = item.yearTotal
                    this.form.bizEntityJson.rentFeeList[key].yearRentDiff = (Number(item.yearTotal) - Number(this.form.bizEntityJson.rentFeeList[key].totalPriceStandard)).toFixed(2)
                    this.form.bizEntityJson.rentFeeList[key].yearRentRate = this.form.bizEntityJson.rentFeeList[key].totalPriceStandard ? Number(item.yearTotal) / Number(this.form.bizEntityJson.rentFeeList[key].totalPriceStandard) : 1
                    this.form.bizEntityJson.rentFeeList[key].estimatePrice = item.estimatePrice
                  }
                }
              } else {
                this.form.bizEntityJson.propertyFeeList[index].totalPriceActual = item.yearTotal
                this.form.bizEntityJson.propertyFeeList[index].yearRentDiff = (Number(item.yearTotal) - Number(this.form.bizEntityJson.propertyFeeList[index].totalPriceStandard)).toFixed(2)
                this.form.bizEntityJson.propertyFeeList[index].yearRentRate = this.form.bizEntityJson.propertyFeeList[index].totalPriceStandard ? Number(item.yearTotal) / Number(this.form.bizEntityJson.propertyFeeList[index].totalPriceStandard) : 1
              }
            })
            let newRentFeeList = JSON.parse(JSON.stringify(this.form.bizEntityJson.rentFeeList))
            for (let i = 0; i < newRentFeeList.length; i++) {
              if (!newRentFeeList[i].yearIndex) {
                newRentFeeList.splice(i, 1)
                i -= 1
              }
            }
            console.log(newRentFeeList)
            for (let key in newRentFeeList) {
              if (key != 0) {
                for (let keyy in this.form.bizEntityJson.rentFeeList) {
                  if (this.form.bizEntityJson.rentFeeList[keyy].yearIndex == newRentFeeList[key].yearIndex) {
                    this.form.bizEntityJson.rentFeeList[keyy].increasingRate = Number(newRentFeeList[key - 1].priceActual) === 0 ? 0 : (Number(newRentFeeList[key].priceActual) - Number(newRentFeeList[key - 1].priceActual)) / Number(newRentFeeList[key - 1].priceActual)
                  }
                }
              }
            }
            let sumTotalPriceStandard = 0
            let sumTotalPriceActual = 0
            let sumTotalPriceStandard5 = 0
            let sumTotalPriceActual5 = 0
            let sumYearRentDiff = 0
            if (num == 1) {
              this.form.bizEntityJson.rentFeeList.forEach(item => {
                if (item.yearIndex) {
                  sumTotalPriceStandard += Number(item.totalPriceStandard)
                  sumTotalPriceActual += Number(item.totalPriceActual)
                  sumYearRentDiff += Number(item.yearRentDiff)
                  if (item.yearIndex <= 5) {
                    sumTotalPriceStandard5 += Number(item.totalPriceStandard)
                    sumTotalPriceActual5 += Number(item.totalPriceActual)
                  }
                }
              })
              this.sumRentFeeList = {
                total: '合计',
                sumTotalPriceStandard: sumTotalPriceStandard.toFixed(2),
                sumTotalPriceActual: sumTotalPriceActual.toFixed(2),
                sumTotalPriceStandard5: sumTotalPriceStandard5.toFixed(2),
                sumTotalPriceActual5: sumTotalPriceActual5.toFixed(2),
                sumYearRentDiff: sumYearRentDiff.toFixed(2),
                sumYearRentRate: sumTotalPriceStandard ? sumTotalPriceActual / sumTotalPriceStandard : 1
              }
              this.$set(this.form.bizEntityJson, 'achievement', this.sumRentFeeList.sumTotalPriceStandard5 != '0.00' ? (Number(this.sumRentFeeList.sumTotalPriceActual5) / Number(this.sumRentFeeList.sumTotalPriceStandard5) * 100).toFixed(2) : '100')
              let sumFreeDayNum = 0
              this.form.bizEntityJson.bisContFreeDayList.forEach(item => {
                sumFreeDayNum += Number(item.daySum)
              })
              this.sumRentFeeList.sumFreeDayNum = sumFreeDayNum
            } else {
              this.form.bizEntityJson.propertyFeeList.forEach(item => {
                sumTotalPriceStandard += Number(item.totalPriceStandard)
                sumTotalPriceActual += Number(item.totalPriceActual)
                sumYearRentDiff += Number(item.yearRentDiff)
              })
              this.sumPropertyFeeList = {
                total: '合计',
                sumTotalPriceStandard: sumTotalPriceStandard.toFixed(2),
                sumTotalPriceActual: sumTotalPriceActual.toFixed(2),
                sumYearRentDiff: sumYearRentDiff.toFixed(2),
                sumYearRentRate: sumTotalPriceStandard ? sumTotalPriceActual / sumTotalPriceStandard : 1
              }
              this.$set(this.form.bizEntityJson, 'mgrFeeRate', (this.sumPropertyFeeList.sumYearRentRate * 100).toFixed(2))
            }
            console.log(this.form.bizEntityJson.rentFeeList)
            console.log(this.form.bizEntityJson.propertyFeeList)
            console.log(this.sumRentFeeList)
            console.log(this.sumPropertyFeeList)
          } else {
            this.form.bizEntityJson.rentFeeList = []
            this.form.bizEntityJson.propertyFeeList = []
            this.sumRentFeeList = {}
            this.sumPropertyFeeList = {}
          }
        } else {
          this.$message.error(res.message)
        }
      })
      await this.$approval.findBisCommerceTatal({projectCd: this.form.bizEntityJson.projectCd, chargeType: this.form.bizEntityJson.chargeType}).then(res => {
        if(res.code == 1) {
          if (res.data) {
            let sumRate = 0
            sumRate = (Number(this.sumRentFeeList.sumTotalPriceActual5) + Number(res.data.totalSjRent)) / (Number(this.sumRentFeeList.sumTotalPriceStandard5) + Number(res.data.totalBzRent))
            if (sumRate >= 1) {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'true')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'false')
            } else if (sumRate < 1 && sumRate >= 0.9) {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'true')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'false')
            } else {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'true')
            }
          } else {
            let sumRate = 0
            sumRate = Number(this.sumRentFeeList.sumTotalPriceActual5) / Number(this.sumRentFeeList.sumTotalPriceStandard5)
            if (sumRate >= 1) {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'true')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'false')
            } else if (sumRate < 1 && sumRate >= 0.9) {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'true')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'false')
            } else {
              this.$set(this.form.bizEntityJson, 'addTotalRent1', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent2', 'false')
              this.$set(this.form.bizEntityJson, 'addTotalRent3', 'true')
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
      this.loading = false
      // 新预付款保证金标准应收金额计算规则
      if (this.sumRentFeeList.total && this.sumPropertyFeeList.total) {
        let monthRentFee = 0 // 月租金
        let monthPropertyFee = 0 // 月物管费
        if (this.form.bizEntityJson.rentFeeType == 2) {
          // 固定抽成:第一年预估月销售额*对应扣率
          if (this.form.bizEntityJson.pumpingType == '1001') {
            monthRentFee = Number(this.form.bizEntityJson.rentFeeList[0].sales) * Number(this.form.bizEntityJson.rentFeeList[0].deductionRate) / 100
          }
          // 总额阶梯抽成:预估月销售额*所在区间扣率
          if (this.form.bizEntityJson.pumpingType == '1002') {
            if (this.form.bizEntityJson.rentFeeList[0].sales > this.form.bizEntityJson.rentFeeList[0].ladderList[this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1].ladderEnd) {
              monthRentFee = Number(this.form.bizEntityJson.rentFeeList[0].sales) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1].ladderRate) / 100
            } else {
              for (let key in this.form.bizEntityJson.rentFeeList[0].ladderList) {
                if (this.form.bizEntityJson.rentFeeList[0].sales > this.form.bizEntityJson.rentFeeList[0].ladderList[key].ladderStart && this.form.bizEntityJson.rentFeeList[0].sales < this.form.bizEntityJson.rentFeeList[0].ladderList[key].ladderEnd) {
                  monthRentFee = Number(this.form.bizEntityJson.rentFeeList[0].sales) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[key].ladderRate) / 100
                }
              }
            }
          }
          // 从低到高阶梯抽成
          if (this.form.bizEntityJson.pumpingType == '1003') {
            if (this.form.bizEntityJson.rentFeeList[0].sales > this.form.bizEntityJson.rentFeeList[0].ladderList[this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1].ladderEnd) {
              let sum = 0
              for (let i = this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1; i >= 0; i--) {
                if (i == this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1) {
                  sum = (Number(this.form.bizEntityJson.rentFeeList[0].sales) - Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart)) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderRate) / 100
                } else {
                  sum += (Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderEnd) - Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart)) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderRate) / 100
                }
              }
              monthRentFee = sum
            } else {
              let sum = 0
              for (let i = this.form.bizEntityJson.rentFeeList[0].ladderList.length - 1; i >= 0; i--) {
                if (this.form.bizEntityJson.rentFeeList[0].sales > this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart && this.form.bizEntityJson.rentFeeList[0].sales < this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderEnd) {
                  sum = (Number(this.form.bizEntityJson.rentFeeList[0].sales) - Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart)) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderRate) / 100
                } else if (this.form.bizEntityJson.rentFeeList[0].sales > this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart) {
                  sum += (Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderEnd) - Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderStart)) * Number(this.form.bizEntityJson.rentFeeList[0].ladderList[i].ladderRate) / 100
                }
              }
              monthRentFee = sum
            }
          }
        } else {
          // 第一年申请租金单价*实际计租面积
          monthRentFee = Number(this.form.bizEntityJson.rentFeeList[0].priceActual) * Number(this.form.bizEntityJson.calcArea2)
        }
        // 第一年实际月物管费*实际计租面积
        monthPropertyFee = Number(this.form.bizEntityJson.propertyFeeList[0].priceActual) * Number(this.form.bizEntityJson.calcArea2)
        // 主力店
        if (this.form.bizEntityJson.operTypeCd == 1) {
          this.form.bizEntityJson.bondFeeVOList[0].standardPrice = Number(monthRentFee) + Number(monthPropertyFee) > 100000 ? (Number(monthRentFee) + Number(monthPropertyFee)).toFixed(0) : 100000
          this.form.bizEntityJson.bondFeeVOList[6].standardPrice = 20000
          this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 30000
        }
        // 次主力店
        if (this.form.bizEntityJson.operTypeCd == 2 || (this.form.bizEntityJson.operTypeCd == 7 && this.form.bizEntityJson.calcArea2 >= 800)) {
          this.form.bizEntityJson.bondFeeVOList[0].standardPrice = Number(monthRentFee) + Number(monthPropertyFee) > 50000 ? (Number(monthRentFee) + Number(monthPropertyFee)).toFixed(0) : 50000
          this.form.bizEntityJson.bondFeeVOList[6].standardPrice = 20000
          this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 30000
        }
        // 小商铺
        if (this.form.bizEntityJson.operTypeCd == 3 || this.form.bizEntityJson.operTypeCd == 4 || this.form.bizEntityJson.operTypeCd == 5 || this.form.bizEntityJson.operTypeCd == 6 || (this.form.bizEntityJson.operTypeCd == 7 && this.form.bizEntityJson.calcArea2 < 800)) {
          this.form.bizEntityJson.bondFeeVOList[0].standardPrice = Number(monthRentFee) + Number(monthPropertyFee) > 20000 ? (Number(monthRentFee) + Number(monthPropertyFee)).toFixed(0) : 20000
          this.form.bizEntityJson.bondFeeVOList[6].standardPrice = 10000
          // 装修保证金 餐饮...
          let format1 = this.form.bizEntityJson.oper2.split('-')[0]
          let format2 = this.form.bizEntityJson.oper2.split('-')[1]
          if (format1 == '餐饮' || (format1 == '次主力店' && format2 == '大型餐饮')) {
            // 餐饮业态
            if (this.form.bizEntityJson.calcArea2 <= 300) {
              this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 15000
            } else {
              this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 20000
            }
          } else {
            // 非餐饮业态
            if (this.form.bizEntityJson.calcArea2 <= 200) {
              this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 5000
            } else {
              this.form.bizEntityJson.bondFeeVOList[7].standardPrice = 10000
            }
          }
        }
        this.form.bizEntityJson.bondFeeVOList[1].standardPrice = (Number(monthRentFee) * 3).toFixed(2)
        this.form.bizEntityJson.bondFeeVOList[2].standardPrice = (Number(monthPropertyFee) * 3).toFixed(2)
        this.form.bizEntityJson.bondFeeVOList[3].standardPrice = (Number(monthRentFee) * 2).toFixed(2)
        this.form.bizEntityJson.bondFeeVOList[4].standardPrice = (Number(monthPropertyFee) * 2).toFixed(2)
        if (this.form.bizEntityJson.calcArea2 <= 100) {
          this.form.bizEntityJson.bondFeeVOList[9].standardPrice = 2000
        } else if (this.form.bizEntityJson.calcArea2 > 100 && this.form.bizEntityJson.calcArea2 <= 500) {
          this.form.bizEntityJson.bondFeeVOList[9].standardPrice = 3000
        } else {
          this.form.bizEntityJson.bondFeeVOList[9].standardPrice = 5000
        }
        this.form.bizEntityJson.bondFeeVOList[12].standardPrice = 1000
      }
    },
    standardPriceChange(index, val) {
      if (val == 0) {
        if (this.form.bizEntityJson.bondFeeVOList[index].actualPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = 1
        } else {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = '-'
        }
      } else {
        this.form.bizEntityJson.bondFeeVOList[index].seizureRate = Number(this.form.bizEntityJson.bondFeeVOList[index].actualPrice) / Number(val)
      }
    },
    actualPriceChange(index, val) {
      if (val == 0) {
        if (this.form.bizEntityJson.bondFeeVOList[index].standardPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = 1
        } else {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = 0.00.toFixed(2)
        }
      } else {
        if (this.form.bizEntityJson.bondFeeVOList[index].standardPrice == 0) {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = '-'
        } else {
          this.form.bizEntityJson.bondFeeVOList[index].seizureRate = Number(val) / Number(this.form.bizEntityJson.bondFeeVOList[index].standardPrice)
        }
      }
    },
    projectBudgetBlur(val) {
      console.log(val.target.value)
      if (val.target.value == '0.00') {
        this.$alert('工程改造预算必须大于0', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            val.target.value = ''
          }
        })
      }
    },
    async getBudgetStoreInfo() {
      var bisContFreeDayList = []
      if (this.form.bizEntityJson.bisContFreeDayList[0].yearIndex) {
        const paramdate = {
          conOpenDate2: this.form.bizEntityJson.conOpenDate2,
          bisContFreeDayList: this.form.bizEntityJson.bisContFreeDayList
        }
        await this.$approval.builderFreeDay(paramdate).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              bisContFreeDayList = res.data
            } else {
              bisContFreeDayList = []
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
      let newRentFeeList = JSON.parse(JSON.stringify(this.form.bizEntityJson.rentFeeList))
      for (let i = 0; i < newRentFeeList.length; i++) {
        if (!newRentFeeList[i].yearIndex) {
          newRentFeeList.splice(i, 1)
          i -= 1
        }
      }
      const param = {
        purposeStoreDesc: this.form.bizEntityJson.purposeStoreDesc,
        bisStoreIds: this.form.bizEntityJson.bisStoreIds,
        conOpenDate2: this.form.bizEntityJson.conOpenDate2,
        conEndDate2: this.form.bizEntityJson.conEndDate2,
        calcArea2: this.form.bizEntityJson.calcArea2,
        projectCd: this.form.bizEntityJson.projectCd,
        rentFeeType: this.form.bizEntityJson.rentFeeType,
        bisContFreeDayList: bisContFreeDayList,
        rentFeeList: newRentFeeList,
        propertyFeeList: this.form.bizEntityJson.propertyFeeList
      }
      await this.$approval.getBudgetStoreInfo(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.budgetStoreInfo = res.data
          } else {
            this.budgetStoreInfo = {}
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getPreContByBisStoreId() {
      const param = {
        rentStartDate: this.form.bizEntityJson.conOpenDate2,
        bisStoreId: this.form.bizEntityJson.bisStoreIds
      }
      this.$approval.getPreContByBisStoreId(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.previousContInfo = res.data
          } else {
            this.previousContInfo = {}
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async getNewContParam() {
      var bisContFreeDayList = []
      if (this.form.bizEntityJson.bisContFreeDayList[0].yearIndex) {
        const paramdate = {
          conOpenDate2: this.form.bizEntityJson.conOpenDate2,
          bisContFreeDayList: this.form.bizEntityJson.bisContFreeDayList
        }
        await this.$approval.builderFreeDay(paramdate).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              bisContFreeDayList = res.data
            } else {
              bisContFreeDayList = []
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
      let newRentFeeList = JSON.parse(JSON.stringify(this.form.bizEntityJson.rentFeeList))
      for (let i = 0; i < newRentFeeList.length; i++) {
        if (!newRentFeeList[i].yearIndex) {
          newRentFeeList.splice(i, 1)
          i -= 1
        }
      }
      const param = {
        resApproveInfoId: this.$route.query.id,
        conOpenDate2: this.form.bizEntityJson.conOpenDate2,
        conEndDate2: this.form.bizEntityJson.conEndDate2,
        calcArea2: this.form.bizEntityJson.calcArea2,
        rentFeeType: this.form.bizEntityJson.rentFeeType,
        rentPaymentCycle1: this.form.bizEntityJson.rentFeeType == 3 ? this.form.bizEntityJson.fixRentPaymentCycle : this.form.bizEntityJson.rentPaymentCycle1,
        managerFeePaymentCycle1: this.form.bizEntityJson.managerFeePaymentCycle1,
        bisContFreeDayList: bisContFreeDayList,
        rentFeeList: newRentFeeList,
        propertyFeeList: this.form.bizEntityJson.propertyFeeList,
        totalRentStandard: this.sumRentFeeList.sumTotalPriceStandard, // 标准年租合计值
        totalRentActual: this.sumRentFeeList.sumTotalPriceActual, // 申请年租合计值
        isImported: '0',
        contractPrice: (Number(this.sumRentFeeList.sumTotalPriceActual) + Number(this.sumPropertyFeeList.sumTotalPriceActual)).toFixed(2), // 租金表-申请年租合计值+物管表-实际年度总物管费
        projectName: this.form.bizEntityJson.projectName,
        projectCd: this.form.bizEntityJson.projectCd,
        purposeStoreDesc: this.form.bizEntityJson.purposeStoreDesc,
        registeredBrand: this.form.bizEntityJson.registeredBrand,
        bisShopConnId: this.form.bizEntityJson.bisShopConnId,
        partName: this.form.bizEntityJson.partName,
        partAddress: this.form.bizEntityJson.partAddress,
        // partName: '上海肯德基有限公司',
        // partAddress: '上海市杨浦区双辽路768号',
        oper2: this.form.bizEntityJson.oper2,
        rentArea2: this.form.bizEntityJson.rentArea2,
        handDate2: this.form.bizEntityJson.handDate2,
        openDate2: this.form.bizEntityJson.openDate2,
        resBeginData: this.form.bizEntityJson.conOpenDate2,
        resEndData: this.form.bizEntityJson.conEndDate2,
        compMgrAmt21: 1,
        pumpingType: this.form.bizEntityJson.pumpingType,
      }
      await this.$approval.getNewContParam(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.contractUrl = res.data
          } else {
            this.contractUrl = {}
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 历史合作数据
    openCooperation() {
      if (window.location.href.search(/resdev/) != -1) {
        this.$message.closeAll()
        this.$message.error('无对应老网批环境')
      } else if (window.location.href.search(/resdemo/) != -1) {
        window.open(`http://demo.powerlong.com/PowerDesk/bis/bis-cont!getHistoryShow?bisShopId=${this.form.bizEntityJson.bisShopId}&bisContId=${this.form.bizEntityJson.bisContId}&purposeStoreDesc=${this.form.bizEntityJson.bisShopNameCn}&flag=1`)
      } else {
        window.open(`http://pd.powerlong.com/bis/bis-cont!getHistoryShow?bisShopId=${this.form.bizEntityJson.bisShopId}&bisContId=${this.form.bizEntityJson.bisContId}&purposeStoreDesc=${this.form.bizEntityJson.bisShopNameCn}&flag=1`)
      }
    },
    // 历史招商数据
    openMerchants() {
      if (window.location.href.search(/resdev/) != -1) {
        this.$message.closeAll()
        this.$message.error('无对应老网批环境')
      } else if (window.location.href.search(/resdemo/) != -1) {
        window.open(`http://demo.powerlong.com/PowerDesk/bis/bis-cont!getHistoryShow?bisStoreId=${this.form.bizEntityJson.bisStoreIds}&bisContId=${this.form.bizEntityJson.bisContId}&bisStoreNosTemp=${this.form.bizEntityJson.rentArea2}&flag=2`)
      } else {
        window.open(`http://pd.powerlong.com/bis/bis-cont!getHistoryShow?bisStoreId=${this.form.bizEntityJson.bisStoreIds}&bisContId=${this.form.bizEntityJson.bisContId}&bisStoreNosTemp=${this.form.bizEntityJson.rentArea2}&flag=2`)
      }
    },
    // 同项目同楼层同业态数据
    openSame() {
      if (window.location.href.search(/resdev/) != -1) {
        this.$message.closeAll()
        this.$message.error('无对应老网批环境')
      } else if (window.location.href.search(/resdemo/) != -1) {
        window.open(`http://demo.powerlong.com/PowerDesk/bis/bis-cont!getHistoryShow?bisStoreId=${this.form.bizEntityJson.bisStoreIds}&bisContId=${this.form.bizEntityJson.bisContId}&projectCd=${this.form.bizEntityJson.projectCd}&flag=3`)
      } else {
        window.open(`http://pd.powerlong.com/bis/bis-cont!getHistoryShow?bisStoreId=${this.form.bizEntityJson.bisStoreIds}&bisContId=${this.form.bizEntityJson.bisContId}&projectCd=${this.form.bizEntityJson.projectCd}&flag=3`)
      }
    },
    openCont(item) {
      if (window.location.href.search(/resdev/) != -1) {
        this.$message.closeAll()
        this.$message.error('无对应老网批环境')
      } else if (window.location.href.search(/resdemo/) != -1) {
        window.open(`http://demo.powerlong.com/PowerDesk/bis/bs-info-rent2!input.action?id=${item.bisContId}`)
      } else {
        window.open(`http://pd.powerlong.com/bis/bs-info-rent2!input.action?id=${item.bisContId}`)
      }
    },
    // 新建合同文本
    openContract() {
      console.log(this.contractUrl)
      window.opener.postMessage({
        type: 'url',
        autoFileFields: this.contractUrl.autoFileFields,
        createContLedFiels: this.contractUrl.createContLedFiels,
        getContUrl: this.contractUrl.getContUrl,
        disPlayNo: this.form.pmApprove.approveNo,
        temp: this.contractUrl.temp
      }, '*')
    },
    findContNo() {
      this.$approval.findContNo({approveId: this.$route.query.id}).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.contractCode = res.data.contractNo
            this.scContId = res.data.scContId
          } else {
            this.contractCode = ''
            this.scContId = ''
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    openContractNo() {
      if (window.location.href.search(/resdev/) != -1) {
        this.$message.closeAll()
        this.$message.error('无对应老网批环境')
      } else if (window.location.href.search(/resdemo/) != -1) {
        window.open(`http://demo.powerlong.com/PowerDesk/sc/sc-contract-templet-info!readNonStandardCon.action?scContId=${this.scContId}`)
      } else {
        window.open(`http://pd.powerlong.com/sc/sc-contract-templet-info!readNonStandardCon.action?scContId=${this.scContId}`)
      }
    },
    repairData() {
      this.$message.closeAll()
      if (this.form.bizEntityJson.pumpingType == 1002 || this.form.bizEntityJson.pumpingType == 1003) {
        if (!this.sumRentFeeList.total) return this.$message.error('请计算后在存草稿'), false
      }
      // 清楚阶梯计算脏数据后提交,支持存草稿
      // for (let i = 0; i < this.form.bizEntityJson.rentFeeList.length; i++) {
      //   if (!this.form.bizEntityJson.rentFeeList[i].yearIndex) {
      //     this.form.bizEntityJson.rentFeeList.splice(i, 1)
      //     i -= 1
      //   }
      // }
    },
    validate() {
      this.$message.closeAll()
      if (!this.sumRentFeeList.total) return this.$message.error('请计算后在发起审批单'), false
      if (!this.sumPropertyFeeList.total) return this.$message.error('请计算后在发起审批单'), false
      for (let key in this.form.bizEntityJson.bisContFreeDayList) {
        if (this.form.bizEntityJson.bisContFreeDayList[key].yearIndex || this.form.bizEntityJson.bisContFreeDayList[key].quarterIndex || this.form.bizEntityJson.bisContFreeDayList[key].daySum) {
          if (!this.form.bizEntityJson.bisContFreeDayList[key].yearIndex) return this.$message.error('请填写免租年后在发起审批单'), false
          if (!this.form.bizEntityJson.bisContFreeDayList[key].quarterIndex) return this.$message.error('请填写免租季度后在发起审批单'), false
          if (!this.form.bizEntityJson.bisContFreeDayList[key].daySum) return this.$message.error('请填写免租日后在发起审批单'), false
        }
      }
      if (this.form.bizEntityJson.periods == 1) {
        this.$set(this.form.bizEntityJson, 'openDate2', this.form.bizEntityJson.conOpenDate2)
        this.$set(this.form.bizEntityJson, 'appointLastOpenDate2', this.form.bizEntityJson.conOpenDate2)
      }
      if (this.form.bizEntityJson.projectChange == 1) {
        this.$set(this.form.bizEntityJson, 'projectBudget', '')
      }
    },
  }
}
</script>
/* 本地模板编译需要的css，不需要上传到后台 */
<style type="text/css" lang="scss">
@import '../publicSheet/publicSheet.scss';
</style>
