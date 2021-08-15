<template>
<!--  明源-目标成本审批表-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col topRight-col">
        <h2>一、基本信息</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>流程序号</span>
          <el-input :class="{'novalue': !form.bizEntityJson.processNumber, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.processNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>发起时间</span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.startDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.startDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>发起人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.startUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.startUserName" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>发起部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>二、目标成本信息</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3" class="title-col">
        <h2>科目名称</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>科目金额（含税）</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>科目金额（不含税）</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>单方成本（含税）</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>单方成本（不含税）</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">土地成本</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.landCostSubjectAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.landCostSubjectAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.landCostSubjectAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.landCostSubjectAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.landCostUnilateralAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.landCostUnilateralAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.landCostUnilateralAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.landCostUnilateralAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">开发前期准备费</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.pfdSubjectAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.pfdSubjectAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.pfdSubjectAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.pfdSubjectAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.pfdUnilateralAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.pfdUnilateralAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.pfdUnilateralAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.pfdUnilateralAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">建安费用</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.cicSubjectAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cicSubjectAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.cicSubjectAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cicSubjectAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.cicUnilateralAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cicUnilateralAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.cicUnilateralAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cicUnilateralAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">综合费用</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.ccSubjectAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.ccSubjectAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.ccSubjectAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.ccSubjectAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.ccUnilateralAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.ccUnilateralAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.ccUnilateralAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.ccUnilateralAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">合计</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.subjectTotalAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.subjectTotalAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.subjectTotalAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.subjectTotalAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.unilateralTotalAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unilateralTotalAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.unilateralTotalAmountTax, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unilateralTotalAmountTax" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>三、业态单方信息列表</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3" class="title-col">
        <h2>业态</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>总成本</h2>
      </el-col>
      <el-col :span="8" class="title-col">
        <h2>建安单方/建筑面积</h2>
      </el-col>
      <el-col :span="8" class="title-col right-col">
        <h2>可售单方/可售面价</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">住宅-高层</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrrTotalCost, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrrTotalCost" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrrJiananUnilateral, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrrJiananUnilateral" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.hrrConstructionArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrrConstructionArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrrAvailableForSale, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrrAvailableForSale" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.hrrSaleableArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrrSaleableArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">住宅-小高层</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.shrrTotalCost, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shrrTotalCost" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.shrrJiananUnilateral, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shrrJiananUnilateral" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.shrrConstructionArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shrrConstructionArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.shrrAvailableForSale, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shrrAvailableForSale" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.shrrSaleableArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shrrSaleableArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">住宅-联排别墅</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trTotalCost, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trTotalCost" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trJiananUnilateral, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trJiananUnilateral" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.trConstructionArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trConstructionArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trAvailableForSale, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trAvailableForSale" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.trSaleableArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trSaleableArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">商业</span>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.businessTotalCost, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessTotalCost" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.businessJiananUnilateral, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessJiananUnilateral" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.businessConstructionArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessConstructionArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.businessAvailableForSale, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessAvailableForSale" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元/㎡ /</span>
          <el-input :class="{'novalue': !form.bizEntityJson.businessSaleableArea, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessSaleableArea" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:40px;">㎡</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>四、拿地约束条件列表</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3" class="title-col">
        <h2>序号</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>特殊条件</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>金额</h2>
      </el-col>
      <el-col :span="7" class="title-col right-col">
        <h2>计划完成日期</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">1</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[0][specialConditions]" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[0].amount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7" class="right-col">
        <div class="d-min">
          <el-date-picker
              v-model="form.bizEntityJson.restrictionsList[0].plannedCompletionTime"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">2</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[1].specialConditions" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[1].amount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7" class="right-col">
        <div class="d-min">
          <el-date-picker
              v-model="form.bizEntityJson.restrictionsList[1].plannedCompletionTime"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">3</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[2].specialConditions" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[2].amount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7" class="right-col">
        <div class="d-min">
          <el-date-picker
              v-model="form.bizEntityJson.restrictionsList[2].plannedCompletionTime"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">4</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[3].specialConditions" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[3].amount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7" class="right-col">
        <div class="d-min">
          <el-date-picker
              v-model="form.bizEntityJson.restrictionsList[3].plannedCompletionTime"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">5</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[4].specialConditions" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.restrictionsList[4].amount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="7" class="right-col">
        <div class="d-min">
          <el-date-picker
              v-model="form.bizEntityJson.restrictionsList[4].plannedCompletionTime"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>五、附件</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <span class="span-auto" style="width:11.5">文件</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.fileId, 'required': !form.bizEntityJson.disabled}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
                :before-remove="beforeRemoveGlobal"
                :before-upload="beforeUploadGlobal"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.fileId"
                style="display: flex;">
              <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: data,
      disabled: true,
      showSearchOrg: false,
      fileDetail: null,
      uploadUrl: uploadUrl,
      fileList: fileList || [],
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.form.bizEntityJson.centerOrgName) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
    }
    if (!this.form.bizEntityJson.centerOrgName) {
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
    }
    if (!this.form.bizEntityJson.centerOrgName) {
      this.$set(this.form.bizEntityJson, 'startUserName', this.userInfo.startUserName)
    }
    if (!this.form.bizEntityJson.centerOrgName) {
      this.$set(this.form.bizEntityJson, 'startUserCd', this.userInfo.startUserCd)
    }
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'restrictionsList', [])
      this.addList()
      this.addList()
      this.addList()
      this.addList()
      this.addList()
    }
    if (this.$route.query.id && !this.form.bizEntityJson.disabled) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'startUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'startUserCd', this.userInfo.userid)
      if (!this.form.bizEntityJson.restrictionsList[0]) {
        this.addList()
        this.addList()
        this.addList()
        this.addList()
        this.addList()
      }
      if (!this.form.bizEntityJson.restrictionsList[1]) {
        this.addList()
        this.addList()
        this.addList()
        this.addList()
      }
      if (!this.form.bizEntityJson.restrictionsList[2]) {
        this.addList()
        this.addList()
        this.addList()
      }
      if (!this.form.bizEntityJson.restrictionsList[3]) {
        this.addList()
        this.addList()
      }
      if (!this.form.bizEntityJson.restrictionsList[4]) {
        this.addList()
      }
    }
  },
  methods: {
    addList() {
      let newData = {
        specialConditions: '',
        amount: '',
        plannedCompletionTime: ''
      }
      this.form.bizEntityJson.restrictionsList.push(newData)
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      let nowfile
      if(file.response) {
        nowfile = file.response.data.fileId
      }else {
        nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(response, file, fileList) {
      const fileId = response.data.fileId
      if(!this.form.bizEntityJson.fileId) {
        this.$set(this.form.bizEntityJson,'fileId','')
      }
      this.form.bizEntityJson.fileId += fileId
    },
    onChangeToolFile(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1].raw]
      }
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
    },
    // 必填判断
    validate() {

    },
  }
}
</script>
<style type="text/css" lang="scss">
@import 'src/views/form/publicSheet/publicSheet';
</style>