<template>
  <!--  明源-目标成本调整审核表-->
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
    </el-row>

    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>二、目标成本调整信息</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1" class="title-col">
        <h2>序号</h2>
      </el-col>
      <el-col :span="3" class="title-col">
        <h2>科目名称</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>调整前科目金额(含税)</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>科目余量</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>调整金额(含税)</h2>
      </el-col>
      <el-col :span="5" class="title-col right-col">
        <h2>调整后科目金额(含税)</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">1</span>
      </el-col>
      <el-col :span="3">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[0].subjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[0].subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[0].amountBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[0].amountBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[0].subjectMargin, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[0].subjectMargin" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[0].adjustedAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[0].adjustedAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[0].amountAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[0].amountAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">2</span>
      </el-col>
      <el-col :span="3">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[1].subjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[1].subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[1].amountBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[1].amountBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[1].subjectMargin, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[1].subjectMargin" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[1].adjustedAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[1].adjustedAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[1].amountAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[1].amountAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">3</span>
      </el-col>
      <el-col :span="3">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[2].subjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[2].subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[2].amountBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[2].amountBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[2].subjectMargin, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[2].subjectMargin" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[2].adjustedAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[2].adjustedAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[2].amountAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[2].amountAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">4</span>
      </el-col>
      <el-col :span="3">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[3].subjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[3].subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[3].amountBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[3].amountBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[3].subjectMargin, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[3].subjectMargin" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[3].adjustedAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[3].adjustedAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.targetCostAdjustmentList[3].amountAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCostAdjustmentList[3].amountAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>三、目标成本调整管控指标</h2>
      </el-col>
      <el-col :span="1" class="title-col">
        <h2>序号</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>管控要点</h2>
      </el-col>
      <el-col :span="4" class="title-col">
        <h2>亮灯情况</h2>
      </el-col>
      <el-col :span="9" class="title-col right-col">
        <h2>亮灯情况概率</h2>
      </el-col>
      <el-col :span="5" class="title-col right-col">
        <h2>原因说明</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">1</span>
      </el-col>
      <el-col :span="5">
        <span class="span-100">历史累计调整金额(含本次)</span>
      </el-col>
      <el-col :span="4">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.alightingSituation">
            <el-radio class="line-radio" :label="'1'">绿灯</el-radio>
            <el-radio class="line-radio" :label="'2'">黄灯</el-radio>
            <el-radio class="line-radio" :label="'3'">红灯</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="d-min">
          <span class="span-auto" style="width:35%">历史累计调整金额(含本次)为</span>
          <el-input v-model="form.bizEntityJson.adjustedAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:25%">大于2000W，亮黄灯</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.adjustedReason1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">2</span>
      </el-col>
      <el-col :span="5">
        <span class="span-100">历史累计调整比例(含本次)</span>
      </el-col>
      <el-col :span="4">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.plightingSituation">
            <el-radio class="line-radio" :label="'1'">绿灯</el-radio>
            <el-radio class="line-radio" :label="'2'">黄灯</el-radio>
            <el-radio class="line-radio" :label="'3'">红灯</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="d-min">
          <span class="span-auto" style="width:35%">历史累计调整比例(含本次)为</span>
          <el-input v-model="form.bizEntityJson.adjustedRatio" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:25%">大于3%，亮黄灯</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.adjustedReason2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">3</span>
      </el-col>
      <el-col :span="5">
        <span class="span-100">本分期目前成本总调整次数(不包含结转、含本次)</span>
      </el-col>
      <el-col :span="4">
        <div class="d-min">
          <el-radio-group v-model="form.bizEntityJson.tlightingSituation">
            <el-radio class="line-radio" :label="'1'">绿灯</el-radio>
            <el-radio class="line-radio" :label="'2'">黄灯</el-radio>
            <el-radio class="line-radio" :label="'3'">红灯</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="d-min">
          <span class="span-auto" style="width:55%">本分期目前成本总调整次数(不包含结转、含本次)为</span>
          <el-input v-model="form.bizEntityJson.adjustedNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:25%">次，亮红灯</span>
        </div>
      </el-col>
      <el-col :span="5" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.adjustedReason3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>四、业态单方信息列表</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1" class="title-col">
        <h2>序号</h2>
      </el-col>
      <el-col :span="2" class="title-col">
        <h2>业态名称</h2>
      </el-col>
      <el-col :span="7" class="title-col">
        <h2>调整前目标成本</h2>
      </el-col>
      <el-col :span="7" class="title-col right-col">
        <h2>调整后目标成</h2>
      </el-col>
      <el-col :span="7" class="title-col right-col">
        <h2>差额</h2>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">1</span>
       </el-col>
      <el-col :span="2">
        <span class="span-100">高层-超高层</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrshrCostBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrshrCostBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrshrCostAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrshrCostAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrshrDifferenceAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrshrDifferenceAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">2</span>
      </el-col>
      <el-col :span="2">
        <span class="span-100">高层-大高层</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrbhrCostBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrbhrCostBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrbhrCostAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrbhrCostAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.hrbhrDifferenceAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hrbhrDifferenceAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">3</span>
      </el-col>
      <el-col :span="2">
        <span class="span-100">别墅-联排别墅</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trCostBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trCostBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trCostAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trCostAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.trDifferenceAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.trDifferenceAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="1">
        <span class="span-100">4</span>
      </el-col>
      <el-col :span="2">
        <span class="span-100">底层-商铺</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.sgfCostBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sgfCostBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.sgfCostAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sgfCostAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.sgfDifferenceAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sgfDifferenceAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="3">
        <span class="span-100">合计</span>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.totalCostBeforeAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalCostBeforeAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.totalCostAfterAdjustment, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalCostAfterAdjustment" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.totalDifferenceAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalDifferenceAmount" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <span class="span-auto" style="width:45px;">元</span>
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
          <span class="span-auto">文件</span>
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
const uploadUrl = 'api/file/uploadFile'
export default {
  data() {
    return {
      form: {},
      disabled: true,
      showSearchOrg: false,
      fileDetail: null,
      uploadUrl: uploadUrl,
      userInfo: {}
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'startUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'startUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'targetCostAdjustmentList', [])
      this.addList()
      this.addList()
      this.addList()
      this.addList()
      this.addList()
    }
  },
  methods: {
    addList() {
      let newData = {
        subjectName: '',
        amountBeforeAdjustment: '',
        subjectMargin: '',
        adjustedAmount: '',
        amountAfterAdjustment: ''
      }
      this.form.bizEntityJson.targetCostAdjustmentList.push(newData)
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
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

    }
  }
}
</script>
<style type="text/css" lang="scss">
@import 'src/views/form/publicSheet/publicSheet';
</style>