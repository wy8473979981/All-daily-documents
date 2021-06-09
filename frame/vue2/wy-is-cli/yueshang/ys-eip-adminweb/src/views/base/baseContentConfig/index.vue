<template>
  <div class="tem-con">
    <div class="list-page">
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="24" style="display: flex; align-items: center;">
          <div>
            <label class="label">内容模板名称：</label>
            <el-input class="search-input" clearable size="mini" v-model="query.templateName"></el-input>
          </div>
          <div>
            <label class="label">内容模板分类：</label>
            <el-input class="search-input" clearable size="mini" v-model="query.templateCat"></el-input>
            <!-- <el-select class="search-input" v-model="query.templateCat" placeholder="请选择" clearable size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </div>
          <el-button @click="reset(1)" size="mini">重置</el-button>
          <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
        </el-col>
      </el-row>
      <div class="handle-btn-row">
        <el-col :span="8" style="text-align: right;">
          <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
          <el-button @click="dealAdd" size="mini" type="success">新增内容模板</el-button>
        </el-col>
      </div>
      <el-table ref="table" :data="tableData" size="mini" border @selection-change="handleSelectionChange" :height="this.$store.state.tableHeight">
        <el-table-column type="selection" width="50" fixed />
        <el-table-column label="内容模板分类" prop="templateCat" />
        <el-table-column label="内容模板代码" prop="templateCd" />
        <el-table-column label="内容模板标识" prop="templateTag" />
        <el-table-column label="内容模板名称" prop="templateName" />
        <el-table-column label="语言代码" prop="lang" />
        <el-table-column align="center" width="80" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="goEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
      <!-- dialog -->
      <div>
        <Detail :open="fast" @close="closeFast" @refresh="getList" :id="nowId">
        </Detail>
      </div>
    </div>
  </div>
</template>

<script>
import { handle_paginator } from "@/mixins";
import basicConfig from '@/apis/apis/basicConfig';
import Detail from "./detail";
export default {
  components: {
    Detail
  },
  mixins: [handle_paginator],
  data() {
    return {
      isPreview: false,
      value1: "",
      value2: "",
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [{}],
      ids: "", // 选中的ids
      query: {},
      fast: false,
      nowId: null // 编辑id
    };
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: 1 // 企业账套id先传1
      };
      await basicConfig.getBaseContentList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;

          this.$Utils.getDynamicTableHeight(this)

        }
      });
    },
    reset(val) {
      if (val == 1) {
        this.query = {};
      };
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
    },
    dealAdd() {
      this.nowId = '';
      this.fast = true;
    },
    dealDel() {
      if (!this.ids) {
        this.$message.error("请勾选需要删除的数据");
        return;
      }
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.ids;
        basicConfig.deleBaseContent(params).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
        })
      }).catch(err => console.log(err));
    },
    goEdit(id) {
      this.fast = true;
      this.nowId = id;
    },
    closeFast(res) {
      console.log(res);
      this.fast = res.fast;
      this.detail_id = null;
      if (res.reload) {
        this.getList();
      }
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id);
    }
  },
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time + "000")).format("yyyy-MM-dd") : "";
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
@import "~@/assets/styles/common.scss";
.ys-tab-col-color {
  color: #df1717 !important;
}
.ys-text-blue {
  color: #1890ff;
}
.tem-con {
  display: flex;
  .tree-menu-con {
    padding: 10px;
    margin-right: 3px;
    background-color: #fff;
    flex: 0 0 220px;
  }
  .list-page {
    flex: 1;
  }
}

// 统一样式风格
.label{
  width: 90px
}
.handle-btn-row{
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  .el-col{
    float: right;
  }
}
.search-input{
  flex: 1;
  min-width: 120px;
  max-width: 160px;
}

</style>
