<template>
  <div class="app-page-main">
    <div class="ranking-data">
      <div class="data-bj">
        <p>年租金收缴率(权责)</p>
        <div>63.58%</div>
      </div>
      <div class="data-bj">
        <p>年租金收缴率(合同)</p>
        <div>63.58%</div>
      </div>
      <div class="xian" />

      <div class="data-bj">
        <p>年物管收缴率(权责)</p>
        <div>63.58%</div>
      </div>
      <div class="data-bj">
        <p>年物管收缴率(合同)</p>
        <div>63.58%</div>
      </div>
      <div class="xian" />

      <div class="data-bj">
        <p>年多经收缴率(合同)</p>
        <div>63.58%</div>
      </div>
    </div>
    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-select
            v-model="value1"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择物业类型"
          >
            <el-option
              v-for="item in wuyeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value2"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择费项"
          >
            <el-option
              v-for="item in feixiangList"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value3" placeholder="请选择区域/城市">
            <el-option
              v-for="item in areaList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="monthValue"
            style="width: 230px"
            type="monthrange"
            range-separator="~"
            :clearable="false"
            format="yyyy年MM月"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          />
          <button class="blue-btn" @click="search">查询</button>
          <button class="reset-btn" @click="reset">重置</button>
          <button class="blue-btn" style="float: right">导出</button>
        </div>
      </div>
    </div>
    <div class="ranking-echarts">
      <attractEcharts />
    </div>
    <div class="ranking-table">
      <el-table
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        @sort-change="changeTableSort"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          width="60"
          label="排名"
        />
        <el-table-column prop="name" label="项目" />

        <el-table-column
          v-if="hetongShrink"
          align="center"
          label="合同口径(跨月显示多月)"
        >
          <template #header>
            <div class="solt-icon">
              <span>合同口径(跨月显示多月)</span>
              <!-- <img
                style="cursor: pointer; margin-bottom: -7px"
                src="@/assets/detail/shrink.png"
                alt=""
                @click="hetongShrink = false"
              > -->

            </div>
          </template>
          <el-table-column align="center" label="2021年5月">
            <el-table-column
              prop="htone"
              sortable="custom"
              label="应收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>应收金额(元)</span>
                  <img
                    v-if="list.htone === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htone === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="httwo"
              sortable="custom"
              label="实收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>实收金额(元)</span>
                  <img
                    v-if="list.httwo === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.httwo === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="htthree"
              sortable="custom"
              label="收缴率"
              width="100"
            >
              <template #header>
                <div class="solt-icon">
                  <span>收缴率</span>
                  <img
                    v-if="list.htthree === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htthree === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="htfour" sortable="custom" label="同比">
              <template #header>
                <div class="solt-icon">
                  <span>同比</span>
                  <img
                    v-if="list.htfour === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htfour === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" label="2021年1月~2021年5月">
            <el-table-column
              prop="htfive"
              sortable="custom"
              label="应收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>应收金额(元)</span>
                  <img
                    v-if="list.htfive === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htfive === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="htsix"
              sortable="custom"
              label="实收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>实收金额(元)</span>
                  <img
                    v-if="list.htsix === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htsix === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="htseven"
              sortable="custom"
              label="收缴率"
              width="100"
            >
              <template #header>
                <div class="solt-icon">
                  <span>收缴率</span>
                  <img
                    v-if="list.htseven === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.htseven === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="hteight" sortable="custom" label="同比">
              <template #header>
                <div class="solt-icon">
                  <span>同比</span>
                  <img
                    v-if="list.hteight === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.hteight === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column
          v-if="!hetongShrink"
          align="center"
          width="300"
          label="合同口径(跨月显示多月)"
        >
          <template #header>
            <div class="solt-icon">
              <span>合同口径</span>
              <!-- <img
                style="cursor: pointer; margin-bottom: -7px"
                src="@/assets/detail/onshrink.png"
                alt=""
                @click="hetongShrink = true"

              > -->

            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="zequanShrink"
          align="center"
          label="权责口径(跨月显示多月)"
        >
          <template #header>
            <div class="solt-icon">
              <span>权责口径(跨月显示多月)</span>
              <!-- <img
                style="margin-bottom: -7px; cursor: pointer"
                src="@/assets/detail/shrink.png"
                alt=""
                @click="zequanShrink = false"
