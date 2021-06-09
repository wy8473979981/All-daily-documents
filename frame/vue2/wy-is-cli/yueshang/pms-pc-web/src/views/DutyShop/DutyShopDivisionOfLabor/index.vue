<template>
  <ys-n-container
    ref="container"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData.sync="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
    :hasPagination="true"
    @form-change="handleFormChange"
  ></ys-n-container>
</template>

<script>
// 欠费查询
import YsNContainer from 'common/components/YsNContainer/index.vue';
import { FormConfig, TableConfig } from './config';
import { dutyShop } from 'api/modules/DutyShop';
import { parseTime } from 'utils/utils';
export default {
  name: 'ArrearsOfProject',

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig.call(this),

      formData: {
        projectId: '',
        storeNo: '',
        areaId: '',
        openStatus: '',
        startDate: parseTime(new Date(), '{y}-{m}-{d}'),
        endDate: parseTime(new Date(), '{y}-{m}-{d}'),
      },

      currentFormData: this.formData,

      requestConfig: {
        query: {
          api: dutyShop.queryDivisionHisList,
          responseKey: 'list'
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
      return data;
    },

    handleFormChange(key, value) {
      if (key === 'areaId' && (value !== 'empty' || value !== '')) {
        this.$refs.container.updateFormData({ projectId: '' })
      }
    }
  },
};
</script>
