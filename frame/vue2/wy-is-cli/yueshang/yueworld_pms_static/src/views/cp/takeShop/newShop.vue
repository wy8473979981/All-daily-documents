<template>
  <div class="base-container">
    <div class="general-info">
      <div class="title clearfix">
        <span class="pb pl-16 border-b1">新铺位</span>
        <span class="right-icon fr" @click="handleToggle">
          收起
          <svg-icon icon-class="down-dark" class="down-dark" />
        </span>
      </div>

    </div>
    <el-collapse-transition>
      <div v-show="isShow" class="common-detail">
        <div class="d-flex info-box pt-4 pl-16">
          <div v-for="(item,index) in infoList" :key="index" class="item">
            <div class="text-14 mtb-8">{{ item.name }}</div>
            <div class="text-24">{{ item.num }}</div>
          </div>
        </div>
        <div class="new-shop-form-container">
          <el-form inline label-position="top" :model="formInline" class="new-shop-form" :rules="rules">
            <el-form-item label="规划业态" prop="region1">
              <el-select v-model="formInline.region1" placeholder="请选择业态">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="商铺类型" prop="region1">
              <el-select v-model="formInline.region2" placeholder="请选择商铺类型">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="得房率" prop="region1">
              <el-select v-model="formInline.region3" placeholder="请选择得房率">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="产权性质" prop="region1">
              <el-select v-model="formInline.region4" placeholder="请选择产权性质">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="商铺属性" prop="region1">
              <el-select v-model="formInline.region5" placeholder="请选择商铺属性">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="计租方式" prop="region1">
              <el-select v-model="formInline.region6" placeholder="请选择计租方式">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="计租面积" prop="region1">
              <el-select v-model="formInline.region7" placeholder="请选择计租面积">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="建筑面积" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="套内面积" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="生效日期" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="租赁保证金标准(元)" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="装修保证金标准(元)" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="免租期(天)" prop="region1">
              <el-input placeholder="请输入" />
            </el-form-item>
            <el-form-item label="计入统计" prop="region1">
              <el-checkbox>开业率</el-checkbox>
              <el-checkbox>出租率</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoList: [
        { name: '铺位号', num: '001' },
        { name: '楼栋', num: 'T1' },
        { name: '楼层', num: 'F01' }
      ],
      isShow: true,
      formInline: {
        region1: '',
        region2: '',
        region3: '',
        region4: '',
        region5: '',
        region6: '',
        region7: ''
      },
      rules: {
        region1: [
          { required: true, message: '' }
        ]
      }
    }
  },
  methods: {
    handleToggle() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="scss" scoped>
.general-info{
    margin-top: 20px;
    align-items: stretch;
    .title{
        font-size: 16px;
        font-weight: bold;
        color: #050101;
        line-height: 24px;
        border-bottom: 1px solid #D1CEC9;
    }
    .border-b1{
        position: relative;
        display: inline-block;
        width: 140px;
    }
    .border-b1::after {
        height: 1px;
        width: 100%;
        transform: scaleY(0.5);
        left: 0;
        content: '';
        position: absolute;
        background-color: #050101;
        bottom: -1px;
    }
    .right-icon {
        font-size: 12px;
        cursor: pointer;
        &:hover {
            color: #1C4C7F;
        }
        .down-dark {
            vertical-align: middle;
            font-size: 20px;
        }
    }
}
.common-detail {
    .info-box {
        .text-24 {
            font-size: 24px;
            color: #050101;
            line-height: 36px;
        }
        .item{
            margin-right: 123px;
        }
        .font-10{
            font-size: 10px;
        }
        .font-14{
            font-size: 14px;
        }
        .mtb-8 {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
    .new-shop-form {
        margin-top: 18px;
        ::v-deep .el-form-item {
            margin-bottom: 10px;
        }
        ::v-deep .el-form-item__label {
            font-size: 12px;
            color: $font-word-color;
            line-height: 8px;
        }
        ::v-deep .el-input__inner {
            width: 206px;
            height: 32px;
            border-radius: 16px;
            border: none;
        }
        ::v-deep.el-checkbox__label {
            color: $font-word-color;
        }
    }
}
</style>
