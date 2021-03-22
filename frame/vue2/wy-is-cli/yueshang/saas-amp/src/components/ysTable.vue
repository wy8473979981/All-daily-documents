<template>
  <el-table :data="tableData" style="width: 100%" border class="ys-table" @selection-change="checkboxChangeFunc" @row-click="radioChangeFunc" :max-height="maxHeight">

    <el-table-column v-if="checkboxBol" fixed="left" type="selection" width="50">
      <!-- 默认不显示复选框 -->
    </el-table-column>

    <el-table-column v-if="radioBol" fixed="left" width="50">
      <!-- 默认不显示单选框 -->
      <template slot-scope="scope">
        <el-radio class="radio" v-model="radioSelected" :label="scope.$index">&nbsp;</el-radio>
      </template>
    </el-table-column>

    <el-table-column v-if="serialNumberBol" fixed="left" label="序号" type="index" width="50">
      <!-- 默认不显示序号 -->
      <template scope="scope">
        <span>{{scope.$index + 1}}</span>
      </template>
    </el-table-column>

    <template v-for="(item, index) in columns">
      <template v-if="item.group">
        <!-- 表头合并 -->
        <!-- 垂直分割线 -->
        <el-table-column width="5" class-name="common-column-line" :key="`start-line${index}`"></el-table-column>

        <el-table-column :align="item.align||'center'" :key="index">
          <template slot="header">
            <span>{{item.groupName}}</span>
          </template>
          <template v-for="(itemGroup, indexGroup) in item.children">
            <el-table-column v-if="itemGroup.type&&itemGroup.type=='input'" show-overflow-tooltip :key="indexGroup" :prop="itemGroup.key" :label="itemGroup.label" :min-width="itemGroup.width" :align="itemGroup.align||'left'">
              <template slot-scope="scope">
                <template v-if="itemGroup.isEdit==true">
                  <span v-if="itemGroup.hasEditFn(itemGroup.key,scope.row,index)">{{scope.row[itemGroup.key]}}</span>
                  <!-- <input v-else maxlength="12" :value="scope.row[itemGroup.key]" placeholder="请输入" size="mini" @input="scope.row[item.key]= $event.target.value" @blur="setTableData"> -->
                  <el-input v-else maxlength="12" size="mini" v-model="scope.row[itemGroup.key]" placeholder="请输入内容" @blur="setTableData"></el-input>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>

      <template v-else>
        <!-- 垂直分割线 -->
        <el-table-column v-if="item.line" class-name="common-column-line" :key="`line${index}`" width="5"></el-table-column>

        <!-- 操作列/自定义列 -->
        <slot v-if="item.slot" :name="item.slot"></slot>

        <!-- 可编辑 input 列 -->
        <el-table-column v-else-if="item.type&&item.type=='input'" show-overflow-tooltip :key="index" :fixed="item.fixed" :prop="item.key" :label="item.label" :min-width="item.width" :align="item.align||'left'">
          <template slot-scope="scope">
            <template>
              <span v-if="item.hasEditFn(item.key,scope.row,index)">{{scope.row[item.key]}}</span>
              <!-- <input v-else maxlength="12" :value="scope.row[item.key]" placeholder="请输入" size="mini" @input="scope.row[item.key]= $event.target.value" @blur="setTableData"> -->
              <el-input v-else maxlength="12" size="mini" v-model="scope.row[itemGroup.key]" placeholder="请输入内容" @blur="setTableData"></el-input>
            </template>
          </template>
        </el-table-column>

        <!-- 可编辑 select 列 -->
        <el-table-column v-else-if="item.type&&item.type=='select'" show-overflow-tooltip :key="index" :fixed="item.fixed" :prop="item.key" :label="item.label" :min-width="item.width" :align="item.align||'left'">
          <template slot-scope="scope">
            <template>
              <span v-if="item.hasEditFn(item.key,scope.row,index)">{{scope.row[item.key]}}</span>
              <el-select placeholder="请选择" :value="scope.row[item.key]" @change="selectChange(scope.row,item.key,$event)" size="mini">
                <el-option v-for="selectItem in item.options" :key="selectItem.value" :label="selectItem.label" :value="selectItem.value"></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>

        <!-- 普通列 -->
        <el-table-column v-else :key="index" show-overflow-tooltip :prop="item.key" :label="item.label" :min-width="item.width" :align="item.align" :fixed="item.fixed"></el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
