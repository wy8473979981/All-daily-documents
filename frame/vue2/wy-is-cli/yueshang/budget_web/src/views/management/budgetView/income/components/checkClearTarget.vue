<template>
  <el-drawer
    :visible.sync="checkDebts"
    direction="rtl"
    :append-to-body="true"
    :withHeader="false"
    :wrapperClosable="false"
    size="900px">
    <div class="dialog-close-icon" @click="$emit('update:checkDebts', false)" style="right: 886px;">
      <i></i>
    </div>
    <div class="drawerBudget-detail">
      <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
        <el-col>
          <h3>查看清欠目标</h3>
        </el-col>
        <el-col style="text-align: right;">
          <!-- <el-button type="success">确定</el-button> -->
          <el-button @click="$emit('update:checkDebts', false)" plain>关闭</el-button>
        </el-col>
      </el-row>
      <div class="con">
        <div class="drawerBudget-newBunk">
          <div class="drawerBudget-info">
            <el-row :gutter="24">
              <el-col :span="24" class="topRight-col table-col">
                <el-table ref="table" :data="owingMoneyList" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
                 <el-table-column label="欠费项目" prop="feeName" min-width="100"></el-table-column>
                  <el-table-column label="欠费金额（元）" prop="owe" min-width="120"></el-table-column>
                 <!-- <el-table-column label="清欠金额（元）" prop="target" min-width="120">
                  </el-table-column> -->
                  <el-table-column label="1月清欠" prop="jan">
                    <template slot-scope="scope">
                      <p>{{scope.row.jan  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="2月清欠" prop="feb">
                    <template slot-scope="scope">
                      <p>{{scope.row.feb  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="3月清欠" prop="march">
                    <template slot-scope="scope">
                      <p>{{scope.row.march  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="4月清欠" prop="april">
                    <template slot-scope="scope">
                      <p>{{scope.row.april  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="5月清欠" prop="may">
                    <template slot-scope="scope">
                      <p>{{scope.row.may  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="6月清欠" prop="june">
                    <template slot-scope="scope">
                      <p>{{scope.row.june  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="7月清欠" prop="july">
                    <template slot-scope="scope">
                      <p>{{scope.row.july  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="8月清欠" prop="aug">
                    <template slot-scope="scope">
                      <p>{{scope.row.aug  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="9月清欠" prop="sep">
                    <template slot-scope="scope">
                      <p>{{scope.row.sep  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="10月清欠" prop="oct">
                    <template slot-scope="scope">
                      <p>{{scope.row.oct  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="11月清欠" prop="nov">
                    <template slot-scope="scope">
                      <p>{{scope.row.nov  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="12月清欠" prop="dece">
                    <template slot-scope="scope">
                      <p>{{scope.row.dece  | nonDelivery | micrometerLevel}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  export default {
    name: 'HouseDrawer',
    props: ['checkDebts', 'owingMoneyList'],
  }
</script>
<style scoped lang="scss">
@import "~@styles/common.scss";
</style>
