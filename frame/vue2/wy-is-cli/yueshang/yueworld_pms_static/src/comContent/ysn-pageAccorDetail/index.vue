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
          <ysn-btn v-if="examinePage&&$route.query.id!==undefined" class="mr-12" @click="navToExamine">审核记录</ysn-btn>
          <slot name="btn" />
          <template v-if="examine&&examineBtn">
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
            <ysn-flod
              v-for="(item,index) in config"
              :id="formatStr(item.title)"
              :key="index"
              :title-text="item.title"
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
                :route-mess="routeMess"
                @change="comDataChange"
                @changeDate="changeDate"
                @comChange="comChange($event,arguments)"
              />
              <!-- 内容插槽 -->
              <slot v-if="item.slot" :name="item.slot" />

              <!-- flod插槽 -->
              <template v-if="item.flodSlot" #action>
                <slot :name="item.flodSlot" />
              </template>
            </ysn-flod>

            <!-- 审核记录 -->
            <ysn-flod
              v-if="examine"
              id="审核记录"
              title-text="审核记录"
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
export default {
  name: 'YsnPageAccorDetail',
  components: { menuList, ExamineDialog, AccessoryDialog },
  mixins: [valFormDate],
  model: {
    prop: 'formData',
    event: 'formChange'
  },
  props: {
    routeMess: {
      type: Object,
      default: () => {}
    },
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
    // 审核按钮
    examineBtn: {
      type: Boolean,
      default: true
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
      windowHeight: `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.currentMenuList = this.getMenuList(val)
      }
    },
    update: {
      deep: true,
      immediate: true,
      handler(val) {
        this.currentFormData = cloneDeep(this.formData)
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
    if (this.config && this.config.length > 0) {
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
    // 获取菜单列表
    getMenuList(val) {
      const menuList = []
      val.forEach((item) => {
        if (item.onMenu === undefined || item.onMenu) {
          menuList.push(item.title)
        }
      })
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
    // 删除按钮通知父组件
    changeDate(e) {
      this.$emit('changeDate', e)
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
