<script>
import isFunction from 'lodash/isFunction'
export default {
  name: 'PTable',

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
    }
  },

  data() {
    return {
      loading: false,

      currentData: JSON.parse(JSON.stringify(this.data)),

      pageSizes: [10, 25, 30, 50],
      currentPageSize: 10,
      currentPage: 1,
      pageLayout: 'total, sizes, prev, pager, next, jumper',
      pageTotal: 0
    }
  },

  created() {
    this.getTableData()
  },

  mounted() {
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

      this.getTableData();
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
        this.$emit('asyncFinish')
      })
    }
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
    }
  },

  render(h) {
    const renderItem = (scope, data) => {
      const { key, label, type, width, props = {}, render, ...prop } = data
      const canEdit = this.editable === false ? this.editable : (props.editable ? (isFunction(props.editable) ? props.editable(scope) : props.editable) : true)
      const isShow = props.show ? (isFunction(props.show) ? props.show(scope) : props.show) : true // 暂时业务没有用，留着
      const isDisable =  this.disable || (props.disable ? (isFunction(props.disable) ? props.disable(scope) : props.disable) : false)
      const showPlaceholder = props.placeholder ? (isFunction(props.placeholder) ? props.placeholder(scope) : props.placeholder) : '请输入';

      let ItemTemplate = ''
      if (canEdit) {
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
            ItemTemplate = <el-link {...{props: props}} disabled={isDisable} onClick={() => props.click(scope)}>
              {scope.row[key]}
            </el-link>
            break;
          case 'select':
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
            break;
          case 'custom':
            ItemTemplate = render(h, scope)
            break;
          default:
            ItemTemplate = <span>{scope.row[key]}</span>
            break;
        }
      } else {
        let value = scope.row[key]
        if (type === 'select' && props.options.find(item => item.value === scope.row[key])) {
          value = props.options.find(item => item.value === scope.row[key]).label
          console.log('value', value)
        }
        ItemTemplate = <span>{value}</span>
      }
      return ItemTemplate
    }

    const renderChildren = (data) => {
      const { key, label, type, width, props, children, ...prop } = data

      let PROPS = {}
      PROPS.type = type;
      PROPS.prop = key;
      PROPS.width = width;
      PROPS.label = label;
      PROPS.headerAlign = prop.headerAlign || 'center';

      let ScopeS = {}

      if (type === 'selection' || type === 'index') {
        PROPS.align = 'center'
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

    const tableHeight = this.height ? (this.height - (this.hasPagination ? 60 : 0) + 'px') : '0';

    return(<div class="p-table-area" v-loading={this.loading}>
      <section class="table-area" style={{ 'height': tableHeight }}>
        <el-table
          height="100%"
          {...{props: this.$attrs}}
          {...{on: this.$listeners}}
          data={this.currentData}>
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
/deep/.el-table td {
  padding: 4px 0;
}

/deep/.el-table th {
  padding: 8px 0;
}
</style>
