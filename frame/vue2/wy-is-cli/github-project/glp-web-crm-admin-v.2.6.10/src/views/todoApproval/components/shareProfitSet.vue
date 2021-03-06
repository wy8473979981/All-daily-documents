<template>
  <div class="shareProfitSet-approval">
    <el-form class="form-section" :model="baseInfo" ref="baseInfo" :inline="true" size="small" label-width="150px">
      <el-row :gutter="20" class="label-width row-span">
        <el-col :span="8">
          <el-form-item label="客户名称:" prop="customerName">
            <span>{{baseInfo.customerName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生效状态:" prop="effectiveStatus">
            <span>{{Utils.getLabel(baseInfo.effectiveStatus,dictTable.SHARE_PROFIT_STATUS)}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="截止日期:" prop="expireDate">
            <span>{{Utils.timestampToTime(baseInfo.expireDate,1)}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="padding-l-60">
        <el-col :span="12">
          <el-form-item label="授信额度编号:" class="btn-box creadit-no" prop="credits">
            <div class="creadit-no-list">
              <tableTemplate :thead-data="theadData" :table-data="baseInfo.credits" ref="tablearea" :selection="false" :checkbox="false" :maxHeight="'500px'"></tableTemplate>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class :gutter="20">
        <el-col :span="24">
          <p style="margin:20px 0">参与方：</p>
        </el-col>
      </el-row>
      <el-row class="row-item partners_list padding-l-60" :gutter="20" v-for="(item,index) in baseInfo.partners" :key="item.message" style="margin-bottom:0;">
        <el-col :span="8">
          <label v-if="item&&item.type == 1">所属事业部:</label>
          <label v-if="item&&item.type == 2">所属事业部:</label>
          <span>{{item&&Utils.getLabel(item.businessCode,dictTable.BUSINESS_RANGE)||'-'}}</span>
        </el-col>
        <el-col :span="8">
          <label v-if="item&&item.type == 1">客户拥有人:</label>
          <label v-if="item&&item.type == 2">参与方成员{{index}}:</label>
          <span>{{item&&item.userName||'-'}}</span>
        </el-col>
        <el-col :span="8">
          <label v-if="item&&item.type == 1">分润比例:</label>
          <label v-if="item&&item.type == 2">分润比例:</label>
          <span>{{item&&item.profitRatio?item.profitRatio+'%':'-'}}</span>
        </el-col>
      </el-row>
      <el-row class="padding-l-60" :gutter="20" v-if="!baseInfo.partners||baseInfo.partners.length==0">
        <el-col :span="12">
          <label style="color:#666;font-size:12px;">暂无记录</label>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  name: "shareProfitSet",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      Utils: Utils,
      dictTable: null, //字典表
      theadData: [
        { checked: true, key: "creditCode", val: "额度编号", },
        {
          checked: true, key: "relationType", val: "额度类型",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let CREDIT_RELATION_TYPE = this.dictTable.CREDIT_RELATION_TYPE;
              CREDIT_RELATION_TYPE.map(function (item, index, array) {
                if (item.key == row.relationType) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        { checked: true, key: "productName", val: "产品名称" },
        {
          checked: true, key: "amount", val: "额度金额(元)",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.MicrometerLevel(row.amount, '', 2);
          }
        },
        {
          checked: true, key: "approvedTime", val: "获批日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.approvedTime, 2);
          }
        }
      ],
    };
  },
  // watch: {
  //   baseInfo: function (v) {
  //     this.baseInfo = v;
  //   }
  // },
  computed: {

  },
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  },
  mounted() {
  },
  methods: {}

}
</script>

<style lang="scss">
.shareProfitSet-approval {
  .label-width {
    .el-form-item__label {
      width: 128px !important;
    }
  }
  .row-item {
    font-size: 14px;
    margin-bottom: 20px;
    label {
      color: #3a3131;
      font-weight: normal;
      margin: 0 5px 15px 0;
      display: inline-block;
    }
    span {
      color: #888;
      word-break: break-all;
      line-height: 1.5em;
      font-weight: normal;
      margin: 0 5px 15px 0;
      display: inline-block;
    }
  }
  .creadit-no {
    .el-form-item__label {
      text-align: left;
    }
    .creadit-no-list {
      width: 1000px;
      height: 250px;
      overflow: hidden;
      overflow-y: auto;
      border: 1px solid #c0c4cc;
      padding: 5px;
      ul > li {
        line-height: 24px;
      }
    }
    .el-button {
      height: 32px;
    }
  }
  .padding-l-60 {
    padding-left: 60px;
  }
}
</style>