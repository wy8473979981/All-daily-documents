<template>
<view class="app-table">
  <view class="app-table-header">
    <view class="app-table-header__items">
      <!-- <view wx:for="{{columns}}" wx:for-index="columni" wx:key="columni" wx:for-item="column" style="width:{{column.width}};text-align:{{column.align}};left:{{ columni < fixednum ? 0 : '' }}" class="app-table-header__item {{ columni < fixednum ? 'fixed' : '' }}"> -->
      <view v-for="(column, columni) in component.columns" :key="columni" :class="'app-table-header__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' ' + ( column.groupName ? 'in-group' : '' ) + ' text-' + column.align + ' ' + ( column.sortable ? 'sortable' : '' )" @tap="onHeadColumnClick" :data-column="column" :style="column.$styles + ' ' + (column.children ? 'padding-bottom:0px;' :'')">
        <view :class="'app-table-header__item__column-name text-' + column.align" :style="column.children ? 'border-bottom:1px solid #e3e3e3;' :''">
          {{ column.label }}
        </view>
        <image v-if="column.sortable && component.sorted.key === column.key && component.sorted.direction === 'up'" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortup.png"></image>
        <image v-else-if="column.sortable && component.sorted.key === column.key && component.sorted.direction === 'down'" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortdown.png"></image>
        <image v-else-if="column.sortable" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortable.png"></image>
        <view class="app-table-header__items" v-if="column.children">
          <view v-for="(itemName, columnitem) in column.children" :key="columnitem" :class="'app-table-header__item ' + ( itemName.groupName ? 'in-group' : '' ) + ' text-' + itemName.align + ' ' + ( itemName.sortable ? 'sortable' : '' )" :style="'width:' + itemName.width + ';text-align:' + itemName.align + ';'" @tap="onHeadColumnClick" :data-column="itemName">
            <view :class="'app-table-header__item__column-name text-' + itemName.align">
              {{ itemName.label }}
            </view>
            <image v-if="itemName.sortable && component.sorted.key === itemName.key && component.sorted.direction === 'up'" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortup.png"></image>
            <image v-else-if="itemName.sortable && component.sorted.key === itemName.key && component.sorted.direction === 'down'" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortdown.png"></image>
            <image v-else-if="itemName.sortable" style="width:18rpx;height:21rpx;" src="/static/assets/images/icon-sortable.png"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="app-table-rows">
    <view class="app-table-rows__empty" v-if="component.rows.length === 0">
      {{ emptyText }}
    </view>
    <block v-else>
      <view class="app-table-row app-table-row--total" v-if="component.totalRow">
        <view v-for="(column, columni) in component.columns" :key="columni" :class="'app-table-row__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' text-' + column.align + ' ' + ( column.sortable ? 'sortable' : '' ) + ' ' + (column.children ? 'nextchild' :'')" :style="column.$styles + ';'">
          <block v-if="!column.children">
            <text>{{  component.totalRow[column.key] || '-' }}</text>
            <image class src="/static/assets/images/penoncel_hong.png" v-if="column.slot==='penoncel' && fn.getPenoncel(totalRow[column.key]) < 85"></image>
            <image class src="/static/assets/images/penoncel_lv.png" v-if="column.slot==='penoncel' && fn.getPenoncel(totalRow[column.key]) > 95"></image>
            <image class src="/static/assets/images/penoncel_huang.png" v-if="column.slot==='penoncel' && fn.getPenoncel(totalRow[column.key]) <= 95 && fn.getPenoncel(totalRow[column.key])>=85"></image>
          </block>
          <block v-else>
            <view v-for="(itemName, columnitem) in column.children" :key="columnitem" :class="'app-table-row__item1 text-' + itemName.align + ' ' + ( itemName.sortable ? 'sortable' : '' )" :style="'width:' + itemName.width + ';text-align:' + itemName.align + ';'">
              <!-- <text>{{ component.totalRow[itemName.key] || '-'}}</text> -->
              <text>{{fn.ntoS(component.totalRow[itemName.key], column) || '-'}}</text>
              <image class src="/static/assets/images/penoncel_hong.png" v-if="itemName.slot==='penoncel' && fn.getPenoncel(totalRow[itemName.key]) < 85"></image>
              <image class src="/static/assets/images/penoncel_lv.png" v-if="itemName.slot==='penoncel' && fn.getPenoncel(totalRow[itemName.key]) > 95"></image>
              <image class src="/static/assets/images/penoncel_huang.png" v-if="itemName.slot==='penoncel' && fn.getPenoncel(totalRow[itemName.key]) <= 95 && fn.getPenoncel(totalRow[itemName.key])>=85"></image>
            </view>
          </block>
        </view>
      </view>
      <view v-for="(row, rowi) in component.rows" :key="rowi" class="app-table-row">
        <view v-for="(column, columni) in component.columns" :key="columni" @tap="onRowColumnClick" :data-index="rowi" :data-row="row" :data-column="column" :style="column.$styles + ';color: ' + column.color + ';'" :class="'app-table-row__item ' + ( columni < fixednum ? 'fixed' : '' ) + ' text-' + column.align + ' ' + ( column.sortable ? 'sortable' : '' ) + ' ' + ( row['$selected'][column.key] ? 'selected' : '' ) + '  ' + ( column.ellipsis ? 'ellipsis' : '' ) + ' ' + (column.children ? 'nextchild' :'')">
          <block v-if="!column.children">
            <text :class="column.ellipsis ? 'ellipsis' : ''" @tap="showTip" :data-value="row[column.key]" :data-ellipsis="column.ellipsis">
              {{ column.key ? row[column.key] : rowi + 1 }}
            </text>
            <image class src="/static/assets/images/penoncel_hong.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) < 85"></image>
            <image class src="/static/assets/images/penoncel_lv.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) > 95"></image>
            <image class src="/static/assets/images/penoncel_huang.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) <= 95 && fn.getPenoncel(row[column.key])>=85"></image>
          </block>
          <block v-else>
            <view v-for="(column, columnitem) in column.children" :key="columnitem" :class="'app-table-row__item1 text-' + column.align + ' ' + ( column.sortable ? 'sortable' : '' )" :style="'width:' + column.width + ';text-align:' + column.align + ';'">
              <text>{{ fn.ntoS(row[column.key], column)}}</text>
              <image class src="/static/assets/images/penoncel_hong.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) < 85"></image>
              <image class src="/static/assets/images/penoncel_lv.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) > 95"></image>
              <image class src="/static/assets/images/penoncel_huang.png" v-if="column.slot==='penoncel' && fn.getPenoncel(row[column.key]) <= 95 && fn.getPenoncel(row[column.key])>=85"></image>
            </view>
          </block>
        </view>
      </view>
    </block>
  </view>
