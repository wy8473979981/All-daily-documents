<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="1030px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>记录详情</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <p class="tab-title">
              <span>审批人：{{row && row.approveUserName}}</span>
              <span>日期：{{row && row.startDate}}</span>
              <span>过期次数：{{row && row.overderNum}}</span>
            </p>
            <el-table
              size="mini"
              :data="tableData"
              border
              style="width: 100%"
              >
              <el-table-column label="查询号" prop="approveNo" show-overflow-tooltip/>
              <el-table-column label="类型" prop="processName" show-overflow-tooltip/>
              <!-- <el-table-column label="类型" prop="type"/> -->
              <el-table-column label="标题" prop="subject" show-overflow-tooltip/>
              <el-table-column label="审批开始时间" min-width="80" prop="startDate"/>
              <el-table-column label="审批结束时间" min-width="80" prop="endDate">
                <template slot-scope="scope">
                  {{scope.row.endDate | filterTimess}}
                </template>
              </el-table-column>
              <el-table-column label="时限" width="80" prop="timeLimit"/>
              <el-table-column label="耗时" width="80" prop="useTime"/>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <a class="ys-text-blue" @click="viewDetailNewTab(scope.row)">查看</a>
                  <a class="ys-text-blue" @click="cancelLimitTime(scope.row.id)">取消时限</a>
                  <!-- <el-button size="mini" plain >查看</el-button>
                  <el-button size="mini" plain >取消时限</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
           <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
        </div>
      </div>
      <!-- dialog -->
      <div>
        <!-- 查看 -->
        <look :open="lookFast" :id="look_id" @close="closeFast"></look>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import urlInfo from '@/data/UrlInfo';
import Look from './look';
import { handle_paginator, viewDetailNewTab } from '@/mixins';
import statistic from '@/apis/apis/statistic';
import { mapState } from 'vuex';
export default {
  name: 'Detail',
  props: ['open', 'row'],
  components: {
    Look
  },
  mixins: [handle_paginator,viewDetailNewTab],
  data() {
    return {
      userUrl: urlInfo.userUrl,
      lookFast: false,
      look_id: null,
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [],
    }
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    row(val) {
      console.log(val)
      this.pageInfo =  {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
    }
  },
  methods: {
    cancelLimitTime(id) {
      this.$confirm(`确认要取消时限吗？`).then(() => {
        statistic.cancelLimitTime(id).then(res => {
          if(res.code == 1){
            this.$message({
              message: '取消时限成功',
              type: 'success'
            });
            this.getList()
          } else {
            this.$message.error(res.message || '请求失败，请稍后重试')
          }
        })
      }).catch(err => console.log(err));
    },
    cancel() {
      this.fast = false;
    },
    // 加载详情
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: 1,
        approveUserId: this.row.approveUserId,
        approveMonth: this.row.startDate
      }
      await statistic.findHistoryDetailsPage(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      }).catch(err => {
        this.$message({
          message: '系统错误，获取列表失败',
          type: 'error'
        });
      });
    },
    // look(id) {
    //   this.lookFast = true;
    //   this.look_id = id;
    // },
    closeFast(res) {
      this.lookFast = res.fast;
      this.look_id = null;
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
.ys-text-blue{
  color: #1890FF;
  cursor: pointer;
  margin-right: 10px;
}
.ys-text-blue:hover{
  text-decoration: underline;
}
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 1016px;
}
.tab-title{
  margin: 0 10px 10px;
  >span{
    margin-right: 30px;
  }
}
</style>