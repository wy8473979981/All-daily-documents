<template>
  <!-- 存量资产-商业 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="colcol" :span="20">
        <div>
          <el-select placeholder="地产开发事业部" size="mini" v-model="query.departOrgCds" @change="getListChange" filterable clearable multiple collapse-tags>
            <el-option v-for="(item, index) in businessList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="项目名称" size="mini" v-model="query.projectIds" @change="getListChange" filterable clearable multiple collapse-tags>
            <el-option v-for="(item, index) in projectNameList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <!-- <el-select placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" clearable>
            <el-option v-for="(item, index) in layoutList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-cascader placeholder="业态" size="mini" v-model="query.layout" @change="getListChange" clearable :options="layoutList"></el-cascader>
        </div>
        <div>
          <el-select placeholder="项目属性" size="mini" v-model="query.type" @change="getListChange" clearable>
            <el-option v-for="(item, index) in projectPropertyList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="状态" size="mini" v-model="query.status" @change="getListChange" clearable>
            <el-option v-for="(item, index) in statusList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <!-- <el-select placeholder="创建人" size="mini" v-model="query.createUser" @change="getListChange" clearable>
            <el-option v-for="(item, index) in creatorList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-input v-model="query.createUser" size="mini" placeholder="创建人" @change="getListChange"></el-input>
        </div>
        <div class="oneBtn">
          <template>
            <div class="block">
              <el-date-picker v-model="report_time" size="mini" type="daterange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getListChange">
              </el-date-picker>
            </div>
            <el-button @click="reset" size="mini">重置</el-button>
          </template>
        </div>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <el-button @click="exportExcel" size="mini" >导出Excel</el-button>
        <el-button v-if="permission.indexOf('amp_yzsy_add') > -1" @click="createFunc()" size="mini" type="success">新增</el-button>
      </el-col>
    </el-row>
    <ys-table :tableData="tableData" :checkboxBol="true" :serialNumberBol="true" :columns="columns" @update:tableData="refreshTableData" @update:checkboxChangeFunc="checkboxChangeFunc" :maxHeight="this.$store.state.tableHeight">
      <el-table-column slot="operate" label="操作" fixed="right" min-width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goDetailFunc(scope.row)">查看测算详情</el-button>
          <el-button v-if="permission.indexOf('amp_yzsy_del') > -1" type="text" size="mini" class="delete-btn" @click="doDeleteFunc(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </ys-table>
    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator" />
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
import Global from '@/apis/apis/global'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      state: '',
      timeout: null,
      pageInfo: {
        page_size: 20,
        page: 1,
        sum_num: 0
      },
      report_time: null,
      query: {
        createUser: null, // 创建人
        departOrgCds: [], // 部门org_cd多选列表
        projectIds: [], // 项目id多选列表
        startAt: null, // 开始月份时间戳
        endAt: null, // 结束月份时间戳
        layout: null, // 项目业态
        limit: null, // 每页显示条数
        page: null, // 第几页
        status: null, // 状态
        type: null// 项目属性
      },
      businessList: [], // 事业部
      projectNameList: [], // 项目名称
      layoutList: [], // 业态
      projectPropertyList: [], // 项目属性
      statusList: [
        {
          value: 1,
          label: '已完成'
        },
        {
          value: 2,
          label: '未完成'
        }
      ], // 状态
      creatorList: [
        {
          value: 1,
          label: '张三'
        },
        {
          value: 2,
          label: '李四'
        }
      ], // 创建人
      tableData: [],
      downUrl: '/projectDetail/down',
      fast: false,
      auditNum: null,
      status: null,
      business_area_status: null,
      business_tech_status: null,
      business_operation_status: null,
      project_verify_id: null,
      big_layout_id: 1, // 大业态
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      attachment_upload: [], // 附件类型
      columns: [
        {
          label: '地产开发事业部',
          key: 'depart',
          width: '150px',
          fixed: 'left',
          type: null,
          hasEditFn: (key, row, index) => {
            return false
          }
        },
        {
          label: '项目名称',
          key: 'name',
          width: '150px',
          type: null,
          hasEditFn: (key, row, index) => {
            return false
          }
        },
        {
          label: '业态',
          key: 'layout',
          width: '150px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '项目属性',
          key: 'type',
          width: '150px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '版本编号',
          key: 'version',
          width: '150px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '状态',
          key: 'status',
          width: '100px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '创建人',
          key: 'createUser',
          width: '100px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '创建时间',
          key: 'createdTime',
          width: '180px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        {
          label: '完成/更新时间',
          key: 'updatedTime',
          width: '180px',
          type: null,
          hasEditFn: (key, row, index) => {
            return true
          }
        },
        { slot: 'operate' }// 操作列
      ],
      projectResultIds: []
    }
  },
  components: {
  },
  watch: {

  },
  created () {
    this.getProjectList()
    this.getLayoutList()// 业态
    this.getDictionary(1)// 事业部
    this.getDictionary(2)// 项目属性
    this.getList()
  },
  mounted () {
  },
  // 日期转换格式
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  methods: {
    refreshTableData () {

    },
    goDetailFunc (row) {
      // 详情
      const routeUrl = this.$router.resolve({
        path: '/calculationCreate',
        query: { flag: 'edit', projectResultId: row.projectResultId, status: row.statusNumber }
      })
      window.open(routeUrl.href, '_blank')
    },
    async doDeleteFunc (row) {
      try {
        // 项目测算删除
        let params = {
          "ids": [row.projectResultId]
        }
        this.$confirm('是否继续删除?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await CalculationApi.deleteProjectByIds(params).then(res => {
            if (res.code === 200) { }
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    checkboxChangeFunc (data) {
      // 复选框
      console.log('=====data=', data)
      this.projectResultIds = []
      if (data && data.length > 0) {
        data.forEach(item => {
          this.projectResultIds.push(item.projectResultId)
        })
      }
      console.log('=====projectResultIds=', this.projectResultIds)
    },
    async getList () {
      try {
        const params = {
          ...this.query,
          // departOrgCds: this.query.departOrgCds && this.query.departOrgCds.join(),//部门org_cd多选列表
          // projectIds: this.query.projectIds && this.query.projectIds.join(),//项目id多选列表
          layout: this.query.layout && this.query.layout[1],
          startAt: this.report_time && this.report_time[0] || null, // 开始月份时间戳
          endAt: this.report_time && this.report_time[1] || null, // 结束月份时间戳
          limit: this.pageInfo.page_size, // 每页显示条数
          page: this.pageInfo.page// 第几页
        }
        await CalculationApi.getList(params).then(res => {
          if (res.code === 200) {
            const { result } = res
            this.tableData = result.list.map(item => {
              const createdTime = item.createdTime ? item.createdTime.replace('T', ' ') : ''
              const updatedTime = item.updatedTime ? item.updatedTime.replace('T', ' ') : ''
              const type = this.projectPropertyList.find(member => {
                return member.value == item.type
              })
              const status = this.statusList.find(member => {
                return member.value == item.status
              })
              return {
                ...item,
                createdTime: createdTime,
                updatedTime: updatedTime,
                type: type && type.label || '-',
                version: `V${item.version}`,
                status: status && status.label || '-',
                statusNumber: item.status
              }
            })
            this.pageInfo.sum_num = result.total
            getDynamicTableHeight(this)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectList () {
      // 项目列表
      try {
        await CalculationApi.getProjectList().then(res => {
          if (res.code === 200) {
            const { result: { list } } = res
            this.projectNameList = list.map(item => {
              return { label: item.name, value: item.projectId }
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getLayoutList () {
      // 业态集合
      try {
        await CalculationApi.getLayoutList().then(res => {
          if (res.code === 200) {
            const { result: { list } } = res
            const serverArray = (arr) => {
              const newArr = []
              for (let i = 0; i < arr.length; i++) {
                newArr.push({ value: arr[i].layoutId, label: arr[i].name })
                if (arr[i].children && arr[i].children.length > 0) {
                  newArr[i].children = serverArray(arr[i].children)
                }
              }
              return newArr
            }
            this.layoutList = serverArray(list)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getDictionary (type) {
      // 字典表
      try {
        const params = { type: type }
        await Global.getDictionary(params).then(res => {
          const { code, result: { list } } = res
          if (code === 200) {
            const ary = list.map(item => {
              return { label: item.name, value: item.id }
            })
            if (type == 1) {
              this.businessList = ary
            } else if (type == 2) {
              this.projectPropertyList = ary
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    getListChange () {
      // 重新选择搜索项重置页码
      this.pageInfo.page = 1
      this.getList()
    },
    reset () {
      // 重置
      this.pageInfo = {
        page_size: 20,
        page: 1,
        sum_num: 0
      }
      this.query = {
        createUser: null, // 创建人
        departOrgCds: [], // 部门org_cd多选列表
        projectIds: [], // 项目id多选列表
        startAt: null, // 开始月份时间戳
        endAt: null, // 结束月份时间戳
        layout: null, // 项目业态
        limit: null, // 每页显示条数
        page: null, // 第几页
        status: null, // 状态
        type: null// 项目属性
      }
      this.getList()
    },
    createFunc () {
      // 创建
      const routeUrl = this.$router.resolve({
        path: '/calculationCreate',
        query: { flag: 'add' }
      })
      window.open(routeUrl.href, '_blank')
    },
    handleSelect (item) {
      console.log(item)
    },
    exportExcel () {
      if (!this.projectResultIds || this.projectResultIds.length === 0) {
        this.$message.error('未勾选项目！')
        return
      }
      // 导出
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        window.location.href = `../${this.$baseURL}/api/project/calculate/export?token=${token}&projectResultIds[]=${this.projectResultIds}`
      }
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.tool-bar .colcol .oneBtn {
  width: 284px;
}
.delete-btn {
  color: red;
}
.list-page {
  height: auto!important;
}
</style>
