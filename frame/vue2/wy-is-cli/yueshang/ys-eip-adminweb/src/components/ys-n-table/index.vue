<template>
  <el-table ref="table" :data="tableData" size="mini" stripe :row-class-name="tableRowClassName" :height="tableHeight" row-key="id">
    <template v-for="(item,i) in column">

      <el-table-column type="index" :key="i" v-if="item.key==='No'" :width="item.width" :fixed="item.fixed" :align="item.align" :label="item.label" />

      <el-table-column :key="i" v-else-if="item.key === 'function'" fixed="right" :align="item.align" :min-width="item.width" :label="item.label">
        <template slot-scope="scope">
          <template v-if="scope.row.showInput">
            <!-- 表格 可编辑 点击 对号 提交，例如 数据脱敏 -->
            <span :class="classObject(scope.row,column)" @click="checkSubmit(scope,column)"></span>
            <span class="check delete-icon" @click="checkDelete(scope)"></span>
          </template>
          <div v-else>
            <template v-for="(fc,i) in column[i].functionList">
              <span v-if="fc.showKey" :key="i">
                <span class="oprate" v-if="scope.row[fc.showKey]" @click="handleClick(fc,scope)" :key="i" type="text" size="small" :style="{color:fc.color ? fc.color : '#4876EF'}">{{fc.name}}</span>
              </span>

              <span class="oprate" v-else @click="handleClick(fc,scope)" :key="i" type="text" size="small" :style="{color:fc.color ? fc.color : '#4876EF'}">{{fc.name}}<span>{{fc.showKey}}</span></span>
            </template>

          </div>
        </template>
      </el-table-column>

      <el-table-column :key="i" v-else :min-width="item.width" :fixed="item.fixed" :align="item.align" :label="item.label" :prop="item.key" :show-overflow-tooltip="true">
        <template slot-scope="scope">

          <div v-if="column[i].editType === 'input'" class="cell-value">
            <template v-if="column[i].editFunction && !scope.row.showInput">
              <div class="edite-input" v-if="scope.row.editeShow">
                <el-input v-model="editeName" size="mini" :placeholder="`请输入${item.label}`"></el-input>
                <div>
                  <i class="el-icon-check" style="color: #4876EF;" @click="editeSure(column[i].editFunction,scope.row, item.key)"></i>
                  <i class="el-icon-close" style="color: #F4647E;" @click="editeOprate(scope.row)"></i>
                </div>
              </div>
              <span v-else :style="{color:column[i].color ? column[i].color : '#1C1C1C'}" @click="editeOprate(scope.row,item.key)">{{scope.row[item.key]}}</span>
            </template>

            <template v-else>
              <!-- showInput 数据中的字段 -->
              <div class="show-input" v-if="scope.row.showInput">
                <template v-if="column[i].showSelect">
                  <el-select size="mini" v-model="scope.row[item.key]" @change="getName(scope.row)">
                    <el-option v-for="obj in scope.row.selectList" :key="obj.configType" :label="obj.configName" :value="obj.configType"></el-option>
                  </el-select>
                </template>
                <template v-else-if="column[i].autocomplete">
                  <ysNAutocomplete :className="'search-icon'" v-model="scope.row[item.key]" :size="'mini'" :serveApi="item.serveApi" :params="scope.row" :type="item.key" @handleSelect="handleSelect($event,scope)" :placeholder="`请输入${item.label}`" />
                </template>
                <template v-else>
                  <template v-if="column[i].numberInput">
                    <el-input v-model="scope.row[item.key]" v-filter-check-input3 size="mini" :placeholder="`请输入${item.label}`"></el-input>
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row[item.key]" size="mini" :placeholder="`请输入${item.label}`"></el-input>
                  </template>
                </template>
              </div>
              <span v-else :style="{color:column[i].color ? column[i].color : '#1C1C1C'}" @click="editeOprate(scope.row)">
                <!-- 数字 千分位 格式化 ，配置中需要传 numberFormat：是否格式化 、numberPrecision：保留几位小数、unit：单位、type：是否除以10000-->
                {{ item.numberFormat? $Utils.numberFormat( scope.row[item.key] ,{ precision: item.numberPrecision, unit: item.unit, type: item.type } ) : scope.row[item.key] || '-' }}
              </span>
            </template>

          </div>

          <div v-else-if="column[i].editType === 'switch'" class="switch-content">
            <!-- 配置中传 function 字段 -->
            <el-switch v-model="scope.row[item.key]" active-color="#13ce66" inactive-color="#E0E5EB" :disabled="item.disabled" @change="scope.row.showInput ? '' : handleClick(item,scope)"></el-switch>

            <template v-if="scope.row.showInput && !column.find(obj => obj.key === 'function')">
              <!-- 表格 可编辑 点击 对号 提交，例如 数据脱敏 -->
              <span :class="classObject(scope.row)" @click="checkSubmit(scope)"></span>
              <span class="check delete-icon" @click="checkDelete(scope)"></span>
            </template>
          </div>

          <div v-else class="cell-value" :style="{color:( item.color && scope.row[item.key] ? item.color : '#1C1C1C' ),cursor:item.cursor ? item.cursor : 'initial',}">

            <span :class="[scope.row['defaultStyle'] ? 'defaultStyle' : '']">{{ valueFormat (item, scope) }}</span>

          </div>

        </template>
      </el-table-column>

    </template>

  </el-table>
