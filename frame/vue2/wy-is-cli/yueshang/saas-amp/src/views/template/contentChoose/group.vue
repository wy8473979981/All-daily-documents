<template>
  <section class="html-list list">
    <el-table height="400" @row-click="handleRowClick" :data="groupList" v-show="step === 0">
      <el-table-column label="循环体名字" prop="element_group_key"></el-table-column>
      <el-table-column label="描述" prop="element_group_name"></el-table-column>
      <el-table-column label="选中状态">
        <template slot-scope="scope">
          <ys-icon v-show="scope.row.selected" type='success'/>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      ref="selectionTable"
      height="400"
      @row-click="handleRowClick2"
      :data="headList"
      v-show="step === 1"
    >
      <el-table-column label="字段名" prop="code"></el-table-column>
      <el-table-column label="描述" prop="label"></el-table-column>
      <el-table-column label="是否选中">
        <template slot-scope="scope">
          <!-- <i v-show="scope.row.selected" class="el-icon-check"></i> -->
          <ys-icon v-show="scope.row.selected"/>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data='filteredFields'
      v-show="step === 2" show-summary
      :summary-method="getSummaries"
    >
      <el-table-column label="字段名" prop="code"></el-table-column>
      <el-table-column label="描述" prop="label"></el-table-column>
      <el-table-column label="设置列宽(%)" prop="colWidth">
        <template slot-scope="scope">
          <el-input-number size="mini" type="number" v-model="scope.row.colWidth"
            :min="1"
            :max="100"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="是否选中">
        <template slot-scope="scope">
          <i
            class="arrow arrow_up"
            @click="changeIndex(scope.row.index, -1)"
          ></i>
          <i
            class="arrow arrow_down"
            @click="changeIndex(scope.row.index, 1)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <el-form v-show="step === 3" :inline="true">
      <el-form-item label="是否显示表头">
        <el-switch
          v-model="groupInfo.showHead"
          active-color="#13ce66"
          size='mini'
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="表格总宽">
        <el-input-number v-model="groupInfo.tableWidth" :min="1" :max="100" size='mini'></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示序号">
        <el-switch
          v-model="groupInfo.showIndex"
          active-color="#13ce66"
          size='mini'
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <ys-modal-btn-group @goStep="goStep" @toggleModal="closeModal" :step="step" />
  </section>
</template>

