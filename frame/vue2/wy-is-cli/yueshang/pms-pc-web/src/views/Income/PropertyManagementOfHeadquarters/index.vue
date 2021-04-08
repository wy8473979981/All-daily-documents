<template>
  <ys-n-container
    showList
    :rateConfig="rateConfig"
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="物管收缴率(%)"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBeforeSearch="asyncBeforeSearch"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
  ></ys-n-container>
</template>

<script>
// 物管收缴率（总部）
import YsNContainer from 'common/components/YsNContainer/index.vue';
import { RateConfig, FormConfig, X, TableConfig } from './config';
import { income } from 'api/modules/Income';
import { parseTime, setSession } from 'utils/utils';
export default {
  name: 'PropertyManagementOfHeadquarters',

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
        squareFlag: '',
        feeType: '2',
        yearMonth: parseTime(new Date(), '{y}-{m}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: income.getListByRentOfHeadquarters,
          responseKey: 'tableData',
        },

        echarts: {
          api: income.getChart,
          keys: {
            currYear: 'yearCurr',
            lastYear: 'yearLast',
            currData: 'contCollectionRate',
            lastData: 'contCollectionRateLast',
          },
        },

        list: {
          responseKey: 'list',
        },

        export: {
          type: 'exportOfIncomeProperymanagementHeadquarters',
        },
      },
    };
  },

  methods: {
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data;
    },

    asyncBefortTableUpdate(data) {
      const tableData = data.map((item) => {
        return Object.assign({}, item, {
          htStart: this.currentFormData.yearMonth,
          htRange: `${this.currentFormData.yearMonth.substring(0, 4)}-01~${
            this.currentFormData.yearMonth
          }`,
          qzStart: this.currentFormData.yearMonth,
          qzRange: `${this.currentFormData.yearMonth.substring(0, 4)}-01~${
            this.currentFormData.yearMonth
          }`,
          isSummary: item.id === '合计',
        });
      });

      const list = tableData.find((item) => item.id === '合计');

      return { tableData, list };
    },

    handleLinkClick(data) {
      if (data.row.id && !data.row.isSummary) {
        const formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          yearMonth: this.currentFormData.yearMonth,
        };

        setSession.call(this, 'income-properymanagement-project', formData);
      }
    },
  },
};
</script>
