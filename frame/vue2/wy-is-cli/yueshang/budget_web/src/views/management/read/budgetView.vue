<template>
  <!-- 预算查看-主页面 -->
  <div class="list-page budgetLook">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="read-title">
        <p>2021-商业集团-上海区域-上海七宝商业公司预算</p>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column min-width="200" label="预算方案名称" show-overflow-tooltip prop="name" />
      <el-table-column min-width="150" label="状态" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="150" label="最后审批人" show-overflow-tooltip prop="project_name" />
      <el-table-column min-width="120" label="生效时间" show-overflow-tooltip prop="createTime">
        <template slot-scope="scope">
          {{rTime(scope.row.createTime)}}
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100" label="车库面积(㎡)" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.garage_area | formatVal }}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goDetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="mini" @click="openDialogFunc(scope.row,'restart')">重新开启编制</el-button>
          <el-button type="text" size="mini" @click="openDialogFunc(scope.row,'start')">开启编制</el-button>
          <el-button type="text" size="mini" @click="openDialogFunc(scope.row,'change')">修改关闭时间</el-button>
        </template>
      </el-table-column>againOpenFunc
    </el-table>
    <messageBox :title="dialogTitle" :footerBtnOne="dialogCancelTitle" :footerBtnTwo="dialogSaveTitle" boxWidth="600px" @footerFunOne="dialogClose" @footerFunTwo="dialogSure" :dialogVisible="dialogVisible" @update:dialogVisible="dialogVisibles">
      <div slot="content">
        <el-row>
          <el-form :model="form">
            <el-row>
              <el-col v-if="dialogType=='start'">是否开启{{nextYear}}年度预算编制？开启后，自动为各个部门创建{{nextYear}}年度预算表并可进行预算编制;</el-col>
              <el-col v-if="dialogType=='restart'">截止时间之后，预算停止编制、审批和修改</el-col>
              <el-col v-if="dialogType=='change'">开启后，可继续进行预算的编制、审批和修改</el-col>
              <el-col :span="24" v-if="dialogType=='change'">
                <el-form-item label="">
                  <el-radio-group v-model="form.type">
                    <el-radio label="1">定时关闭</el-radio>
                    <el-radio label="2">立即关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="请设置预算关闭的时间">
                  <el-date-picker size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model.trim="form.time" clearable type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </messageBox>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />

  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import ReadApi from '@/apis/apis/readApi'
import messageBox from '../component/messageBox.vue'



export default {
  mixins: [handle_paginator],
  components: {
    messageBox
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogCancelTitle: '暂不开启',
      dialogSaveTitle: '立即开启',
      dialogType: '',
      nextYear: null,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {
        time: null
      },
      query: {},
      tableData: [
        {
          project_name: '宝龙预算'
        }
      ]
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal(val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    rTime,
    // 查询列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await ReadApi.getTableList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pageInfo.sum_num = res.data.total
          getDynamicTableHeight(this)
        }
      })
    },
    openDialogFunc(v, type) {
      this.dialogVisible = true
      this.dialogType = type
      this.nextYear = new Date().getFullYear() + 1
      if (type == 'start') {
        this.dialogTitle = `开启${this.nextYear}年度预算编制`
      } else if (type == 'restart') {
        this.dialogTitle = `重新开启${this.nextYear}年度预算编制`
      } else if (type == 'change') {
        this.dialogTitle = `修改${this.nextYear}度预算编制关闭时间`
      }
    },
    dialogVisibles(v) {
      this.dialogVisible = v
    },
    dialogClose() {
      this.dialogVisible = false
    },
    dialogSure() {
      this.dialogVisible = false
    },
    goDetail(data) {
      this.$router.push({
        path: '/management/read/totalRevenue',
        query: {
          areaId: data.areaId,
          projectId: data.projectId
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import "~@styles/common.scss";
.budgetLook {
  .read-title {
    font-size: 14px;
  }
  .content {
    overflow: hidden !important;
  }
}
</style>