<script>
import {templateDataName} from './config'
import elementGroup from '@apis/elementGroup'
import mock from "../mock2"
export default {
  data () {
    return {
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
      groupInfo: {
        id: '',
        name: '',
        fields: [],
        showHead: true,
        tableWidth: 100,
        showIndex: false
      }
    }
  },
  methods: {
    getSummaries (params) {
      const { columns, data } = params
      let sums = ['合计', '', 0, ''];
      const sumWidth = data.reduce((a, c) => a+ c.colWidth, 0)
      sums[2] = sumWidth > 100 ? '超出预算': sumWidth
      return sums
    },
    // 调整列表显示字段的顺序
    changeIndex (idx, delta) {
      const length = this.filteredFields.length
      if (delta === -1) {
        if (idx === 0) {
          this.$message.error('第一项不能前移')
          return
        }
      } else if (delta === 1) {
        if (idx === length - 1) {
          this.$message.error('最后一项不能后移')
          return
        }
      }
      let clicked = this.filteredFields[idx]

      let target = delta === -1 ? this.filteredFields[idx - 1] : this.filteredFields[idx + 1]

      if (delta === -1) {
        // 往前调整
        const fore = this.filteredFields.slice(0, idx - 1)
        const aft = this.filteredFields.slice(idx + 1, length)
        clicked.index = idx - 1
        target.index = idx
        this.filteredFields = [...fore, clicked, target, ...aft]
      } else if (delta === 1) {
        // 往后调整
        const fore = this.filteredFields.slice(0, idx)
        const aft = this.filteredFields.slice(idx + 2, length)
        clicked.index = idx + 1
        target.index = idx
        this.filteredFields = [...fore, target, clicked, ...aft]
      }
    },
    closeModal () {
      this.$emit("toggleModal")
      this.$emit('goOuterStep', 0)
    },
    async getFieldList (id) {
      const res = await elementGroup.findById({element_group_id: id})
      const {code, result} = res
      if (code === 200) {
        this.headList = result.members.map(item => {
          return { code: item.element_key, label: item.element_name, selected: false }
        })
      }
    },
    check (stepVal) {
      if (stepVal === 2) {
        const sumWidth = this.filteredFields.reduce((a, c) => a+ c.colWidth, 0)
        if (sumWidth > 100) {
          this.$message.error('表格列宽总和大于100%')
          return false
        } else {
          return true
        }
      }
    },
    setStep (val) {
      this.step = val
    },
    // 点击按钮
    goStep (val) {
      // 点了下一步
      if (val > 0) {
        if (this.step === 0) {
          const selected = this.groupList.filter(item => item.selected)
          if (selected.length === 0) {
            this.$message.error('请选择循环体')
            return
          }
          this.groupInfo.name = `${templateDataName}.${selected[0].element_group_key}`
          this.groupInfo.id = selected[0].element_group_id
          this.getFieldList(this.groupInfo.id)
        } else if (this.step === 1) {
          this.filteredFields = this.headList
            .filter(item => item.selected)
            .map((item, index) => {
              return {
                ...item,
                index,
                colWidth: 10
              }
            })
          if (this.filteredFields.length === 0) {
            this.$message.error('请选择要显示的字段')
            return
          }
          this.groupInfo.fields = this.filteredFields.map(item => item.code)
          console.log(this.groupInfo.fields, '----字段1')
        } else if (this.step === 2) {
          if (!this.check(this.step)) return

        } else if (this.step === 3) {
          this.groupInfo.fields = this.filteredFields.map(item => item.code)
          console.log(this.groupInfo.fields, '----字段2')

          let tableHead = this.filteredFields.reduce((a, c) => {
            return a + `<span style='width: ${c.colWidth}%'>${c.label}</span>`
          }, '')
          // console.log(tableHead, '---表头')
          let tableBody = this.filteredFields.reduce((a, c) => {
            // console.log(c, '----body item')
            return a+`<span style='width: ${c.colWidth}%'>{{item.${c.code}}}</span>`
          }, '')
          if (this.groupInfo.showIndex) {
            tableHead = `<span class='column-index'>序号</span>` + tableHead
            tableBody = `<span class='column-index'>{{index + 1}}</span>` + tableBody
          }
          // console.log(tableBody, '---tablebody')
          const code = `
            <div class='ys-table' style='width: ${this.groupInfo.tableWidth}%'>
              <div class='ys-table-row ys-table-head' v-if='${this.groupInfo.showHead}'>${tableHead}</div>
              <div class='ys-table-row' v-for="(item, index) in ${this.groupInfo.name}" :key="index">
                ${tableBody}
              </div>
            </div>
          `
          this.insertInfo = {
            code: this.filterSpace2Enter(code),
            cn: '我是循环'
          }
          this.$emit('goOuterStep', 2)
          this.$emit('getContent', {...this.insertInfo, type: '组合'})
        }
        if (this.step < 4) {
          this.step = this.step + 1
        }
      } else {
        if (this.step > 0) {
          this.step = this.step - 1
        }
      }
    },
    filterSpace2Enter (html) {
      const str = JSON.stringify(html)
        .replace(/\\n/g, val => '')
        .replace(/\s*(?=<)/g, val => '')
      return JSON.parse(str)
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
        if (row.code === item.code) {
          item.selected = !item.selected
        }
      })
    },
    async getGroupList () {
      const params = Object.assign(this.pageInfo, {element_group_status: 'OPENED'})
      const res = await elementGroup.find(params)
      console.log('组合回参', res)
      const { code, result } = res
      if (code === 200) {
        this.groupList = result.data.filter(item => item.data_type === 'List').map(item => {
          return {
            selected: false,
            element_group_name: item.element_group_name,
            element_group_id: item.element_group_id,
            element_group_key: item.element_group_key
          }
        })
        console.log(this.groupList, '---grouplist')
      }
    }
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