export default {
  name: "ys-table",
  props: {
    'tableData': {//数据
      type: Array,
      default: () => []
    },
    'columns': {//表头
      type: Array,
      default: () => []
    },
    'serialNumberBol': {//是否显示序号
      type: Boolean,
      default: false
    },
    'checkboxBol': {//复选框
      type: Boolean,
      default: false
    },
    'radioBol': {//单选框
      type: Boolean,
      default: false
    },
    'maxHeight': {//最大高度
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      radioSelected: null
    }
  },
  methods: {
    selectChange(item, key, data) {
      item[key] = data;
      this.setTableData();
    },
    setTableData() {// 失去焦点返回整个table数据
      this.$emit('update:tableData', this.tableData);
      // console.log(this.tableData, 'this.tableData')
    },
    checkboxChangeFunc(val) {// 复选框
      this.$emit('update:checkboxChangeFunc', val)
    },
    radioChangeFunc(row, column, event) {// 单选框
      if (event.target.tagName === "INPUT") return;
      this.$emit('update:radioChangeFunc', row)
    },
  }
}
</script>
<style lang="scss" scoped>
.el-table {
  ::v-deep .cell {
    // text-overflow: initial;
  }
  ::v-deep td.is-center,
  ::v-deep th.is-center {
    text-align: center;
    border-bottom: 1px solid #dae1e7 !important;
  }
  ::v-deep .common-column-line {
    background-color: #fff;
  }
}
input {
  width: 100%;
}
</style>
// columns: [
//   {
//     label: '名称',
//     key: 'adName',
//     width: '150px',
//     fixed: 'left',
//     type: 'input',
//     isEdit: true,
//     hasEditFn: (key, row) => {
//       return true;
//     }
//   },
//   {
//     label: '链接',
//     key: 'adUrl',
//     width: '150px',
//     type: 'select',
//     isEdit: true,
//     options: [{
//       value: 22,
//       label: '黄金糕'
//     }, {
//       value: 33,
//       label: '双皮奶'
//     }, {
//       value: 44,
//       label: '蚵仔煎'
//     }, {
//       value: 55,
//       label: '龙须面'
//     }, {
//       value: 66,
//       label: '北京烤鸭'
//     }],
//     hasEditFn: (key, row) => {
//       return false;
//     }
//   },
//   {
//     group: true,
//     groupName: '排序1',
//     children: [
//       {
//         label: '链接',
//         key: 'sort1',
//         width: '150px',
//         type: 'input',
//         align: 'right',
//         isEdit: true,
//         hasEditFn: (key, row) => {
//           return false;
//         }
//       },
//       {
//         label: '链接',
//         key: 'sort2',
//         width: '150px',
//         type: 'input',
//         isEdit: true,
//         hasEditFn: (key, row) => {
//           return false;
//         }
//       }
//     ]
//   },
//   {
//     group: true,
//     groupName: '排序2',
//     children: [
//       {
//         label: '链接',
//         key: 'sort3',
//         width: '150px',
//         type: 'input',
//         isEdit: true,
//         hasEditFn: (key, row) => {
//           return false;
//         }
//       },
//       {
//         label: '链接',
//         key: 'sort4',
//         width: '150px',
//         type: 'input',
//         isEdit: true,
//         hasEditFn: (key, row) => {
//           return false;
//         }
//       }
//     ]
//   },
//   { line: true, slot: 'operate' }// 操作列
// ],
