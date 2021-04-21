<template>
<view>
  <!-- <app-header>
    <app-project-selector disabled-all selected="{{ selected }}" bind:selected="onProjectSelected" />
  </app-header> -->
  <app-section title="商家信息">
    <view v-for="(item, index) in merchantInfomation" :key="index" class="merchant-infomation-item">
      <view class="merchant-infomation-item-line"></view>
      <view class="merchant-infomation-item-content">
        <view class="merchant-infomation-item-content-title">{{item.title}}</view>
        <view class="merchant-infomation-item-content-content">{{item.content}}</view>
      </view>
    </view>
  </app-section>
  <app-section title="经销商" collapseable="true" collapsed="true">
    <app-table identity="merchant" :columns="page.merchantTable.columns" :values="page.merchantTable.rows" :total-row="page.merchantTable.totalRow" @clickRow="onRowClick"></app-table>
  </app-section>
  <app-section title="合作项目" collapseable="true">
    <app-table fixednum="2" identity="teamWork" :columns="page.teamWorkTable.columns" :values="page.teamWorkTable.rows" :total-row="page.teamWorkTable.totalRow"></app-table>
  </app-section>
  <app-section title="文件" collapseable="true">
    <view slot="head-actions">
      <view class="list-mode">
        <checkbox-group @change="checkboxChange" :data-index="index" :data-checks="checkbox.checked">
          <label class="checkbox-checkwords">
            <checkbox :data-index="index" id="2" :value="checkbox.value" @tap.stop @change.stop="checkboxChange"></checkbox>{{checkbox.name}}
          </label>
        </checkbox-group>
      </view>
    </view>
    <app-table fixednum="2" identity="file" :columns="page.fileTable.columns" :values="page.fileTable.rows" :total-row="page.fileTable.totalRow"></app-table>
  </app-section>
</view>
</template>

<script>
// pages/sjgl/sjxx.js
const app = getApp();
import regeneratorRuntime from "../../../utils/runtime";
const dealerColumns = [{
  label: '序号',
  width: '100rpx'
}, {
  label: '公司名',
  key: 'dealersCompanyName',
  color: '#333333',
  width: '160rpx',
  align: 'left'
}, {
  label: '所属项目',
  key: 'dealersProject',
  color: '#333333',
  width: '160rpx',
  align: 'left'
}, {
  label: '法人',
  key: 'dealersLegalPerson',
  color: '#333333',
  width: '160rpx',
  align: 'left'
}, {
  label: '电话',
  key: 'dealersPhone',
  color: '#333333',
  align: 'left'
}];
const teamWorkColumns = [{
  label: '序号',
  width: '100rpx'
}, {
  label: '项目名',
  key: 'bisProjectName',
  color: '#333333',
  width: '160rpx',
  align: 'left'
}, {
  label: '起始时间',
  key: 'startDate',
  color: '#333333',
  width: '220rpx',
  align: 'right',
  sortable: true
}, {
  label: '当月物管收入(万)',
  key: 'currentmonthmgrmoney',
  color: '#333333',
  width: '280rpx',
  align: 'right',
  sortable: true
}, {
  label: '上月物管收入(万)',
  key: 'lastmonthmgrmoney',
  color: '#333333',
  width: '280rpx',
  align: 'right',
  sortable: true
}, {
  label: '上月租金收入(万)',
  key: 'lastmonthrentmoney',
  color: '#333333',
  width: '280rpx',
  align: 'right',
  sortable: true
}, {
  label: '上月销售额(万)',
  key: 'lastmonthsales',
  color: '#333333',
  width: '240rpx',
  align: 'right',
  sortable: true
}, {
  label: '月平效',
  key: 'monthsEffect',
  color: '#333333',
  width: '220rpx',
  align: 'right',
  sortable: true
}, {
  label: '总欠费(万)',
  key: 'totalOwe',
  color: '#FF120D',
  width: '220rpx',
  align: 'right',
  sortable: true
}];
const fileColumns = [{
  label: '序号',
  width: '100rpx'
}, {
  label: '项目名',
  key: 'bisProjectName',
  color: '#333333',
  width: '160rpx',
  align: 'left'
}, {
  label: '合同号',
  key: 'contNo',
  color: '#333333',
  width: '220rpx',
  align: 'left'
}, {
  label: '计租面积',
  key: 'contNo',
  color: '#333333',
  width: '220rpx',
  align: 'left'
}, {
  label: '合同类型',
  key: 'contType',
  color: '#333333',
  width: '280rpx',
  align: 'left'
}, {
  label: '是否正常解约',
  key: 'termination',
  color: '#333333',
  width: '240rpx',
  align: 'left'
}, {
  label: '到期日',
  key: 'maturityDate',
  color: '#333333',
  width: '220rpx',
  align: 'right',
  sortable: true
}, {
  label: '到期天数',
  key: 'maturity',
  color: '#333333',
  width: '220rpx',
  align: 'right',
  sortable: true
}];
let fileAllColumns = [];
import appHeader from "../../../components/common/header";
import appProjectSelector from "../../../components/selector/project";
import appSection from "../../../components/container/section";
import appTable from "../../../components/table/index";

