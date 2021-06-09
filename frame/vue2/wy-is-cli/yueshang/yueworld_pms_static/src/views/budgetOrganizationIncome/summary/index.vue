<template>
  <div class="summary">
    <div class="budget-table">
      <el-table
        :data="tableData2"
        style="width: 100%; font-size: 10px"
        :default-sort="{ prop: 'data', order: 'descending' }"
        @sort-change="sort_change"
         :header-cell-style="rowClass"
      >
        <el-table-column label="序列" type="index" :index="indexMethod" />
        <el-table-column prop="name" label="汇总表" sortable>
          <template slot="header">
            <span>汇总表</span>
            <img
              v-if="list.name=='ascending'"
              src="@/assets/imges/17.png"

              width="20"
              alt=""
            >
            <img
              v-else-if="list.name=='descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column prop="address1" label="状态" sortable>
          <template slot="header">
            <span>状态</span>
            <img
              v-if="list.address1=='ascending'"
              src="@/assets/imges/17.png"

              width="20"
              alt=""
            >
            <img
              v-else-if="list.address1=='descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column prop="address2" label="最后编辑人" sortable>
          <template slot="header">
            <span>最后编辑人</span>
            <img
              v-if="list.address2=='ascending'"
              src="@/assets/imges/17.png"

              width="20"
              alt=""
            >
            <img
              v-else-if="list.address2=='descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column prop="address3" label="最后编辑时间" sortable>
          <template slot="header">
            <span>最后编辑时间</span>
            <img
              v-if="list.address3=='ascending'"
              src="@/assets/imges/17.png"

              width="20"
              alt=""
            >
            <img
              v-else-if="list.address3=='descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="address4"
          label="操作"
        ><p>详情</p></el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <div class="paging-data">
        <p>共15条数据，当前在1/1页</p>
      </div>
      <div class="paging-option">
        <el-pagination layout="prev, pager, next" :total="50" />
        <el-divider direction="vertical" />
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Summary',
  data() {
    return {
      select: '',
      activeIndex: '1',
      boldsize: 'boldsize',
      list: {},
      num: 1,
      tableData2: [
        {
          data: '1',
          name: 'cimi2022',
          address1: '工资福利费',
          address2: '编制中',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '2',
          name: 'cimi2022',
          address1: '培训费',
          address2: '编制中',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '3',
          name: 'cimi2022',
          address1: '招聘费',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '4',
          name: 'cimi2022',
          address1: '行政费用',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '5',
          name: 'cimi2022',
          address1: '差旅费',
          address2: '已提交',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '6',
          name: 'cimi2022',
          address1: '业务招待费',
          address2: '已提交',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '7',
          name: 'cimi2022',
          address1: '清洁卫生费',
          address2: '审批成功 ',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '8',
          name: 'cimi2022',
          address1: '安全保卫费',
          address2: '审批成功 ',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '9',
          name: 'cimi2022',
          address1: '绿化养护费',
          address2: '审批成功 ',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '10',
          name: 'cimi2022',
          address1: '能耗费',
          address2: '已提交',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '11',
          name: 'cimi2022',
          address1: '折旧费',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '12',
          name: 'cimi2022',
          address1: '非生产性采购',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '13',
          name: 'cimi2022',
          address1: '财务费用',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '14',
          name: 'cimi2022',
          address1: '整租租赁成本',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        },
        {
          data: '15',
          name: 'cimi2022',
          address1: '其他成本费用',
          address2: '审批成功',
          address3: '张三',
          address4: '2020-10-18 09:32'
        }
      ],
      option: [
        {
          num: '第一页'
        },
        {
          num: '第二页'
        },
        {
          num: '第三页'
        },
        {
          num: '第四页'
        },
        {
          num: '第五页'
        },
        {
          num: '第六页'
        },
        {
          num: '第七页'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
      rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 6) {
        return "border-top-right-radius: 20px;border-bottom-right-radius: 20px;";
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, this.activeIndex)
      this.num = key
    },
    indexMethod(index) {
      return index + 1
    },
    sort_change(column, prop, order) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
      console.log(this.list)
      console.log(column, '---', prop, order)
    },
    sortFun: function(attr, rev) {
      console.log(rev)
      // 第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      return function(a, b) {
        console.log(a, b)
        a = a[attr]
        b = b[attr]
        if (a < b) {
          return rev * -1
        }
        if (a > b) {
          return rev * 1
        }
        return 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./summary.scss";
</style>
