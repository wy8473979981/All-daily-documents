<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: ysn-表格组件
-->
<template>
  <div class="ysn-table" :class="[isDisTable?'disTable':'',full?'max-area':'',isDisTable&&$attrs['show-header']===false?'noHader':'',$attrs['span-method']?'spanMethod':'']" @mouseup="mouseup">
    {{ $attrs['hidden-span-method'] }}
    <el-table
      :id="`ysnTable${tableId}`"
      :key="tableKey"
      ref="ysnTable"
      v-bind="$attrs"
      :data="dataList"
      :style="'width: 100%'"
      :height="full?'100%':(height||null)"
      :row-class-name="tableRowClassName"
      :sort-method="sortMethod"
      :tree-props="treeProps"
      :row-key="$attrs.rowKey || $attrs['row-key'] || ''"
      v-on="listenersStatus?$listeners:''"
      @select="$comSelect"
      @select-all="$comSelect"
      @current-change="$comRowChange"
    >
      <template slot="empty" class="flex-ju-al-center">
        暂无数据
      </template>
      <!-- checkbox -->
      <el-table-column v-if="checkbox&&!isDisTable" type="selection" width="60" v-bind="{ ...selectionProps }" :selectable="selectable" align="center" class-name="noTips table-checkbox" />

      <!-- 单选行样式 -->
      <el-table-column v-if="$attrs.highLightCurrentRow&&!isDisTable" width="60" align="center" class-name="noTips table-checkbox">
        <template slot-scope="scope">
          <el-radio v-model="currentRow[selectKey]" :label="scope.row[selectKey]" class="noLabel" @click.native.stop />
        </template>
      </el-table-column>

      <!-- 序号列 -->
      <el-table-column v-if="indexConfig.type==='index'" type="index" :width="indexConfig.fixedWidth||70" :label="indexConfig[Object.keys(indexConfig)[0]] " />

      <!-- 树级样式 -->
      <el-table-column v-if="$attrs.hasChildren" width="50" class-name="hasChildren" />

      <!-- 是否显示expand -->
      <el-table-column v-if="showExpand" type="expand">
        <template #default="scope">
          <slot v-bind="scope" name="expand" />
        </template>
      </el-table-column>

      <!-- 组件需求： 多选框列和内容列第一列固定 -->
      <YsnTableColumn
        v-for="(item, index) in currentConfig"
        :key="'ytable' + index"
        v-bind="{ ...item }"
        :data-type="item.dataType"
        :item="item"
        :fixed="showFixed"
        :prop="`${Object.keys(item)[0]}`"
        :label="item[Object.keys(item)[0]]"
        :width="( item.width||setWidth(item) || '')"
        :formatter="item.formatter || formatter"
        show-overflow-tooltip
        :show-slots="showSlots"
        :label-class-name="(item.labelClass||'') + (item.required?' required':'')"
        :class-name="item.columnClass"
        :align="item.align || align(item)"
        :slots-list="item.slots"
      >

        <!-- 表头收起 -->
        <template v-if="item.hasClose" #header="scope">
          <span>
            {{ item[Object.keys(item)[0]] }}
            <i
              :class="['table-header-icon', !item.isClose?'':'table-header-icon-close']"
              @click="(event)=>{handleHeaderClose(scope,event)}"
            />
          </span>
        </template>

        <!-- 表头插槽传递 -->
        <template v-else-if="item.hasSlotHeader" #header="scope">
          <slot v-bind="scope" :name="item.slotsItem" />
        </template>

        <!-- 二级插槽传递 -->
        <template v-for="slotsItem in showSlots" :slot="slotsItem" slot-scope="scope">
          <slot v-bind="scope" :name="slotsItem" />
        </template>

      </YsnTableColumn>
      <!-- 组件需求： 操作列固定 -->
      <el-table-column v-if="showOperation" :fixed="showFixed ? 'right' : false" :label="operationLabel" :width="operationWidth">
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import tableMixins from './tableMixins'
import YsnTableColumn from './column'
export default {
  name: 'YsnTable',
  components: { YsnTableColumn },
  mixins: [tableMixins],
  props: {
    // 表单数据
    data: {
      type: Array,
      default: () => []
    },
    // 表单列内容
    column: {
      type: Array,
      default: () => []
    },
    // 是否具备展开列
    showExpand: {
      type: Boolean,
      default: false
    },
    // 是否固定首行
    showFixed: {
      type: Boolean,
      default: false
    },
    // 是否展示checkbox
    checkbox: {
      type: Boolean,
      default: true
    },
    // selection操作列添加自定义属性
    selectionProps: {
      type: Object,
      default: () => {}
    },
    selectable: {
      type: Function,
      default: function(row) {
        return true
      }
    },
    // 设置操作项宽度
    operationWidth: {
      type: String,
      default: 'auto'
    },
    // 是否显示操作
    showOperation: {
      type: Boolean,
      default: false
    },
    // 插槽数组
    showSlots: {
      type: Array,
      default: () => []
    },
    // 高亮用选中的id-key 默认id
    selectKey: {
      type: String,
      default: 'id'
    },
    // 是否二维表格
    isDisTable: {
      type: Boolean,
      default: false
    },
    // 是否撑满
    full: {
      type: Boolean,
      default: false
    },
    // 高度
    height: {
      type: [String, Number],
      default: ''
    },
    // 合计行跨列
    summaryCol: {
      type: Number,
      default: 1
    },
    // 操作列文字
    operationLabel: {
      type: String,
      default: '操作'
    },
    // 树数据配置
    treeProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectRow: [], // 选中行
      indexList: [], // 需要高亮的行
      // tableId
      tableId: new Date().getTime(),
      currentConfig: this.column.concat(),
      isUpdateTable: true,
      currentRow: {}, // 单选情况下选中的行
      tableKey: 0, // table key
      indexConfig: {}, // index配置
      listenersStatus: true // 是否绑定事件
    }
  },
  computed: {
    // 列表变化后重置select
    dataList(data) {
      this.indexList = []
      return this.data
    }
  },

  watch: {
    column: {
      deep: true,
      immediate: true,
      handler() {
        const currentConfig = this.column.concat()
        if (currentConfig.length <= 2 && currentConfig.length !== 0) {
          if (currentConfig[currentConfig.length - 1].type === 'index') {
            currentConfig[currentConfig.length - 1].indexWidth = '100'
          }
          currentConfig[currentConfig.length - 1].width = 'auto'
        }

        // 序号处理 特殊需求:children必须放在序号后面
        let indexConfig = {}
        if (currentConfig[0].type === 'index') {
          indexConfig = currentConfig[0]
          currentConfig.splice(0, 1)
        }

        this.indexConfig = indexConfig
        this.currentConfig = this.initCurrentConfig(currentConfig)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setSummaryColSpan()
    })
  },
  methods: {
    // 合计行
    // getSummaries(e) {
    //   console.log(e)
    //   this.$emit('getSummaries', e)
    // },
    // 初始化config, 如果数据包含type 排序会失效 所以把type改成dataType
    initCurrentConfig(list) {
      const newList = list.map(item => {
        const newItem = { ...item }
        if (newItem.type && newItem.type !== 'index') {
          newItem.dataType = newItem.type
          newItem.type = null
        }
        if (newItem.tableList && newItem.tableList.length > 0) {
          newItem.tableList = this.initCurrentConfig(newItem.tableList)
        }
        return newItem
      })
      return newList
    },
    // 排序
    sortMethod(a, b) {
      return a.localeCompare(b) > 0
    },
    $comRowChange(currentRow, oldCurrentRow) {
      this.currentRow = currentRow
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    // 设置合计行跨几列
    setSummaryColSpan() {
      if (!(this.$attrs['show-summary'] === '' || this.$attrs['show-summary'] === true)) {
        return
      }
      const el = this.$el.querySelector(`#ysnTable${this.tableId}`)

      if (el) {
        const current = el
          .querySelector('.el-table__footer-wrapper')
          .querySelector('.el-table__footer')
        const cell = current.rows[0].cells
        const { summaryCol } = this
        if (cell.length === 0) {
          return
        }
        cell[0].colSpan = summaryCol
        for (let i = 1; i < summaryCol; i++) {
          cell[i].style.display = 'none'
        }
      }
    },
    // 判断row是否选中 返回高亮class
    tableRowClassName({ row, rowIndex }) {
      if (this.indexList.includes(rowIndex)) {
        return 'line-height'
      }
      return ''
    },
    // 将选中的状态值抛出去接收
    $comSelect(selectData, row) {
      if (!this.checkbox) {
        return false
      }
      this.selectData = selectData
      this.$emit('onSelect', selectData)
      // 如果外部传入id的key 则高亮选中行
      if (this.selectKey) {
        const { data, selectKey } = this
        const idList = selectData.map(item => item[selectKey])
        const indexList = []
        idList.map(item => {
          for (let i = 0; i < data.length; i++) {
            if (data[i][selectKey] === item) {
              indexList.push(i)
              break
            }
          }
        })
        this.indexList = indexList
      }
    },
    isShowSlots(val) {
      return this.showSlots.includes(val)
    },
    // 表头收缩点击 需求:只有二级表头下一级可以收缩
    handleHeaderClose(scope, event) {
      let index = scope.$index
      // checkbox情况下 index-1
      if (this.checkbox) {
        index = index - 1
      }

      const { currentConfig } = this
      const newConfig = JSON.parse(JSON.stringify(currentConfig))
      const isClose = newConfig[index].isClose
      newConfig[index].isClose = !isClose

      // // 修改class
      if (!isClose) {
        newConfig[index].tableList.splice(2, newConfig[index].tableList.length)
      } else {
        newConfig[index].tableList = [...this.column[index].tableList]
      }
      this.currentConfig = []
      this.$nextTick(() => {
        this.currentConfig = newConfig
        this.tableKey++
      })
      // event.toElement.className = className
    },
    mouseup() {
      const txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
      this.listenersStatus = txt.isCollapsed
      console.log(txt.isCollapsed, this.$listeners)
    }

  }
}
</script>

<style lang="scss" scoped>
.noLabel ::v-deep.el-radio__label{
    display:none
}
</style>
