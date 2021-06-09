<template>
<div>
<el-dialog title="选择审批节点" :visible.sync="show" :append-to-body="true" width="1000px">
    <div class="list-page">
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="24" style="display: flex; align-items: center;">
          <div>
            <label class="label">节点CD：</label>
            <el-input class="search-input" clearable size="mini" v-model="query.nodeCode"></el-input>
          </div>
          <div>
            <label class="label">节点名称：</label>
            <el-input class="search-input" clearable size="mini" v-model="query.nodeName"></el-input>
          </div>
          <div>
            <label class="label" style="width: 66px">负责人CD：</label>
            <el-input class="search-input" clearable size="mini" v-model="query.nodeUserId"></el-input>
          </div>
          <!-- <div>
            <label class="label">是否有效：</label>
            <el-select class="search-input" v-model="query.enableFlg" placeholder="请选择" clearable size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
          <el-button @click="reset(1)" size="mini">重置</el-button>
          <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
        </el-col>
       
      </el-row>
      <el-table ref="table" :data="tableData" size="mini" @row-click="rowClick">
        <!-- <el-table-column type="selection" width="60" fixed /> -->
        <el-table-column label="节点CD" prop="nodeCode" show-overflow-tooltip/>
        <el-table-column label="节点名称" prop="nodeName" show-overflow-tooltip/>
        <el-table-column label="负责人" prop="nodeUserName" show-overflow-tooltip/>
        <el-table-column label="节点类型" prop="nodeType" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{nodeTypeComp(scope.row.nodeType)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点标签" prop="nodeLabel" show-overflow-tooltip>
           <template slot-scope="scope">
            <span>{{nodeLabel1Comp(scope.row.nodeLabel)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点标签2" prop="nodeLabel2" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{nodeLabel2Comp(scope.row.nodeLabel2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="网批节点类型" prop="orgLevelCd" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{orgLevelCdComp(scope.row.orgLevelCd)}}</span>
          </template>
        </el-table-column>
      </el-table>

      <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    </div>
</el-dialog>
</div>
</template>

<script>
import { handle_paginator } from "@/mixins";
import flowManange from '@/apis/apis/flow';
import reference from '@/apis/apis/reference';
import { mapState } from 'vuex';
export default {
  mixins: [handle_paginator],
  props: ['open','processId'],
  data() {
    return {
      options: [
        {
          value: "true",
          label: "是"
        },
        {
          value: "false",
          label: "否"
        }
      ],
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [{}],
      query: {
        enableFlg: true
      },
      nodeTypeList: [], // 节点类型匹配
      nodeLabelList: [], // 节点标签匹配
      nodeLabelList2: [], // 节点标签2匹配,
      orgLevelCdList: [], // 网批节点类型匹配
    };
  },
  computed: {
    ...mapState(['userInfo']),
    show: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close')
      }
    },
    nodeTypeComp() {
      return function(val) {
         if(!val) return '';
          const target = this.nodeTypeList.filter( e => 
            e.dictCd == val
          );
          if(target[0]) {
            return target[0].dictName;
          } else {
            return ''
          }
      }
    },
    nodeLabel1Comp() {
      return function(val) {
         if(!val) return '';
          const target = this.nodeLabelList.filter( e => 
            e.dictCd == val
          );
          if(target[0]) {
            return target[0].dictName;
          } else {
            return ''
          }
      }
    },
    nodeLabel2Comp() {
      return function(val) {
         if(!val) return '';
          const target = this.nodeLabelList2.filter( e => 
            e.dictCd == val
          );
          if(target[0]) {
            return target[0].dictName;
          } else {
            return ''
          }
      }
    },
    orgLevelCdComp() {
      return function(val) {
         if(!val) return '';
          const target = this.orgLevelCdList.filter( e => 
            e.dictCd == val
          );
          if(target[0]) {
            return target[0].dictName;
          } else {
            return ''
          }
      }
    },
  },
  watch: {},
  created() {
    this.getList();
    this.getNodeLabelList();
  },
  mounted() {},
  methods: {
    // 获取下拉匹配
    async getNodeLabelList() {
      const enterpriseId = this.userInfo.enterpriseId;
      await reference.getNodeLabelList(enterpriseId).then(res => {
        if(res.code == 1 && res.data){
          this.nodeTypeList = res.data.nodeType || [];
          this.nodeLabelList = res.data.labelType || [];
          this.nodeLabelList2 = res.data.label2Type || [];
          this.orgLevelCdList = res.data.orgLevelCd || [];
        }
      })
    },
     async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: 1,// 企业账套id先传1
        processId: this.processId
      };
      await flowManange.getNodeList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      });
    },
    reset(val) {
      if (val == 1) this.query = {};
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
    },
    rowClick(row) {
      console.log(row)
      this.$emit('close', row)
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
  width: 60px
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
