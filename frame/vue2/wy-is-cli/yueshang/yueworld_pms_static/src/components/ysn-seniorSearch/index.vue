<template>
  <div class="">
    <el-form ref="ruleForm" :model="form" :label-position="$attrs[`label-position`]" size="small">
      <div class="d-flex">
        <YsnFormitem
          :config="firstList"
          :form="form"
          :column="firstList.length"
          :item-width="itemWidth"
          :disabled="disabled"
          :clearable="clearable"
          auto-width
          label-position="left"
        />
        <div class="senior-search">
          <ysn-btn class="mr-16" @click="search()">查询</ysn-btn>
          <div v-if="twoList.length>0" class="senior cursor-pointer mr-16" @click="show = !show">
            <div class="senior-text">高级查询</div>
            <span :class="!show?'el-icon-arrow-down':'el-icon-arrow-up'" class="senior-icon" />
          </div>
          <ysn-btn type="reset" @click="resetForm()">重置</ysn-btn>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="show">
          <YsnFormitem
            v-for="(item,index) in twoList"
            :key="index"
            :config="item"
            :form="form"
            :column="column"
            :item-width="itemWidth"
            :disabled="disabled"
            :clearable="clearable"
            :label-position="labelPosition"
            auto-width
          />
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>
import YsnFormitem from '../ysn-formItem/index'
export default {
  name: 'YsnSeniorSearch',
  components: { YsnFormitem },
  props: {
    config: { type: Array, default: () => [] }, // 配置文件
    form: {
      type: Object, default: () => {}
    }, // 传进来的共享的form表单值对象
    column: { type: Number, default: 4 }, // 总的col布局
    itemWidth: { type: String, default: '100%' }, // form-item项的宽度
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    isSearch: { type: Boolean, default: true }, // 高级搜索
    // label位置
    labelPosition: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    //  第一行表单加搜索
    firstList() {
      const first = []
      this.config.filter((item, index) => {
        if (item.isFirst) {
          first.push(item)
        }
      })
      if (first[0].isSearch && first[0].itemType === 'input') {
        // 说明模糊查询
        first[0].hasTip = true
      }

      return first
    },
    //  第二行表单
    twoList() {
      const two = []
      this.config.filter((item, index) => {
        if (!item.isFirst) {
          two.push(item)
        }
      })
      const newConfig = []
      let configItem = []
      two.forEach((item, index) => {
        configItem.push(item)
        if (configItem.length === 4 || index + 1 >= two.length) {
          newConfig.push(configItem)
          configItem = []
        }
      })
      return newConfig
    }
  },

  methods: {
    // 搜索
    search() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          // 搜索字段抛出去接收
          this.$emit('searchResult', this.form)
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.d-flex{
    display: flex;
  .senior-search{
    display: flex;
    .search{
      width: 80px;
      height: 32px;
      background: #1C4C7F;
      border-radius: 16px;
      text-align: center;
      line-height: 32px;
      color:#ffffff;
      font-size: 14px;
    }
    .senior{
        display: flex;
        .senior-text{
        width: 56px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1C4C7F;
        line-height: 32px;
      }
      .senior-icon{
          color:#1C4C7F;
          line-height: 32px;
          margin-left:8px
      }
    }

     .reset{
        width: 28px;
        height: 14px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
        line-height: 32px;
        margin-left: 24px;
     }
  }
  }

</style>
