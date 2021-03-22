<template>
  <!-- 融资价值 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="4" style="display: flex; align-items: center;">
        <el-select placeholder="请选择业态" size="mini" v-model="layout" clearable style="margin-right: 20px;">
          <el-option
                  v-for="item in layoutList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16" style="text-align: right;">
        <el-button @click="dealSearch" size="mini" type="success">查询</el-button>
        <el-button @click="dealAdd" size="mini" type="success">新增</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
        <el-button @click="dealImport" size="mini" type="success" plain>导入数据</el-button>
        <el-button @click="dealDown" size="mini" type="success" plain>导出Excel</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini"  header-row-class-name="table-header">
      <el-table-column type="selection" width="60" fixed />
      <el-table-column label="业态" prop="layout" fixed />
      <el-table-column label="项目名称" width="140" prop="project" fixed />
      <el-table-column label="自持经营建筑面积(㎡)" width="150" prop="area" fixed />
      <el-table-column label="自持总成本(万元)" width="120" prop="total"/>
      <el-table-column label="抵押物面积(㎡)" width="120" prop="area2"/>
      <el-table-column label="抵押物估值(万元)" width="120" prop="price"/>
      <el-table-column label="贷款金额(万元)" width="120" prop="loans"/>
      <el-table-column label="LTV(%)" prop="LTV"/>
      <el-table-column label="放款方" width="150" prop="loaner"/>
      <el-table-column label="借款开始日期" width="100" prop="time_start"/>
      <el-table-column label="借款终止日期" width="100" prop="time_end"/>
      <el-table-column label="综合利率(%)" width="100" prop="rate"/>
      <el-table-column label="借款年度利息(万元)" width="130" prop="borrow"/>
      <el-table-column label="抵押物上年度净运营收益(万元)" width="200" prop="income"/>
      <el-table-column label="DCR" prop="DCR"/>
      <el-table-column label="累计总投(万元)" width="120" prop="zongtou"/>
      <el-table-column label="创建人"  prop="create_user"/>
      <el-table-column label="创建日期" width="150" prop="create_time"/>

      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="toUpdate(scope.row.number_id)">编辑</el-button>
          <el-button size="mini" type="info" plain @click="toDelete(scope.row.number_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  const test = [
    {layout:'购物中心',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'商业街',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'购物中心',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'}
  ]
  const test2 = [
    {layout:'商业街',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'},
    {layout:'车库',project:'上海七宝宝龙广场',area:'100000.00',total:'150000.00',area2:'1000.00',price:'20000.00',loans:'10000.00',LTV:'50.00',loaner:'上海工商银行XX支行',time_start:'2010.5.6',time_end:'2020.5.7',rate:'6.52',borrow:'150000.00',income:'150000.00',DCR:'152',create_user:'admin',zongtou:'17860.00',create_time:'2020-03-10 13:50:00'}
  ]
  const list = [{lable: 0,value:'购物中心'},{lable: 1,value:'商业街'},{lable: 2,value:'车库'}]
  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        layout: '',// 业态类型
        layoutList: [],// 业态列表
        tableData: []
      }
    },
    watch: {},
    created() {
      this.layoutList = list
      this.tableData = test
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        if(this.pageInfo.page === 1){
          this.tableData = test
        }else{
          this.tableData = test2
        }
        this.pageInfo.sum_num = 12
      },
      dealSearch() {
        console.log(this.layout,'====this.layout')
        if(this.layout){
          let fil = [...test]
          this.tableData = fil.filter(item => {
            return item.layout === this.layout
          })
          Vue.set(this.tableData,'tableData','')
        }else{
          this.tableData = test
        }
        this.getList()
      },
      dealAdd() {

      },
      dealDel(ids) {
        try {
          this.$confirm(`确认要删除吗？`).then(() => {

          }).catch(() => {

          })
          // this.handelConfirm(id)
        } catch (error) {
          console.log(error, '----[取消删除 start]----')
        }
      },
      dealImport() {

      },
      dealDown() {

      },
      toUpdate() {

      },
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
            this.tableData.splice(id,1)
            this.getList()
        }).catch(() => {

        })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          // area5  num
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2)
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
</style>