export default {
  data() {
    return {
		index:null,
      merchantInfomation: [{
        title: '中文名：',
        content: '',
        value: 'merchantsChineseName'
      }, {
        title: '英文名：',
        content: '',
        value: 'merchantsEnglishName'
      }, {
        title: '业态：',
        content: '',
        value: 'thirdlyFormats'
      }, {
        title: '店型：',
        content: '',
        value: 'storeType'
      }, {
        title: '状态：',
        content: '',
        value: 'status'
      }, {
        title: '合作项目数：',
        content: '',
        value: 'cooperativeProjectsNumber'
      }, {
        title: '合作项目:',
        content: '',
        value: 'cooperativeProjects'
      }],
      selected: {},
      checkbox: {
        value: 'contract',
        name: '有效合同',
        checked: false
      },
      page: {
        merchantTable: {
          columns: [],
          rows: []
        },
        teamWorkTable: {
          columns: [],
          rows: []
        },
        fileTable: {
          columns: [],
          rows: []
        }
      },
      merchantTable: {
        columns: [],
        rows: []
      },
      teamWorkTable: {
        columns: [],
        rows: []
      },
      fileTable: {
        columns: [],
        rows: []
      },
      query: {
        limit: 100,
        offset: 1,
        bisShopId: ''
      }
    };
  },

  components: {
    appHeader,
    appProjectSelector,
    appSection,
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bisShopId);
    this.setData({
      'query.bisShopId': options.bisShopId
    });
    this.loadData();
  },
  methods: {
    loadData: async function () {
      const url = '/api/v1/report/shangguans/bismerchanformatsbigs/list';
      const {
        data: res
      } = await app.globalData.request.options({
        loading: true
      }).get(url, this.query);
      let merchantArr = [];
      this.merchantInfomation.forEach((item, index) => {
        let content = res[item.value];

        if (item.value === 'thirdlyFormats') {
          content = '';

          if (res.primaryForms) {
            content = res.primaryForms;
          }

          if (res.secondaryFormats) {
            content = content + ' - ' + res.secondaryFormats;
          }

          if (res.thirdlyFormats) {
            content = content + ' - ' + res.thirdlyFormats;
          }

          content = content.toString();

          if (content) {
            if (content.length > 2) {
              if (content.substr(0, 3) === ' - ') {
                content = content.replace(' - ', '');
              }
            }
          } //  else {
          //   content = "-"
          // }

        }

        if (!content) {
          content = '-';
        }

        merchantArr.push({
          title: item.title,
          content: content
        });
      });
      const dealerRows = res.dealerBigs.map(item => {
        return {
          bisShopId: item.bisShopId,
          dealersCompanyName: item.dealersCompanyName,
          dealersPhone: item.dealersPhone,
          dealersProject: item.dealersProject
        };
      });
      const teamRows = res.projectBig.map(item => {
        return {
          bisShopId: item.bisShopId,
          bisProjectName: item.bisProjectName,
          startDate: item.startDate,
          monthsEffect: item.monthsEffect,
          totalOwe: item.totalOwe,
          currentmonthmgrmoney: item.currentmonthmgrmoney,
          lastmonthmgrmoney: item.lastmonthmgrmoney,
          lastmonthrentmoney: item.lastmonthrentmoney,
          lastmonthsales: item.lastmonthsales
        };
      });
      this.fileAllColumns = res.chantconBigs.map(item => {
        return {
          bisShopId: item.bisShopId,
          bisProjectName: item.bisProjectName,
          contNo: item.contNo,
          contStatus: item.contStatus,
          contType: item.contType,
          maturity: item.maturity,
          maturityDate: item.maturityDate,
          termination: item.termination,
          maturity: item.maturity,
          effectflg: item.effectflg
        };
      });
      let fileRows = [];

      if (this.checkbox.checked) {
        fileRows = this.fileAllColumns.filter(item => item.effectflg === 'Y');
      } else {
        fileRows = this.fileAllColumns;
      }

      const setData = {
        ['merchantInfomation']: merchantArr,
        ['page.merchantTable']: {
          columns: [...dealerColumns],
          rows: dealerRows
        },
        ['page.teamWorkTable']: {
          columns: [...teamWorkColumns],
          rows: teamRows
        },
        ['page.fileTable']: {
          columns: [...fileColumns],
          rows: fileRows
        }
      };
      this.setData(setData);
    },
    checkboxChange: function (e) {
      let checked = !this.checkbox.checked;
      let fileRows = [];

      if (checked) {
        fileRows = this.fileAllColumns.filter(item => item.effectflg === 'Y');
      } else {
        fileRows = this.fileAllColumns;
      }
      const setData = {
        ['checkbox.checked']: checked,
        ['page.fileTable']: {
          columns: [...fileColumns],
          rows: fileRows
        }
      };
      this.setData(setData);
    }
  }
};
</script>
<style>
@import "./sjxx.css";
</style>