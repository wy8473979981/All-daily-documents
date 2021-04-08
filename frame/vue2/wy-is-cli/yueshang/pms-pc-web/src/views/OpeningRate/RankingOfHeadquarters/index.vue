<template>
  <ys-n-container
    showList
    :rateConfig="rateConfig"
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="考核开业率(%)"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
  >
    <template slot="title">
      <el-button class="title-right" type="text" @click="handleToSummary">开业率汇总</el-button>
    </template>
  </ys-n-container>
</template>

<script>
// 开业率排名（总部）
import YsNContainer from 'common/components/YsNContainer/index.vue';
import { RateConfig, FormConfig, X, TableConfig } from './config';
import { openingRate } from 'api/modules/OpeningRate';
import { parseTime, setSession } from 'utils/utils';
export default {
  name: 'RankingOfHeadquarters',

  components: { YsNContainer },

  data() {
    return {
      rateConfig: RateConfig,

      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig(this.handleLinkClick),

      formData: {
        chargeType: '',
        stage: '',
        areaId: '',
        province: '',
        squareFlag: '',
        startYearMonth: parseTime(new Date(), '{y}-{m}'),
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: openingRate.getListByRankingOfHeadquarters,
          responseKey: 'tableData',
        },
        echarts: {
          api: openingRate.getListByQueryOpenRateList,
          keys: {
            currYear: 'yearCurr',
            lastYear: 'yearLast',
            currData: 'openRate',
            lastData: 'openRateLast',
          },
        },
        export: {
          type: 'exportOfOrRankingHeadquarters',
        },
        list: {
          responseKey: 'list',
        },
      },
    };
  },
  methods: {
    asyncBefortTableUpdate(data) {
      const list = data.find((item) => item.id == '合计');

      const mData = data.map((item) => {
        if (item.id == '合计') {
          return Object.assign(item, { isSummary: true });
        }
        return item;
      });
      return { list, tableData: mData };
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data;
    },

    handleLinkClick(data) {
      if (data.row.id && data.row.id !== '合计') {
        let formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          yearMonth: this.currentFormData.yearMonth,
        };

        setSession.call(this, 'or-ranking-project', formData);
      }
    },

    handleToSummary() {
      setSession.call(this, 'or-summary-headquarters', {});
    },
  },
};
</script>
