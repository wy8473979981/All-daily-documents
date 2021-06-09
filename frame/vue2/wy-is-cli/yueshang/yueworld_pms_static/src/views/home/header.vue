<template>
  <div class="home-header-container">
    <div class="header-left-container">
      <div class="header-info">
        <el-row>
          <el-col v-for="(item, index) in switchList" :key="index" :span="6">
            <div class="switch-date-content" :class="item.title === '区域/城市' ? 'switch-date-city' : ''">
              <div class="switch-date-title">{{ item.title }}</div>
              <div>
                <el-switch
                  v-if="item.title !== '区域/城市'"
                  v-model="item.value"
                  active-color="#538235"
                  :active-text="item.label"
                  inactive-color="#848382"
                  @change="handleChageSwitch"
                />
                <div v-else class="city-btn primary-color">
                  <!-- 全部 -->
                  <ysn-selectDialog :form="form" prop="searchSelect" :list="cityList">
                    <div class="set-select">
                      <!-- 默认文字 -->
                      <span v-if="form.searchSelect.length === 0">全部</span>
                      <!-- 选中至少一个的效果 -->
                      <div v-if="form.searchSelect.length === 1" size="small" closable color="#1C4C7F" class="tag px-8" disable-transitions>
                        <span class="text-truncate tag-text">
                          {{ form.searchSelect[0]| getOptionsLabel('cityList') }}
                        </span>
                      </div>

                      <!-- 选中2个以上 -->
                      <!-- 选中至少一个的效果 -->
                      <div v-if="form.searchSelect.length > 1">
                        <el-tooltip class="item" effect="dark" :content="getSearchCityListLabel" placement="bottom">
                          <div size="small" color="#1C4C7F" class="tag px-8" disable-transitions>
                            +{{ form.searchSelect.length }}
                          </div>
                        </el-tooltip>
                      </div>

                    </div>
                  </ysn-selectDialog>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-for="(item, index) in headerInfoList" :key="index" :span="12">
            <div class="project-details">
              <span class="detail-num">{{ item.value }}</span>
              <span>{{ item.title }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nav-components-content">
        <HeaderNav @handleShow="handleShow" />
      </div>
    </div>
    <div class="header-search">
      <!-- <ysn-glbSearch /> -->

    </div>
  </div>
</template>
<script>
import HeaderNav from './components/headerNav'
import { cityList } from '@/utils/optionsList'
import { mapState } from 'vuex'
export default {
  components: { HeaderNav },
  data() {
    return {
      cityList,
      form: {
        searchValue: '', // 搜索内容
        searchSelect: [] // 搜索select
      },
      input2: '',
      value2: [],
      switchList: [
        { title: '购物中心', value: true, label: '37+2' },
        { title: '商业街', value: false, label: '20+4' },
        { title: '轻资产', value: false, label: '37+3' },
        { title: '区域/城市', value: false }
      ],
      projectList: []

    }
  },
  computed: {
    // 获取已选择的中文名
    getSearchCityListLabel() {
      return this.form.searchSelect.map(item => {
        return this.$filters.getOptionsLabel(item, 'cityList')
      }).join(',')
    },
    ...mapState({
      headerInfoList: state => state.home.headerInfoList
    })
  },
  methods: {

    // tag关闭
    tagClose() {
      this.form.searchSelect.shift()
    },
    // select下拉框的change事件
    handleWeekChange(val) {
      this.options.forEach((v) => {
        v.isCheck = false
      })
      val.forEach((el) => {
        this.options.forEach((v) => {
          if (el === v.value) {
            v.isCheck = true
          }
        })
      })
    },
    // checkbox change事件
    handleCheckBoxWeekChange(val, item) {
      if (val) {
        this.value2.push(item.value)
      } else {
        const index = this.value2.findIndex((ele) => ele.value === item.value)
        this.value2.splice(index)
      }
    },
    handleChageSwitch(val) {
      this.$emit('handleChangeSwitch', val)
    },
    handleShow(title) {
      this.$emit('handleIsShow', title)
    }
  }
}
</script>
<style lang="scss" scoped>
.home-header-container {
    height: 100%;
    .header-left-container {
        width: 569px;
        height: 153px;
        display: inline-block;
    }
    .header-info {
        width: 410px;
        height: 152px;
        float: left;
        background: #FDFCFA;
        border-radius: 20px;
        box-shadow: 0 2px 0 #000;
        padding: 24px;
        .header-row {
            margin-top: 16px;
        }
        .switch-date-title {
            font-size: $font-base-size;
            color: $font-word-color;
            margin-bottom: 8px;

        }
        .project-details {
            padding-top: 12px;
            .detail-num {
                color: #1C4C7F;
                font-size: $font-title-size;
                font-weight: bold;
                margin-right: 4px;
            }
            font-size: $font-base-size;
            color: $font-word-color;
        }
    }
    .nav-components-content {
        padding-top: 16px;
        float: left;
        margin-left: 8px;
    }
    .header-search {
        float:right
    }
    .switch-date-content {
        .city-btn {
            width: 52px;
            line-height: 22px;
            background: #E5E2DE;
            border-radius: 11px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
        }
    }
    .switch-date-city {
        margin-left: 18px;
    }
}
</style>
