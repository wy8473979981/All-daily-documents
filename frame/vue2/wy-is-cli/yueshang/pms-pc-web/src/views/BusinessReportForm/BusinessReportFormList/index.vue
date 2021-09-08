<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 招商报表-主页
-->
<template>
  <ys-n-container
    ref="container"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :request-config="requestConfig"
    :formData.sync="formData"
    :asyncBefortTableUpdate="asyncBefortTableUpdate"
    :asyncBeforeSearch="asyncBeforeSearch"
    :asyncBeforeExport="asyncBeforeSearch"
    :tableOrder="tableOrder"
    @form-change="handleFormChange"
    isDisTable
    newUi
    :exprotLeft="false"
  >
    <template #topOrder>
      <ysn-status-search
        :hasAll="false"
        :config="statusSearchConfig"
        name="类型"
        isRadio
        v-model="reportType"
        @change="statusSearchCHange"
      />
    </template>
  </ys-n-container>
</template>

<script>
// 欠费查询
import YsNContainer from "common/components/YsNContainer/index.vue";
import {
  FormConfig,
  TableConfig1,
  TableConfig2,
  TableConfig3,
  StatusSearchConfig,
} from "./config";
import { businessReportForm } from "api/modules/BusinessReportForm";
// import { parseTime } from 'utils/utils';

const tableConfig = {
  TableConfig1,
  TableConfig2,
  TableConfig3,
};
export default {
  name: "ArrearsOfProject",

  components: { YsNContainer },

  data() {
    return {
      formConfig: FormConfig.call(this),
      reportType: "1", //报表类型(1面积 2品牌 3楼层),示例值(1)
      formData: {
        // reportType:'1', //报表类型(1面积 2品牌 3楼层),示例值(1)
        projectId: "", //项目id
        chargeType: "", //物业类型
        startDate: "",
        endDate: "",
      },
      requestConfig: {
        query: {
          api: businessReportForm.getBusinessReportFormList,
        },
      },

      spanArr: [], // 每一行记录的合并数
    };
  },

  computed: {
    tableConfig() {
      return tableConfig[`TableConfig${this.reportType}`].call(
        this,
        this.formData
      );
    },
    statusSearchConfig() {
      return StatusSearchConfig.call(this);
    },
    tableOrder() {
      if (this.reportType !== "3") {
        return {
          spanMethod: this.objectSpanMethod,
        };
      }
      return {};
    },
  },
  created(){
    try{
      let formData = JSON.parse(this.$route.query.data).formData;
      this.formData = {
        ...this.formData,
        chargeType:formData.mallType
      }
    }catch(err){
      console.log(err)
    }
  },
  methods: {
    // 顶部类型change
    statusSearchCHange(val) {
      // 重新获取数据
      this.formData.reportType = val;
      this.$refs["container"].getMessage({
        data: {
          formData: this.formData,
        },
      });
    },
    asyncBeforeSearch(data) {
      this.formData.reportType = this.reportType;
      data.reportType = this.reportType;
      return data;
    },

    asyncBefortTableUpdate(data = []) {
      // 面积与品牌数的合并行处理
      if (this.formData.reportType !== "3") {
        // 把config根据data中的storePostion 进行合并
        let spanData = {};

        // step1 先统计每个storePostion需要合并多少个rowspan
        // 遍历data 找到storePostion对应的开始rowspan 然后把其余的的rowspan都改成0
        data.forEach((item, index) => {
          // 先新增合计
          if (data[index].issuingLayoutCD === "项目合计") {
            data[index].storePostion = "合计";
          }

          // 先初始化 用于计算总的rowspan
          if (!spanData[item.storePostion]) {
            spanData[item.storePostion] = {
              num: 0,
              index: index,
            };
          }

          // 设置rowspan
          spanData[item.storePostion].num++;
          data[spanData[item.storePostion].index].rowspan =
            spanData[item.storePostion].num;
          // 合计行加粗
          data[index].isBold =
            data[index].issuingLayoutCD === "项目合计" ||
            data[index].issuingLayoutCD === "小计";
        });

        return data;
      }

      // 楼层数据处理
      return this.floorData(data);
    },
    // 楼层数据处理
    floorData(data) {
      let dataStr = [
        "childrenDetail",
        "cinemaDetail",
        "clothingDetail",
        "lifeSupportDetail",
        "majorStoreDetail",
        "marketDetail",
        "restaurantDetail",
        "retailSupportDetail",
        "totalDetail",
      ];
      let newData = data.map((item) => {
        let newItem = { ...item };
        for (let key in item) {
          if (dataStr.includes(key)) {
            // 把item[key]里的对象key命名调整 并加入到newItem中
            for (let itemKey in item[key]) {
              newItem[key + itemKey] = item[key][itemKey];
            }
          }
        }

        newItem.isBold = newItem.floorNumber === "整场";
        return newItem;
      });
      return newData;
    },
    handleFormChange(key, value) {
      this.formData[key] = value;
      this.$refs.container.updateFormData(this.formData);
    },
    // 表头合并
    objectSpanMethod({ row, columnIndex }) {
      // 基础合并
      if (columnIndex === 0) {
        // 先处理合计行
        if (row.issuingLayoutCD === "项目合计") {
          return {
            rowspan: 1,
            colspan: 2,
          };
        }

        // 合并同组
        if (row.rowspan) {
          return {
            rowspan: row.rowspan,
            colspan: 1,
          };
        }

        // 隐藏多余
        return {
          rowspan: 0,
          colspan: 0,
        };
      }

      // 合计行第二列隐藏
      if (row.issuingLayoutCD === "项目合计" && columnIndex === 1) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
};
</script>
