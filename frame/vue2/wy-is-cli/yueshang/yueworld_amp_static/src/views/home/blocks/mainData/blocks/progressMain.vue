<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP首页-中间进度条数据模块
-->

<template>
  <div class="mt-20">
    <!-- 顶部筛选列表 -->
    <div v-if="model === 1" class="d-flex">
      <!-- 占位用 -->
      <div class="first-box" />
      <div class="flex-1">
        <el-row>
          <el-col :span="6" class="text-center border-right">
            <switchItem title="在营" has-move :form="form" prop="zy" :disabled="isDisabled" @switchItemChange="switchItemChange" />
          </el-col>
          <el-col :span="6" class="text-center border-right">
            <switchItem title="在建" has-move :form="form" prop="zj" :disabled="isDisabled" @switchItemChange="switchItemChange" />
          </el-col>
          <el-col :span="6" class="text-center border-right">
            <switchItem title="可售" has-move :form="form" prop="ks" :disabled="isDisabled" @switchItemChange="switchItemChange" />
          </el-col>
          <el-col :span="6" class="text-center">
            <!-- <switchItem title="获取中" has-move :form="form" prop="keshou" direction="right" has-radio radio-title="仅商业" :radioprop="'shangyejie'" /> -->
            <switchItem title="获取中" has-move :form="form" prop="hqz" :disabled="isDisabled" @switchItemChange="switchItemChange" />
          </el-col>
        </el-row>
      </div>

    </div>
    <!-- 第二行 -->
    <div class="d-flex my-20">
      <!-- 占位用 -->
      <div class="first-box text-right flex-al-center flex-ju-end pr-20">
        <switchItem title="商业" has-move :form="form" prop="sy" has-radio direction="right" radio-title="商业街" :radioprop="'shangyejie'" :disabled="isDisabled" @switchItemChange="switchItemChange" />
      </div>
      <!-- 分解模式 -->
      <div v-if="model === 1" class="flex-1">
        <progressItem class="mb-4" :prog-list="progressData.sy1" @switchChange="switchChange" />
        <progressItem :prog-list="progressData.sy2" background="#BEBEBE" @switchChange="switchChange" />
      </div>
      <!-- 汇总模式 -->
      <div v-else class="flex-1">
        <progressAllItem class="mb-4" :prog-list="progressAllData.sy1" :max="maxNum" @switchChange="switchChange" />
        <progressAllItem :prog-list="progressAllData.sy2" background="#BEBEBE" :max="maxNum" @switchChange="switchChange" />
      </div>
    </div>

    <!-- 第三行 -->
    <div class="d-flex my-20">
      <!-- 标题 -->
      <div class="first-box text-right flex-al-center flex-ju-end pr-20">
        <switchItem title="办公" has-move :form="form" prop="bg" direction="right" :disabled="isDisabled" @switchItemChange="switchItemChange" />
      </div>
      <div v-if="model === 1" class="flex-1">
        <progressItem class="mb-4" :prog-list="progressData.bg1" @switchChange="switchChange" />
        <progressItem :prog-list="progressData.bg2" background="#BEBEBE" @switchChange="switchChange" />
      </div>

      <!-- 汇总模式 -->
      <div v-else class="flex-1">
        <progressAllItem class="mb-4" :prog-list="progressAllData.bg1" :max="maxNum" @switchChange="switchChange" />
        <progressAllItem :prog-list="progressAllData.bg2" background="#BEBEBE" :max="maxNum" @switchChange="switchChange" />
      </div>
    </div>

    <!-- 第四行 -->
    <div class="d-flex my-20">
      <!-- 标题 -->
      <div class="first-box text-right flex-al-center flex-ju-end pr-20">
        <switchItem title="公寓" has-move :form="form" prop="gy" direction="right" :disabled="isDisabled" @switchItemChange="switchItemChange" />
      </div>
      <div v-if="model === 1" class="flex-1">
        <progressItem class="mb-4" :prog-list="progressData.gy1" @switchChange="switchChange" />
        <progressItem :prog-list="progressData.gy2" background="#BEBEBE" @switchChange="switchChange" />
      </div>

      <!-- 汇总模式 -->
      <div v-else class="flex-1">
        <progressAllItem class="mb-4" :prog-list="progressAllData.gy1" :max="maxNum" @switchChange="switchChange" />
        <progressAllItem :prog-list="progressAllData.gy2" background="#BEBEBE" :max="maxNum" @switchChange="switchChange" />
      </div>
    </div>

    <!-- 第五行 -->
    <div class="d-flex my-20">
      <!-- 标题 -->
      <div class="first-box text-right flex-al-center flex-ju-end pr-20">
        <switchItem title="车库" has-move :form="form" prop="ck" direction="right" has-radio radio-title="仅商业" :radioprop="'shangye'" :disabled="isDisabled" @switchItemChange="switchItemChange" />
      </div>
      <div v-if="model === 1" class="flex-1">
        <progressItem class="mb-4" :prog-list="progressData.ck1" @switchChange="switchChange" />
        <progressItem :prog-list="progressData.ck2" background="#BEBEBE" @switchChange="switchChange" />
      </div>

      <!-- 汇总模式 -->
      <div v-else class="flex-1">
        <progressAllItem class="mb-4" :prog-list="progressAllData.ck1" :max="maxNum" @switchChange="switchChange" />
        <progressAllItem :prog-list="progressAllData.ck2" background="#BEBEBE" :max="maxNum" @switchChange="switchChange" />
      </div>
    </div>

    <!-- 第六行 -->
    <div class="d-flex my-20">
      <!-- 标题 -->
      <div class="first-box text-right flex-al-center flex-ju-end pr-20">
        <switchItem title="酒店" has-move :form="form" prop="jd" direction="right" :disabled="isDisabled" @switchItemChange="switchItemChange" />
      </div>
      <div v-if="model === 1" class="flex-1">
        <progressItem class="mb-4" :prog-list="progressData.jd1" @switchChange="switchChange" />
        <progressItem :prog-list="progressData.jd2" background="#BEBEBE" @switchChange="switchChange" />
      </div>

      <!-- 汇总模式 -->
      <div v-else class="flex-1">
        <progressAllItem class="mb-4" :prog-list="progressAllData.jd1" :max="maxNum" @switchChange="switchChange" />
        <progressAllItem :prog-list="progressAllData.jd2" background="#BEBEBE" :max="maxNum" @switchChange="switchChange" />
      </div>
    </div>
  </div>
