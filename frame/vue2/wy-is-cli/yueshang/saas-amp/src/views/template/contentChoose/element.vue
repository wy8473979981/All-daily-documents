<template>
  <section class="element-list list">
    <el-tabs v-model="elementParams.element_cate_id" type="card" @tab-click='tabClick'>
      <el-tab-pane v-for="(item, index) in cateList" :key="index" :label="item.label" :name="item.name">
        <el-table
          size='mini'
          :data="elementList"
          height="350"
          @row-click="handleRowClick">
          <el-table-column label="元素名" prop="element_name"></el-table-column>
          <el-table-column label="元素key" prop="element_key"></el-table-column>
          <el-table-column label="选中状态" v-if="isHtmlComp">
            <template slot-scope="scope">
              <i v-show="scope.row.selected" class="el-icon-check" style="color: #67c23a; font-weight: bold;"></i>
            </template>
          </el-table-column>
        </el-table>
        <ys-paginator
          :pageInfo="pageInfo"
          @handlePaginator="handlePaginator"
          style="margin-top: 5px;"
        />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { templateDataName } from './config'
import elementCate from '@apis/elementCate'
import element from '@apis/element'
import {handlePaginator} from '@mixins'
export default {
  mixins: [handlePaginator],
  props: {
    outerStep: {
      type: Number // 總的步驟
    },
    isHtmlComp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageInfo: {
        page: 1,
        page_size: 10,
        sum_num: 0
      },
      // 元素列表的入参
      elementParams: {
        element_cate_id: '',
        element_status: 'OPENED'
      },
      step: 0, // 子組件的步驟
      insertInfo: {code: '', cn: ''},
      rowClassName: 'info',
      cateList: [
        // {label: '公司', name: 'company'},
        // {label: '自然人', name: 'people'}
      ],
      activeName: '',
      elementList: [
        // {code: '{{company.name0}}', label: '公司名字0', descr: '我是公司的名字', selected: false},
      ]
    }
  },
  methods: {
    tabClick () {
      this.getList()
    },
    closeModal () {
      this.$emit("toggleModal")
      this.$emit('goOuterStep', 0)
    },
    goStep (val) {
      console.log(val, 'elem step')
      if (this.elementList.filter(item => item.selected).length === 0) {
        this.$message.error('请选择要插入的元素')
        return
      }
      this.$emit('changeStep', val)
    },
    rowClassFn ({row, rowIndex}) {
      console.log(row.selected, '--选中状态')
      // return row.selected ? 'active': ''
      return 'active'
    },
    handleRowClick (row) {
      this.insertInfo = {
        code: `{{${templateDataName}.${row.element_key}}}`
      }
      // console.log(this.elementList[0].element_key, row.element_key, '---elementList--')
      if (this.isHtmlComp) {
        this.$emit('getElementCode', row.element_key)
        this.elementList.forEach(item => {
          // console.log(item.element_key, row.element_key, '-------------foreach--------------')
          item.selected = false
          if (item.element_key === row.element_key) {
            item.selected = !item.selected
          }
        })
        console.log(this.elementList, '----ele list')
        return
      }
      this.$emit('getContent', {...this.insertInfo, type: '元素'})
      this.$emit('toggleModal')
    },
    async getCateList () {
      /**
       *  admin_truename: "张三丰"
          element_cate_id: "27"
          element_cate_key: "z_key"
          element_cate_name: "z_名称"
          element_cate_status: "OPENED"
       */
      const res = await elementCate.findOpened()
      const {code, result} = res
      console.log(result, '---分类reuslt')
      if (code === 200) {
        this.cateList = result.map(item => {
          return {
            label: item.element_cate_name, name: item.element_cate_id, key: item.element_cate_key
          }
        })
        this.elementParams.element_cate_id = result.length > 0 ? result[0].element_cate_id : ''
        this.getList()
      }
    },
    // async getElementListByCateId () {
    async getList () {
      // console.log(this.elementParams.element_cate_id, 'id2')
      // const res = await element.findElementsByCateId(this.elementParams)
      const res = await element.find(Object.assign(this.elementParams, this.pageInfo))
      console.log(res, '---元素列表2222222222222')

      const {code, result} = res

      if (code === 200) {
        this.elementList = result.data.map(item => {
          return {
            element_key: item.element_key,
            element_id: item.elemen_id,
            element_name: item.element_name,
            selected: false
          }
        })
        this.pageInfo.sum_num = result.sum_num
      }
    }
  },
  mounted () {
    // console.log('elemnet mounted')
    // this.getCateList()
  }
}
</script>

<style lang='scss' scoped>
.el-table .active {
  background: #c9e5f5 !important;
}
</style>
