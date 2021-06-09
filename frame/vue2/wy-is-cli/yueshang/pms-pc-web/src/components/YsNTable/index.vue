<script>
import isFunction from 'lodash/isFunction'
import { copyTxt, formatNumber } from 'utils/utils'
export default {
  name: 'YsNTable',

  model: {
    prop: 'data',
    event: 'change'
  },

  props: {
    config: { // table的表格配置
      type: Array,
      required: true
    },

    data: { // table的数据
      type: Array,
      required: true
    },

    editable: { // 是否可编辑
      type: Boolean,
      default: true
    },

    disable: { // 是否禁止
      type: Boolean,
      default: false
    },

    height: { // table表格的高度
      type: Number
    },

    maxHeight: Number, // table最大高度

    hasPagination: { // 是否有分页，暂时全部真分页
      type: Boolean,
      default: false
    },

    queryParams: { // 搜索的参数, 需要附加给table的额外参数
      type: Object,
      default: () => ({})
    },

    queryApi: { // 如果分页的话，一定要传，仅展示，可以直接给数据
      type: Function
    },

    update: { // 更新数据
      type: Number
    },

    initialize: { // 初始化，重新加载
      type: Number
    },

    originData: { // 接口获取到的原始数据
      type: Object
    },

    responseKey: {
      type: String,
      default: ''
    },

    mouseMove: { // 是否使用鼠标左右滑动，实现table滑动
      type: Boolean,
      default: false
    },

    totals: [Number, String], // 传递过来的总数
  },

  data() {
    return {
      loading: false,

      currentData: JSON.parse(JSON.stringify(this.data)),

      pageSizes: [10, 25, 30, 50],
      currentPageSize: 300,
      currentPage: 1,
      pageLayout: 'total, prev, pager, next, jumper',
      pageTotal: 0,

      // 滑动table
      className: '',
      headerClassName: '',
      moveDom: null,
      startX: 0,
      endX: 0,
      distance: 0,

      // customFormatterArr: ['number', 'area', 'money', 'ten-thousand', 'rate'], // 默认自动处理的数据格式，自动增加formatter
    }
  },

  created() {
    this.id = new Date().getTime();
    // table-area+this.id el-table__body-wrapper
    this.className = `.table-area${this.id} .el-table__body-wrapper`;
    this.headerClassName = `.table-area${this.id} .el-table__body-wrapper`;
    this.getTableData();
  },

  mounted() {
    if(this.mouseMove) {
      this.moveDom = document.querySelector(this.className);
      this.moveHeaderDom = document.querySelector(this.headerClassName);
      this.moveDom.addEventListener('mousedown', this.handleMousedown);
      this.moveDom.style.cursor = 'pointer';
      this.moveDom.style.userSelect = 'none';
    }
    
  },

  beforeDestroy() {
    if(this.mouseMove) {
      this.moveDom && this.moveDom.removeEventListener('mousedown', this.handleMousedown);
    }
  },

  methods: {
    handleTableChange(key, eventType, value, row) {
      this.$emit('change', JSON.parse(JSON.stringify(this.currentData)))
      this.$emit('table-change', key, eventType, value, row)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPageSize = val;
      this.getTableData();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;

      if (this.queryApi) {
        this.getTableData();
      } else {
        this.$emit('table-page-change', val)
      }
    },

    getTableData() {
      if (!this.queryApi) return
      let params = {};
      params.pageNum = this.currentPage;
      params.pageSize = this.currentPageSize;
      Object.assign(params, this.queryParams);

      this.loading = true;
      this.queryApi(params).then(res => {
        const resData = this.responseKey ? res[this.responseKey] : res;
        if (this.currentPage > resData.totalPage && this.currentPage > 1) {
          this.currentPage = resData.totalPage
          this.getTableData()
        } else {
          const startIndex = (this.currentPage - 1) * this.currentPageSize + 1;
          this.currentData = resData.list.map((item, index) => {
            return Object.assign(item, { sortIndex: startIndex + index })
          });
          this.pageTotal = resData.total;
          this.$emit('change', this.currentData)
          this.$emit('update:originData', res)
          this.$emit('asyncDone', res); // 数据更新结束
        }
      }).finally((error)=>{
        this.loading = false;
        this.$emit('asyncFinish', error)
      })
    },

    // table 左右滑动
    handleMousedown(e) {
      this.startX = e.clientX;
      this.moveDom.addEventListener('mousemove', this.handleMousemove);
      document.querySelector('html').addEventListener('mouseup', this.handleMouseup);
    },

    handleMousemove(e) {
      this.endX = e.clientX;
      const currnetLeft = this.moveDom.scrollLeft;
      const dis = this.endX - this.startX;

      this.moveDom.scrollLeft = currnetLeft - dis;
      this.moveHeaderDom.scrollLeft = currnetLeft - dis;

      this.startX = this.endX;
    },

    handleMouseup() {
      this.moveDom && this.moveDom.removeEventListener('mousemove', this.handleMousemove);
      document.querySelector('html') && document.querySelector('html').removeEventListener('mouseup', this.handleMouseup);
    },

    handleCellDblclick(row, column) {
      const columnKey = column.property;
      const value = row[columnKey];
      copyTxt.call(this, value)
    },

    handleRowStyle({row}) {
      return row.isSummary ? { 'font-weight': 'bolder', 'color': '#333' } : {}
    },

    formatterValue(v, type) {
      if (v === null || v === undefined) return '-'
      let value = v
      if (value !== '') {
        if (type === 'money') {
          value = formatNumber(value)
        } else if (type === 'ten-thousand') {
          value = formatNumber(value, 'ten-thousand')
        } else if (type === 'number' || type === 'area') {
          value = formatNumber(value)
        } else if (type === 'rate') {
          value = formatNumber(value, 'rate')
        } else if (type === 'date-d') {
          // value = value
        }
      }


      return value
    },
  },

  watch: {
    update() {
      this.getTableData()
    },

    initialize() {
      this.currentPage = 1
      this.getTableData()
    },

    'data': {
      deep: true,
      handler() {
        this.currentData = JSON.parse(JSON.stringify(this.data));
      }
    },

    totals: {
      handler(val) {
        this.pageTotal = val
      }
    }
  },

  render(h) {
    const renderItem = (scope, data) => {
      // eslint-disable-next-line
      const { key, label, type, width, props = {}, render, ...prop } = data
      const canEdit = this.editable === false ? this.editable : (props.editable ? (isFunction(props.editable) ? props.editable(scope) : props.editable) : true)
      // const isShow = props.show ? (isFunction(props.show) ? props.show(scope) : props.show) : true // 暂时业务没有用，留着
      const isDisable =  this.disable || (props.disable ? (isFunction(props.disable) ? props.disable(scope) : props.disable) : false)
      const showPlaceholder = props.placeholder ? (isFunction(props.placeholder) ? props.placeholder(scope) : props.placeholder) : '请输入';

      let ItemTemplate = ''
      if (canEdit && !scope.row.isSummary) {
        switch (type) {
          case 'input':
            ItemTemplate = <el-input
              v-model={scope.row[key]}
              placeholder={showPlaceholder}
              size="mini" rows={props.rows}
              autosize={props.autosize}
              {...{props}} disabled={isDisable}
              onInput={() => this.handleTableChange(key, 'input', scope.row[key], scope.row)}
              onBlur={() => this.handleTableChange(key, 'blur', scope.row[key], scope.row)}></el-input>
            break;
          case 'link':
            {
              let value = scope.row[key]
              // 单独处理
              value = props.formatter ? props.formatter(value) : value;
              ItemTemplate = <el-link type="primary" {...{props: props}} disabled={isDisable} onClick={() => props.click(scope)}>
                {value}
              </el-link>
            }
            break;
          case 'select':
            {
              const Options = typeof props.options === 'function' ? props.options() : props.options;
              ItemTemplate = <el-select v-model={scope.row[key]} disabled={isDisable} placeholder={props.placeholder || '请输入'} size="mini" {...{props}} onChange={() => this.handleTableChange(key, 'change', scope.row[key], scope.row)}>
                {
                  Options.map((item, index) => {
                    return <el-option
                      key={index}
                      label={item.label}
                      value={item.value}>
                    </el-option>
                  })
                }
              </el-select>
            }
            break;
          case 'custom':
            ItemTemplate = render(h, scope)
            break;
          default:
            {
              let value = scope.row[key]
              // 单独处理
              value = this.formatterValue(value, type);
              ItemTemplate = <span {...{props}} {...{style: props.style}}>{value}</span>
            }
            break;
        }
      } else {
        let value = scope.row[key]
        if (type === 'select' && props.options.find(item => item.value === scope.row[key])) {
          value = props.options.find(item => item.value === scope.row[key]).label
        }
        // 单独处理
        value = this.formatterValue(value, type);

        ItemTemplate = <span {...{props}} {...{style: props.style}}>{value}</span>
      }
      return ItemTemplate
    }

    const renderChildren = (data) => {
      // eslint-disable-next-line
      const { key, label, type, width, props, children, ...prop } = data;

      // 默认显示规则 面积/金额/百分比 靠右显示， 其他的则靠左显示
      const displayRegArr = ['area', 'money', 'rate', 'ten-thousand']

      let PROPS = {}
      // PROPS.type = type;
      PROPS.prop = key;
      PROPS.width = width;
      PROPS.label = label;
      // PROPS['header-align'] = prop.headerAlign || 'left';
      PROPS['show-overflow-tooltip'] = prop['show-overflow-tooltip'] === false ? false : true

      if (!prop.align && displayRegArr.includes(type)) {
        // PROPS['header-align'] = 'right'
        PROPS.align = 'right'
      }

      let ScopeS = {}

      if (type === 'selection' || type === 'index' || type === 'expand') {
        PROPS.align = props.align || 'center'
        PROPS.type = type;
      } else if (!type) {
        Object.assign(PROPS, prop)
      } else {
        Object.assign(PROPS, prop)
        ScopeS = {
          scopedSlots: {
            default: (scope) => {
              return renderItem(scope, data)
            }
          }
        }

        if (prop.renderHeader) {
          ScopeS.scopedSlots.header = (scope) => {
            return prop.renderHeader(h, scope)
          }
        }
      }

      for (let [key, value] of Object.entries(PROPS)) {
        (value == undefined) && delete PROPS[key]
      }

      return <el-table-column
        {...{props: PROPS}}
        {...ScopeS}>
        { children && children.length ? children.map(item => renderChildren(item)) : '' }
      </el-table-column>
    }

    const tableHeightH = this.height ? (this.height - (this.hasPagination ? 60 : 0) + 'px') : '0';
    const tableHeightMH = this.maxHeight ? (this.maxHeight - (this.hasPagination ? 60 : 0) + 'px') : '0';

    const tableHeight = tableHeightMH > tableHeightH ? tableHeightMH : tableHeightH
    // style={{ 'max-height': tableHeight }}
    return(<div class={['p-table-area', 'table-area' + this.id]} v-loading={this.loading}>
      <section class="table-area">
        <el-table
          // height="100%"
          stripe
          rowStyle={this.handleRowStyle}
          {...{props: this.$attrs}}
          {...{on: this.$listeners}}
          maxHeight={tableHeight}
          data={this.currentData}
          on={{ ['cell-dblclick']: this.handleCellDblclick }}
        >
          {
            this.config.map((item) => {
              return renderChildren(item)
            })
          }
        </el-table>
      </section>

      {
        this.hasPagination && <section class="page-area">
          <el-pagination
            // onSizeChange={this.handleSizeChange}
            // onCurrentChange={this.handleCurrentChange}
            background
            currentPage={this.currentPage}
            pageSizes={this.pageSizes}
            pageSize={this.currentPageSize}
            on={{['update:currentPage']: this.handleCurrentChange}}
            on={{['update:pageSize']: this.handleSizeChange}}
            layout={this.pageLayout}
            total={this.pageTotal}>
          </el-pagination>
        </section>
      }
    </div>)
  }
}
</script>

<style lang="scss" scoped>
.p-table-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  .table-area {
    flex: 1;
  }

  .page-area {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
  }
}

</style>
