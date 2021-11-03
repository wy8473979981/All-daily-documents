<template>
  <div class="app-table">

    <div class="app-table-header">
      <div class="app-table-header__items">
        <div v-for="(column, columni) in component.columns" :key="columni" :class="'app-table-header__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' ' + ( column.groupName ? 'in-group' : '' ) + ' span-' + column.align + ' ' + ( column.sortable ? 'sortable ' : '' ) + (column.groupName?'hasGroupNameHeight ':'noGroupNameHeight ') + (column.groupIndex==0&&column.groupName ? 'app-table-header__item_column_line ' :'')" @click="onHeadColumnClick" :data-column="JSON.stringify(column)" :style="column.$styles">

          <div :class="'app-table-header__item__group ' + (column.groupName?'groupNameMargin':'')" :style="column.$styleHead" v-if="column.groupName">
            <div class="app-table-header__item__group-name">
              <div class="app-table-header__item__group-name-only">{{ column.groupIndex === 0 ? column.groupName : '' }}</div>
            </div>
          </div>

          <div :class="(column.groupName?'app-table-header__item__group_hr ':'') "></div>

          <div :class="'no-group '">
            <div :class="'app-table-header__item__column-name ' + (!column.sortable?'app-table-header__item__column-name__padding':'')">
              <span style="vertical-align: middle;">{{ column.label }}</span>
              <img v-if="column.sortable && component.sorted.key === column.key && component.sorted.direction === 'up'" class="app-table-header__item__column_icon" src="../../assets/images/icon-sortup.png" :style="column.groupName ? 'top:70%':''" />

              <img v-else-if="column.sortable && component.sorted.key === column.key && component.sorted.direction === 'down'" class="app-table-header__item__column_icon" src="../../assets/images/icon-sortdown.png" :style="column.groupName ? 'top:70%':''" />

              <img v-else-if="column.sortable" class="app-table-header__item__column_icon" :style="column.groupName ? 'top:70%':''" src="../../assets/images/icon-sortable.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-table-rows">
      <div class="app-table-rows__empty" v-if="component.rows.length === 0">
        {{ emptyText }}
      </div>
      <template v-else>
        <div class="app-table-row app-table-row--total" v-if="component.totalRow">
          <div v-for="(column, columni) in component.columns" :key="columni" :class="'app-table-row__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' span-' + column.align + ' ' + ( column.sortable ? 'sortable ' : '' ) + (column.groupIndex==0&&column.groupName ? 'app-table-header__item_line ' :'')" :style="column.$styles + ';'">

            <span :style="column.key && component.totalRow[column.key].toString().indexOf('-') === 0 && component.totalRow[column.key] != '-'? 'color:#FF4954':''" :class="column.tdStyle ? 'tdStyle':''">{{ column.key ? component.totalRow[column.key] : '' }}</span>
            <img class src="../../assets/images/penoncel_hong.png" v-if="column.slot==='penoncel' && parseInt(component.totalRow[column.key]) < 85" />
            <img class src="../../assets/images/penoncel_lv.png" v-if="column.slot==='penoncel' && parseInt(component.totalRow[column.key]) > 95" />
            <img class src="../../assets/images/penoncel_huang.png" v-if="column.slot==='penoncel' && parseInt(component.totalRow[column.key]) <= 95 && parseInt(component.totalRow[column.key])>=85" />
          </div>
        </div>
        <div v-for="(row, rowi) in component.rows" :key="rowi" class="app-table-row">
          <div v-for="(column, columni) in component.columns" :key="columni" @click="onRowColumnClick(rowi,row,column)" :data-index="rowi" :data-row="row" :data-column="column" :style="column.$styles + ';color: ' + column.color + ';'" :class="'app-table-row__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' span-' + (column.align || 'center') + ' ' + ( column.sortable ? 'sortable' : '' ) + ' ' + ( row['$selected']?(row['$selected'][column.key] ? 'selected ' : '' ): '')  + (column.groupIndex==0&&column.groupName ? 'app-table-header__item_line ' :'')">

            <span :style="column.key && row[column.key].toString().indexOf('-') === 0 && row[column.key] != '-'? 'color:#FF4954':''" :class="column.tdStyle? 'tdStyle':''">{{ column.key ? row[column.key] : rowi + 1 }}</span>
            <img class src="../../assets/images/penoncel_hong.png" v-if="column.slot==='penoncel' && parseInt(row[column.key]) < 85" />
            <img class src="../../assets/images/penoncel_lv.png" v-if="column.slot==='penoncel' && parseInt(row[column.key]) > 95" />
            <img class src="../../assets/images/penoncel_huang.png" v-if="column.slot==='penoncel' && parseInt(row[column.key]) <= 95 && parseInt(row[column.key])>=85" />
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
const timers = {};

