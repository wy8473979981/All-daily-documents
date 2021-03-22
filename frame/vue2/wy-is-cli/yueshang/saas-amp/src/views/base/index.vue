<template>
  <!-- 基础信息 -->
  <div class="page">
    <div class="list-page">
      <ys-title :downUrl="downUrl"></ys-title>
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="16">
          <el-row type="flex" justify="space-between" :gutter="20" style="margin-bottom: 20px;">
            <el-col>
              <el-select placeholder="请选择业态" size="mini" v-model="query.biz_form_name" clearable>
                <el-option
                        v-for="(item,index) in layoutList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-input v-model="query.project_name" placeholder="项目名称" size="mini" clearable></el-input>
            </el-col>
            <el-col>
              <el-input v-model="query.biz_dept_name" placeholder="所属商业事业部" size="mini" clearable></el-input>
            </el-col>
            <el-col>
              <el-input v-model="query.estate_dept_name" placeholder="所属地产事业部" size="mini" clearable></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" :gutter="20">
            <el-col>
              <el-input v-model="query.city_name" placeholder="所在城市" size="mini" clearable></el-input>
            </el-col>
            <el-col>
              <el-select placeholder="请选择资产属性" size="mini" v-model="query.asset_attr" clearable>
                <el-option
                        v-for="(item,index) in assetAttr"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="11">
                  <el-date-picker
                          v-model="query.from_time"
                          type="date"
                          size="mini"
                          value-format="yyyy-MM-dd"
                          placeholder="开业年份">
                  </el-date-picker>
                </el-col>
                <el-col :span="2" align="middle">~</el-col>
                <el-col :span="11">
                  <el-date-picker
                          v-model="query.to_time"
                          type="date"
                          size="mini"
                          value-format="yyyy-MM-dd"
                          @change="selectToTime"
                          placeholder="开业年份">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="11">
                  <el-input v-model="query.from_area" placeholder="合计面积" v-filter-check-input size="mini" clearable></el-input>
                </el-col>
                <el-col :span="2" align="middle">~</el-col>
                <el-col :span="11">
                  <el-input v-model="query.to_area" placeholder="合计面积" v-filter-check-input size="mini" clearable></el-input>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button @click="getList" size="mini" type="success">查询</el-button>
          <!--        <el-button @click="dealAdd" size="mini" type="success">新增</el-button>-->
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
          <!--        <el-button :loading="downloadLoading" @click="handleDownload" size="mini" type="success" plain>导出Excel</el-button>-->
        </el-col>
      </el-row>
      <el-table ref="table" :data="tableData" size="mini" show-summary :summary-method="getSummaries" header-row-class-name="table-header" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" fixed />
        <el-table-column label="业态" prop="biz_form_name" fixed />
        <el-table-column label="项目名称" width="120" prop="project_name" fixed />
        <el-table-column label="基础信息" >
          <el-table-column label="所属商业事业部" width="120" prop="biz_dept_name" />
          <el-table-column label="所属地产事业部" width="120" prop="estate_dept_name"/>
          <el-table-column label="所在城市" prop="city_name"/>
          <el-table-column label="资产属性" prop="asset_attr"/>
          <el-table-column label="开业年份" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.begin_time | formatDate}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="自持经营建筑面积(㎡)">
          <el-table-column label="地上自持商业建筑面积" width="150" prop="coml_ground_area">
            <template slot-scope="scope">
              {{scope.row.coml_ground_area | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="地下自持商业建筑面积" width="150" prop="coml_underground_area">
            <template slot-scope="scope">
              {{scope.row.coml_underground_area | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="合计" width="120" prop="coml_total_area">
            <template slot-scope="scope">
              {{scope.row.coml_total_area | formatVal}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="车库信息" prop="position">
          <el-table-column label="分摊车库面积(㎡)" width="120" prop="garage_share_area">
            <template slot-scope="scope">
              {{scope.row.garage_share_area | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="分摊车位个数" width="100" prop="parking_share_num">
            <template slot-scope="scope">
              {{scope.row.parking_share_num | formatDotVal}}
            </template>
          </el-table-column>
          <el-table-column label="总车库面积(㎡)" width="120" prop="garage_total_area">
            <template slot-scope="scope">
              {{scope.row.garage_total_area | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="总车位个数" width="100" prop="parking_total_num">
            <template slot-scope="scope">
              {{scope.row.parking_total_num | formatDotVal}}
            </template>
          </el-table-column>
          <el-table-column label="单车位面积(㎡)" width="120" prop="parking_single_area">
            <template slot-scope="scope">
              {{scope.row.parking_single_area | formatVal}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="单方成本信息(元)" prop="position">
          <el-table-column label="地上土地单方" width="200px" >
            <el-table-column label="原始值" width="100px" prop="original_ground_land_unitprice">
              <template slot-scope="scope">
                {{scope.row.original_ground_land_unitprice | formatVal}}
              </template>
            </el-table-column>
            <el-table-column label="分摊值" width="100px" prop="share_ground_land_unitprice">
              <template slot-scope="scope">
                {{scope.row.share_ground_land_unitprice | formatVal}}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="地下土地单方" width="100px" prop="underground_land_unitprice">
            <template slot-scope="scope">
              {{scope.row.underground_land_unitprice | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="地上建安单方" width="100px" prop="cs_ground_land_unitprice">
            <template slot-scope="scope">
              {{scope.row.cs_ground_land_unitprice | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="地下建安单方" width="100px" prop="cs_underground_land_unitprice">
            <template slot-scope="scope">
              {{scope.row.cs_underground_land_unitprice | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="车库单方" width="100px" prop="garage_unitprice">
            <template slot-scope="scope">
              {{scope.row.garage_unitprice | formatVal}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="总投单方(元)" prop="position">
          <el-table-column label="累计总投" width="100" prop="invest_accumulate_unitprice">
            <template slot-scope="scope">
              {{scope.row.invest_accumulate_unitprice | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="新增改造" width="100" prop="invest_new_unitprice">
            <template slot-scope="scope">
              {{scope.row.invest_new_unitprice | formatVal}}
            </template>
          </el-table-column>
          <el-table-column label="合计" width="120" prop="invest_total_unitprice">
            <template slot-scope="scope">
              {{scope.row.invest_total_unitprice | formatVal}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="上一年累计总投(万元)" width="150px" prop="invest_last_totalprice">
          <template slot-scope="scope">
            {{scope.row.invest_last_totalprice | formatVal}}
          </template>
        </el-table-column>
        <el-table-column label="创建人"  prop="admin_truename"/>
        <el-table-column label="创建日期" width="150">
          <template slot-scope="scope">
            {{scope.row.create_time | formatDate}}
          </template>
        </el-table-column>
        <!--      <el-table-column label="操作" width="150" fixed="right">-->
        <!--        <template slot-scope="scope">-->
        <!--          <el-button size="mini" plain @click="toUpdate(scope.row.number_id)">编辑</el-button>-->
        <!--          <el-button size="mini" type="info" plain @click="toDelete(scope.row.number_id)">删除</el-button>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
      </el-table>

      <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    </div>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins';
  import ysTitle from '@comps/ysTitle';
  import { toThousands } from '../../utils/index';
  import Basic from "../../apis/apis/basicInformation";
  import BaseJs from './baseJs';
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
        layoutList: this.$enums.layout || [],// 业态列表选项列表
        assetAttr: this.$enums.asset || [],// 资产属性选项列表
        tableData: [],
        downloadLoading: false,
        query: {
          biz_form_name: '',// 业态名称
          project_name: '',// 项目名称
          biz_dept_name: '',// 所属商业事业部
          estate_dept_name: '',// 所属地产事业部
          city_name: '',// 所在城市
          asset_attr: '',// 资产属性
          from_time: '',// 开业年份-开始
          to_time: '',// 开业年份-结束
          from_area: '',// 合计面积-开始
          to_area: '',// 合计面积-结束
        },
        project_id: '', // 选中的ids
        downUrl: '/project/down',
        uploadUrl: `/project/import?token=${localStorage.getItem('ys_contract_token')}`, // 导入数据action
      }
    },
    watch: {},
    created() {

    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await Basic.getProjectList(params).then(res => {
          console.log("基础数据List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      dealAdd() {

      },
      dealDel() {
        if(!this.project_id){
          this.$message.error('请先勾选复选框！')
          return
        }
        this.$confirm(`确认要删除吗？`).then(() => {
          Basic.delList({project_id: this.project_id}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      dealImport() {

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
        this.project_id = val.map(item => item.project_id) + '';
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getSummaries(param) {
        let sums = this.$common.tableTotalSum(param, (sums, index)=>{
          return BaseJs.totalAlgorithm(param, sums, index, this.query)
        })
        sums.forEach((item, index) => {
          if(!isNaN(item)) {
            if(index === 12 || index === 14) {
              item = toThousands(parseInt(item)).split('.')[0]
            }else{
              item = toThousands(item)
            }
            // if(index >= 16 && index <= 25) {
            //   item = toThousands(item)
            // }
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
        console.log(response, file, fileList)
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
      // 选择结束年份
      selectToTime(e){
        if(!this.query.from_time){
          this.query.to_time = ''
          this.$message.error('请选择开业年份')
          return
        }
        const dateNum = new Date(this.query.from_time).getTime()
        const toNum = new Date(e).getTime()
        if(toNum < dateNum){
          this.query.to_time = ''
          this.$message.error('结束年份小于开业年份')
        }
      }
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      },
      formatVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : ''
      },
      formatDotVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val).split('.')[0] : ''
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  /deep/ .el-input__inner{
    padding-right: 10px;
  }
</style>
