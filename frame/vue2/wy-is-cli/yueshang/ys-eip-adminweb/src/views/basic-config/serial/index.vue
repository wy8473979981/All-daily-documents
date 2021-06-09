<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label style="width:40px">分类：</label>
          <el-input v-model="query.keyCategory" placeholder="请输入分类" size="mini" style="max-width:160px"></el-input>
					<!-- <el-select v-model="query.keyCategory" placeholder="请选择" size="mini" style="max-width:160px">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.label">
						</el-option>
					</el-select> -->
        </div>
        <div>
          <label>创建时间：</label>
					  <el-date-picker
              size="mini"
							v-model="query.month"
							type="datetimerange"
							value-format="timestamp"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
              style="max-width:320px">
						</el-date-picker>
          <!-- <el-date-picker
            style="width:160px"
            v-model="query.month"
            type="month"
            size="mini"
            placeholder="开始时间">
          </el-date-picker>
           <el-date-picker
            style="width:160px"
            v-model="query.month"
            type="month"
            size="mini"
            placeholder="结束时间">
          </el-date-picker> -->
        </div>
        <el-button @click="reset(1)" size="mini">重置</el-button>
        <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="tool-bar" type="flex" justify="end" align="right">
      <el-button @click="deleSerial" :disabled="selectArr.length < 1" size="mini" type="danger">批量删除</el-button>
      <el-button @click="add" size="mini" type="success">新增序列号规则</el-button>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column label="分类" prop="keyCategory"/>
      <el-table-column align="center"  label="前缀" prop="keyPrefix"/>
      <el-table-column label="生成规则" prop="dateRule" show-overflow-tooltip/>
      <el-table-column align="right" label="当前最大值" prop="maxValue"/>
      <el-table-column align="right" label="顺序号长度" prop="seqLenth"/>
      <el-table-column align="center" width="130" label="最近日期" prop="lastDateVal"/>
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
    <edit :open="fast" @close="closeFast" :id="nowId" @refresh="getList">

    </edit>
  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import basicConfig from '../../../apis/apis/basicConfig';
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
          value: '1'
        },
        {
          label: '无效',
          value: '0'
        }
      ],
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      projectList: [],// 项目列表
      tableData: [],
      query: {
        month: [],
        keyCategory: ''
      },
    }
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        createdStartDate: this.query.month && this.query.month[0],
        createdEndDate: this.query.month && this.query.month[1],
        enterpriseId: 1 // 企业账套id先传1
      }
      await basicConfig.getSerialList(params).then(res => {
        console.log(res)
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      })
    },
    // 批量删除
    deleSerial() {
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.selectArr;
        basicConfig.deleSerial(params).then(res => {
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
    // 重置查询
    reset(val) {
      if (val == 1) {
        this.query.keyCategory = '';
        this.query.month = [];
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
    //新增
    add() {
      console.log('add')
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
  },
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
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