export default {
  name: 'appTableComponent',
  components: {},
  data () {
    return {
      component: {
        sorted: {
          key: null,
          direction: null
        },
        fixedList: [],
        groups: [],
        columns: [],
        rows: [],
        selectedMap: {}
      }
    };
  },
  props: {
    identity: { type: String, default: 'table' },
    columns: { type: Array, default: function () { return [] } },// label, key, sortable, width, bgColor, color, bold
    fixednum: { type: Number, default: 0 },
    values: { type: Array, default: function () { return [] } },
    totalRow: { type: Object },
    selected: { type: Object }, // { key, keysMap: { [key: string]: string[], style, color, bgColor }
    emptyText: { type: String, default: '暂无数据' },
    defaultValue: { type: String },
    mode: { type: String }
  },
  computed: {
    listenChange () {
      const { fixednum, columns, defaultValue, values, totalRow, selected } = this
      return { fixednum, columns, defaultValue, values, totalRow, selected }
    }
  },
  watch: {
    values: {
      handler: function (newValue) {
        this.component.rows = this.buildRows(newValue)
      },
      immediate: true,
      deep: true
    },
    // columns: {
    //   handler: function (newValue) {
    //     this.component.columns = newValue
    //   },
    //   immediate: true,
    //   deep: true
    // },
    mode: function (newValue) {
      if (this.component.sorted) {
        this.component.sorted = {
          direction: '',
          key: ''
        }
      }

    },
    totalRow: {
      handler: function (newValue) {
        if (newValue) {
          this.component.totalRow = this.buildRows([newValue])[0]
        }
      },
      immediate: true,
      deep: true
    },
    listenChange (val) {
      const { fixednum, columns, values, totalRow, selected } = val;
      const groups = [];
      let setColumns = [];
      let groupItems = [];
      let groupName = '';
      let setdata = { component: { fixedList: [], groups: [], columns: [], rows: [], totalRow: null } };
      if (timers[`${this.identity}_observers`]) {
        clearTimeout(timers[`${this.identity}_observers`]);
      }
      if (columns.length) {
        setColumns = columns.map(({ width, ...column }) => {
          const $styles = [];
          const item = { ...column };
          const itemWidth = width ? Math.abs(width.toString().replace('rem', '')) : null;
          if (itemWidth) {
            item.width = itemWidth;
            $styles.push(`min-width:${itemWidth}rem`);
            $styles.push(`max-width:${itemWidth}rem`);
          } else if (column.fixed) {
            item.width = item.width || 1.6;
            $styles.push('min-width:1.6rem');
            $styles.push('max-width:1.6rem');
          }
          return { width: width ? Math.abs(width.toString().replace('rem', '')) : 1.6, ...column, $styles };
        });
      }
      if (selected) {
        const { key, keysMap, ...options } = selected;
        this.component.selected = { key: key || 'id', keysMap: keysMap || {}, ...options };
      }
      if (setColumns.length) {
        if (fixednum) {
          let nextLeft = 0;
          const fixedList = setColumns.reduce((result, column, coli) => {
            result.push(nextLeft);
            // if (coli && coli % 2) {
            //   nextLeft -= 2;
            // }
            nextLeft += column.width;
            return result;
          }, []);
          setdata['component']['fixedList'] = fixedList;
          let $styleHead = ''
          var groupslength = setColumns.find(item => item.group)
          setColumns = setColumns.map(({ $styles, ...column }, columni) => {
            if (groupName !== (column.group || '') && groupItems.length) {
              if (column.group) {
                let pWidth = setColumns.filter(col => col.group === column.group).reduce((res, c) => {
                  return res + c.width
                }, 0)
                $styleHead = `min-width:${pWidth}rem;max-width:${pWidth}rem;`
              }
              groups.push({ label: groupName, items: groupItems });
              groupItems = [];
            } else {
              $styleHead = ''
            }
            groupName = column.group || '';
            groupItems.push(column);
            if (columni < this.fixednum) {
              $styles.push(`left:${fixedList[columni]}rem`);
            }
            if (groupslength) {
              if (columni < setColumns.length - 1) {
                var groupCurrent = setColumns[columni].group || ''
                var groupNext = setColumns[columni + 1].group || ''
                if (!groupCurrent && groupNext) {

                  $styles.push(`padding-right:0.3rem`);
                  column.tdStyle = true
                }
              }
            }
            return { ...column, groupName, groupIndex: groupItems.length - 1, $styles, $styleHead };
          });
          groups.push({ label: groupName, items: groupItems });
          setdata['component']['groups'] = groups;
        }
        setdata['component']['columns'] = setColumns.map(({ $styles, ...column }) => ({ ...column, $styles: ($styles || ['']).join(';') }));
      }
      if (totalRow) {
        setdata['component']['totalRow'] = this.buildRows([totalRow], setColumns)[0];
      }
      if (values.length) {
        setdata['component']['rows'] = this.buildRows(values, setColumns);
      }
      timers[`${this.identity}_observers`] = setTimeout(() => {
        this.component = { ...this.component, ...setdata.component };
      }, 100);
    }
  },
  mounted () {
    // console.log(this.component.rows, 'this.component.rows')
    // console.log(this.component.columns, 'this.component.columns')
  },
  beforeMount: function () { },
  destroyed: function () {// 在组件实例被从页面节点树移除时执行
  },
  methods: {
    columnSelected (selected, row, column) {
      // console.log(selected, row, column)
      return (selected.keysMap[row[selected.key]] || []).includes(column.key);
    },

    numberFormat (value, options = {}) {
      //value:number | string,//options:{ precision: number; unit: string }

      const newValue = value.toString().replace(/[^\d.-]/g, '');
      if (isNaN(newValue) || ['', null, undefined].includes(newValue)) {
        return value;
      }

      if (typeof options.precision !== 'number') {
        const pointPoistion = newValue.toString().indexOf('.');
        if (~pointPoistion) {
          options.precision = newValue.toString().substr(pointPoistion + 1);
        }
      }

      const span = Number(newValue).toFixed(options.precision || 0);
      const bit = span.indexOf('.') < 0 ? '' : span.substr(span.indexOf('.'));
      const format = span.replace(/\..*$/, '').split('').reverse().join('').replace(/\d{3}\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('');

      return `${format}${bit}${options.unit || ''}`;
    },

    buildRows (rows = [], columns) {
      // console.log(rows,columns)
      return rows.map(row => {
        const result = { ...row };
        const selectedOptions = this.component.selected;
        if (selectedOptions) {
          result['$selected'] = {};
        }

        (columns || this.component.columns).map(column => {
          const { key, defaultValue, numberFormat, numberPrecision, unit, changeNum } = column;

          result[key] = row[key];

          if ([null, undefined, '', '-', '/'].includes(result[key])) {
            result[key] = defaultValue || '-';

          } else {

            if (numberFormat) {
              if (changeNum) {
                result[key] = this.numberFormat(result[key] / changeNum, { precision: numberPrecision, unit });
              } else {
                result[key] = this.numberFormat(result[key], { precision: numberPrecision, unit });
              }
            }

            if (unit) {
              const unitRegex = new RegExp(unit, 'ig');
              result[key] = `${result[key].toString().replace(unitRegex, '')}${unit}`;
            }
          }

          const selectedOptions = this.component.selected;

          if (selectedOptions) {
            if ((selectedOptions.keysMap[row[selectedOptions.key]] || []).includes(key)) {
              result.$selected[key] = selectedOptions;
            }
          }

        });
        return result;
      });
    },
    onHeadColumnClick (e) {
      const column = JSON.parse(e.currentTarget.dataset.column);
      const { key, sortable } = column;
      const { sorted, rows } = this.component;

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
          let r1Value = ''
          let r2Value = ''
          if (key == 'date' || key == 'contEndDate') {
            let data1 = new Date(r1[key])
            let data2 = new Date(r2[key])
            r1Value = data2.getTime(data2)
            r2Value = data1.getTime(data1)
          } else {
            r1Value = parseFloat((r1[key] || 0).toString().replace(/[^\d.-]/g, ''));
            r2Value = parseFloat((r2[key] || 0).toString().replace(/[^\d.-]/g, ''));
          }

          if (isNaN(r1Value)) {
            return 1 - 0;
          } else if (isNaN(r2Value)) {
            return 0 - 1;
          }
          return sorted.direction === 'up' ? r1Value - r2Value : r2Value - r1Value;
        }) : this.buildRows(this.values);
        let setdata = { component: { sorted: sorted, rows: sortedRows } };
        const firstColumn = this.columns[0];
        if (!firstColumn.key) {
          if (sorted.direction) {
            this.component['columns'][0]['label'] = '排序';
          } else {
            this.component['columns'][0]['label'] = firstColumn.label;
          }
        }
        this.component = { ...this.component, ...setdata.component };
      }
      this.$emit('head-click', {
        detail: e.currentTarget.dataset
      });
    },
    onRowColumnClick (index, row, column) {
      let detail = { row: row, column: column }
      this.$emit('row-column-click', { index, detail });
      this.$emit('row-click', { detail: { index, row, column } });
    },
  }
};
</script>
<style type="span/css" lang="scss" scoped>
.tdStyle {
  //padding-right: 0.3rem !important;
}
.fixed {
  position: -webkit-sticky !important;
  position: sticky !important;
  z-index: 100;
}

