<template>
  <div class="base-container">
    <div class="general-info">
      <div class="title clearfix">
        <span class="pb pl-16 border-b1">新铺位一铺一价</span>
        <span class="right-icon fr" @click="handleToggle">
          收起
          <svg-icon icon-class="down-dark" class="down-dark" />
        </span>
      </div>
      <el-collapse-transition>
        <div v-show="isShow" class="w1121">
          <div class="project-title">
            <div class="mt-12 info-t text-14 flex-al-center pr-28 pl-20">
              <div class="flex1">年度</div>
              <div class="flex1 text-left">费项名称</div>
              <div class="flex1 text-left">费项标准(元/㎡)</div>
              <div class="flex1 text-left">费项时间单位</div>
              <div class="flex1 text-left">递增率(%)</div>
              <div class="flex1 text-left">操作</div>
            </div>
            <div class="text-14 flex-al-center info-item">
              <div class="flex1 text-left">
                <el-input v-model="value1" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region7" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value11" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region8" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value2" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <span class="icon-container">
                  <i class="el-icon-circle-plus down" />
                  <i class="el-icon-remove up" />
                </span>
              </div>
            </div>
            <div class="text-14 flex-al-center info-item">
              <div class="flex1 text-left">
                <el-input v-model="value3" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region1" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value12" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region2" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value4" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <span class="icon-container">
                  <i class="el-icon-circle-plus down" />
                  <i class="el-icon-remove up" />
                </span>
              </div>
            </div>
            <div class="text-14 flex-al-center info-item">
              <div class="flex1 text-left">
                <el-input v-model="value5" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region3" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value6" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region4" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value7" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <span class="icon-container">
                  <i class="el-icon-circle-plus down" />
                  <i class="el-icon-remove up" />
                </span>
              </div>
            </div>
            <div class="text-14 flex-al-center info-item">
              <div class="flex1 text-left">
                <el-input v-model="value8" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region5" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value9" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <el-select v-model="region6" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </div>
              <div class="flex1 text-left">
                <el-input v-model="value10" placeholder="请输入" />
              </div>
              <div class="flex1 text-left">
                <span class="icon-container">
                  <i class="el-icon-circle-plus down" />
                  <i class="el-icon-remove up" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoList: [
        { name: '项目名称', num: '上海青浦印力广场' },
        { name: '审批号', num: '20210428000012' },
        { name: '发起人', num: '李庆龙' },
        { name: '发起时间', num: '2021-04-28' },
        { name: '备注', num: '/' }
      ],
      isShow: true,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      region1: '',
      region2: '',
      region3: '',
      region4: '',
      region5: '',
      region6: '',
      region7: '',
      region8: ''
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

    .info-t{
        height: 36px;
        line-height: 36px;
        background: #E0DFDD;
        border-radius: 20px;
    }
    .info-item{
        padding: 10px 28px 10px 20px;
        border-bottom: 1px solid #E0DFDD;;
    }
    .flex1{
        flex: 1;
    }
    .w1121{
        width: 1121px;
    }
    .color-6F120C{
        color: #6F120C;
    }
  .project-title{
    ::v-deep.el-input__inner {
        width: 150px;
        height: 32px;
        border-radius: 16px;
        border: none;
    }
    .icon-container {
        i {
            font-size: 16px;
            cursor: pointer;
            &:nth-child(1) {
                margin-right: 15px;
            }
        }
    }
    .title {
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
        /*border-bottom:1px solid #050101;*/
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
  }
}

</style>
