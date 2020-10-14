<template>
  <el-dialog
    title="活动查询"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="800px"
    v-if="show"
    @submit.native.prevent
  >
    <el-form :inline="true" :model="serachParm" class="demo-form-inline" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动名称">
            <el-input v-model.trim="serachParm.name" clearable placeholder="请输入活动名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动类型" prop="type">
            <el-select v-model="serachParm.type" clearable class="form-input" placeholder="全部类型">
              <el-option
                v-for="(item,index) in dictTable.MARKET_ACTIVITY_TYPE"
                :key="index"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableTemplate
      v-loading="isGetList"
      :thead-data="theadData"
      :table-data="tableData"
      @listenSingleEvent="setSingleSelection"
      :selection="false"
      :checkbox="true"
    ></tableTemplate>
    <!-- 分页插件 -->
    <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  name: "actionComponent",
  data: function() {
    return {
      visible: this.show,
      SelectionOptions,
      serachParm: {
        //查询参数
        name: null,
        type: null,
        id: null //已选的活动渠道ID
      },

      selectTableRow: null,
      theadData: [
        { checked: true, key: "name", val: "活动名称" },
        {
          checked: true,
          key: "type",
          val: "活动类型",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let MARKET_ACTIVITY_TYPE = Utils.dictTable(
                "MARKET_ACTIVITY_TYPE"
              );
              MARKET_ACTIVITY_TYPE.map(function(item, index, array) {
                if (item.key == row.type) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        {
          checked: true,
          key: "startDate",
          val: "开始日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.startDate, 1);
          }
        },
        {
          checked: true,
          key: "endDate",
          val: "结束日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.endDate, 1);
          }
        }
      ],
      dictTable: null, //字典表
      getListUrl: "/glp-crm/activity/queryList" //列表数据地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    activeChannelData: {
      type: Object,
      default: null
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
      set() {}
    }
  },
  created() {
    this.serachParm = {
      ...this.serachParm,
      id: (this.activeChannelData && this.activeChannelData.id) || null
    };
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.getList();
  },
  methods: {
    onSearchSubmit() {
      this.serachParm = {
        ...this.serachParm
      };
      this.toSearch();
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      if (this.selectTableRow) {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } else {
        this.$message({ type: "warning", message: "请选择活动" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>