</view>
</template>

<script module="fn" lang="wxs" src="./fn.wxs"></script>

<script>
// components/table/index.js
const timers = {};

export default {
  data() {
    return {
      component: {
        sorted: {
          key: null,
          direction: null
        },
        slot: '',
        fixedList: [],
        groups: [],
        columns: [],
        rows: [],
        selectedMap: {}
      }
    };
  },

  components: {},
  props: {
    columns: {
      type: Array,
      default: []
    },
    fixednum: {
      type: Number,
      default: 0
    },
    values: {
      type: Array,
      default: []
    },
    slot: {
      type: String,
      default: ''
    },
    totalRow: {
      type: Object // observer(newValue) {
      // 	if (newValue) {
      // 		this.setData({
      // 			'component.totalRow': this.buildRows([newValue])[0]
      // 		})
      // 	}
      // }

    },
    selected: {
      type: Object // { key, keysMap: { [key: string]: string[], style, color, bgColor }

    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    defaultValue: {
      type: String
    }
  },
  watch: {
    values: {
      handler: function (newValue) {
        this.setData({
          'component.rows': this.buildRows(newValue)
        });
      },
      immediate: true,
      deep: true
    },
    slot: {
      handler: function (newValue) {
        this.setData({
          'component.slot': newValue
        });
      },
      immediate: true
    },

    ['fixednum,columns,defaultValue,values,totalRow,selected']() {
      const {
        fixednum,
        columns,
        values,
        totalRow,
        selected
      } = this;

      if (timers['observers']) {
        clearTimeout(timers['observers']);
      }

      const setdata = {};
      let setColumns = [];
      let columnName = null;

      if (columns.length) {
        columns.forEach(column => {
          if (!column.children && column.group) {
            if (column.group !== columnName) {
              columnName = column.group;
              setColumns.push({
                label: columnName,
                children: [column]
              });
            } else {
              setColumns[setColumns.length - 1].children.push(column);
            }
          } else {
            columnName = null;
            setColumns.push(column);
          }
        });
        setColumns = setColumns.map(({
          width,
          ...column
        }) => {
          const $styles = [];
          const item = { ...column
          };
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
          };
        });
      }

      if (selected) {
        const {
          key,
          keysMap,
          ...options
        } = selected;
        this.setData({
          'component.selected': {
            key: key || 'id',
            keysMap: keysMap || {},
            ...options
          }
        });
      }

      if (setColumns.length) {
        if (fixednum) {
          let nextLeft = 0;
          const fixedList = setColumns.reduce((result, column, coli) => {
            result.push(nextLeft);

            if (coli && coli % 2) {
              nextLeft -= 2;
            }

            nextLeft += column.width;
            return result;
          }, []);
          setdata['component.fixedList'] = fixedList;
          const groups = [];
          let groupItems = [];
          let groupName = '';
          setColumns = setColumns.map(({
            $styles,
            ...column
          }, columni) => {
            if (groupName !== (column.group || '') && groupItems.length) {
              groups.push({
                label: groupName,
                items: groupItems
              });
              groupItems = [];
            }

            groupName = column.group || '';
            groupItems.push(column);

            if (columni < this.fixednum) {
              $styles.push(`left:${fixedList[columni]}rpx`);
            }

            return { ...column,
              groupName,
              groupIndex: groupItems.length - 1,
              $styles
            };
          });
          groups.push({
            label: groupName,
            items: groupItems
          });
          setdata['component.groups'] = groups;
        }

        setdata['component.columns'] = setColumns.map(({
          $styles,
          ...column
        }) => ({ ...column,
          $styles: ($styles || ['']).join(';')
        }));
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
  beforeMount: function () {},
  destroyed: function () {// 在组件实例被从页面节点树移除时执行
  },
  methods: {
    buildRows(rows = [], columns) {
      return rows.map(row => {
        const result = { ...row
        };
        const selectedOptions = this.component.selected;

        if (selectedOptions) {
          result['$selected'] = {};
        }

        ;
        (columns || this.component.columns).map(column => {
          const {
            key,
            defaultValue,
            numberFormat,
            numberPrecision,
            unit
          } = column;
          result[key] = row[key]; // if ([null, undefined, ''].includes(result[key])) {
          // 	result[key] = '-'
          // } else {
          // 	if (numberFormat) {
          // 		result[key] = helper.numberFormat(result[key], {
          // 			precision: numberPrecision,
          // 			unit
          // 		})
          // 	}
          // 	if (unit) {
          // 		const unitRegex = new RegExp(unit, 'ig')
          // 		result[key] = `${result[key]
          // 			.toString()
          // 			.replace(unitRegex, '')}${unit}`
          // 	}
          // }

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

    onHeadColumnClick(e) {
      const {
        column: {
          key,
          sortable
        }
      } = e.currentTarget.dataset;
      const {
        sorted,
        rows
      } = this.component;

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
          const r1Value = parseFloat((r1[key] || 0).toString().replace(/[^\d.-]/g, ''));
          const r2Value = parseFloat((r2[key] || 0).toString().replace(/[^\d.-]/g, ''));

          if (isNaN(r1Value)) {
            return 1 - 0;
          } else if (isNaN(r2Value)) {
            return 0 - 1;
          }

          return sorted.direction === 'up' ? r1Value - r2Value : r2Value - r1Value;
        }) : this.buildRows(this.values);
        const setdata = {
          'component.sorted': sorted,
          'component.rows': sortedRows
        };
        const firstColumn = this.columns[0];

        if (!firstColumn.key) {
          if (sorted.direction) {
            setdata['component.columns[0].label'] = '排序';
          } else {
            setdata['component.columns[0].label'] = firstColumn.label;
          }
        }

        this.setData(setdata);
      }

      this.$emit('head-click', {
        detail: e.currentTarget.dataset
      });
    },

    onRowColumnClick(e) {
      const {
        index,
        row
      } = e.currentTarget.dataset;
      this.$emit('row-column-click', {
        detail: e.currentTarget.dataset
      });
      this.$emit('row-click', {
        detail: {
          index,
          row
        }
      });
    },

    showTip(e) {
      const {
        ellipsis,
        value
      } = e.currentTarget.dataset;

      if (!ellipsis) {
        return;
      }

      uni.showModal({
        title: ellipsis,
        content: value,

        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>