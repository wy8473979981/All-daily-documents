<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label style="width:80px">字典类型名称:</label>
          <el-input
            v-model="query.dictTypeName"
            size="mini"
            style="max-width:160px"
          ></el-input>
        </div>
        <div>
          <label style="width:60px">类型代码:</label>
          <el-input
            v-model="query.dictTypeCd"
            size="mini"
            style="max-width:160px"
          ></el-input>
        </div>
        <div>
          <label style="width:60px">是否有效：</label>
					<el-select v-model="query.enableFlg" placeholder="请选择" size="mini" style="max-width:160px">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
        </div>
        <el-button @click="reset(1)" size="mini">重置</el-button>
        <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="tool-bar" type="flex" justify="end" align="right">
      <el-button @click="deleData" :disabled="selectArr.length < 1" size="mini" type="danger">批量删除</el-button>
      <el-button @click="add" size="mini" type="success">新增数据字典</el-button>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column label="字典类型名称" prop="dictTypeName"/>
      <el-table-column label="类型代码" prop="dictTypeCd"/>
      <el-table-column align="center" width="80" label="显示序号" prop="dispOrderNo"/>
      <el-table-column align="center" width="80" label="是否有效" prop="enableFlg">
        <template slot-scope="scope">
            <span>{{scope.row.enableFlg | transBollean}}</span>
          </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" show-overflow-tooltip/>
      <el-table-column align="center" width="130" label="创建时间" prop="createdDate">
        <template slot-scope="scope">
          <span>{{scope.row.createdDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="130" label="更新时间" prop="updatedDate">
        <template slot-scope="scope">
          <span>{{scope.row.createdDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
    <edit :open="fast" @close="closeFast" @refresh="getList" :id="nowId">
    </edit>
  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import basicConfig from '@/apis/apis/basicConfig';
import { mapState } from 'vuex';
import edit from './edit';
export default {
  mixins: [handle_paginator],
  components: {edit},
  data() {
    return {
      selectArr: [],
      fast: false,
      nowId: '',
      value: '',
      options: [
        {
          label: '有效',
          value: true
        },
        {
          label: '无效',
          value: false
        }
      ],
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 1
      },
      projectList: [],// 项目列表
      tableData: [],
      query: {
        dictTypeName: null,
        dictTypeCd: null,
        enableFlg: null
      },
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created() {
    this.getList()
  },
  methods: {
      // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        companyId: this.userInfo.enterpriseId
      }
      await basicConfig.getDataList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      })
    },
    // 重置查询
    reset(val) {
      if (val == 1) {
        this.query.dictTypeName = null
        this.query.dictTypeCd = null
        this.query.enableFlg = null
      };
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
    },
    handleSelectionChange(val) {
      this.selectArr = val.map(item => item.id);
    },
    // 批量删除
    deleData() {
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.selectArr;
        basicConfig.deleData(params).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
        })
      }).catch(err => console.log(err))
    },
    //新增
    add() {
      this.nowId = '';
      this.fast = true;
    },
    edit(id) {
      // 编辑
      this.fast = true;
      this.nowId = id;
    },
    closeFast() {
      this.fast = false;
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@/assets/styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  .ys-text-blue{
    color: #1890FF;
  }
  label {
    width: 70px;
  }
</style>
