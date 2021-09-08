<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 手风琴-详情页模板
-->
<template>
  <div class="d-flex full-height">
    <!-- 左边导航 -->
    <transition name="el-fade-in-linear">
      <el-scrollbar class="app-main-scrollbar" :style="{height: (windowHeight - 100)+'px'}">
        <div v-if="hasMenu" class="menu-area">
          <menuList :default-active="menuActive" :list="currentMenuList" />
        </div>
      </el-scrollbar>
    </transition>

    <!-- 主体内容 -->
    <div class="content" :class="hasMenu?'pl-24':''">
      <!-- 按钮插槽 -->
      <div v-if="!hiddenBtn" class="btn-area  flex-ju-between ">
        <div>
          <slot name="topLeft" />
        </div>
        <div class="d-flex">
          <ysn-btn v-if="examinePage&&$route.query.id" class="mr-12" @click="navToExamine">审核记录</ysn-btn>
          <slot name="btn" />
          <template v-if="examine">
            <ExamineDialog type="agree" @over="examineOver">
              <ysn-btn class="mx-12">同意</ysn-btn>
            </ExamineDialog>

            <ExamineDialog type="reject" @over="examineOver">
              <ysn-btn class="mr-12" type="delete">驳回</ysn-btn>
            </ExamineDialog>

          </template>
          <template v-if="accessory!==''">
            <AccessoryDialog :disabled="accessoryDisable">
              <ysn-btn type="reset">{{ accessoryDisable?'查看附件':'附件信息' }}</ysn-btn>
            </AccessoryDialog>
          </template>
        </div>
      </div>
      <el-scrollbar class="app-main-scrollbar body" :style="{height: (windowHeight - 140)+'px'}">
        <div class="edit-area" :class="hasBottom?'hasBottom':''">
          <div class="mt-12">
            <!-- 主题内容 -->
            <template v-for="(item,index) in config">
              <ysn-flod
                v-if="!item.isGroup"
                :id="formatStr(item.title)"
                :key="index"
                :title="item.title"
                :show-flod="item.showFlod"
                :hidden-flod="item.hiddenFlod"
                :flodicon="item.flodicon"
                @iconsval="iconsval(item.dataKey)"
              >
                <!-- 展示用组件内容 -->
                <component
                  :is="item.component"
                  v-if="!item.slot"
                  :ref="item.dataKey"
                  v-model="currentFormData[item.dataKey]"
                  v-bind="item"
                  :data="currentFormData"
                  :update="update"
                  @change="comDataChange"
                  @comChange="comChange"
                />
                <!-- 内容插槽 -->
                <slot v-if="item.slot" :name="item.slot" />

                <!-- flod插槽 -->
                <template v-if="item.flodSlot" #action>
                  <slot :name="item.flodSlot" />
                </template>
              </ysn-flod>

              <template v-else>
                <!-- 分组tabs -->
                <ysn-tabs
                  v-if="groupStatus[item.dataKey]&&currentFormData[item.dataKey].length>0"
                  :key="item.dataKey"
                  v-model="groupStatus[item.dataKey].tabActive"
                  :list="groupStatus[item.dataKey].list"
                  :dynamic="dynamic"
                  class="mt-20 mb-12"
                  @input="(index)=>{handleTabsChange(item.dataKey,index)}"
                  @toggle="(type,index)=>{handlTabsToggle(type,index,item.dataKey)}"
                />
                <!-- 分组数据 为空时不渲染分组组件 -->
                <ysn-tabs
                  v-else
                  :key="item.dataKey"
                  v-model="groupStatus[item.dataKey].tabActive"
                  :list="[{label:item.title}]"
                  :dynamic="dynamic"
                  @input="(index)=>{handleTabsChange(item.dataKey,index)}"
                  @toggle="(type,index)=>{handlTabsToggle(type,index,item.dataKey)}"
                />
                <!-- 分组数据 为空时不渲染分组组件 -->
                <div v-if="currentFormData[item.dataKey]&&currentFormData[item.dataKey].length>0" :key="item.dataKey+'_'+groupStatus[item.dataKey].tabActive">
                  <template v-for="(_d_item,_d_index) in currentFormData[item.dataKey]">
                    <template v-for="(_item,_index) in item.group">
                      <ysn-flod
                        v-show="_d_index===groupStatus[item.dataKey].tabActive"
                        :id="formatStr(_item.title)"
                        :key="item.dataKey+'tabs_'+_d_index+'_'+_index"
                        :title="_item.title"
                        :show-flod="_item.showFlod"
                        :hidden-flod="_item.hiddenFlod"
                        :flodicon="_item.flodicon"
                        @iconsval="iconsval(_item.dataKey)"
                      >
                        <!-- 展示用组件内容 -->
                        <component
                          :is="_item.component"
                          :ref="_item.dataKey+'_'+_d_index+'_'+_index"
                          v-model="currentFormData[item.dataKey][_d_index][_item.dataKey]"
                          v-bind="_item"
                          :data="currentFormData"
                          :update="update"
                          @change="comDataChange"
                          @comChange="comChange"
                        />

                        <!-- flod插槽 -->
                        <template v-if="_item.flodSlot" #action>
                          <slot :name="_item.flodSlot" />
                        </template>
                      </ysn-flod>
                    </template>
                  </template>
                </div>
              </template>
            </template>

            <!-- 审核记录 -->
            <ysn-flod
              v-if="examine"
              id="审核记录"
              title="审核记录"
              height="210px"
            >
              <!-- 审核列表 -->
              <ysn-table
                :checkbox="false"
                :data="examineData"
                :column="examineTableConfig"
              />
            </ysn-flod>

          </div>

        </div>
      </el-scrollbar>
      <div v-if="hasBottom" class="bottom-area">
        <slot name="bottom" />
      </div>
    </div>
  </div>

