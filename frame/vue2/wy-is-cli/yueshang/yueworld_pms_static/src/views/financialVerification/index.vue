<template>
  <div class="bond">
    <!-- 头部 -->
    <div class="top">
      <div class="serch">
        <el-input
          v-model="serchTxt"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
        <el-select v-model="selectVal" placeholder="请选择" class="select">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.val"
            :value="item.id"
          />
        </el-select>
        <button @click="search">查询</button>
        <p @click="seach">
          高级搜索
          <i :class="shape ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" />
        </p>
        <span @click="reset">重置</span>
      </div>
      <div class="serch-right">
        <button class="btn" @click="clickImport(1)">上传核销单</button>
        <button class="btns">新增核销</button>
      </div>
    </div>
    <!-- //高级搜索 -->
    <div v-if="show" class="top-body">
      <el-select
        v-model="allSelectVal"
        placeholder="所有核销状态"
        class="select"
      >
        <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.val"
          :value="item.name"
        />
      </el-select>
      <el-select
        v-model="allSelectValvue"
        placeholder="所有核销状态"
        class="select"
      >
        <el-option
          v-for="item in listb"
          :key="item.id"
          :label="item.val"
          :value="item.name"
        />
      </el-select>
      <el-select
        v-model="allSelectstate"
        placeholder="所有核销状态"
        class="select"
      >
        <el-option
          v-for="item in listc"
          :key="item.id"
          :label="item.val"
          :value="item.name"
        />
      </el-select>

      <el-input
        v-model="business"
        placeholder="请填写合同编号"
        class="selects"
      />
      <el-select v-model="allSelect" placeholder="请填写核销人" class="select">
        <el-option
          v-for="item in listc"
          :key="item.id"
          :label="item.val"
          :value="item.name"
        />
      </el-select>
    </div>
    <div v-if="show" class="top-body">
      <div class="block">
        <span class="demonstration">核销日期</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <div class="icon">
          <i class="el-icon-date" />
        </div>
      </div>
      <div class="block">
        <span class="demonstration">收款日期</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <div class="icons">
          <i class="el-icon-date" />
        </div>
      </div>
    </div>
    <div class="table">
      <i class="el-icon-edit" @click="clickImport(2)" />
      <div class="tablelist">
        <el-table
          :data="tableDatas"
          style="width: 100%; font-size: 10px"
          :default-sort="{ prop: 'name1', order: 'descending' }"
          :header-cell-style="rowClass"
          @sort-change="sort_change"
        >
          <el-table-column type="selection" align="center" />

          <el-table-column
            label="序号"
            width="60"
            type="index"
            :index="indexMethod"
          />
          <el-table-column prop="name1" label="核销单号" width="100" sortable>
            <template slot="header">
              <span>核销单号</span>
              <img
                v-if="lists.name1 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name1 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column prop="name2" label="商家" sortable>
            <template slot="header">
              <span>商家</span>

              <img
                v-if="lists.name2 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name2 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column prop="name3" label="核销金额" width="100" sortable>
            <template slot="header">
              <span>核销金额</span>
              <img
                v-if="lists.name3 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
                @click="sort"
              >
              <img
                v-else-if="lists.name3 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name4" label="项目" width="100" sortable>
            <template slot="header">
              <span>项目</span>
              <img
                v-if="lists.name4 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
                @click="sort"
              >
              <img
                v-else-if="lists.name4 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name5" label="收款金额" width="100" sortable>
            <template slot="header">
              <span>收款金额</span>

              <img
                v-if="lists.name5 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name5 == 'descending'"
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
          <el-table-column prop="name6" label="冲抵金额" width="100" sortable>
            <template slot="header">
              <span>冲抵金额</span>

              <img
                v-if="lists.name6 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name6 == 'descending'"
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
          <el-table-column prop="name7" label="应收冲减" width="100" sortable>
            <template slot="header">
              <span>应收冲减</span>

              <img
                v-if="lists.name7 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name7 == 'descending'"
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
          <el-table-column prop="name8" label="冲减金额" width="100" sortable>
            <template slot="header">
              <span>冲减金额</span>

              <img
                v-if="lists.name8 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name8 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name9" label="转预收金额" width="120" sortable>
            <template slot="header">
              <span>转预收金额</span>

              <img
                v-if="lists.name9 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name9 == 'descending'"
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
          <el-table-column prop="name10" label="核销日期" width="100" sortable>
            <template slot="header">
              <span>核销日期</span>
              <img
                v-if="lists.name10 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name10 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name11" label="收款日期" width="100" sortable>
            <template slot="header">
              <span>收款日期</span>
              <img
                v-if="lists.name11 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name11 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name12" label="状态">
            <template slot="header">
              <span>状态</span>
              <img
                v-if="lists.name12 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name12 == 'descending'"
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
          <el-table-column prop="name13" label="核销人" width="100" sortable>
            <template slot="header">
              <span>核销人</span>
              <img
                v-if="lists.name13 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name13 == 'descending'"
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
          <el-table-column prop="name14" label="上传状态" width="100" sortable>
            <template slot="header">
              <span>上传状态</span>
              <img
                v-if="lists.name14 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name14 == 'descending'"
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
          <el-table-column prop="name15" label="三方信息" width="100" sortable>
            <template slot="header">
              <span>三方信息</span>
              <img
                v-if="lists.name15 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name15 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name16" label="EAS单号" width="120" sortable>
            <template slot="header">
              <span>EAS单号</span>
              <img
                v-if="lists.name16 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name16 == 'descending'"
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
        </el-table>
      </div>
      <div>
        <Pagination />
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="700px"
      class="dialog"
      :before-close="handleClose"
    >
      <div v-if="menuShow" class="word">
        <div class="box">
          <i class="el-icon-circle-plus" />
          <span>上传数据</span>
        </div>
        <p>可上传小与20M的文件</p>
      </div>
      <div v-if="!menuShow" class="menu">
        <div class="left">
          <div class="left-top">
            <p>勾选需要显示的字段</p>
            <div>
              <span class="span1">全选</span>
              <span class="span2">清除</span>
            </div>
          </div>
          <ul>
            <li>
              <el-checkbox v-model="checked">合同编号</el-checkbox><el-checkbox v-model="checked">商家</el-checkbox><el-checkbox v-model="checked">品牌</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">铺位号</el-checkbox><el-checkbox v-model="checked">费项</el-checkbox><el-checkbox v-model="checked">总额</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">罚没金</el-checkbox><el-checkbox v-model="checked">退款金</el-checkbox><el-checkbox v-model="checked">已冲抵</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">可冲抵</el-checkbox><el-checkbox v-model="checked">保证金余额</el-checkbox><el-checkbox v-model="checked">来源单号</el-checkbox>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="right-top">
            <p>拖拽字段调整顺序</p>
          </div>
          <ul>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>品牌</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>总额</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>罚没金</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>退款金</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>保证金余额</span>
              </div>
              <i class="el-icon-error" />
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btns" @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          class="btns1"
          @click="dialogVisible = false"
        >提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  name: 'FinancialVerification',
  components: { Pagination },
  data() {
    return {
      checked: false, // 多选
      allSelectstate: '',
      shape: false,
      lists: {},
      title: '自定义显示字段',
      dialogVisible: false,
      menuShow: false, // 弹框是两用的
      value: '1',
      values: '',
      value1: '', // 时间
      value2: '',
      show: false, // 高级筛选
      serchTxt: '', // 搜索
      selectVal: '', // 下啦筛选
      allSelect: '',
      numlist: [],
      allSelectVal: '',
      allSelectValvue: '',
      num: '', // 铺位号
      brand: '', // 品牌
      business: '', // 商家
      yt: '', // 业态
      options: [
        {
          id: 1,
          val: '所有项目'
        },
        {
          id: 2,
          val: 'AMP'
        },
        {
          id: 3,
          val: 'PMS'
        }
      ],
      tableDatas: [
        {
          name: '1',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '2',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '3',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '4',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '5',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '6',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '7',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '8',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '9',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '10',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '11',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '12',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '13',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '14',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        },
        {
          name: '15',
          name1: 'SK-202104000002',
          name2: '上海良品铺子食品公司',
          name3: '5,000.00',
          name4: '控江旭辉MALL',
          name5: '5,000.00',
          name6: '0.00',
          name7: '5,000.00',
          name8: '0.00',
          name9: '0.00',
          name10: '2021-04-29',
          name11: '2021-04-29',
          name12: '正常结束',
          name13: '张伟斌',
          name14: '未上传',
          name15: '-',
          name16: '-'
        }
      ],
      list: [
        { name: '也通过' },
        { name: '未通过' },
        { name: '已审核' },
        { name: '待审核' }
      ],
      listb: [{ name: '已完成' }, { name: '未通过' }],
      listc: [{ name: '未上传' }, { name: '上传成功' }, { name: '上传失败' }]
    }
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 17) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    sort() {
      this.tableDatas = this.tableDatas.reverse()
      console.log(this.tableDatas)
    },
    seach() {
      this.show = !this.show
      this.shape = !this.shape
    },
    search() {
      if (this.tableDatas.length > 3) {
        this.tableDatas.forEach((item) => {
          this.numlist.push(item)
        })
      }
      this.tableDatas.splice(5)
    },
    sort_change(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      console.log(column)
    },
    reset() {
      this.tableDatas = this.numlist
      this.serchTxt = ''
    },
    handleClose(done) {
      done()
    },
    clickImport(val) {
      this.dialogVisible = true
      if (val === 1) {
        this.menuShow = true
        this.title = '导入保证金'
      }
      if (val === 2) {
        this.menuShow = false
        this.title = '自定义显示字段'
      }
    },
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.bond {
  ::v-deep.el-input__inner {
    border: none;
    margin-right: 10px;
  }
  ::v-deep.el-icon-arrow-up:before {
    content: "\e78f";
  }
  ::v-deep.el-range__icon {
    display: none;
  }
  .demonstration {
    margin-right: 8px;
    color: #848382;
  }
  .block {
    position: relative;
  }
  ::v-deep.el-range-editor.el-input__inner {
    width: 240px;
    background: #fdfcfa;
    border-radius: 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    margin-right: 24px;
  }
  .icon {
    position: absolute;
    left: 273px;
    top: 10px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
  .icons {
    position: absolute;
    left: 273px;
    top: 10px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.serch {
  display: flex;
  align-items: center;
  ::v-deep.el-input {
    width: 220px;
    margin-right: 12px;
  }
  ::v-deep.el-input--medium .el-input__inner {
    width: 220px;
    font-size: 14px;
    font-family: Helvetica;
    color: #848382;
    background: #fdfcfa;
    border-radius: 18px;
    // #050101
  }
  ::v-deep.el-input--medium .el-input__icon {
    color: #050101;
  }
  button {
    height: 32px;
    width: 80px;
    background: #1c4c7f;
    border-radius: 16px;
    border: none;
    font-size: 14px;
    font-family: Helvetica;
    color: #ffffff;
    line-height: 1;
    margin-right: 24px;
  }
  p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c4c7f;
  }
  span {
    margin-left: 24px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
  .select {
    ::v-deep.el-input {
      width: 150px;
      margin-right: 24px;
    }
    ::v-deep.el-input--medium .el-input__inner {
      width: 150px;
      font-size: 14px;
      font-family: Helvetica;
      color: #848382;
      background: #fdfcfa;
      border-radius: 18px;
      // #050101
    }
  }
}
//头部右侧
.serch-right {
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    margin-right: 16px;
  }
  .btn {
    background: #e5e2de;
    border-radius: 16px;
    width: 103px;
    height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #848382;
    border: none;
    margin-right: 8px;
  }
  .btns {
    width: 91px;
    height: 32px;
    background: #1c4c7f;
    border-radius: 16px;
    font-size: 14px;
    font-family: Helvetica;
    color: #ffffff;
    border: none;
  }
}
.top-body {
  margin-top: 12px;
  display: flex;
  align-items: center;
  .select {
    ::v-deep.el-input--medium .el-input__inner {
      width: 150px;
      font-size: 14px;
      font-family: Helvetica;
      color: #848382;
      background: #fdfcfa;
      border-radius: 18px;

      // #050101
    }
    ::v-deep.el-select {
      margin-right: 12px;
    }
  }

  .selects {
    width: 220px;
    margin-left: 12px;
    margin-right: 12px;
    ::v-deep.el-input__inner {
      width: 220px;
      font-size: 14px;
      font-family: Helvetica;
      color: #848382;
      background: #fdfcfa;
      border-radius: 18px;

      // #050101
    }
  }
}
.table {
  margin-top: 12px;
  position: relative;
  ::v-deep.caret-wrapper {
    display: none !important;
  }
  i {
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 200;
    width: 24px;
    height: 24px;
    background: #fdfcfa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.tablelist {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
  line-height: 14px;
  ::v-deep .el-table td {
    background: #f6f5ee;
  }
  ::v-deep.el-table th {
    background: #e5e2de !important;
    padding: 0;
  }
  ::v-deep.el-table th:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.cell {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c4c7f;
    }
    img {
      vertical-align: middle;
    }
  }
  ::v-deep.el-table tr {
    background: #f6f5ee;
  }
  ::v-deep.has-gutter {
    background: #f6f5ee;
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
    //  color: #48A0C3  !important ;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5e2de;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
    color: #48a0c3;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td
    > .cell
    > p {
    color: #48a0c3;
  }
  ::v-deep.el-table--enable-row-transition .el-table__body td {
    transition: background-color -1s ease;
  }
  ::v-deep .el-table__header-wrapper {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.el-table,
  .el-table__expanded-cell {
    background: #f6f5ee;
  }
  ::v-deep.el-table td,
  .el-table th {
    padding: 0;
  }
  ::v-deep.el-table__row td .cell {
    height: 36px !important;
    line-height: 36px;
  }
  .solt-icon {
    i {
      margin-left: 8px;
    }
  }
}
.paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .paging-data {
    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
    }
  }
  .paging-option {
    display: flex;
    ::v-deep .el-input__inner {
      padding: 0;
      height: 24px;
      width: 80px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      background: #f6f5ee;
      border: none;
      padding-top: 4px;
    }
    ::v-deep.el-input__icon {
      line-height: 24px;
    }
    ::v-deep.el-pager li {
      height: 24px;
      line-height: 24px;
    }
    ::v-deep.el-pagination button,
    .el-pagination span:not([class*="suffix"]) {
      height: 24px;
      line-height: 24px;
    }
  }
  ::v-deep.el-pagination button {
    background: #f6f5ee;
  }
  ::v-deep.number {
    background: #f6f5ee !important ;
  }
}

//弹框
.dialog {
  ::v-deep.el-dialog {
    border-radius: 20px;
  }
  ::v-deep.el-dialog__header {
    padding: 24px 0px 8px 0px;
    margin: 0 24px;
    border-bottom: 1px solid #e5e2de;
  }
  ::v-deep.el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  ::v-deep.el-button {
    width: 86px;
    height: 32px;
    background: #e5e2de;
    border-radius: 16px;
    line-height: 1;
    border: none;
  }
  .word {
    margin: 75px 0;
  }
  .btns {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
  .btns1 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    background: #1c4c7f;
  }
  .box {
    width: 400px;
    height: 98px;
    background: #eaeaea;
    border: 1px dashed #979797;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      color: #848382;
      margin-right: 13px;
    }
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
    }
  }
  p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #979797;
    margin-top: 12px;
  }
  .menu {
    display: flex;
    width: 100%;
    padding: 0 32px;
    .left {
      width: 460px;
      height: 267px;
      border-right: 1px solid #e5e2de;
      padding-top: 21px;
      .left-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
        margin-bottom: 29px;
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
          padding: 0;
          margin: 0;
        }
        .span1 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin-right: 16px;
        }
      }
      ul {
        li {
          margin-bottom: 23px;
          ::v-deep.el-checkbox__input.is-checked + .el-checkbox__label {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #050101;
          }
          ::v-deep.el-checkbox {
            width: 100px;
          }
        }
      }
    }
    .right {
      flex: 1;

      height: 267px;
      padding: 21px 16px;
      .right-top {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
        p {
          padding: 0;
          margin: 0;
        }
      }
      ul {
        padding-top: 16px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 6px;
          margin-bottom: 8px;
          .i {
            display: flex;
            align-items: center;
          }
          i {
            color: #e5e2de;
            font-size: 14px;
          }
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #050101;
            margin-left: 11px;
          }
        }
        li:hover {
          background: #efedea;
          cursor: move;
        }
      }
    }
  }
}
</style>
