<template>
  <section class="html-list list">
    <!-- <el-cascader
      style="width: 600px;"
      size="mini"
      v-model="cascaderVal"
      :props="props"
      @change='handleChange'
    >
    </el-cascader> -->
    <obj-cascader :selectedInfo='selectedInfo' @setSelectedInfo = 'setSelectedInfo' :outerStep="outerStep" style="margin-right: 5px;" />
    <el-button size="mini" type="primary"
      @click="getHeadList"
      :disabled="selectedInfo.type !== 'List'"
    >显示表格字段</el-button>
    <el-table
      ref="selectionTable"
      :data="headList"
      height="320"
      style="margin-bottom: 10px;"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="字段值" prop="value"></el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">
          <el-input-number size="mini" :min="0" v-model="scope.row.idx"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="label"></el-table-column>
      <el-table-column label="列宽（%）">
        <template slot-scope="scope">
          <el-input-number size="mini" :min="0" :max="100" v-model="scope.row.colWidth"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <section v-show="selectedInfo.type === 'List'">
      <h3 style="font-weight: bold; margin: 20px 0;">表格设置</h3>
      <el-form :inline="true">
        <el-form-item label="显示表头">
          <el-switch v-model="tableConfig.showHead"/>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-switch v-model="tableConfig.showIndex"/>
        </el-form-item>
        <el-form-item label="宽度(%)">
          <el-input-number size="mini" v-model="tableConfig.width"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="setColWidth">设置相同列宽</el-button>
        </el-form-item>
      </el-form>
    </section>
    <ys-modal-btn-group @goStep="goStep" @toggleModal="closeModal" :step="step" />
  </section>
</template>

