<template>
  <el-row :span="24" class="search">
    <el-col :span="4" :xs="8" :sm="6" :md="5" :lg="5" :xl="4" v-for="(item,index) in searchList" :key="index">

      <template v-if="item.type === 'input'" @change="search" @clear="search">
        <el-input class="search-icon" size="mini" :placeholder="item.placeholder" v-model="currentValue[item.key]" clearable @change="search"></el-input>
      </template>

      <template v-if="item.type === 'autocomplete'">
        <ysNAutocomplete v-model="currentValue[item.key]" :size="'mini'" :className="'search-icon'" :params="currentValue" :type="item.key" :serveApi="item.serveApi" @handleSelect="handleSelect" :placeholder="item.placeholder" />
      </template>

      <template v-else-if="item.type === 'datePicker'">
        <el-date-picker size="mini" type="date" :placeholder="item.placeholder" v-model="currentValue[item.key]" :picker-options="dataPickerOptions" @blur="search" @clear="search">
        </el-date-picker>
      </template>

      <template v-else-if="item.type === 'dateRang'">
        <el-date-picker v-model="daterange" size="mini" type="daterange" align="left" unlink-panels :picker-options="pickerOptions" popper-class="daterangeMenu" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="search" @clear="search">
        </el-date-picker>
      </template>

      <template v-else-if="item.type === 'select'">
        <el-select clearable size="mini" @change="search" @clear="search" v-model="currentValue[item.key]" :placeholder="item.placeholder">
          <el-option v-for="selectItem in item.selectList" :key="selectItem[item.selectKey] ? selectItem[item.selectKey] : selectItem.key " :label="selectItem[item.selectLabel] ? selectItem[item.selectLabel] : selectItem.value" :value="selectItem[item.selectKey] ? selectItem[item.selectKey] : selectItem.key">
          </el-option>
        </el-select>
      </template>

      <template v-else-if="item.type === 'inputSearchMenu'">
        <el-select class="search-icon" v-if="item.remoteMethod" v-model="currentValue[item.key]" filterable clearable @change="search" @clear="search" remote reserve-keyword :placeholder="item.placeholder" :remote-method="remoteMethod">
          <el-option v-for="obj in item.selectList" :key="obj[item.selectKey] ? obj[item.selectKey] : obj.id" :label="obj[item.selectValue] ? obj[item.selectValue] : obj.appName" :value="obj[item.selectKey] ? obj[item.selectKey] : obj.id">
          </el-option>
        </el-select>
        <el-select class="search-icon" v-else v-model="currentValue[item.key]" filterable clearable @change="search" @clear="search" remote reserve-keyword :placeholder="item.placeholder">
          <el-option v-for="obj in item.selectList" :key="obj[item.selectKey] ? obj[item.selectKey] : obj.id" :label="obj[item.selectValue] ? obj[item.selectValue] : obj.appName" :value="obj[item.selectKey] ? obj[item.selectKey] : obj.id">
          </el-option>
        </el-select>
      </template>
      <template v-else-if="item.type === 'checkboxSearchMenu'">
        <span class="tag" v-if="count > 0" style="padding:3px 5px;position: absolute;right: 25px;z-index:10;background: #E1E9FF;top: 9px;font-size: 14px;">共{{count}}</span>
        <el-select class="multiSelect" ref="multiSelect" v-model="currentValue[item.key]" clearable @clear="clean(checkedList,item.key)" :placeholder="item.placeholder" @focus="selectList = item.selectList" style="padding-right: 40px;">
          <div slot="empty" class="checkbox-menu">
            <el-input size="mini" class="search-icon" placeholder="请搜索" v-model="keywords" clearable @input="seachMenu(item.selectList,keywords)">
            </el-input>
            <div class="checkbox-content">
              <div class="checkAll">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(checkAll,item.selectList,item.key)">
                  全选
                </el-checkbox>
                <div class="operat">
                  <span class="clean" @click="clean(checkedList,item.key)">清除</span>
                  <span class="sure" @click="sure(checkedList,item.key)">确定</span>
                </div>
              </div>
              <el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange(checkedList,selectList)">
                <el-checkbox v-for="selectItem in selectList" :label="selectItem[item.selectKey]" :key="selectItem[item.selectKey]">
                  {{selectItem[item.selectValue]}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

        </el-select>
      </template>

    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: []
    },
    params: {
      type: Object,
      default: {}
    }
  },
  watch: {
    currentValue: {
      handler: function (newValue, oldValue) {
        this.currentValue = Object.assign(this.currentValue, newValue)
      },
      immediate: true,
      deep: true,
    },
    'daterange': {
      handler: function (newVal, oldVal) {
        let currentValue = JSON.parse(JSON.stringify(this.currentValue))
        if (!this.daterange) {
          // this.$emit('getList', this.currentValue)
        } else {
          if (Object.keys(currentValue).includes('dateStart') && Object.keys(currentValue).includes('dateEnd')) {
            currentValue = {
              ...currentValue,
              dateStart: this.daterange && this.daterange[0],
              dateEnd: this.daterange && this.daterange[1],
            }
            this.$emit('getList', currentValue)
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data () {
    return {
      loading: false,
      dataPickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick (picker) {
            const toDay = new Date();
            const yestaday = new Date();
            yestaday.setTime(yestaday.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', yestaday);
          }
        },
        {
          text: '今天',
          onClick (picker) {
            const taDay = new Date();
            picker.$emit('pick', taDay);
          }
        },
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近7天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近30天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      selectStatusIndex: null,
      keywords: null,
      checkAll: false,
      isIndeterminate: false,
      selectList: [],
      checkedList: [],
      stateAppId: null,
      stateBusinessId: null,
      daterange: null,
      count: '',
      currentValue: this.params
    }
  },
  mounted () {
    //[new Date().toLocaleDateString(),(new Date().getTime() - 3600 * 1000 * 24 * 7).toLocaleDateString()]
    let end = this.famater(new Date().toLocaleDateString())
    let start = this.famater(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7).toLocaleDateString())
    this.daterange = [start, end]
    // console.log(end, 'kkkkk')
  },
  methods: {
    cleanSelect (type) {
      if (type == 'stateBusinessId') {
        this.stateBusinessId = ''
        this.currentValue.businessId = ''
      } else if (type == 'stateAppId') {
        this.stateAppId = ''
        this.currentValue.appId = ''
      }
      // console.log(this.currentValue, 'this.search()')
      this.search()
    },
    famater (date) {
      let arr = date.split('/')
      let st = []
      arr.map(item => {
        if (item < 10) {
          item = '0' + item
        }
        st.push(item)
      })
      return st.join('-')
    },
    remoteMethod (query) {
      if (query != '') {
        this.loading = true;
        this.$emit('searchDic', query)
      }
    },
    search (currentValue = JSON.parse(JSON.stringify(this.currentValue))) {
      try {
        let req = currentValue
        if (!this.daterange) {
          this.$emit('getList', req)
        } else {
          req = {
            ...currentValue,
            dateStart: this.daterange && this.daterange[0],
            dateEnd: this.daterange && this.daterange[1],
          }
          this.$emit('getList', req)
        }
      } catch (e) {
        console.log(e)
      }
    },
    clean (checkedList, key) {
      this.checkedList = []
      this.checkAll = false
      this.isIndeterminate = false
      this.currentValue[key] = ''
      this.count = ''
      setTimeout(() => {
        this.$refs.multiSelect[0].blur()
      }, 50)
      this.$emit('getList', currentValue)
    },
    handleCheckAllChange (val, selectList, key) {
      let arr = []
      selectList.map(item => {
        arr.push(item[key])
      })
      this.checkedList = val ? arr : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value, selectList) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.selectList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectList.length;
    },
    seachMenu (selecteList, keywords) {
      var restaurants = JSON.parse(JSON.stringify(selecteList))
      let list = restaurants.filter(item => item.indexOf(keywords) != -1)
      this.selectList = list ? [...list] : restaurants;
      this.keywords = ''
    },
    sure (checkedList, key) {
      let that = this
      that.currentValue[key] = checkedList.join(',')
      this.count = checkedList.length
      setTimeout(() => {
        that.$refs.multiSelect[0].blur()
      }, 50)
      this.$emit('getList', currentValue)
    },
    handleSelect (type) {
      this.$emit('form-change', type, this.currentValue)
      this.search()
    }
  }
}
</script>

<style lang="scss">
.multiSelect {
  .el-input__inner {
    padding-right: 56px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-date-editor {
  .el-range-input,
  input {
    color: #1c1c1c;
    font-size: 14px;
  }
}
.daterangeMenu {
  .el-picker-panel__shortcut {
    color: #1c1c1c;
    &:hover {
      color: #4876ef;
    }
  }
  /* .el-picker-panel__sidebar {
			top: 100%;
			width: 100%;
			line-height: 40px;
			height: 40px;
			display: flex;
			justify-content: flex-start;
			padding: 6px 20px;
			border-top: solid 1px #f0f2f7;

			button {
				width: auto;
				padding: 0 8px;
				border: solid 1px #4876ef;
				color: #4876ef;
				line-height: 24px;
				margin-right: 10px;
				font-size: 12px;
				cursor: pointer;

				&:hover,
				&:visited {
					background: #4876ef;
					color: #fff;
				}
			}
		}

		.el-picker-panel__body {
			margin-left: 0;
		} */
}

.search {
  margin-bottom: 16px;

  .el-col {
    margin-right: 10px;
    position: relative;
    .el-input {
      line-height: 36px;
      width: 100%;

      input {
        padding: 4px 10px 4px 40px;
        height: 36px;
        color: #1c1c1c;
        font-size: 14px;
        border-radius: 0px;
      }
    }

    .el-select {
      input {
        padding: 4px 10px 4px 10px;
      }
    }

    .el-select,
    .el-autocomplete {
      width: 100%;
    }

    .el-date-editor {
      width: 100%;
      // padding-top: 4px;
      // padding-bottom: 4px;
      height: 36px;
      color: #1c1c1c;
      font-size: 14px;
    }

    .search-icon:before {
      content: "";
      background: url("../../assets/images/input-search-icon.png") no-repeat
        center top;
      background-size: auto 100%;
      background-origin: content-box;
      width: 20px;
      height: 24px;
      position: absolute;
      left: 13px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
    .search-icon input {
      padding-left: 40px !important;
    }
  }

  .el-date-editor {
    width: 100%;
  }
}

/* .el-autocomplete-suggestion {
		margin: 0;

		.el-autocomplete-suggestion__wrap {
			padding: 0;
		}

		li {
			padding: 0;
		}
	} */

.select-menu {
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1c1c1c;
  font-size: 14px;
  padding: 0 14px 0 30px;

  .el-input__icon {
    color: #4876ef;
    vertical-align: middle;
    line-height: 32px;
  }

  &.active {
    background-color: #f0f2f7;
  }
}

.checkbox-menu {
  width: 100%;

  .el-input {
    width: 100%;

    .el-input__inner {
      border: none;
      line-height: 32px;
      font-size: 14px;
      height: 32px;
    }
  }

  .el-checkbox {
    display: block;
    line-height: 32px;
    font-size: 14px;
  }

  .checkbox-content {
    padding: 0 17px;
    border-top: solid 1px #f0f2f7;

    .checkAll {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .sure {
        color: #4876ef;
        font-size: 14px;
        padding: 0 5px;
      }

      .clean {
        color: #1c1c1c;
        font-size: 14px;
        padding: 0 5px;
      }
    }
  }
}
.el-date-table td.start-date div,
.el-date-table td.end-date div {
  border-radius: 0;
}
</style>
