<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 列表页组件 - 基础版
-->
<template>
  <div class="d-flex full-height">
    <!-- 左侧树菜单 -->
    <div v-if="showLeft" class="showLeft">
      <!-- 如果不需要自定义 默认根据配置展示费项关系或者科目关系 -->
      <template v-if="!hasLeftSlots">
        <!-- 默认树级配置 科目/费项 -->
        <ysn-pageListLeftTree :config="leftConfig" @change="leftChange" />
      </template>

      <!-- 左侧自定义插槽 -->
      <template v-else>
        <slot name="leftSlots" />
      </template>
    </div>
    <div class="content d-flex">
      <div class="max-area pr-24">
        <slot name="pageTop" />
        <!-- 状态筛选 -->
        <!-- TODO:为模拟数据 改成统一的根据当前列表筛选 对接时改成getList -->
        <!-- @change="getList" -->
        <ysn-statusSearch
          v-for="(item, index) in statusSearchConfig"
          :key="'status' + index"
          v-model="statucSearchForm[item.key]"
          class="d-flex"
          v-bind="item"
          :config="currentStatusSearchConfig[item.key]"
          :name="item.name"
          @change="simulationGetList"
        />

        <div v-if="searchConfig.length > 0" class="flex-ju-between mt-4">
          <!-- 高级搜索 -->

          <!-- TODO:为模拟数据 改成统一的根据当前列表筛选 对接时改成getList -->
          <!-- @searchResult="getList" -->
          <ysn-seniorSearch
            :form="searchForm"
            :config="searchConfig"
            clearable
            :column="searchColumn"
            @searchResult="simulationGetList"
          />
        </div>

        <!-- 列表上层操作 -->
        <div class="flex-ju-between mb-8">
          <div class="text-left flex-al-center">
            <!-- 列表左侧文字信息 -->
            <!-- TODO 后端接入后删除 -->
            <ysn-tableDesc
              v-if="tableDescConfigs.length !== 0"
              :config="tableDescConfigs"
            />
            <!-- TODO 后端接入后 改为function -->
            <ysn-tableDesc
              v-else
              :config="currentTableDescConfig"
            />
          </div>
          <!-- 右侧操作 -->
          <div class="text-right flex-al-center">
            <slot name="tableRight" />
            <ysn-excel
              v-if="tableRightExcel.importExcel"
              type="import"
              :config="tableConfig"
              @handleSuccess="handleSuccess"
            >
              <ysn-btn type="info" class="ml-12 mr-12">导入</ysn-btn>
            </ysn-excel>
            <ysn-excel
              v-if="tableRightExcel.exportExcel"
              type="export"
              :config="tableConfig"
              :list="tableData"
            >
              <ysn-btn type="reset">导出</ysn-btn>
            </ysn-excel>

            <!-- 删除功能 -->
            <span v-if="queryConfig.deleteApi">
              <!-- 设置只有选中数据后才可以删除 -->
              <ysn-confirm
                title="提示"
                width="484px"
                top="120px"
                :content="`确认删除${tableSelectList.length}条数据?`"
                tip="此操作将永久删除,不可撤回,请谨慎操作"
                :disabled="tableSelectList.length === 0"
                @confirm="deleteSelect"
              >
                <ysn-btn
                  class="ml-8"
                  :disabled="tableSelectList.length === 0"
                  type="delete"
                >删除</ysn-btn>
              </ysn-confirm>
            </span>

            <!-- 自定义表头 -->
            <ysn-tableConfigDialog
              v-if="hasTableConfig"
              :config="tableConfig"
              @change="tableConfigChange"
            />
          </div>
        </div>
        <!-- 列表 -->
        <!-- :full="tableOrderConfig&&tableOrderConfig.full===false?tableOrderConfig.full:true" -->
        <ysn-table
          ref="tableKeys"
          :key="tableKey"
          default-expand-all
          :show-expand="showExpand"
          :data="tableData"
          :column="currentTableConfig"
          select-key="id"
          :row-key="tableOrderConfig?tableOrderConfig.rowKey : undefined"
          :checkbox="
            !!queryConfig.deleteApi ||
              (tableOrderConfig ? !!tableOrderConfig.checkbox : '')
          "
          :tree-props="tableOrderConfig&&tableOrderConfig.treeProps?tableOrderConfig.treeProps:{}"
          v-bind="tableOrderConfig"
          :show-slots="tableSlots"
          v-on="$listeners"
          @onSelect="tableSelect"
          @onSelect-all="tableSelect"
        >
          <template slot="default" slot-scope="scope">
            <slot v-bind="scope" name="default" />
          </template>

          <template
            v-for="slotsItem in tableSlots"
            :slot="slotsItem"
            slot-scope="scope"
          >
            <slot v-bind="scope" :name="slotsItem" />
          </template>
        </ysn-table>
        <ysn-page
          v-if="!hidePage"
          :page="page"
          :total="total"
          @change="pageChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getOptionsLabel } from '@/filters'
