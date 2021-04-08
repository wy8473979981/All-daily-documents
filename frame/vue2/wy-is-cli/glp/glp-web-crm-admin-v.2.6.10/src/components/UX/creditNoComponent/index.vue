<template>
  <el-dialog title="查询授信额度" :visible.sync="visible" @close="$emit('update:show', false)" width="1000px" v-if="show">
    <el-form :inline="true" :model="serachParm" ref="searchForm" @submit.native.prevent class="demo-form-inline creditNoComponent" label-width="80px">
      <el-row class="row-span">
        <el-col :span="24">
          <el-form-item label="客户名称" prop="customerName">
            <span>{{serachParm.customerName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <p class="tip">！查询结果不包含担保额度、渠道额度、交易对手</p>
        </el-col>
      </el-row>
    </el-form>
    <tableTemplate :thead-data="theadData" :table-data="tableData" ref="tablearea" @listenMultiEvent="setMultipleSelection" :selection="true" :checkbox="true" :maxHeight="'500px'"></tableTemplate>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import DataApi from '@/api/common'
import { SelectionOptions } from "@/js/common/consts";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  name: "creditNoComponent",
  data: function () {
    return {
      Utils: Utils,
      visible: this.show,
      dictTable: null, //字典表
      SelectionOptions,
      serachParm: {
        //查询参数
        statusList: [1],
        relationTypeList: ["DIRECT", "SUB"]
      },
      selectTableRow: null,
      notSelectTableRow: null,
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
        { checked: true, key: "businessTypeName", val: "产品名称" },
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
      getListUrl: "/glp-crm/share/profit/queryCredit" //列表数据地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    customerName: {
      type: String,
      default: null
    },
    customerCode: {
      type: Number,
      default: null
    },
    defaultArr: {
      type: Array,
      default: []
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  computed: {
    isShow: {
      get() {
        console.log(this.visible, "this.visible");
        return this.visible;
      },
      set() { }
    }
  },
  created() {
    try {
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.serachParm = {
        ...this.serachParm,
        customerName: this.customerName,
        customerCode: this.customerCode
      };
      this.getList();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    onSearchSubmit() {
      this.$refs["searchForm"].validate(valid => {
        if (valid) {
          this.serachParm = {
            ...this.serachParm
          };
          this.getList();
        }
      });
    },
    setMultipleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      try {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } catch (e) {
        console.log(e)
      }
    },
    getList() {                                     //获取列表数据
      let params = {
        ...this.serachParm,
        page: 1,
        size: 1000,
      }
      DataApi.post(this.getListUrl, params).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.tableData = ndata.items;
          } else {
            this.$message({ type: 'warning', message: res.message ? res.message : '系统异常请联系管理员！' })
          }
        }
      ).then(res => {
        // 选中 已选择过 的授信编号
        let defaultArr = this.defaultArr.map((item) => {
          return item.creditCode;
        })
        this.$refs.tablearea.defaultSelectionRow(defaultArr);
      })
    },
  }
};
</script>

<style lang="scss">
.creditNoComponent {
  .height {
    height: 600px;
    overflow-y: auto;
  }
  .tip {
    padding-left: 15px;
    margin: 8px 0;
  }
  .row-span {
    font-size: 14px;
    .el-form-item {
      margin-bottom: 0px;
    }
    label {
      color: #3a3131;
      font-weight: normal;
      display: inline-block;
    }
    span {
      color: #888;
      word-break: break-all;
      line-height: 1.5em;
      font-weight: normal;
      display: inline-block;
    }
  }
}
</style>
