<template>
  <div class="app-page-main">
    <div class="shop">
      <div style="display: flex">
        <div class="writeplaceholder">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <el-button round @click="seek">搜索</el-button>
        <p @click="seach">高级搜索 <i :class=" show ? 'el-icon-caret-top':'el-icon-caret-bottom'" /></p>
        <el-button class="btn" @click="rest">重置</el-button>
      </div>
      <div class="search">
        <el-button round @click="takeApartShopClick">拆铺</el-button>
        <el-button round @click="combineShopClick">合铺</el-button>
      </div>
    </div>
    <div v-if="show" class="drop-down">
      <el-select v-model="v1" placeholder="请选择物业类型" class="innter">
        <el-option label="Mall" value="1" />
        <el-option label="商业街" value="2" />
      </el-select>
      <el-select v-model="v2" placeholder="请选择楼层" class="innter">
        <el-option label="L6" value="1" />
        <el-option label="L5" value="2" />
        <el-option label="L5" value="3" />
        <el-option label="L3" value="4" />
        <el-option label="L2" value="5" />
        <el-option label="L1" value="6" />
        <el-option label="B1" value="7" />
        <el-option label="B2" value="8" />
      </el-select>
      <el-select v-model="v3" placeholder="请选择合同类型" class="innter">
        <el-option label="续签合同" value="1" />
        <el-option label="被动新增招商" value="2" />
        <el-option label="主动新增招商" value="3" />
      </el-select>
      <el-select v-model="v4" placeholder="请选择铺位类型" class="innter">
        <el-option label="已有铺位" value="1" />
        <el-option label="新浦" value="2" />
      </el-select>
    </div>

    <div class="tablelist">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :header-cell-style="rowClass"
        @select="handleSelect"
        @select-all="handleALL"
        @sort-change="sortChange"
      >
        <el-table-column label="基础信息" align="center">
          <template slot="header">
            <span>基础信息 K</span>
          </template>
          <!-- 复选框 -->
          <el-table-column type="selection" width="55" style="" />
          <el-table-column prop="v1" label="商铺号" width="120" sortable>
            <template slot="header">
              <span>商铺号</span>
              <img
                v-if="lists.v1 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v1 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v2" label="物业类型" sortable>
            <template slot="header">
              <span>物业类型</span>
              <img
                v-if="lists.v2 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v2 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v3" label="楼层" sortable>
            <template slot="header">
              <span>楼层</span>
              <img
                v-if="lists.v3 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v3 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v4" label="计租面积(㎡)" width="110" sortable>
            <template slot="header">
              <span>计租面积(㎡)</span>
              <img
                v-if="lists.v4 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v4 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v5" label="业态" sortable>
            <template slot="header">
              <span>业态</span>
              <img
                v-if="lists.v5 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v5 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v6" label="资产属性" sortable>
            <template slot="header">
              <span>资产属性</span>
              <img
                v-if="lists.v6 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v6 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v7" label="销售状态" sortable>
            <template slot="header">
              <span>销售状态</span>
              <img
                v-if="lists.v7 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v7 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v8"
            label="返租/整租到期日"
            width="150"
            sortable
          >
            <template slot="header">
              <span>返租/整租到期日</span>
              <img
                v-if="lists.v8 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v8 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v9" label="标准租金" sortable>
            <template slot="header">
              <span>标准租金</span>
              <img
                v-if="lists.v9 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v9 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v10" label="标准物管费" width="95px" sortable>
            <template slot="header">
              <span>标准物管费</span>
              <img
                v-if="lists.v10 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v10 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v11"
            label="历史合同单价"
            width="120px"
            sortable
          >
            <template slot="header">
              <span>历史合同单价</span>
              <img
                v-if="lists.v11 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v11 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v12" label="期初状态" sortable>
            <template slot="header">
              <span>期初状态</span>
              <img
                v-if="lists.v12 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v12 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v13" label="期间合同数量" width="110" sortable>
            <template slot="header">
              <span>期间合同数量</span>
              <img
                v-if="lists.v13 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v13 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v14" label="是否调铺" sortable>
            <template slot="header">
              <span>是否调铺</span>
              <img
                v-if="lists.v14 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v14 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v15" label="调铺生效日" width="120" sortable>
            <template slot="header">
              <span>调铺生效日</span>
              <img
                v-if="lists.v15 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v15 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="合同信息"
          align="center"
          style="padding-left: 10px"
        >
          <template slot="header">
            <span>合同信息 K</span>
            <!-- <img src="@/assets/imges/24pt／向左收缩@2x.png" width="20" alt="" /> -->
          </template>
          <el-table-column prop="v16" label="合同类型" width="81" sortable>
            <template slot="header">
              <span>合同类型</span>
              <img
                v-if="lists.v16 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v16 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v17" label="合同号" width="120" sortable>
            <template slot="header">
              <span>合同号</span>
              <img
                v-if="lists.v17 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v17 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v18" label="合同开始日期" width="120" sortable>
            <template slot="header">
              <span>合同开始日期</span>
              <img
                v-if="lists.v18 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v18 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v19" label="合同结束日期" width="120" sortable>
            <template slot="header">
              <span>合同结束日期</span>
              <img
                v-if="lists.v19 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v19 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v20" label="品牌名称" sortable>
            <template slot="header">
              <span>品牌名称</span>
              <img
                v-if="lists.v20 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v20 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v21" label="计租方式" sortable>
            <template slot="header">
              <span>计租方式</span>
              <img
                v-if="lists.v21 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v21 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v22" label="固定支付周期" width="110" sortable>
            <template slot="header">
              <span>固定支付周期</span>
              <img
                v-if="lists.v22 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v22 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v23"
            label="租金单价(元/月/㎡)"
            width="150"
            sortable
          >
            <template slot="header">
              <span>租金单价(元/月/㎡)</span>
              <img
                v-if="lists.v23 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v23 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v24" label="达成率" sortable>
            <template slot="header">
              <span>达成率</span>
              <img
                v-if="lists.v24 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v24 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v25" label="租金递增率" width="100" sortable>
            <template slot="header">
              <span>租金递增率</span>
              <img
                v-if="lists.v25 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v25 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v26" label="扣点支付周期" width="110" sortable>
            <template slot="header">
              <span>扣点支付周期</span>
              <img
                v-if="lists.v26 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v26 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v26" label="扣点率" sortable>
            <template slot="header">
              <span>扣点率</span>
              <img
                v-if="lists.v26 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v26 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v27" label="销售额方式" width="100" sortable>
            <template slot="header">
              <span>销售额方式</span>
              <img
                v-if="lists.v27 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v27 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v28"
            label="2021年预估销售额"
            width="150"
            sortable
          >
            <template slot="header">
              <span>2021年预估销售额</span>
              <img
                v-if="lists.v28 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v28 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v29"
            label="1月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>1月预估销售额</span>
              <img
                v-if="lists.v29 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v29 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v30"
            label="2月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>2月预估销售额</span>
              <img
                v-if="lists.v30 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v30 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v31"
            label="3月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>3月预估销售额</span>
              <img
                v-if="lists.v31 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v31 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v32"
            label="4月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>4月预估销售额</span>
              <img
                v-if="lists.v32 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v32 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v33"
            label="5月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>5月预估销售额</span>
              <img
                v-if="lists.v33 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v33 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v34"
            label="6月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>6月预估销售额</span>
              <img
                v-if="lists.v34 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v34 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v35"
            label="7月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>7月预估销售额</span>
              <img
                v-if="lists.v35 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v35 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v36"
            label="8月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>8月预估销售额</span>
              <img
                v-if="lists.v36 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v36 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v36"
            label="9月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>9月预估销售额</span>
              <img
                v-if="lists.v36 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v36 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v37"
            label="10月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>10月预估销售额</span>
              <img
                v-if="lists.v37 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v37 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v38"
            label="11月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>11月预估销售额</span>
              <img
                v-if="lists.v38 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v38 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v38"
            label="12月预估销售额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>12月预估销售额</span>
              <img
                v-if="lists.v38 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v38 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v39"
            label="物管费支付周期"
            width="150"
            sortable
          >
            <template slot="header">
              <span>物管费支付周期</span>
              <img
                v-if="lists.v39 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v39 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v40"
            label="物管费单价(元/月/㎡)"
            width="170"
            sortable
          >
            <template slot="header">
              <span>物管费单价(元/月/㎡)</span>
              <img
                v-if="lists.v40 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v40 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v41" label="物管费递增率" width="110" sortable>
            <template slot="header">
              <span>物管费递增率</span>
              <img
                v-if="lists.v41 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v41 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v42" label="免租期" sortable>
            <template slot="header">
              <span>免租期</span>
              <img
                v-if="lists.v42 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v42 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v43" label="有效租期" sortable>
            <template slot="header">
              <span>有效租期</span>
              <img
                v-if="lists.v43 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v43 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v44" label="计租月数" sortable>
            <template slot="header">
              <span>计租月数</span>
              <img
                v-if="lists.v44 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v44 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v45" label="计费月数" width="210" sortable>
            <template slot="header">
              <span>计费月数</span>
              <img
                v-if="lists.v45 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v45 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v46" label="租金合计(元)" width="110" sortable>
            <template slot="header">
              <span>租金合计(元)</span>
              <img
                v-if="lists.v46 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v46 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v47"
            label="物管费合计(元)"
            width="140"
            sortable
          >
            <template slot="header">
              <span>物管费合计(元)</span>
              <img
                v-if="lists.v47 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v47 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="月收入(租金/管理费)" align="center">
          <template slot="header">
            <span>月收入(租金/管理费) K</span>
            <!-- <img src="@/assets/imges/24pt／向左收缩@2x.png" width="20" alt="" /> -->
          </template>
          <el-table-column prop="v48" label="1月" width="140" sortable>
            <template slot="header">
              <span>1月</span>
              <img
                v-if="lists.v48 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v48 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v49" label="2月" width="140" sortable>
            <template slot="header">
              <span>2月</span>
              <img
                v-if="lists.v49 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v49 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v50" label="3月" sortable>
            <template slot="header">
              <span>3月</span>
              <img
                v-if="lists.v50 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v50 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v51" label="4月" width="140" sortable>
            <template slot="header">
              <span>4月</span>
              <img
                v-if="lists.v51 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v51 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v52" label="5月" width="140" sortable>
            <template slot="header">
              <span>5月</span>
              <img
                v-if="lists.v52 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v52 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v53" label="6月" width="140" sortable>
            <template slot="header">
              <span>6月</span>
              <img
                v-if="lists.v53 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v53 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v54" label="7月" width="140" sortable>
            <template slot="header">
              <span>7月</span>
              <img
                v-if="lists.v54 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v54 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v55" label="8月" width="140" sortable>
            <template slot="header">
              <span>8月</span>
              <img
                v-if="lists.v55 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v55 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v56" label="9月" width="140" sortable>
            <template slot="header">
              <span>9月</span>
              <img
                v-if="lists.v56 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v56 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v57" label="10月" width="140" sortable>
            <template slot="header">
              <span>10月</span>
              <img
                v-if="lists.v57 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v57 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v58" label="11月" sortable width="140">
            <template slot="header">
              <span>11月</span>
              <img
                v-if="lists.v58 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v58 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v59" label="12月" width="140" sortable>
            <template slot="header">
              <span>12月</span>
              <img
                v-if="lists.v59 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v59 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="财务初算" align="center">
          <template slot="header">
            <span>财务初算 K</span>
            <!-- <img src="@/assets/imges/24pt／向左收缩@2x.png" width="20" alt="" /> -->
          </template>
          <el-table-column prop="v63" label="空置期" width="81" sortable>
            <template slot="header">
              <span>空置期</span>
              <img
                v-if="lists.v63 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v63 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v63" label="计租总月数" sortable width="95">
            <template slot="header">
              <span>计租总月数</span>
              <img
                v-if="lists.v63 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v63 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v63" label="计费总月数" width="95" sortable>
            <template slot="header">
              <span>计费总月数</span>
              <img
                v-if="lists.v63 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v63 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v63" label="综合收入" sortable>
            <template slot="header">
              <span>综合收入</span>
              <img
                v-if="lists.v63 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v63 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="v64" label="欠费" sortable>
            <template slot="欠费">
              <span>核销日期</span>
              <img
                v-if="lists.v64 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v64 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v64" label="清欠目标" width="110" sortable>
            <template slot="header">
              <span>清欠目标</span>
              <img
                v-if="lists.v64 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v64 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
        </el-table-column>
        <el-table-column label="未来两年" align="center">
          <template slot="header">
            <span>未来两年 K</span>
            <!-- <img src="@/assets/imges/24pt／向左收缩@2x.png" width="20" alt="" /> -->
          </template>
          <el-table-column
            prop="v66"
            label="未来2年收入(2023/2022)"
            width="190"
            sortable
          >
            <template slot="header">
              <span>未来2年收入(2023/2022)</span>
              <img
                v-if="lists.v66 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v66 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v67"
            label="2022年租金递增率"
            width="150"
            sortable
          >
            <template slot="header">
              <span>2022年租金递增率</span>
              <img
                v-if="lists.v67 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v67 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v68"
            label="2022年计租月数"
            sortable
            width="140"
          >
            <template slot="header">
              <span>2022年计租月数</span>
              <img
                v-if="lists.v68 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v68 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v69" label="2022年租金额" width="180" sortable>
            <template slot="header">
              <span>2022年租金额</span>
              <img
                v-if="lists.v69 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v69 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v70"
            label="2023年租金递增率"
            width="150"
            sortable
          >
            <template slot="header">
              <span>2023年租金递增率</span>
              <img
                v-if="lists.v70 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v70 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v71"
            label="2023年计租月数"
            width="140"
            sortable
          >
            <template slot="header">
              <span>2023年计租月数</span>
              <img
                v-if="lists.v71 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v71 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v72" label="2023年租金额" width="140" sortable>
            <template slot="header">
              <span>2023年租金额</span>
              <img
                v-if="lists.v72 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v72 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v73"
            label="2022年物管费递增率"
            width="160"
            sortable
          >
            <template slot="header">
              <span>2022年物管费递增率</span>
              <img
                v-if="lists.v73 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v73 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v74"
            label="2022年物管费计费月数"
            width="175"
            sortable
          >
            <template slot="header">
              <span>2022年物管费计费月数</span>
              <img
                v-if="lists.v74 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v74 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v75"
            label="2022物管费金额"
            width="140"
            sortable
          >
            <template slot="header">
              <span>2022物管费金额</span>
              <img
                v-if="lists.v75 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v75 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v76"
            label="2023年物管费递增率"
            width="160"
            sortable
          >
            <template slot="header">
              <span>2023年物管费递增率</span>
              <img
                v-if="lists.v76 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v76 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v77"
            label="2023年物管费计费月数"
            width="175"
            sortable
          >
            <template slot="header">
              <span>2023年物管费计费月数</span>
              <img
                v-if="lists.v77 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v77 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column
            prop="v78"
            label="2023年物管费金额"
            width="150"
            sortable
          >
            <template slot="header">
              <span>2023年物管费金额</span>
              <img
                v-if="lists.v78 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v78 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="v83" label="操作" width="100" sortable>
            <template slot="header">
              <span>操作</span>
              <img
                v-if="lists.v83 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.v83 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <Pagination />
    <TakeApartShopPop ref="takeApartShopPop" />
    <CombineShopPop ref="combineShopPop" />
    <!-- <SalePop /> -->
  </div>
