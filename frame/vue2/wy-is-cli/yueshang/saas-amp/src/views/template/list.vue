<template>
  <div class="list-page" v-loading="loading">
    <el-row class="tool-bar" type="flex" justify="space-between">
      <el-col :span="14" style="display: flex;">
        <el-select size="mini"
          @change="getCompanyContractList"
          v-model="params.contract_mould_cate_id" placeholder="请选择数据" style="margin-right: 20px;">
          <el-option
            v-for="item in tempCateList"
            :key="item.contract_mould_cate_id"
            :label="item.contract_mould_cate_name"
            :value="item.contract_mould_cate_id">
          </el-option>
        </el-select>
        <el-select size="mini" v-model="params.company_id" placeholder="请选择数据"
          @change="getCompanyContractList"
          style="margin-right: 20px;">
          <el-option
            v-for="item in companyList"
            :key="item.company_id"
            :label="item.company_short_name"
            :value="item.company_id">
          </el-option>
        </el-select>
        <el-select size="mini"
          v-model="params.company_contract_id" placeholder="请选择数据" style="margin-right: 20px;">
          <el-option
            v-for="item in companyContractList"
            :key="item.company_contract_id"
            :label="item.company_contract_name"
            :value="item.company_contract_id">
          </el-option>
        </el-select>
        <!-- <el-select size="mini" v-model="params.contract_mould_status" placeholder="请选择状态" style="margin-right: 20px;">
          <el-option
            v-for="item in enumStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-button @click="getList" size="mini" type="primary">查询</el-button>
      </el-col>
      <el-col :span="10" style="text-align: right;">
        <!-- <el-button @click="confirm_batch" size="mini" type="danger" v-show="!is_deleted">批量删除</el-button>
        <el-button @click="confirm_batch" size="mini" type="success" v-show="is_deleted">批量恢复</el-button> -->
        <el-button @click="toCreate" size="mini" type="primary">新增租金分解</el-button>
      </el-col>
    </el-row>
    <!-- <el-row class="tool-bar">
      <el-col :span="24">
        <el-button @click="confirm_batch" size="mini" type="danger" v-show="!is_deleted">批量删除</el-button>
        <el-button @click="confirm_batch" size="mini" type="success" v-show="is_deleted">批量恢复</el-button>
        <el-button @click="toCreate" size="mini" type="primary">新增模板</el-button>
        <el-button size="mini" type="success" @click="download">下载</el-button>
      </el-col>
    </el-row> -->
    <el-table :data="tableData" size='mini' ref="table">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="开业年限" prop="company_short_name"></el-table-column>
      <el-table-column label="距离项目（公里）" prop="contract_mould_cate_name"></el-table-column>
      <el-table-column label="项目体量（㎡）" prop="company_contract_name"></el-table-column>
      <el-table-column label="商业面积（㎡）" prop="admin_truename"></el-table-column>
      <el-table-column label="项目定位" prop="admin_truename"></el-table-column>
      <el-table-column label="空置率" prop="admin_truename"></el-table-column>
      <el-table-column label="租赁模式" prop="admin_truename"></el-table-column>
      <!-- <el-table-column label="操作时间">
        <template slot-scope="scope">
          {{scope.row.update_time | getTime}}
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="contract_mould_version">
        <template slot-scope="scope">
          <span v-if="scope.row.contract_mould_version">{{scope.row.contract_mould_version}}</span>
          <el-tag size="mini" type="info" v-else>草稿</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="模板状态">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="getStatus(scope.row.contract_mould_status).status_type"
          >
            {{getStatus(scope.row.contract_mould_status).label}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <div v-if="scope.row.contract_mould_status !== 'DELETED'">
            <el-button size="mini" type="danger" @click="confirm(scope.row.id)">删除</el-button>
            <el-button v-if="!scope.row.contract_mould_version" size="mini" type="warning" @click="toUpdate(scope.row.id)">编辑</el-button>
            <el-button v-else size="mini" type="success" @click="showContract(scope.row.id)">查看</el-button>
            <el-button size="mini" type="primary" @click="createBy(scope.row.id)">按此新增</el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="success" @click="confirm(scope.row.id)">恢复</el-button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>

    <el-divider></el-divider>
    <ys-paginator @handlePaginator='handlePaginator' :pageInfo='pageInfo'/>
  </div>
</template>

<script>
import contTemp from '@apis/contTemp'
import company from '@apis/company'
import companyContract from '@apis/companyContract'
import contTempCate from '@apis/contTempCate'
import {listConfirm, handlePaginator, getStatus} from '@mixins'
import user from '@apis/user'

export default {
  mixins: [listConfirm, handlePaginator, getStatus],
  filters: {
    getTime (val) {
      const date = new Date(Number(val)*1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      const second = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return `${year}年${month}月${day}日${hour}:${minute}:${second}`
    }
  },
  data () {
    return {
      enumStatus: this.$enums.status.filter(item => item.value !== 'CLOSED'),
      page_name: '合同模板',
      tempCateList: [], // 合同分类列表
      params: {
        'contract_mould_cate_id': '',
        'company_id': '',
        'company_contract_id': '',
        'contract_mould_version': '',
        'contract_mould_status': 'NODELETED'
      },
      tableData: [],
      companyList: [], // 机构列表
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      companyContractList: [],
      loading: false,
    }
  },
  computed: {
    is_deleted () {
      return this.params.contract_mould_status === 'DELETED'
    }
  },
  watch: {
    'params.contract_mould_status' (nv, ov) {
      this.params.contract_mould_status = nv
      this.pageInfo.page = 1
      this.getList()
    }
  },
  methods: {
    createBy (id) {
      this.$router.push({
        name: 'templateCreate',
        query: {id}
      })
    },
    // 查看
    showContract (id) {
      const href = `/cm_web/print/#/cm_${id}?conId=50497D9A3EE24FB2906B30CDDFA039B4` // 跳转PMS
      window.open(href)
    },
    // 切换机构合同
    changeCompanyContract () {
      this.getVersionList()
    },
    // 切换机构
    changeCompany (data) {
      console.log(data, 'change')
      this.getCompanyContractList()
    },
    // 切换模板分类
    changeContractCate (data) {
      this.getCompanyContractList()
    },
    async getVersionList () {
      const res = await contTemp.findVersions({company_contract_id: this.params.company_contract_id})
      const {code, result} = res
      console.log(res, '----版本列表')
      if (code === 200) {
        this.versionList = result.map(item => {
          return {
            contract_mould_id: item.contract_mould_id,
            contract_mould_version: item.contract_mould_version
          }
        })
      }
    },
    async handle_confirm (id) {
      let res
      const params = {contract_mould_id: id}
      if (this.is_deleted) {
        res = await contTemp.restore(params)
      } else {
        res = await contTemp.del(params)
      }
      if (res.code === 200) {
        this.getList()
      }
    },
    getStatus (status) {
      return this.enumStatus.find(item => item.value === status)
    },
    toUpdate (id) {
      this.$router.push({name: 'templateUpdate', params: {id}})
    },
    async getList () {
      const params = {...this.pageInfo, ...this.params}
      const res = await contTemp.find(params, {success: false, error: true})
      console.log(res, '-----模板列表--------')
      const {code, result} = res
      if (code === 200) {
        this.tableData = result.data.map(item => {
          return {
            admin_truename: item.admin_truename,
            company_contract_name: item.company_contract_name,
            company_short_name: item.company_short_name,
            contract_mould_cate_name: item.contract_mould_cate_name,
            id: item.contract_mould_id,
            contract_mould_status: item.contract_mould_status,
            contract_mould_version: item.contract_mould_version,
            is_online: "0",
            update_time: item.update_time
          }
        })
        this.pageInfo.sum_num = result.sum_num
      }
    },
    // 获取机构列表
    async getCompanyList () {
      const res = await company.findOpened({}, {success: false, error: true})
      console.log(res, '----获取机构列表----')
      const {code, result} = res
      if (code === 200) {
        this.companyList = result.map(item =>
          ({company_id: item.company_id, company_short_name: item.company_short_name})
        )
      }
    },
    // 获取模板分类
    async getTempCateList () {
      const res = await contTempCate.findOpened()
      const {code, result} = res
      if (code === 200) {
        this.tempCateList = result.map(item => {
          return {
            contract_mould_cate_id: item.contract_mould_cate_id,
            contract_mould_cate_name: item.contract_mould_cate_name
          }
        })
        console.log(this.tempCateList, '----tempcoate list')
      }
    },
    async getCompanyContractList() {
      this.params.company_contract_id = ''
      const {contract_mould_cate_id, company_id} = this.params
      if (!contract_mould_cate_id || !company_id) return
      const params = {
        company_id,
        contract_mould_cate_id
      }

      const res = await companyContract.findByCompanyAndContCate(params)
      const {code, result} = res
      if (code === 200) {
        this.companyContractList = result.map(item =>
          ({company_contract_id: item.company_contract_id, company_contract_name: item.company_contract_name})
        )
      }
    },
    toCreate () {
      // this.$router.push({name: 'templateCreate'})
      this.$router.push({name: ''})
    },
    async download () {
      const host = '/cm_web/yskj_contract_mould' // 外网地址
      const token = localStorage.getItem('ys_contract_token')
      let a = document.createElement('a')
      const href = `${host}/contractMould/down?token=${token}`
      if (true) {
        a.href = href
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        window.open(href)
      }
      return
    },
    async synchronous () {
      const res = await user.synchronous({token: localStorage.getItem('ys_contract_token')})
      console.log(res, '---同步数据---')
      if (res.code === 200 || res.code === 999) {
        this.$timeoutRouter.push(
          {
            name: 'templateList'
          }
        )
      }
    }
  },
  mounted () {
    this.getTempCateList()
    this.getCompanyList()
    this.getCompanyContractList()
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss'
</style>

