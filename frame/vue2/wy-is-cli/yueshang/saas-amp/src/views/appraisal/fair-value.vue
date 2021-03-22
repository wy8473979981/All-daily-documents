<template>
  <!-- 经营价值 -->
  <div class="page">
    <div class="list-page">
      <ys-title :downUrl="downUrl"></ys-title>
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="4" style="display: flex; align-items: center;">
          <el-select placeholder="请选择业态" size="mini" v-model="query.biz_form_name" clearable style="margin-right: 20px;">
            <el-option
              v-for="(item,index) in layoutList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="16" style="text-align: right;">
          <el-button @click="dealSearch" size="mini" type="success">查询</el-button>
          <!-- <el-button @click="dealAdd" size="mini" type="success">新增</el-button> -->
          <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
          <el-upload
            :before-upload="beforeUpload"
            name="fileName"
            :action="uploadUrl"
            accept=".xls"
            :show-file-list="false"
            :on-change="uploadHandle"
            :on-success="handleSuccess"
            style="display: inline-block; margin-left: 10px;">
            <el-button @click="dealImport" size="mini" type="success" plain>导入数据</el-button>
          </el-upload>
          <!-- <el-button @click="dealDown" size="mini" type="success" plain>导出Excel</el-button> -->
        </el-col>
      </el-row>
      <el-table ref="table" :data="tableData" size="mini" show-summary :summary-method="getSummaries" header-row-class-name="table-header" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" fixed />
        <el-table-column label="业态" prop="biz_form_name" fixed />
        <el-table-column label="项目名称" width="140" fixed >
          <template slot-scope="scope">
            <span @click="openModel(scope.row.project_name)" :class="scope.row.project_name !== '地下车库'?'ys-text-blue':''">{{scope.row.project_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="自持建筑面积(㎡)" width="120" prop="assessed_area" fixed >
          <template slot-scope="scope">
            <span>{{scope.row.assessed_area | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="十年租金包(万元)" width="120" prop="ten_rental_package">
          <template slot-scope="scope">
            <span>{{scope.row.ten_rental_package | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="十年业主收益(万元)" width="140" prop="ten_noi">
          <template slot-scope="scope">
            <span>{{scope.row.ten_noi | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上年度实际业主收益(万元)" width="180" prop="last_noi">
          <template slot-scope="scope">
            <span>{{scope.row.last_noi | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上年度YOC(%)" width="120" prop="last_yoc">
          <template slot-scope="scope">
            <span>{{scope.row.last_yoc | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当年预算业主收益(万元)" width="180" prop="current_noi">
          <template slot-scope="scope">
            <span>{{scope.row.current_noi | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当年YOC(%)" width="100" prop="current_yoc">
          <template slot-scope="scope">
            <span>{{scope.row.current_yoc | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="完整开业年份" width="120" prop="opening_time"/>
        <el-table-column label="Cap Rate(%)" width="100" prop="cap_rate">
          <template slot-scope="scope">
            <span>{{scope.row.cap_rate | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当年经营价值(万元)" width="140" prop="operate_current_price">
          <template slot-scope="scope">
            <span>{{scope.row.operate_current_price | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当年累计总投(万元)" width="140" prop="invest_current_totalprice">
          <template slot-scope="scope">
            <span>{{scope.row.invest_current_totalprice | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人"  prop="admin_truename"/>
        <el-table-column label="创建日期" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | formatDate}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="toUpdate(scope.row.number_id)">编辑</el-button>
            <el-button size="mini" type="info" plain @click="toDelete(scope.row.number_id)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    </div>
  </div>

</template>

<script>
  import { handlePaginator } from '@mixins';
  import ysTitle from '@comps/ysTitle';
  import ManageValue from "../../apis/apis/managementValue";
  import { toThousands } from '../../utils/index';

  export default {
    components: {
      ysTitle
    },
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        layout: '',// 业态类型
        layoutList: this.$enums.layout || [],// 业态列表选项列表
        tableData: [],
        pageData: [], // 暂存页数据
        query: {
          biz_form_name: '',// 业态名称
        },
        operate_id: '', // 选中的ids
        downUrl: '/operate/down', // 下载导入模板地址
        uploadUrl: `/operate/import?token=${localStorage.getItem('ys_contract_token')}`, // 导入数据action
      }
    },
    watch: {},
    created() {},
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await ManageValue.getList(params).then(res => {
          console.log("List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      dealSearch() {
        this.pageInfo.page = 1;
        this.getList()
      },
      dealAdd() {

      },
      dealDel() {
        if(!this.operate_id){
          this.$message.error('请先勾选复选框！')
          return
        }
        this.$confirm(`确认要删除吗？`).then(() => {
          ManageValue.delList({operate_id: this.operate_id}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      dealImport() {

      },
      dealDown() {

      },
      toUpdate() {

      },
      handleSelectionChange(val) {
        console.log(val);
        this.operate_id = val.map(item => item.operate_id) + '';
        console.log(this.operate_id)
      },
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          this.pageData.splice(id,1)
          this.getList()
        }).catch(() => {})
      },
      openModel(type) {
        if(type === '购物中心' || type === '商业街'){
          // this.$router.push({name:'calculation',query: {id:'1'}})
        }
      },
      getSummaries(param) {
        let sums = this.$common.tableTotalSum(param, (sums, index)=>{
          if(index === 7 || index === 9 || index === 10|| index === 11){
            sums[index] = '--';
            return true
          }
        })
        sums.forEach((item, index) => {
          if(!isNaN(item)) {
            item = toThousands(item)
            sums.splice(index,1,item)
          }
        })
        console.log(sums)
        return sums
      },
      beforeUpload(file) {
        console.log(file)
        const Xls = file.name.split('.');
        const isLt2M = file.size / 1024 / 1024 < 500;
        // if(Xls[1] === 'xls'|| Xls[1] === 'xlsx'){
        //   return file;
        // }else{
        //   this.$message.error('上传文件只能是 xls/xlsx 格式')
        //   return false
        // }
        if(!isLt2M){
          this.$message.error('上传模板大小不能超过 500MB')
          return false;
        }
      },
      uploadHandle(file, fileList) {
        // console.log(file, fileList)
      },
      handleSuccess(response, file, fileList) {
        console.log("response==",response)
        if(response){
          if(response.code === 999){
            router.push({ name: 'login' })
          }else if(response.code === 3002){
            this.$message.error(response.msg)
          }else if(response.code === 200){
            this.$message.success(response.msg)
            this.getList()
          }
        }
      },
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      },
      formatVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : ''
      },
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  .ys-text-blue{
    color: #1890FF;
  }
</style>