<script>
import {templateDataName} from './config'
import elementGroup from '@apis/elementGroup'
import objCascader from './objCascader'
// import mock from "../mock2"
export default {
  data () {
    return {
      tableConfig: {
        showHead: true,
        width: 100,
        showIndex: true
      },
      selectedInfo: {
        id: -1,
        key: '',
        label: '',
        type: '',
        wholeKey: ''
      },
      cascaderVal: [],
      pageInfo: {
        page: 1,
        page_size: 10,
        sum_num: 0
      },
      filteredFields: [], // 最终选中的要显示的字段
      insertInfo: {code: '', cn: ''}, // 插入的信息
      step: 0,
      groupList: [
        // { label: "所有考试成绩", code: "scoreList", desc: "我是描述XXXXXXXXXXXXXX", selected: false },
        // { label: "所有身高", code: "heightList", desc: "我是描述YYYYYYYYY", selected: false }
      ],
      headList: [
        // { code: '{{name}}', label: '姓名姓名', selected: false },
        // { code: '{{height}}', label: '升高升高', selected: false },
        // { code: '{{age}}', label: '年龄年龄', selected: false },
        // { code: '{{hobby}}', label: '爱好', selected: false },
        // { code: '{{salary}}', label: '薪水', selected: false }
      ],
      objectInfo: {
        id: '',
        name: '',
        field: []
      }
    }
  },
  props: {
    outerStep: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  methods: {
    // setCascaderVal (val) {
    //   this.cascaderVal = val
    // },
    setSelectedInfo (val) {
      this.selectedInfo = val.selectedInfo
      this.cascaderVal = val.cascaderVal
    },

    // 设置列宽
    setColWidth () {
      const selection = this.$refs.selectionTable.selection
      if (selection.length === 0) {
        this.$message.error('请选择要显示的字段')
        return
      }
      console.log(selection, '---选中的row')
      const rowIndex = selection.map(item => item.fixedIndex)
      console.log(rowIndex, '---row idnex')
      this.headList.forEach((item, index) => {
        if (rowIndex.includes(index)) {
          item.colWidth = Math.floor(100 / selection.length)
        }
      })
      // this.headList = selection.map((item) => {
      //   return {
      //     ...item,
      //     colWidth: Math.floor(100 / this.headList.length)
      //   }
      // })
    },

    closeModal () {
      this.$emit("toggleModal")
      this.$emit('goOuterStep', 0)
    },
    filterSpace2Enter (html) {
      const str = JSON.stringify(html)
        .replace(/\\n/g, val => '')
        .replace(/\s*(?=<)/g, val => '')
      return JSON.parse(str)
    },
    // 插入数据前检查
    checkListInsert (selection) {
      if (selection.some(item => item.colWidth === 0)) {
        this.$message.error('请设置列宽')
        return false
      }
      if (selection.length === 0) {
        this.$message.error('请选择要显示的字段')
        return false
      }
      const sumColWidth = selection.reduce((a, c) => a+c.colWidth, 0)
      if (sumColWidth > 100) {
        this.$message.error('列宽总和大于100')
        return false
      }
      return true
    },
    parseKey (str) {
      let arr = str.split('.')
      var arr2 = []
      for (let i = 0; i< arr.length; i++) {
        if (i === arr.length - 1) {
          break;
        }
        var reStr = new Array(i+1).fill(null).reduce((a, c) => {
          return a+ '\.\\w+'
        }, '\\w+')
        var regExp = new RegExp(reStr)
        var matched = str.match(regExp)[0]
        arr2.push(matched)
      }
      return arr2.join(' && ')
    },
    async goStep (val) {
      if (val === 1) {
        if (this.cascaderVal.length === 0) {
          this.$message.error('请选择插入的数据')
          return
        }

        if (this.selectedInfo.type === 'Element') {
          console.log(this.selectedInfo.type, '---tuype')
          let code = this.cascaderVal.map(item => {
            return item.split('/')[1]
          })
          .join('.')
          code = `${templateDataName}.${code}`
          /**
           * partyPluginObject.companyObject.companyName
           * partyPluginObject ? partyPluginObject : ''
           * .companyObject.companyName
           */
          // console.log(code, '----code----')

          let parsedCode = this.parseKey(code)
          code = `{{${parsedCode} ? ${code} : ''}}`
          console.log(code, '-----final---')
          this.$emit('emitContent', {code, type: '对象的元素'})
          this.$emit('toggleModal')
        } else if (this.selectedInfo.type === 'List') {
          let selection = this.$refs.selectionTable.selection
          if (!this.checkListInsert(selection)) return
          selection = selection.sort((a, b) => {
            return a.idx - b.idx
          })
          let head = selection.reduce((a, c) => {
            return `${a}<span style='width: ${c.colWidth}%'>${c.label}</span>`
          }, '')
          let body = selection.reduce((a, c) => {
            return `${a}<span style='width: ${c.colWidth}%'>{{item.${c.value}}}</span>`
          }, '')

          // 如果显示序号就加上
          if (this.tableConfig.showIndex) {
            head = `<span class='column-index'>序号</span>${head}`
            body = `<span class='column-index'>{{index + 1}}</span>${body}`
          }
          console.log(this.selectedInfo.wholeKey, '---whole key')
          let key = `${templateDataName}.${this.selectedInfo.wholeKey}`
          key = this.parseKey(key)
          console.log(key, '---key parsed---')
          let code = `
            <div class='ys-table' style='width: ${this.tableConfig.width}%' v-if='${key}'>
              <div class='ys-table-row ys-table-head' v-if='${this.tableConfig.showHead}'>${head}</div>
              <div class='ys-table-row' v-for="(item, index) in ${templateDataName}.${this.selectedInfo.wholeKey}" :key="index">
                ${body}
              </div>
            </div>
          `
          code = this.filterSpace2Enter(code)
          // console.log(code, '---ocde')
          // return
          this.$emit('emitContent', {code, type: '对象的元素'})
          this.$emit('toggleModal')
        }
      }
    },
    async getHeadList () {
      const res = await elementGroup.findById({element_group_id: this.selectedInfo.id})
      if (res.code === 200) {
        this.headList = res.result.members.element.map((item, index) => {
          return {
            value: item.element_key,
            label: item.element_name,
            desc: item.element_descr,
            selected: false,
            idx: index,
            fixedIndex: index,
            colWidth: 0
            // colWidth: Math.floor(100 / res.result.members.element.length)
          }
        })
      }
    },

    // 选择循环体
    handleRowClick (row) {
      // console.log(row, '---item row')
      this.groupList.forEach(item => {
        item.selected = false
        if (row.element_group_id === item.element_group_id) {
          item.selected = !item.selected
        }
      })
    },
    // 选择字段
    handleRowClick2 (row) {
      this.headList.forEach(item => {
        if (row.value === item.value) {
          item.selected = !item.selected
        }
      })
    },
    async getGroupList () {
      const params = Object.assign(this.pageInfo, {element_group_status: 'OPENED'})
      const res = await elementGroup.find(params)
      // console.log('组合回参', res)
      const { code, result } = res
      if (code === 200) {
        this.groupList = result.data.filter(item => item.data_type === 'Object').map(item => {
          return {
            selected: false,
            element_group_name: item.element_group_name,
            element_group_id: item.element_group_id,
            element_group_key: item.element_group_key
          }
        })
      }
    }
  },
  components: {
    objCascader
  }
};
</script>

<style lang='scss' scoped>
.el-table .active {
  background: #c9e5f5;
}
.arrow{
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #e0e0e0;
  &.arrow_up{
    background: url('../../../assets/images/arrow_up.png') no-repeat center center;
  }
  &.arrow_down{
    background: url('../../../assets/images/arrow_down.png') no-repeat center center;
  }
}

</style>
