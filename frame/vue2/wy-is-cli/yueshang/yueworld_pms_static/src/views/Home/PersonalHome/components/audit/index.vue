// 代办、已办 审核
<template>
  <div class="audit-components">
    <div class="tabs-content">
      <ul>
        <li v-for="(item,index) in tabDataList" :key="index" :class="currentTab==index?'active':''" @click="handleClick(item,index)">
          <div>{{ item.label }}</div>
          <span v-if="item.number !==null">{{ item.number }}</span>
        </li>
      </ul>
    </div>

    <el-form ref="ruleForm" :model="searchForm" size="small">
      <div class="d-flex">
        <YsnFormitem :config="searchConfig" :form="searchForm" :column="searchConfig.length" :item-width="'100%'" :disabled="false" :clearable="false" auto-width label-position="left" />
      </div>
    </el-form>

    <ysn-table :data="tableData" :column="tableConfig" select-key="id" :checkbox="false" />

  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig, tableData } from './config'
import YsnFormitem from '@comps/ysn-formItem/index'
export default {
  name: 'Audit',
  components: { YsnFormitem },
  data() {
    return {
      tabDataList: [
        {
          label: '待办审核',
          number: 9
        },
        {
          label: '已办审核',
          number: null
        }
      ],
      currentTab: 0,
      // 搜索form
      searchForm: {
        regionName: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: tableData.call(this),
      data: tableData.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: baseProjectApi.cityMaintenanceList // 接口请求方式
      },
      formData: {}
    }
  },
  mounted() {

  },
  methods: {
    handleClick(item, index) {
      this.currentTab = index
      if (parseInt(index) === 1) {
        this.tableData = this.data.filter(item => {
          return item.status === 1
        })
      } else {
        this.tableData = this.data.filter(item => {
          return item.status === 0
        })
      }
    },
    inputChange(data) {
      console.log(data)
    }
  }
}

</script>
<style lang="scss" scoped>
.audit-components {
  height: 100%;
  padding: 24px;
  overflow: hidden;
  overflow-y: scroll;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  ::v-deep .el-table__footer-wrapper tr,
  ::v-deep .el-table--border tr,
  ::v-deep .el-table__body-wrapper tr,
  ::v-deep .el-table__fixed-body-wrapper tr {
    background-color: #fdfcfa;
  }
  .tabs-content {
    width: 192px;
    height: 32px;
    margin-bottom: 12px;
    background: #efedea;
    border-radius: 24px;
    font-size: 14px;
    color: #050101;
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    li {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
        padding: 1px 3px;
        position: absolute;
        top: 0px;
        right: -8px;
        font-size: 10px;
        font-weight: initial;
        color: #ffffff;
        background: #6f120c;
        border-radius: 10px;
      }
    }
    li.active {
      font-size: 16px;
      font-weight: bold;
      color: #1c4c7f;
      border-bottom: 2px solid #16406d;
    }
  }
  ::v-deep .el-input__inner {
    border-radius: 18px;
    border: 1px solid #e5e2de;
  }
}
</style>
