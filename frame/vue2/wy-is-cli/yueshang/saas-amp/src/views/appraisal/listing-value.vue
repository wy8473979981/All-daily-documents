<template>
  <!-- IP价值 -->
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
        <el-table-column label="项目名称" width="140" prop="project_name" fixed />
        <el-table-column label="评估面积(㎡)" width="120" prop="assessed_area" fixed >
          <template slot-scope="scope">
            {{scope.row.assessed_area | formatVal}}
          </template>
        </el-table-column>
        <el-table-column label="当前评估">
            <el-table-column label="日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.assessed_current_time | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="总价值(万元)" width="120" prop="assessed_current_price">
              <template slot-scope="scope">
                <span>{{scope.row.assessed_current_price | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单方价值(元)" width="120" prop="assessed_current_unitprice">
              <template slot-scope="scope">
                <span>{{scope.row.assessed_current_unitprice | formatVal}}</span>
              </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="上次评估">
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.assessed_last_time | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总价值(万元)" width="100" prop="assessed_last_price">
            <template slot-scope="scope">
              <span>{{scope.row.assessed_last_price | formatVal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单方价值(元)" width="120" prop="assessed_last_unitprice">
            <template slot-scope="scope">
              <span>{{scope.row.assessed_last_unitprice | formatVal}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="差异值">
          <el-table-column label="总价值(万元)" width="120" prop="diff_totalprice">
            <template slot-scope="scope">
              <span>{{scope.row.diff_totalprice | formatVal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单方价值(元)" width="120" prop="diff_unitprice">
            <template slot-scope="scope">
              <span>{{scope.row.diff_unitprice | formatVal}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="上一年累计总投(万元)" width="150" prop="invest_last_price">
          <template slot-scope="scope">
            <span>{{scope.row.invest_last_price | formatVal}}</span>
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
import IpValue from "../../apis/apis/ipValue";
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
      tableData: [], // 当前页数据
      pageData: [], // 暂存页数据
      query: {
        biz_form_name: '',// 业态名称
      },
      ip_id: '', // 选中的ids
      downUrl: '/ip/down', // 下载导入模板地址
      uploadUrl: `/ip/import?token=${localStorage.getItem('ys_contract_token')}`, // 导入数据action
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
      await IpValue.getList(params).then(res => {
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
      if(!this.ip_id){
        this.$message.error('请先勾选复选框！')
        return
      }
      this.$confirm(`确认要删除吗？`).then(() => {
        IpValue.delList({ip_id: this.ip_id}).then(res => {
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
    toDelete(id) {
      this.$confirm(`确认要删除吗？`).then(() => {
        this.pageData.splice(id,1)
        this.getList()
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      console.log(val);
      this.ip_id = val.map(item => item.ip_id) + '';
      console.log(this.ip_id)
    },
    getSummaries(param) {
      let sums = this.$common.tableTotalSum(param, (sums, index)=>{
        if(index === 6){
          sums[6] = (sums[5] / sums[3]).toFixed(2);
          return true
        }
        if(index === 9){
          sums[9] = isNaN(sums[8]) ? '--' : (sums[8] / sums[3]).toFixed(2);
          return true
        }
        if(index === 10){
          sums[10] = isNaN(sums[8]) ? '--' : Number(sums[5]) - Number(sums[8]);
          return true
        }
        if(index === 11){
          sums[11] = isNaN(sums[10]) ? '--' : (sums[10] / sums[3]).toFixed(2);
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
      // console.log("file==",file)
    },
    handleSuccess(response, file, fileList) {
      console.log("response==",response)
      if(response.code === 999){
        router.push({ name: 'login' })
      }else if(response.code === 3002){
        this.$message.error(response.msg)
      }else if(response.code === 200){
        this.$message.success(response.msg)
        this.getList()
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
</style>
