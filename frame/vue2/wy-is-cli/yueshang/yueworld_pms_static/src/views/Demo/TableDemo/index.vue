<!--
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description:
-->
<template>

  <div class="data-list" style="overflow: auto;height: 700px">
    <!-- 表单表格 -->
    <ysn-formTable
      ref="formTable"
      v-model="formTableData"
      prop="tableData1"
      :column="formTableConfig"
      :rules="formTableRules"
      add
      :first-row-add="false"
    >
      <template #name2>插槽</template>
      <template slot="otherBtn" slot-scope="scope">
        <i class="el-icon-edit" @click="copy(scope.row)" />
      </template>
    </ysn-formTable>
    <br>
    <!-- 按钮 -->
    <ysn-btn @click="validate">确认</ysn-btn>
    <ysn-btn type="info">确认</ysn-btn>
    <ysn-btn type="delete" disabled>确认</ysn-btn>
    <ysn-btn type="reset">重置</ysn-btn>
    <ysn-btn type="text">详情</ysn-btn>
    <br>
    <!-- 表格 -->
    <ysn-table
      :data="tableData1"
      :column="tableConfig"
      :checkbox="false"
      show-summary
      is-dis-table
    />
    <br><br>

    <ysn-table
      :data="tableData1"
      :column="tableConfig"
      :checkbox="false"
      show-summary
      :summary-col="2"
    />
    <br><br>
    <ysn-table
      :data="tableData1"
      :column="tableConfig1"
      :show-slots="['obSub','nameSlot']"
      select-key="id"
      :span-method="arraySpanMethod"
      :checkbox="false"
      @config-change="configChange"
    >
      <template #nameSlot="scope">
        <div @click="handleClick(scope )">
          我叫：{{ scope.row.name }}
        </div>
      </template>
    </ysn-table>
  </div>
</template>

<script>
export default {
  name: 'TableDemo',
  components: {

  },
  data() {
    return {
      formTableData: {
        tableData1: [
          { t1: '123', upload: [{ name: 'xxx.jpg' }] },
          { t1: '123', upload: [{ name: 'xxx.jpg' }] }
        ]
      },
      formTableRules: {
        name: [{ required: true, message: '' }]
      },
      // 表单表格配置
      formTableConfig: [
        { name: '姓名', itemType: 'input', required: true, tableList: [
          { name2: '姓名', itemType: 'input', hasSlot: true, width: 300, formatter: row => row.name2 + '123' },
          { name123: '姓33名', width: 300, type: 'money', formatter: row => 'xixixi' }
        ] },
        { name: '姓名2', itemType: 'input', width: '200px', listeners: { blur: this.blur }, inputType: 'Number' },
        { date: '姓名', itemType: 'datePicker', type: 'daterange', required: true, width: 400 },
        { sex: '性别', sortable: true, itemType: 'select', list: [], width: 200, itemConfig: { width: '100px' }},
        { upload: '上传', itemType: 'fileUpload', width: 500, actionUrl: '', limitNum: 4, span: 2 },
        { t1: '性别', sortable: true, itemType: 'text', list: [], width: 200 }
      ],
      tableData1: [
        {
          name: '张三12313123123',
          sex: '男',
          age: '18',
          birthYear: '2010',
          birthMonth: '10',
          birthDay: '7',
          id: 1,
          disName: '你好'
        }, {
          name: '李四',
          sex: '女',
          age: '19',
          birthYear: '2010',
          birthMonth: '10',
          birthDay: '7',
          id: 2,
          disName: '你好2'
        }, {
          name: '张三',
          sex: '男',
          age: '18',
          birthYear: '2010',
          birthMonth: '10',
          birthDay: '7',
          id: 1,
          disName: '你好'
        }, {
          name: '李四',
          sex: '女',
          age: '19',
          birthYear: '2010',
          birthMonth: '10',
          birthDay: '7',
          id: 2,
          disName: '你好'
        }],
      tableConfig: [
        { disName: '二维表格', columnClass: 'hasBg', width: '100px' },
        { idx: '序号', type: 'index', width: '100px', sortable: true, required: true },
        { name: '姓名', width: '100px' },
        { sex: '性别', sortable: true },
        { age: '年龄2', formatter: row => row.age + '岁', width: '200px' }
      ],
      tableConfig1: [
        { sex: '性别1', hasClose: true, tableList: [
          { name: '姓名', width: '100px', sortable: true },
          { name: '姓名', width: '100px' },
          { name: '姓名', width: '100px', sortable: true },
          { name: '姓名', width: '100px' }
        ] },
        // { disName: '二维表格', columnClass: 'hasBg', width: '100px' },
        { idx: '序号', type: 'index', width: '70px' },
        { name: '姓名', width: '100px', labelClass: 'borderBottom borderLeft borderRight', tableList: [
          { nameSlot: '姓名12', width: '100px', required: true, sortable: true },
          { age: '年龄', width: '100px', labelClass: 'borderRight', formatter: row => { return row.age + '岁' } }
        ] },
        { sex: '性别1', hasClose: true, tableList: [
          { name: '姓名', width: '150px', sortable: true },
          { name: '姓名', width: '100px' },
          { name: '姓名', width: '100px', sortable: true },
          { name: '姓名', width: '100px' }
        ] }
      ]
    }
  },
  methods: {
    copy(row) {
      alert(row.t1)
    },
    handleClick(row) {
      console.log(row)
    },
    async validate() {
      const res = await this.$refs['formTable'].validate()
      console.log(this.formTableData)
      console.log(res)
    },
    configChange(newConfig) {
      this.tableConfig1 = newConfig
    },
    blur(val) {
      console.log(val)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex <= 1) {
      //   if (columnIndex - 1 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 1
      //     }
      //   }
      // }
    }
  }

}

</script>
