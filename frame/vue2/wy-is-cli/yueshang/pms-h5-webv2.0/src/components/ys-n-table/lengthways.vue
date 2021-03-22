<template>
  <div class="lengthways">
    <div class="lengthways-label">
      <div v-for="(item, index) in component.rows" :key="index" class="label-item">
        {{ item.label }}
      </div>
    </div>
    <div class="lengthways-content">
      <div v-for="(row, index) in component.list" :key="index" class="lengthways-item">
        <div v-for="(item, index2) in component.rows" :key="index2" class="label-item" :style="'font-weight: ' + ( index === 0 ? 'bold' : 'bold' )">
          <!-- <span v-if="!isNaN(row[item.key] - 0)">
            {{ row[item.key] }}
          </span>
          <span v-else>{{ row[item.key] || "-" }}</span> -->

          <span :style="item.key && row[item.key].toString().indexOf('-') === 0 && row[item.key] != '-'? 'color:#FF4954':''">{{ row[item.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: {
        list: [
          {
            label: "项目",
          },
        ],
        rows: [
          {
            label: "项目",
          },
        ],
      },
    };
  },

  components: {},
  props: {
    values: {
      type: Array,
      default: function () {
        return [];
      },
    },
    cross: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  watch: {
    cross: {
      handler(newVal) {
        this.setData({
          'component.rows': newVal
        });
        console.log(newVal, 'cross')
      },
      immediate: true,
      deep: true,
    },
    values: {
      handler(newVal) {
        this.setData({
          'component.list': this.buildRows(newVal, this.component.rows),
        });
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {

  },
  methods: {
    numberFormat(value, options = {}) {
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
    buildRows(rows = [], columns) {
      // 根据 表格数据 、 表头， 转换数据
      return rows.map(row => {
        const result = { ...row };
        (columns || this.component.columns).map(column => {
          const { key, defaultValue, numberFormat, numberPrecision, unit, changeNum } = column;
          result[key] = row[key];
          if ([null, undefined, '','-','/'].includes(result[key])) {
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
        });
        return result;
      });
    },


  }
}
</script>
<style type="text/css" lang="scss" scoped>
.lengthways {
  display: flex;
  color: #333;
  font-size: 28px;
}
.lengthways-label {
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 0 20px;
  font-size: 28px;
}
.label-item {
  height: 80px;
  line-height: 80px;
  width: 100%;
}
.lengthways-content {
  flex: 1;
  display: flex;
  overflow: auto;
}
.lengthways-item {
  flex-shrink: 0;
  flex: 1;
  text-align: right;
  padding: 0 20px;
  min-width: 240px;
  border-right: 1px solid #eaeaea;
  width: 150px;
}
</style>