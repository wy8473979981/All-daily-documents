<template>
  <ys-n-container
    showList
    :rateConfig="rateConfig"
    :formConfig="formConfig"
    showChart
    :chartX="x"
    chartTitle="考核出租率(%)"
    chartSubTitle="按月统计出租率（例：8月出租率为8月31日出租率）"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :form-data="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
  ></ys-n-container>
</template>

<script>
// 出租率排名（总部）
import YsNContainer from 'common/components/YsNContainer/index.vue';
import { RateConfig, FormConfig, X, TableConfig } from './config';
import { leaseRate } from 'api/modules/LeaseRate';
import { parseTime, setSession } from 'utils/utils';
export default {
  name: 'LeaseOfHeadquarters',

  components: {
    YsNContainer,
  },

  data() {
    return {
      rateConfig: RateConfig,

      formConfig: FormConfig,

      x: X,

      tableConfig: TableConfig(this.handleLinkClick),

      formData: {
        chargeType: '',
        squareFlag: '1',
        areaId: '',
        province: '',
        stage: '',
        startDate: parseTime(new Date(), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: leaseRate.getListByLeaseOfHeadquarters,
          responseKey: 'tableData',
        },
        echarts: {
          api: leaseRate.getListByQueryLeaseRateList,
          keys: {
            currYear: 'yearCurr',
            lastYear: 'yearLast',
            currData: 'leaseRate',
            lastData: 'leaseRateLast',
          },
        },
        list: {
          responseKey: 'list',
        },
        export: {
          type: 'exportOfLrLeaseHeadquarters',
        },
      },
    };
  },

  methods: {
    asyncBefortTableUpdate(data) {
      const list = {
        leaseRate: data[0] && data[0].leaseRate,
      };

      return {
        list,
        tableData: data.map((item) =>
          Object.assign(item, {
            isSummary: item.summary,
          })
        ),
      };
    },

    asyncBeforeSearch(data) {
      this.currentFormData = data;

      return Object.assign(data, {
        yearMonth: data.endDate.substring(0, 7),
      });
    },

    handleLinkClick(data) {
      if (data.row.id && !data.row.summary) {
        const formData = {
          projectId: data.row.id,
          startDate: this.currentFormData.startDate,
          endDate: this.currentFormData.endDate,
          chargeType: this.currentFormData.chargeType,
          squareFlag: this.currentFormData.squareFlag,
          areaId:
            this.currentFormData.areaId === 0
              ? ''
              : this.currentFormData.areaId,
          province:
            this.currentFormData.province === 0
              ? ''
              : this.currentFormData.province,
          stage:
            this.currentFormData.stage === 0 ? '' : this.currentFormData.stage,
        };
        setSession.call(this, 'lr-report-project', formData);
      }
    },
  },
};
</script>
