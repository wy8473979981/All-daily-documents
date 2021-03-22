import * as helper from '../../utils/util';
const timers = {};

Component({

  properties: {

    columns: { // label, key, sortable, width, bgColor, color, bold
      type: Array,
      value: []
    },

    fixednum: {
      type: Number,
      value: 0,
    },

    values: {
      type: Array,
      value: [],
      observer(newValue) {
        this.setData({
          'component.rows': this.buildRows(newValue)
        });
      }
    },

    totalRow: {
      type: Object,
      observer(newValue) {
        if (newValue) {
          this.setData({
            'component.totalRow': this.buildRows([newValue])[0]
          });
        }
      }
    },

    emptyText: {
      type: String,
      value: '暂无数据'
    },

    defaultValue: {
      type: String,
    }

  },

  observers: {
    ['fixednum,columns,defaultValue,values,totalRow']() {
      const { fixednum, columns, defaultValue, values, totalRow } = this.data
      if (timers['observers']) {
        clearTimeout(timers['observers']);
      }
      const setdata = {};
      let setColumns = [];
      if (columns.length) {
        setColumns = columns.map(({ width, ...column }) => {
          const $styles = [];
          const item = { ...column }
          const itemWidth = width ? parseInt(width.toString().replace('rpx', '')) : null;
          if (itemWidth) {
            item.width = itemWidth;
            $styles.push(`min-width:${itemWidth}rpx`);
            $styles.push(`max-width:${itemWidth}rpx`);
          } else if (column.fixed) {
            item.width = item.width || 120;
            $styles.push('min-width:120rpx');
            $styles.push('max-width:120rpx');
          }
          return {
            width: width ? parseInt(width.toString().replace('rpx', '')) : 120,
            ...column,
            $styles
          }
        })
      }
      if (setColumns.length) {
        if (fixednum) {
          let nextLeft = 0;
          const fixedList = setColumns.reduce((result, column) => {
            result.push(nextLeft);
            nextLeft += column.width;
            return result;
          }, []);
          setdata['component.fixedList'] = fixedList;

          const groups = [];
          let groupItems = [];
          let groupName = '';
          setColumns = setColumns.map(({ $styles, ...column }, columni) => {
            if (groupName !== (column.group || '') && groupItems.length) {
              groups.push({ label: groupName, items: groupItems });
              groupItems = [];
            }
            groupName = column.group || '';
            groupItems.push(column);
            if (columni < this.data.fixednum) {
              $styles.push(`left:${fixedList[columni]}rpx`);
            }
            return { ...column, groupName, groupIndex: groupItems.length - 1, $styles };
          });
          groups.push({ label: groupName, items: groupItems });
          setdata['component.groups'] = groups;
        }
        setdata['component.columns'] = setColumns.map(({ $styles, ...column }) => ({ ...column, $styles: ($styles || ['']).join(';') }));
      }
      if (totalRow) {
        setdata['component.totalRow'] = this.buildRows([totalRow], setColumns)[0];
      }
      if (values.length) {
        setdata['component.rows'] = this.buildRows(values, setColumns);
      }

      timers['observers'] = setTimeout(() => {
        this.setData(setdata);
      }, 100);

    }
  },


  data: {

    component: {
      sorted: {
        key: null,
        direction: null
      },
      fixedList: [],
      groups: [],
      columns: [],
      rows: []
    }

  },

  methods: {
    buildRows(rows = [], columns) {
      return rows.map(row => {
        const result = {
          ...row
        };
        (columns || this.data.component.columns).map(column => {
          const { key, defaultValue, numberFormat, numberPrecision, unit } = column;
          result[key] = row[key];
          if ([null, undefined, ''].includes(result[key])) {
            result[key] = defaultValue || '-';
          } else {
            if (numberFormat) {
              result[key] = helper.numberFormat(result[key], { precision: numberPrecision, unit });
            }
            if (unit) {
              const unitRegex = new RegExp(unit, 'ig');
              result[key] = `${result[key].toString().replace(unitRegex, '')}${unit}`;
            }
          }
        });
        return result;
      });
    },
    onHeadColumnClick(e) {
      const { column: { key, sortable } } = e.currentTarget.dataset;
      const { sorted, rows } = this.data.component;
      if (sortable) {
        if (sorted.key !== key) {
          sorted.key = key;
          sorted.direction = 'up';
        } else {
          switch (sorted.direction) {
            case 'up':
              sorted.direction = 'down';
              break;
            case 'down':
              sorted.direction = null;
              break;
            default:
              sorted.direction = 'up';
              break;
          }
        }

        const sortedRows = sorted.direction ? [...rows].sort((r1, r2) => {
          const r1Value = parseFloat((r1[key] || 0).toString().replace(/^[-|,]+$/, '0'));
          const r2Value = parseFloat((r2[key] || 0).toString().replace(/^[-|,]+$/, '0'));
          return sorted.direction === 'up' ? r1Value - r2Value : r2Value - r1Value;
        }) : this.buildRows(this.data.values);

        const setdata = {
          'component.sorted': sorted,
          'component.rows': sortedRows
        };

        const firstColumn = this.data.columns[0];
        if (!firstColumn.key) {
          if (sorted.direction) {
            setdata['component.columns[0].label'] = '排序';
          } else {
            setdata['component.columns[0].label'] = firstColumn.label;
          }
        }

        this.setData(setdata);
      }
      this.triggerEvent('head-click', e.currentTarget.dataset);
    },
    onRowColumnClick(e) {
      const { index, row } = e.currentTarget.dataset;
      this.triggerEvent('row-column-click', e.currentTarget.dataset);
      this.triggerEvent('row-click', { index, row });
    }
  },

  lifetimes: {
    attached: function () {

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }

});
