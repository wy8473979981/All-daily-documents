<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:全局搜索组件
-->
<template>
  <div>
    <div class="search-input-content mb-8">
      <svg-icon icon-class="menuSearch" />
      <input v-model="form.searchValue" placeholder="全局搜索">
    </div>
    <!-- 底部按钮 -->
    <div>
      <el-button type="primary" size="small" round class="left-btn">
        <span class="font-14" @click="search">搜索</span>
      </el-button>

      <!-- 字段选择 -->
      <ysn-selectDialog :form="form" prop="searchSelect" :list="globalSearchList">
        <div class="set-select ml-8 right-down-icon pl-8">
          <!-- 默认文字 -->
          <span v-if="form.searchSelect.length===0" class="ml-8">设定条件</span>
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>0" size="small" closable color="#1C4C7F" class="tag px-8" disable-transitions @close="tagClose">
            <span class="text-truncate tag-text">
              {{ form.searchSelect[0]| getOptionsLabel('globalSearchList') }}
            </span>
          </el-tag>

          <!-- 选中2个以上 -->
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>1" size="small" color="#1C4C7F" class="tag px-8" disable-transitions>
            +{{ form.searchSelect.length-1 }}
          </el-tag>
        </div>
      </ysn-selectDialog>

    </div>
  </div>
</template>
<script>
import { globalSearchList } from '@/utils/optionsList'
export default {
  name: 'YsnGlbSearch',
  data() {
    return {
      // 搜索form
      form: {
        searchValue: '', // 搜索内容
        searchSelect: [] // 搜索select
      },
      // 搜索字典表
      globalSearchList
    }
  },
  methods: {
    // tag关闭
    tagClose() {
      this.form.searchSelect.shift()
    },
    // 搜索
    search() {
      const { searchValue, searchSelect } = this.form

      // 搜索字符校验
      if (searchValue.length < 2) {
        this.$message.error('搜索内容不能小于2个字符')
        return
      }

      // 搜索条件校验
      if (searchSelect.length === 0) {
        this.$message.error('设定条件必选')
        return
      }

      // this.$router.push({ name: 'globalSearch', query: { searchValue, searchSelect: searchSelect.join(',') }})

      const { href } = this.$router.resolve({
        name: 'GlobalSearch',
        query: {
          searchValue,
          searchSelect: searchSelect.join(',')
        }
      })
      // window.open(href, '_blank')
      window.location.href = href
    }
  }
}
</script>

<style lang="scss" scoped>
    .search-input-content{
        height: 34px;
        width: 236px;
        background: #FDFCFA;
        font-size: 24px;
        vertical-align: middle;
        line-height: 34px;
        border-radius: 16px;
        padding:0 14px;
        box-sizing: border-box;
        & input{
            width: 165px;
            height: 34px;
            vertical-align: top;
            background: none;
            display: inline-block;
            font-size: 14px;
            border: none;
            color: rgba(5, 1, 1, 1);
        }
    }

    .left-btn{
        width: 86px;
        padding: 0;
    }

    .set-select{
        width: 142px;
        height: 34px;
        background: #E5E2DE;
        border-radius: 16px;
        font-size: 14px;
        color: #848382;
        display: inline-block;
        box-sizing: border-box;
        line-height: 34px;
        cursor: pointer;
    }

    .tag{
      color: #fff;
      border-radius: 20px;
      vertical-align: middle;
        ::v-deep .el-tag__close{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .tag-text{
      display: inline-block;
      width: 40px;
      vertical-align: middle;
      line-height: 24px;
    }
</style>