</template>
<script>
import TakeApartShopPop from './components/takeApartShopPop'
import CombineShopPop from './components/combineShopPop'
import SalePop from './components/salePop'
import { tableData, options } from '../multipathList/data.js'
export default {
  name: 'ShopPreparationList',
  components: {
    TakeApartShopPop,
    CombineShopPop,
    SalePop
  },
  data() {
    return {
      v1: '',
      v2: '',
      v3: '',
      v4: '',
      show: false,
      input: '',
      num: [],
      value: '',
      selectID: [],
      options: [],
      value: '',
      lists: {},
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.tableData = tableData
    this.options = options
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      if (columnIndex === 82) {
        return 'border-bottom-right-radius: 20px;'
      }
      if (columnIndex === 83) {
        return 'border-top-right-radius: 20px;'
      }
      if (rowIndex == 0 && columnIndex === 4) {
        return 'border-top-right-radius: 20px;'
      }
    },
    seek() {
      if (this.tableData.length > 3) {
        this.tableData.forEach((item) => {
          this.num.push(item)
        })
      }
      this.tableData.splice(3)
    },
    indexMethod(index) {
      return index + 1
    },
    rest() {
      console.log(this.num)
      if (this.num.length > 0) {
        this.tableData = this.num
      }
      this.input = ''
    },
    takeApartShopClick() {
      this.$refs.takeApartShopPop.dialogVisible4 = true
    },
    combineShopClick() {
      this.$refs.combineShopPop.dialogVisible4 = true
    },
    sortChange(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      console.log(this.lists)
      console.log(column, '---', prop, order)
    },
    seach() {
      this.show = !this.show
    },
    handleSelect(row) {
      // 选中数据的值
      console.log(row)
      this.selectID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.selectID.push(value.name)
        })
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 选中添加class
      let color = ''
      for (const item of this.selectID.values()) {
        if (item === row.name) color = 'table-SelectedRow-bgcolor'
      }
      console.log(color)
      return color
    },
    handleALL(val) {
      this.handleSelect(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-page-main {
  width: 1112px;
  height: 900px;
  background: #f6f5ee;
  margin: 0 auto;
  font-family: MicrosoftYaHei;
  padding: 10px 0px;

  .shop {
    .writeplaceholder {
      ::v-deep.el-input__inner::placeholder {
        color: #848382;
      }
    }

    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;

    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c4c7f;
      line-height: 30px;
      margin-left: 16px;
    }

    ::v-deep.el-input__inner {
      width: 220px;
      height: 32px;
      font-size: 14px;
      background: #fdfcfa;
      border-radius: 16px;
      border: none;
    }

    ::v-deep.el-button {
      width: 80px;
      height: 32px;
      line-height: 10px;
      background: #1c4c7f;
      color: white;
      margin: 0;
      margin-left: 8px;
      border: none;
    }

    ::v-deep.el-select .el-input .el-select__caret {
      line-height: 32px;
    }

    ::v-deep.el-input {
      width: 220px;
      height: 32px;
    }

    ::v-deep.el-input__icon {
      line-height: 32px !important;
    }

    .innter {
      font-size: 14px;
    }

    ::v-deep.el-input--suffix {
      width: 110px;
    }

    ::v-deep.el-input--suffix .el-input__inner {
      width: 110px;
      background: #f6f5ee;
      border: none;
    }

    .btn {
      background: #f6f5ee;
      color: #848382;
      border: none;
    }

    ::v-deep.el-input__suffix {
      right: 15px;
    }

    ::v-deep.el-input__icon {
      font-size: 5px;
      line-height: 3;
    }

    ::v-deep.el-input__inner::placeholder {
      color: #1c4c7f;
    }
  }

  .drop-down {
    margin-top: 12px;
    margin-bottom: 12px;

    ::v-deep.el-input__inner {
      height: 32px;
      line-height: 32px;
      background: #fdfcfa;
      border: none;
    }

    ::v-deep.el-input__inner::placeholder {
      color: #848382;
      font-size: 14px;
    }

    ::v-deep.el-input__inner {
      border-radius: 16px;
      width: 150px;
      padding: 0 16px;
      margin: 0 4px;
      border: none;
    }

    ::v-deep .el-select .el-input .el-select__caret {
      line-height: 32px;
      font-size: 5px;
      color: #848382;
    }
  }

  .tablelist {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 14px;
    ::v-deep.caret-wrapper {
      display: none !important;
    }
    ::v-deep.el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      border-right: none;
    }

    ::v-deep.el-table__header .is-group tr th {
      border-right: none;
    }

    ::v-deep.el-table--border,
    .el-table--group {
      border: none;
    }

    ::v-deep.el-checkbox {
      margin-right: 30px;
    }

    ::v-deep.el-table__row {
      background: #f6f5ee;
      border-right: none;
    }

    ::v-deep.el-table th,
    .el-table tr {
      background: #f6f5ee;
      padding: 5px 0;
    }

    ::v-deep.el-table th > .cell {
      color: #050101;
      font-weight: normal;
    }

    ::v-deep.el-table thead tr:nth-child(1) th {
      border-bottom: #d1cec9 1px solid;
    }

    ::v-deep.el-table thead tr:nth-child(1) th:nth-child(1) {
      border-top-left-radius: 20px;
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(1) th:nth-child(2) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(1) th:nth-child(3) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(1) th:nth-child(4) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(2) th:nth-child(16) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(2) th:nth-child(63) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(2) th:nth-child(69) {
      border-right: 4px solid #fff;
    }

    ::v-deep.el-table thead tr:nth-child(2) th:nth-child(51) {
      border-right: 4px solid #fff;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background: #e5e2de;
    }

    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:nth-last-child(1) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #e5e2de;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #e5e2de;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
      color: #48a0c3;
    }

    ::v-deep.el-table--enable-row-transition .el-table__body td {
      transition: background-color -1s ease;
    }

    ::v-deep.has-gutter tr .el-table_1_column_1 {
      border-right: 4px solid white !important;
      border-top-left-radius: 20px;
    }

    ::v-deep.has-gutter tr .el-table_1_column_18 {
      border-right: 4px solid white !important;
    }

    ::v-deep.has-gutter tr .el-table_1_column_54 {
      border-right: 4px solid white !important;
    }

    ::v-deep.has-gutter tr .el-table_1_column_67 {
      border-right: 4px solid white !important;
    }

    ::v-deep.has-gutter tr .el-table_1_column_74 {
      border-top-right-radius: 20px;
    }

    ::v-deep.has-gutter tr:nth-child(2) th:first-child {
      border-bottom-left-radius: 20px;
    }
    ::v-deep.has-gutter tr th {
      background: rgba(229, 226, 222, 1);
    }

    ::v-deep.el-table,
    .el-table__expanded-cell {
      background: #f6f5ee;
    }

    ::v-deep.el-table--border::after,
    .el-table--group::after {
      width: 0;
    }

    ::v-deep.el-table th > .cell {
      display: inline-block;
      white-space: nowrap;
      word-break: keep-all;
      text-overflow: unset;
    }
  }

  ::v-deep.cell {
    cursor: pointer;
  }

  ::v-deep.cell img {
    vertical-align: middle;
  }

  ::v-deep.table-SelectedRow-bgcolor {
    background-color: #1c4c7f !important;
    color: white;
  }

  ::v-deep
    .el-table__body-wrapper
    .el-table__body
    ::v-deep.table-SelectedRow-bgcolor:hover {
    background-color: #1c4c7f !important;
  }
}
</style>
