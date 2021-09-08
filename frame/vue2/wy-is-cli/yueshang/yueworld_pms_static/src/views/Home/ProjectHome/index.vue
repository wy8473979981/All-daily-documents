<template>
  <div class="project-content">
    <div class="top-bar">
      <div class="left pr-40 pl-16">
        <span :class="['mr-40','cursor-pointer',activeIndex==1?'active':'']" @click="changeActive(1)">指标详情</span>
        <span :class="['cursor-pointer',activeIndex==2?'active':'']" @click="changeActive(2)">租赁图</span>
      </div>
      <div class="right">
        <el-form :model="formData" size="small">
          <ysn-formItem :form="formData" :config="formConfig" :column="1" :auto-width="true" inline />
        </el-form>
        <!-- <el-select v-model="value" placeholder="请选择" style="width: 194px;margin-right: 20px" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-if="activeIndex==1"
          v-model="value1"
          size="small"
          type="date"
          class="ysn-el-date"
          prefix-icon="none"
          clear-icon="icon-date-picker-none"
          placeholder="选择日期"
        />
        <el-select v-if="activeIndex==2" v-model="value2" placeholder="请选择" style="width: 194px;" size="small">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
      </div>
    </div>
    <project-base-info v-if="activeIndex == 1" />
    <lease-map v-else />
  </div>
</template>

<script>
import ProjectBaseInfo from './components/baseInfo'
import LeaseMap from './components/map'
export default {
  name: 'ProjectHome',
  components: { LeaseMap, ProjectBaseInfo },
  data() {
    return {
      activeIndex: 1,
      value: '1',
      value1: '',
      value2: '',
      formData: { value1: '1', value2: '' },
      options: [
        {
          value: '1',
          label: '七宝'
        }, {
          value: '2',
          label: '闵行'
        }
      ],
      options2: [
        {
          value: '1',
          label: '1栋'
        }, {
          value: '2',
          label: '2栋'
        }
      ]
    }
  },

  computed: {
    formConfig() {
      // eslint-disable-next-line
      let firstConfig = [
        {
          itemType: 'select',
          prop: 'projectId',
          label: '',
          placeholder: '请选择',
          width: '194px',
          isFirst: true,
          list: this.options,
          listName: 'label',
          listValue: 'value'
        }
      ]
      if (this.activeIndex === 1) {
        firstConfig.push({
          itemType: 'datePicker',
          prop: 'date',
          label: '',
          width: '194px',
          isFirst: true,
          placeholder: '选择日期',
          type: 'month',
          valueFormat: 'yyyy-MM'
        })
      } else {
        firstConfig.push({
          itemType: 'select',
          prop: 'buildId',
          label: '',
          placeholder: '请选择',
          width: '194px',
          isFirst: true,
          list: this.options2,
          listName: 'label',
          listValue: 'value'
        })
      }
      return firstConfig
    }
  },

  methods: {
    changeActive(v) {
      this.activeIndex = v
    }
  }
}
</script>
<style>
  .el-input--small .el-input__inner{
    border-radius: 18px;
  }
</style>
<style scoped lang="scss">
.project-content{
  height: 100%;
  padding-top: 10px;
  padding-right: 24px;
  overflow: auto;
  .top-bar{
    display: flex;
    justify-content: space-between;
    .left{
      border-radius: 24px;
      font-size: 14px;
      color: #050101;
      line-height: 30px;
      display: flex;
      background-color: white;
    }
    .active{
      font-size: 16px;
      font-weight: bold;
      color: #1C4C7F;
      border-bottom: 2px solid #1C4C7F;
    }
  }
  ::v-deep .el-input--small .el-input__inner {
    border: none;
  }
  .right {
    height: 32px;
  }

  ::v-deep .flod-header--title {
    padding-left: 0;
  }
}
</style>
