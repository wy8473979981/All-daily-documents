<template>
  <el-row>
    <div class="top-bar d-flex">
      <div class="left pr-40 pl-16">
        <span :class="['mr-32','cursor-pointer',activeIndex==0?'active':'']" @click="changeActive(0)">收入</span>
        <span :class="['cursor-pointer mr-32',activeIndex==1?'active':'']" @click="changeActive(1)">费用支出</span>
        <span :class="['cursor-pointer',activeIndex==2?'active':'']" @click="changeActive(2)">汇总</span>
      </div>
    </div>
    <div class="dailog-table" style="margin-top: 12px">
      <el-table :data="tableData" :cell-class-name="hangStyle" style="width: 100%">
        <el-table-column type="index" label="序列" />
        <el-table-column
          v-for="(item,index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.name"
          :align="item.align"
          :width="item.width"
        >
          <template #header>
            <div class="solt-icon">
              <span>{{ item.name }}</span>
              <i class="el-icon-sort cursor-pointer" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging pb-40">
      <div class="paging-data">
        <p>共6条数据，当前在1/1页</p>
      </div>
      <div class="paging-option">
        <el-pagination layout="prev, pager, next,sizes" :page-sizes="[20, 40, 60, 80]" :total="6" />
      </div>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      optionYear: 2021,
      yearItem: [
        { value: 2021, label: '2021年' },
        { value: 2020, label: '2020年' },
        { value: 2019, label: '2019年' }
      ],
      activeName: 'first',
      tableColumn: [
        { name: '部门名称', prop: 'department' },
        { name: '收入表', prop: 'income' },
        { name: '状态', prop: 'state' },
        { name: '最后编辑人', prop: 'edit' },
        { name: '最后编辑时间', prop: 'time' }
      ],
      tableData: [{
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }, {
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }, {
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }, {
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }, {
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }, {
        department: 'XX部',
        income: '10%',
        state: '已提交',
        edit: '张三',
        time: '2020-10-18  09:32'
      }]
    }
  },
  methods: {
    changeActive(index) {
      if (index === 1) {
        this.$set(this.tableData, 0, { department: 'YY部',
          income: '20%',
          state: '待提交',
          edit: '张三',
          time: '2020-10-18  09:32' })
      } else if (index === 0) {
        this.$set(this.tableData, 0, { department: 'XX部',
          income: '10%',
          state: '已提交',
          edit: '张三',
          time: '2020-10-18  09:32' })
      } else {
        this.$set(this.tableData, 0, { department: 'ZZ部',
          income: '30%',
          state: '已提交',
          edit: '李四',
          time: '2020-10-18  09:32' })
      }
      this.activeIndex = index
    }
  }
}
</script>
<style lang="scss">
  .budget-page{
    .el-input--small .el-input__inner{
      background: #FDFCFA;
      border-radius: 16px;
    }
  }
</style>
<style lang="scss" scoped>
.top-bar{
    margin-top: 18px;
    .left{
      border-radius: 24px;
      font-size: 14px;
      color: #050101;
      line-height: 30px;
      display: flex;
      background-color: #FDFCFA;
    }
    .active{
      font-size: 16px;
      font-weight: bold;
      color: #1C4C7F;
      border-bottom: 2px solid #1C4C7F;
    }
  }
  .el-input--small .el-input__inner{
    border-radius: 16px;
  }
</style>