export default {
  name: 'YsnPageContent',
  props: {
    // 是否具备展开列
    showExpand: {
      type: Boolean,
      default: false
    },
    // 状态筛选列表 会有多个情况出现
    statusSearchConfig: {
      type: Array,
      default: () => []
    },
    // 搜索form
    searchForm: {
      type: Object,
      default: () => {}
    },
    // 搜索配置
    searchConfig: {
      type: Array,
      default: () => []
    },
    // 列表配置
    tableConfig: {
      type: Array,
      default: () => []
    },
    // 高级搜索column
    searchColumn: {
      type: Number,
      default: 3
    },
    // 列表文字描述信息配置
    tableDescConfig: {
      type: Function,
      default: () => {}
    },
    // TODO 列表描述暂时
    tableDescConfigs: {
      type: Array,
      default: () => []
    },
    // 请求配置
    queryConfig: {
      type: Object,
      default: () => {}
    },
    // 请求之前数据处理
    beforeQeuryData: {
      type: Function,
      default: (data) => {
        return data
      }
    },
    // 请求之后数据处理
    handleAfterQueryData: {
      type: Function
    },
    // ysn-table 其他配置
    tableOrderConfig: {
      type: Object,
      default: () => {}
    },
    // 删除处理
    deleteTable: {
      type: Function,
      default: function(row) {
        return true
      }
    },
    // 删除提示语
    deleteMessage: {
      type: String,
      default: '删除对象中包含草稿或已驳回状态之外的数据，无法删除，请重新勾选。'
    },
    // 权限编码名
    persmission: {
      type: String,
      default: ''
    },
    // 是否开启自定义表头
    hasTableConfig: {
      type: Boolean,
      default: true
    },
    // 列表插槽列
    tableSlots: {
      type: Array,
      default: () => []
    },
    // excel按钮是否显示
    tableRightExcel: {
      type: Object,
      default: () => ({})
    },
    // 隐藏分页
    hidePage: {
      type: Boolean,
      default: false
    },
    // 是否显示左侧关系列表
    showLeft: {
      type: Boolean,
      default: false
    },
    // 左侧菜单配置
    leftConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // table ky
      tableKey: 0,
      // 列表数据
      tableData: [],
      // 分页
      page: {
        pageSize: 20,
        pageNo: 1
      },
      // 总数
      total: 0,
      // 组件内table配置
      currentTableConfig: this.tableConfig.concat(),
      // 请求后列表数据
      queryData: {},
      // 状态筛选key保存
      statucSearchForm: {},
      // 状态筛选显示的数据
      currentStatusSearchConfig: {},

      // 列表多选数据
      tableSelectList: [],
      // 是否有左侧菜单插槽
      hasLeftSlots: false,

      // 当前页模拟数据
      currentTableData: []
    }
  },
  computed: {
    // 列表左侧描述/统计
    currentTableDescConfig() {
      return this.tableDescConfig(this.queryData)
    }
  },
  mounted() {
    // 是否显示默认左侧内容配置
    if (this.$scopedSlots.leftSlots) {
      this.hasLeftSlots = true
    }
    // 状态筛选默认数据
    const statucSearchForm = {}
    // 状态筛选默认配置
    const currentStatusSearchConfig = {}
    this.statusSearchConfig.map((item) => {
      // 处理默认配置项
      currentStatusSearchConfig[item.key] = item.list
      // 单选状态默认数据为空字符串
      if (item.isRadio) {
        statucSearchForm[item.key] = ''
        return
      }
      statucSearchForm[item.key] = []
    })
    this.statucSearchForm = { ...statucSearchForm }
    this.currentStatusSearchConfig = { ...currentStatusSearchConfig }
    // 获取数据
    this.getList()

    // 重制config
    this.currentTableConfig = this.setCurrentTableConfig(
      this.currentTableConfig
    )
    this.tableKey++
  },
  methods: {
    // 左侧树级变化
    leftChange(e) {
      this.$emit('leftChange', e)
    },
    // 设置状态筛选的数据展示
    setStatusSearchData() {
      const { currentStatusSearchConfig } = this
      for (const k in currentStatusSearchConfig) {
        currentStatusSearchConfig[k] = currentStatusSearchConfig[k].map(
          (item) => {
            const newItem = { ...item }
            newItem.statusNum = this.queryData[item.dataKey]
            return newItem
          }
        )
      }
      this.currentStatusSearchConfig = currentStatusSearchConfig
    },
    // 初始化表格config 只返回
    setCurrentTableConfig(config) {
      const newConfig = config.filter((item) => {
        if (item.tableList) {
          item.tableList = this.setCurrentTableConfig(item.tableList)
        }
        if (item.tableList && item.tableList.length > 0) {
          return true
        }
        return item.showFixed || item.isShow
      })
      return newConfig
    },
    // 获取列表数据
    async getList() {
      const { api, dataKey } = this.queryConfig
      const dataForm = {
        ...this.searchForm,
        ...this.statucSearchForm,
        ...this.page
      }
      // 入参预处理
      const reqData = this.beforeQeuryData
        ? this.beforeQeuryData(dataForm)
        : dataForm
      const res = await api(reqData)
      // 回参处理
      const newRes = (this.handleAfterQueryData ? this.handleAfterQueryData(res) : res) || {}
      this.tableData = (dataKey ? newRes[dataKey] : newRes.data) || []
      // TODO 对接接口时去除
      this.currentTableData = (dataKey ? newRes[dataKey] : newRes.data) || []
      this.total = newRes.total
      this.queryData = newRes
      // 设施状态数据
      this.setStatusSearchData()
      this.tableKey++
      // 请求完毕后数据给外部 看是否有需要展示的特殊信息
      this.$emit('afterQueryData', newRes)
    },
    // 分页切换
    pageChange(page) {
      this.page.pageNo = page
      this.getList()
    },
    // 列表config切换
    tableConfigChange(newConfig) {
      this.currentTableConfig = newConfig.concat()
      this.tableKey++
    },
    // 列表选择
    tableSelect(selectList) {
      this.tableSelectList = selectList
      this.$emit('onSelect', selectList)
      this.$emit('onSelectAll', selectList)
    },
    // 批量删除
    async deleteSelect() {
      const reqData = {
        ids: this.tableSelectList.map((item) => item.id)
      }
      // 产品要求: 批量删除需要每条数据校验
      const beforeDelete = this.tableSelectList.map((item) => this.deleteTable(item)).filter(item => item)
      if (beforeDelete.length !== reqData.ids.length) {
        this.$message({
          message: this.deleteMessage,
          type: 'error',
          duration: 2000
        })
        return
      }
      await this.queryConfig.deleteApi(reqData)

      // 2秒提示语
      this.$message({
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      // 清空选中数组
      this.tableSelect([])
      this.getList()
    },
    /**
     * @method:
     * @param {Array} results
     * @param {Array} header
     * @desc:导入excel返回的数据
     */

    handleSuccess({ results, header }) {
      this.tableData = results
    },

    // 模拟接口处理后返回数据
    simulationGetList() {
      let allData = this.currentTableData.concat()
      // 状态栏筛选处理
      const { statusSearchConfig, statucSearchForm, searchForm, searchConfig } = this
      statusSearchConfig.map(item => {
        if (statucSearchForm[item.key].length > 0) {
          const labelList = []
          statucSearchForm[item.key].map(_item => {
            labelList.push(getOptionsLabel(_item, item.list))
          })
          // 兼容数字字典及中文名展示
          allData = allData.filter(_item => statucSearchForm[item.key].includes(_item[item.key]) || labelList.includes(_item[item.key]))
        }
      })
      if (searchForm.fuzzyEnquiry) {
        allData = allData.filter(_item => {
          return JSON.stringify(_item).indexOf(searchForm.fuzzyEnquiry) !== -1
        })
      }

      for (const key in searchForm) {
        console.log('key', key, searchForm[key])
        // 模糊搜索特殊处理
        if (key !== 'fuzzyEnquiry' && searchForm[key] !== undefined) {
          // 字符串/输入框
          if (typeof searchForm[key] === 'string' && searchForm[key] !== '' && searchForm[key].indexOf('-') === -1) {
            console.log('string', key, searchForm[key])
            allData = allData.filter(item => item[key] ? item[key].indexOf(searchForm[key]) !== -1 : true)
          }

          if (searchForm[key] instanceof Array && searchForm[key].length > 0 || typeof searchForm[key] === 'number') {
            let optionsList = []
            searchConfig.map(item => {
              if (item.prop === key && item.list) {
                optionsList = item.list
              }
            })

            const labelList = []
            console.log('arr', key, searchForm[key], optionsList)
            if (typeof searchForm[key] === 'number') {
            // 单选枚举
              labelList.push(getOptionsLabel(searchForm[key], optionsList))
              allData = allData.filter(_item => searchForm[key] === _item[key] || labelList.includes(_item[key]))
            } else {
              // 多选枚举
              searchForm[key].map(_item => {
                console.log('test', _item, optionsList)
                labelList.push(getOptionsLabel(_item, optionsList))
              })
              allData = allData.filter(_item => searchForm[key].includes(_item[key]) || labelList.includes(_item[key]))
            }
          }
        }
      }
      console.log('allData', allData)
      this.tableData = allData
      // TODO 前端暂时
      this.$emit('getChooseData', allData)
    }
  }
}
</script>
<style lang="scss" scoped>
  .showLeft {
   width: 170px;
    border-right: 1px solid #E5E2DE;
    margin-right: 20px;
    padding-right: 18px;
    box-sizing: border-box;
  }
  .content {
      flex: 1;
      width: 0;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }
</style>
