<template>
  <el-dialog title="查询渠道" :visible.sync="visible" @close="$emit('update:show', false)" width="800px" v-if="show">
    <el-form :inline="true" :model="serachParm" class="demo-form-inline" label-width="80px" @submit.native.prevent>
      <el-row>
        <el-col :span="24">
          <el-form-item label="渠道名称">
            <el-input v-model.trim="serachParm.name" clearable placeholder="请输入渠道名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" @listenSingleEvent="setSingleSelection" :selection="false" :checkbox="true"></tableTemplate>
    <!-- 分页插件 -->
    <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
    <span slot="footer" class="dialog-footer">
      <template v-if="btnType">
        <el-button type="primary" @click="next">下一步</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="ok">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
export default {
  mixins: [listMixin],
  components: {},
  name: "channelComponent",
  data: function () {
    return {
      visible: this.show,
      serachParm: {
        name: null,
        activityId: null
      },
      selectTableRow: null,
      theadData: [{ checked: true, key: "name", val: "渠道名称" }],
      getListUrl: "/glp-crm/marketActivity/channel/listPage" //市场活动-渠道-分页列表-接口地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    marketActiveData: {
      type: Object,
      default: null
    },
    btnType: {
      type: Boolean,
      default: false
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
        return this.visible;
      },
      set() { }
    }
  },
  created() {
    this.serachParm = {
      ...this.serachParm,
      activityId: (this.marketActiveData && this.marketActiveData.id) || null
    };
    this.getList();
  },
  methods: {
    onSearchSubmit() {
      this.pageInfo.page = 1;
      this.pageInfo.total = 0;
      this.serachParm = {
        ...this.serachParm
      };
      this.getList();
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      if (this.selectTableRow) {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } else {
        this.$message({ type: "warning", message: "请选择活动渠道" });
      }
    },
    next() {
      if (this.selectTableRow) {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } else {
        this.$message({ type: "warning", message: "请添加活动渠道" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>