</template>

<script>
export default {
  props: {
    tableList: {
      type: Array,
      default: []
    },
    column: {
      type: Array,
      default: []
    },
    tableHeight: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      // tableHeight: null,
      editeName: '',
      tableData: this.tableList
    }
  },
  watch: {
    tableList: {
      handler: function (newValue, oldValue) {
        this.tableData = newValue
        this.$nextTick(() => {
          this.$refs.table.doLayout(); //解决表格错位
        });
      },
      immediate: true,
      deep: true
    }
  },
  computed: {},
  mounted () { },
  methods: {
    valueFormat (item, scope) {
      // <!-- 数字 千分位 格式化 ，配置中需要传 numberFormat：是否格式化 、numberPrecision：保留几位小数、unit：单位、type：是否除以10000-->
      return item.numberFormat ? this.$Utils.numberFormat(scope.row[item.key], { precision: item.numberPrecision, unit: item.unit, type: item.type }) : ![null, undefined, ''].includes(scope.row[item.key]) ? scope.row[item.key] : item.key == 'xuhao' ? '' : '-'
    },
    getName (row) {
      this.$emit('changeRowSelect', row)
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'odd-row';
      } else {
        return 'even-row';
      }
      return '';
    },
    handleClick (fc, scope) {
      if (fc.function) {
        let { $index, row } = scope
        this.$emit(fc.function, row, $index)
      }
    },
    editeOprate (row, key) {
      this.editeName = row[key]
      if (row.editeShow) {
        this.$set(row, 'editeShow', false)
      } else {
        this.$set(row, 'editeShow', true)
      }
    },
    editeSure (fc, row, key) {
      this.$emit(fc, { row, key: key, editeName: this.editeName })
    },
    classObject (row, column) {
      let arr = []
      if (row) {
        for (let key in row) {
          if (key != 'paramNameTarget') {// 收集非必填项的值
            if (column) {
              column.map(item => {
                if (key == item.key && item.editType) {
                  arr.push(row[key])
                }
              })
            } else {
              arr.push(row[key])
            }

          }
        }
        let result = arr.every((item, index, array) => {
          return !['', "", null, undefined].includes(item);
        })
        if (result) {
          return `check green-check`
        } else {
          return `check gray-check`
        }
      }
    },
    checkSubmit (scope, column) {
      try {
        let { $index, row } = scope
        let res = this.classObject(scope.row, column)
        if (res == 'check gray-check') {
          return false
        }
        this.$emit('checkSubmit', row, $index)

      } catch (e) {
        console.log(e)
      }
    },
    checkDelete (scope) {
      try {
        let { $index, row } = scope
        this.$emit('checkDelete', row, $index)
      } catch (e) {
        console.log(e)
      }
    },
    handleSelect (event, scope) {
      this.$emit('table-change', event, scope)
    }
  },
}
</script>

<style lang="scss" >
.el-table {
  .el-table__fixed-right-patch {
    background-color: #f0f2f7;
  }
  th {
    border: none !important;
    background-color: #f0f2f7;
    .cell {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #8893a3;
      padding: 6px 9px;
      border: none !important;
    }
    &:first-child {
      .cell {
        padding: 6px 9px 6px 20px;
      }
    }
    &:last-child {
      .cell {
        padding: 6px 20px 6px 9px;
      }
    }
  }

  td {
    border: none !important;
    .cell {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c1c1c;
      line-height: 20px;
      padding: 6px 9px;
      .cell-value {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &:first-child {
      .cell {
        padding: 6px 9px 6px 20px;
      }
    }
    &:last-child {
      .cell {
        padding: 6px 20px 6px 9px;
      }
    }
  }

  .even-row {
    background-color: #f0f2f7 !important;
    border: none !important;
  }
  .odd-row {
    background-color: #fff !important;
    border: none !important;
  }
  .oprate {
    cursor: pointer;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .edite-input {
    display: flex;
    align-self: center;
    justify-content: flex-start;
    line-height: 28px;
    .el-input {
      width: 70%;
      .el-input__inner {
        border: 1px solid #4876ef;
      }
    }
    i {
      line-height: 28px;
      margin-left: 16px;
    }
  }
}

.el-table--striped
  .el-table__body
  tr.el-table__row--striped
  .el-table
  th.is-leaf,
.el-table td {
  border: none !important;
}
.el-table th,
.el-table td {
  padding: 0;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(240, 242, 247, 0.5);
}
.switch-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check {
  display: inline-block;
  width: 20px;
  height: 24px;
  margin-right: 10px;
}
.gray-check {
  background: url("../../assets/images/gray-check.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  cursor: pointer;
}
.green-check {
  background: url("../../assets/images/green-check.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  cursor: pointer;
}
.delete-icon {
  background: url("../../assets/images/delete.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  cursor: pointer;
}
.defaultStyle {
  font-weight: bold;
  color: red;
}
</style>