.span-left {
  text-align: left !important;
}

.span-right {
  text-align: right !important;
}

// .sortable.span-right.app-table-row__item {
//   padding-right: 28px !important;
// }
// .sortable.span-right.app-table-row__item:last-child {
//   padding-right: 52px !important;
// }

.sortable.span-right {
  // padding-right: 10px;
}

.app-table {
  position: relative;
  width: 100%;
  overflow: auto;
  font-size: 24px;
  line-height: 1.5;
}

.app-table-header__items {
  display: inline-flex;
  position: relative;
  min-width: 100%;
  font-weight: bold;
  background-color: #f5f5f5;
}

.app-table-header__item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  min-height: 72px;
  background-color: #f5f5f5;
  text-align: center;
}

.app-table-header__item.in-group {
  text-align: left;
  align-items: flex-start;
}
// .app-table-header__item:last-child {
//   padding-right: 0.32rem;
// }
.app-table-header__item_column_line {
  // margin-left: 17px !important;
  .app-table-header__item__group_hr {
    width: 90%;
    height: 2px;
    margin-left: 10%;
    border-bottom: 2px solid #e3e3e3;
  }
}
.app-table-header__item__group_hr {
  width: 100%;
  height: 2px;
  border-bottom: 2px solid #e3e3e3;
}
.app-table-header__item_line {
  // margin-left: 17px !important;
}