<<<<<<< HEAD
              > -->

            </div>
          </template>
          <el-table-column align="center" label="2021年5月">
            <el-table-column
              prop="zqone"
              sortable="custom"
              label="应收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>应收金额(元)</span>
                  <img
                    v-if="list.zqone === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqone === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="zqtwo"
              sortable="custom"
              label="实收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>实收金额(元)</span>
                  <img
                    v-if="list.zqtwo === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqtwo === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="zqthree"
              sortable="custom"
              label="收缴率"
              width="100"
            >
              <template #header>
                <div class="solt-icon">
                  <span>收缴率</span>
                  <img
                    v-if="list.zqthree === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqthree === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zqfour" sortable="custom" label="同比">
              <template #header>
                <div class="solt-icon">
                  <span>同比</span>
                  <img
                    v-if="list.zqfour === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqfour === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" label="2021年1月~2021年5月">
            <el-table-column
              prop="zqfive"
              sortable="custom"
              label="应收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>应收金额(元)</span>
                  <img
                    v-if="list.zqfive === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqfive === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="zqsix"
              sortable="custom"
              label="实收金额(元)"
              width="130"
            >
              <template #header>
                <div class="solt-icon">
                  <span>实收金额(元)</span>
                  <img
                    v-if="list.zqsix === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqsix === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="zqseven"
              sortable="custom"
              label="收缴率"
              width="100"
            >
              <template #header>
                <div class="solt-icon">
                  <span>收缴率</span>
                  <img
                    v-if="list.zqseven === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqseven === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zqeight" sortable="custom" label="同比">
              <template #header>
                <div class="solt-icon">
                  <span>同比</span>
                  <img
                    v-if="list.zqeight === 'ascending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/17.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else-if="list.zqeight === 'descending'"
                    style="margin-bottom: -5px"
                    src="@/assets/imges/19.png"
                    width="20"
                    alt=""
                  >
                  <img
                    v-else
                    style="margin-bottom: -5px"
                    src="@/assets/imges/16pt／排序@2x.png"
                    width="20"
                    alt=""
                  >
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column
          v-if="!zequanShrink"
          align="center"
          width="400"
          label="合同口径(跨月显示多月)1"
        >
          <template #header>
            <div class="solt-icon">
              <span>责权口径</span>
              <!-- <img
                style="cursor: pointer; margin-bottom: -7px"
                src="@/assets/detail/onshrink.png"
                alt=""
                @click="zequanShrink = true"
              > -->

            </div>
          </template>
          <el-table-column />
        </el-table-column>
      </el-table>
    </div>
    <Pagination />
  </div>
</template>
<script>
import attractEcharts from './incomeEcharts'
export default {
  name: 'IncomeRanking',
  components: {
    attractEcharts
  },
  props: {},
  data() {
    return {
      hetongShrink: true,
      zequanShrink: true,
      select: '',
      monthValue: '',
      wuyeList: [
        {
          value: '选项1',
          label: '购物中心'
        },
        {
          value: '选项2',
          label: '商业街'
        },
        {
          value: '选项3',
          label: '轻资产'
        }
      ],
      feixiangList: [
        {
          value: '选项1',
          label: '租金'
        },
        {
          value: '选项2',
          label: '物管'
        },
        {
          value: '选项3',
          label: '多经'
        }
      ],
      areaList: [
        {
          value: '选项1',
          label: '上海区域'
        },
        {
          value: '选项2',
          label: '华南区域'
        },
        {
          value: '选项3',
          label: '东北区域'
        },
        {
          value: '选项4',
          label: '西北区域'
        },
        {
          value: '选项5',
          label: '华北区域'
        },
        {
          value: '选项6',
          label: '华东区域'
        },
        {
          value: '选项7',
          label: '西南区域'
        }
      ],
      tableData: [
        {
          name: '汇总',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '-54.90%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '1',
          name: '杭州富阳',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '2',
          name: '杭州富阳',
          htone: '85.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '3',
          name: '杭州富阳',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '4',
          name: '杭州富阳',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '5',
          name: '杭州富阳',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        },
        {
          sequence: '6',
          name: '杭州富阳',
          htone: '86.00',
          httwo: '86.00',
          htthree: '216.20%',
          htfour: '-54.90%',
          htfive: '86.00',
          htsix: '86.00',
          htseven: '54.90%',
          hteight: '-54.90%',
          zqone: '86.00',
          zqtwo: '86.00',
          zqthree: '54.90%',
          zqfour: '126.00%',
          zqfive: '86.00',
          zqsix: '86.00',
          zqseven: '54.90%',
          zqeight: '-54.90%'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value1: '',
      value2: '',
      value3: '',
      tableDataCopy: null,
      optionPages: [''],

      searchText: '',
      chooseArray: [],

      list: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'firsthang'
      }
      if (columnIndex === 1) {
        return 'secondhang'
      }
    },
    // 搜索
    search() {
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
      this.tableData.splice(3)
    },
    // 重置
    reset() {
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.monthValue = ''
      this.tableData = this.tableDataCopy
    },
    indexMethod(index) {
      if (index !== 0) {
        return index
      }
    },
    changeTableSort(column) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
      const fieldName = column.prop
      const sortingType = column.order
      let tableData = this.tableData
      let sumData = {} // 放置总计一行数据
      tableData.map((item) => {
        if (item.name === '汇总') {
          sumData = item
        }
      })
      if (sortingType === 'ascending') {
        // 正序
        tableData = tableData.sort(
          (a, b) => parseInt(b[fieldName]) - parseInt(a[fieldName])
        )
        tableData.forEach((item, index) => {
          if (item.name === '汇总') {
            tableData.splice(index, 1)
          }
          return item
        })
        tableData.unshift(sumData)
      } else if (sortingType === 'descending') {
        // 倒序
        tableData = tableData.sort(
          (a, b) => parseInt(a[fieldName]) - parseInt(b[fieldName])
        )
        tableData.map((item, index) => {
          if (item.name === '汇总') {
            tableData.splice(index, 1)
          }
          return item
        })
        tableData.unshift(sumData)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
