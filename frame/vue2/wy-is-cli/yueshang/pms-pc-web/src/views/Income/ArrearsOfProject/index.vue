<template>
  <ys-n-container
    :subTitle="subTitle"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
    :hasPagination="true"
  ></ys-n-container>
</template>

<script>
// 欠费查询
import YsNContainer from 'common/components/YsNContainer/index.vue';
import { FormConfig, TableConfig } from './config';
import { income } from 'api/modules/Income';
import { formatNumber } from 'utils/utils';
export default {
  name: 'ArrearsOfProject',

  components: { YsNContainer },

  data() {
    return {
      subTitle: '欠费合计(万元)：-(其中租金：-/物管费：-)',

      formConfig: FormConfig,

      formData: {
        projectId: '',
        chargeType: '',
        accountAgeType: '',
        shopNameOrStoreNo: '',
        feeTypeList: ['1', '2'],
        caliberType: '1',
      },

      currentFormData: {
        projectId: '',
        chargeType: '',
        accountAgeType: '',
        shopNameOrStoreNo: '',
        feeTypeList: ['1', '2'],
        caliberType: '1',
      },

      requestConfig: {
        query: {
          api: income.getListByArrearsOfProject,
          responseKey: 'shopOweFeeList'
        },
      },
    };
  },

  computed: {
    tableConfig() {
      return TableConfig.call(this)
    }
  },

  methods: {
    asyncBeforeSearch(data) {
      this.currentFormData = data;
      return data
    },

    asyncBefortTableUpdate(data = {}) {
      // console.log('data', data);
      const subTitle = `欠费合计(万元)：${formatNumber(data.allOweFee, 'ten-thousand')}(其中租金：${formatNumber(data.zjOweFee, 'ten-thousand')}/物管费：${formatNumber(data.wgOweFee, 'ten-thousand')})`
      
      this.subTitle = subTitle
      return data;
    },
  },
};
</script>