.app-table-header__item__group {
  position: relative;
  width: 100%;
  height: 0.66666rem;
  text-align: left;
  white-space: nowrap;
  // border-bottom: 0.026667rem solid #e3e3e3;
}

.app-table-header__item__group-name {
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: center;
}
.app-table-header__item__group-name-only {
  width: 90%;
  float: right;
}

.app-table-header__item__column-name {
  width: 100%;
  padding: 0 0 0 0.32rem;
}
.app-table-header__item__column-name__padding {
  padding: 0 0.32rem;
}

.groupNameMargin {
  min-height: 72px;
  line-height: 72px;
}

.app-table-header__item__column_icon {
  display: inline-block;
  margin-left: 8px;
  //margin-right: 16px;
  width: 18px;
  height: 22px;
  vertical-align: middle;
  margin-bottom: 0.03rem;
}

.app-table-rows__empty {
  padding: 10px;
  text-align: center;
}

.app-table-row {
  display: inline-flex;
  position: relative;
  min-width: 100%;
  text-align: center;
}
.app-table-row:last-child {
  .app-table-row__item {
    border: none;
  }
}
.app-table-row:not(:last-child)::after {
  // content: "";
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // border-bottom: 2px solid #f5f5f5;
  // width: 100%;
  // z-index: 100;
}
.app-table-row__item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 24px 24px 24px 24px;
  line-height: 1.5;
  background-color: #ffffff;
  position: relative;
  border-bottom: 2px solid #f5f5f5;
}

.app-table-row--total .app-table-row__item {
  font-weight: bold;
}

.app-table-row__item.selected span {
  position: relative;
  z-index: 0;
  color: #fd100e;
}

.app-table-row__item.selected span::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  background-color: #fde3e3;
}
.app-table-row__item img {
  width: 26px;
  height: 26px;
  position: absolute;
  right: 0;
  top: 25px;
}
.sortable span {
  //padding-right: 5px;
}
.hasGroupNameHeight {
  flex-direction: column;
  height: 144px;
  padding: 0;
}
.noGroupNameHeight {
  min-height: 72px;
  padding: 0;
}

.no-group {
  width: 100%;
  min-height: 72px;
  // padding: 0 0.32rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
</style>