</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import valFormDate from '@/mixins/valiFormdate'
import menuList from './blocks/menu.vue'
import ExamineDialog from './blocks/ExamineDialog.vue'
import AccessoryDialog from './blocks/AccessoryDialog.vue'
import { formatStr } from '@//utils/index'
import { examineTableConfig } from './config'
import { baseApi } from '@/api'
import { numberToChinese } from '@/utils'
export default {
  name: 'YsnPageAccorGroupDetail',
  components: { menuList, ExamineDialog, AccessoryDialog },
  mixins: [valFormDate],
  model: {
    prop: 'formData',
    event: 'formChange'
  },
  props: {
    // 是否显示左侧菜单
    hasMenu: {
      type: Boolean,
      default: true
    },
    // 主体内容展示
    config: {
      type: Array,
      default: () => []
    },
    // 默认value
    formData: {
      type: Object,
      default: () => {}
    },
    // 数据更新
    update: {
      type: Number,
      default: 0
    },
    // 审核页面名
    examine: {
      type: String,
      default: ''
    },
    // 跳转审核记录的页面名
    examinePage: {
      type: String,
      default: ''
    },
    // 是否显示附件管理弹窗
    accessory: {
      type: String,
      default: ''
    },
    // 附件管理状态
    accessoryDisable: {
      type: Boolean,
      default: false
    },
    // 隐藏按钮区域
    hiddenBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示tabs的加号
    dynamic: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentMenuList: [], // 内部左侧菜单列表
      menuActive: '', // 左侧默认选中
      hasBottom: false, // 是否有底部插槽
      currentFormData: {},
      examineData: [], // 审核列表数据
      examineTableConfig: examineTableConfig.call(this), // 审核列表配置
      groupStatus: {}, // 分组状态
      windowHeight: `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.currentMenuList = this.getMenuList(val)
        this.groupStatus = this.initGroupConfig(val)
      }
    },
    update: {
      deep: true,
      immediate: true,
      handler(val) {
        this.currentFormData = cloneDeep(this.formData)
        this.groupStatus = this.initGroupConfig(this.config)
      }
    },
    currentFormData: {
      deep: true,
      handler(val) {
        this.$emit('change', this.currentFormData)
      }
    }
  },
  created() {
    if (this.config.length > 0) {
      this.menuActive = this.config[0].title
      this.currentMenuList = this.getMenuList(this.config)
    }
  },
  mounted() {
    // 用于空出底部高度
    if (this.$scopedSlots.bottom) {
      this.hasBottom = true
    }

    // 请求审批信息
    if (this.examine) {
      this.queryExamine()
    }

    // 计算 edit-area 可用高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.windowHeight = document.documentElement.clientHeight // 高
      })()
    }
  },
  methods: {
    // 初始化分组模块
    initGroupConfig(config) {
      const groupStatus = this.groupStatus
      config.map(item => {
        if (item.isGroup) {
          let tabActive = 0
          // 默认赋 上一次tabsActive
          if (this.groupStatus[item.dataKey]) {
            tabActive = this.groupStatus[item.dataKey].tabActive
          }

          // 最大选中不能大于数据长度
          const dataLength = this.currentFormData[item.dataKey].length - 1
          if (tabActive > dataLength) {
            tabActive = dataLength
          }
          // 解决只有一个小于0 不显示tab问题
          tabActive = tabActive < 0 ? '' : 0
          // 数据分组
          groupStatus[item.dataKey] = {
            tabActive: tabActive, // tabs的active
            list: []
          }
          // 根据数据list获取
          this.currentFormData[item.dataKey].forEach((el, index) => {
            groupStatus[item.dataKey].list.push({
              label: item.title + numberToChinese(index + 1),
              name: 'tabs' + (index + 1)
            })
          })
        }
      })
      return groupStatus
    },
    // 获取菜单列表
    getMenuList(val) {
      const menuList = val.map(item => item.title)
      if (this.examine) {
        menuList.push('审核记录')
      }
      return menuList
    },
    // 顶部点击
    iconsval(dataKey) {
      // 触发子组件点击事件
      this.$refs[dataKey][0].flodClick && this.$refs[dataKey][0].flodClick()
    },
    // 字符串格式化
    formatStr(str) {
      return formatStr(str)
    },
    // 子组件数据变化
    comDataChange({ key, data }) {
      this.$set(this.currentFormData, key, data)
    },
    // 审批完成
    examineOver() {
      this.$emit('examineOver')
    },
    // 获取审批列表
    async queryExamine() {
      // 为了演示 暂时随便写个id
      const reqData = {
        id: this.$route.query.id,
        type: this.examine
      }
      const res = await baseApi.queryExamine(reqData)
      this.examineData = res
    },
    // 审批跳转
    navToExamine() {
      this.$router.push({ name: this.examinePage, query: { id: this.$route.query.id }})
    },
    // 子组件告知父组件事件
    comChange(options) {
      this.$emit('comChange', options)
    },
    // tabs切换 暂时未用到
    handleTabsChange(dataKey, index) {
      this.groupStatus[dataKey].tabActive = index
      this.$forceUpdate()
    },
    // tabs增加删除
    handlTabsToggle(type, index, dataKey) {
      this.$emit('tabsToggle', type, index, dataKey)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main-scrollbar {
  ::v-deep.el-scrollbar__bar {
    width: 4px;
  }
}
</style>
<style lang="scss" scoped>
@import './index.scss'
</style>
