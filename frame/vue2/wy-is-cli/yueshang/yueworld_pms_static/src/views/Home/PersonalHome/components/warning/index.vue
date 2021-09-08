// 预警
<template>
  <div class="annunciate-components">
    <div class="tabs-content">
      <ul>
        <li v-for="(item, index) in tabDataList" :key="index">
          <div>{{ item.label }}</div>
          <span v-if="item.number !== null">{{ item.number }}</span>
        </li>
      </ul>
      <el-link target="_blank">更多</el-link>
    </div>
    <div class="detail-content">
      <ul>
        <li>
          <div class="item">
            <p class="label">租约到期预警(3月内)</p>
            <div class="value-content">
              <div class="value-left">品牌(个)：<span>594</span></div>
              <div class="value-right">面积(㎡)：<span>39,339.18</span></div>
            </div>
          </div>
        </li>
        <li>
          <div class="item">
            <p class="label">押不抵租预警</p>
            <div class="value-content red">
              <div class="value-left">品牌(个)：<span>164</span></div>
              <div class="value-right">面积(㎡)：<span>11,711.84</span></div>
            </div>
          </div>
        </li>
        <li>
          <div class="item">
            <p class="label">证照到期预警</p>
            <div class="value-content">
              <div class="value-left">商家(个)：<span>213</span></div>
              <div class="value-right"><span /></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig, tableData } from './config'
export default {
  name: 'Warming',
  data() {
    return {
      tabDataList: [
        {
          label: '预警',
          number: 971
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
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: baseProjectApi.cityMaintenanceList // 接口请求方式
      },
      formData: {}
    }
  },
  mounted() {},
  methods: {
    handleClick(item, index) {
      this.currentTab = index
    },
    inputChange(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.annunciate-components {
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
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    padding-right: 16px;
    margin-bottom: 12px;
    background: #efedea;
    border-radius: 24px;
    font-size: 14px;
    color: #050101;
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
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
        left: 23px;
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
  .detail-content {
    padding: 8px 16px;
    ul {
      li {
        margin-bottom: 24px;
        p {
          margin-bottom: 8px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
        .value-content {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          // font-weight: bold;
          color: #1c4c7f;
          display: flex;
          align-items: center;
          .value-left,
          .value-right {
            width: 50%;
            font-weight: bold;
          }
        }
        .red {
          color: #6f120c;
        }
      }
    }
  }
  ::v-deep .el-input__inner {
    border-radius: 18px;
    border: 1px solid #e5e2de;
  }
}
</style>