</template>

<script>
import switchItem from './components/switchItem'
import progressItem from './components/progressItem'
import progressAllItem from './components/progressAllItem'
// 默认筛选
const defaultFrom = {
  ks: false, // 可售
  hqz: false, // 获取中
  gy: false,
  jd: false,
  zy: false,
  zj: false,
  sy: false,
  shangye: '0',
  shangyejie: '0',
  bg: false
}
// 分解模式数据
const defaultProgList = [
  {
    // 最大值
    max: 66,
    // 文字
    text: '40个',
    // 数字
    numList: [40],
    // 背景色
    bgColor: ['#41B2AB'],
    // 来自
    from: {
      isSwitch: false,
      list: ['AA', 'BBB', 'XXX']
    }
  },
  {
    max: 80,
    text: '50个',
    numList: [20, 30],
    bgColor: ['#41B2AB', '#004948'],
    // 来自
    from: {
      isSwitch: false,
      list: ['AA', 'BBB', 'XXX']
    }
  },
  {
    max: 66,
    text: '20个',
    numList: [20],
    bgColor: ['#41B2AB'],
    // 来自
    from: {
      isSwitch: false,
      list: ['AA', 'BBB', 'XXX']
    }
  }, {
    max: 66,
    text: '26个',
    numList: [26],
    bgColor: ['#BF9000'],
    // 来自
    from: {
      isSwitch: false,
      list: ['AA', 'BBB', 'XXX']
    }
  }
]

// 默认汇总模式数据
const defaultProgressAllData = {
  title: '160个',
  list: [
    { color: '#41B2AB', num: 80, // 来自
      from: {
        isSwitch: false,
        list: ['AA', 'BBB', 'XXX']
      }},
    { color: '#004948', num: 100, // 来自
      from: {
        isSwitch: false,
        list: ['AA', 'BBB', 'XXX']
      }}
  ]

}

// 默认汇总模式数据
const defaultProgressAllData2 = {
  title: '120个',
  list: [
    { color: '#41B2AB', num: 120, // 来自
      from: {
        isSwitch: false,
        list: ['AA', 'BBB', 'XXX']
      }},
    { color: '#004948', num: 30, // 来自
      from: {
        isSwitch: false,
        list: ['AA', 'BBB', 'XXX']
      }}
  ]

}
export default {
  name: 'ProgressMain',
  components: { switchItem, progressItem, progressAllItem },
  props: {
    // 模式切换
    model: {
      type: Number,
      default: 1
    },
    // 进度条数据
    progressData: {
      type: Object,
      default: () => {}
    },
    // 汇总模式最大值
    progAllMaxNum: {
      type: Number,
      default: 100
    },
    // 进度条-汇总模式数据
    progressAllData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 分解模式最大值
      maxNum: 200, // TODO接入数据时动态
      // 是否可选择可售等列表
      isDisabled: false,
      // 筛选form
      form: {},
      // 汇总模式数据
      progAllList: defaultProgressAllData,
      defaultProgressAllData2
    }
  },
  mounted() {
    console.log(this.progressData)
    this.form = { ...defaultFrom }
  },
  methods: {
    // 进度条选中了来自
    switchChange(e) {
      this.isDisabled = e
      if (e) {
        this.form = { ...defaultFrom }
        // 如果选中了 其他要改为false
      }
      this.$emit('switchItemChange', { ... this.form, from: e })
    },
    switchItemChange() {
      this.$emit('switchItemChange', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.first-box{
  width:142px
}
.border-right{
  border-right: 1px solid #B8B8B8;
  box-sizing: border-box;
}
</style>
