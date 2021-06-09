<template>
  <div class="header">
    <div class="data-content">
      <div v-for="(item, index) in titleList" class="data-item">
        <p>{{ item.title }}</p>
        <p>{{ item.data }}</p>
      </div>
    </div>
    <div class="operate-wrap" :style="width">
      <el-select
        v-model="value1"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择物业类型"
      >
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value2" placeholder="请选择区域/城市">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-if="type != 1"
        v-model="monthValue"
        type="monthrange"
        range-separator="~"
        :clearable="false"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      />
      <el-date-picker
        v-if="type == 1"
        v-model="date"
        type="date"
        :clearable="false"
        placeholder="选择日期"
      />

      <el-radio-group v-model="echartsRadio" style="margin-left: 10px">
        <el-radio label="1">按权责</el-radio>
        <el-radio label="2">按合同</el-radio>
      </el-radio-group>
      <button class="blue-btn" @click="search">查询</button>
      <button class="reset-btn" @click="reset">重置</button>
      <button class="blue-btn" style="float: right">导出</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 宽度
    width: {
      type: String,
      default: function () {
        return "width:100%;";
      },
    },
    type: {
      type: Number,
      default: function () {
        return -1; // 欠费指标
      },
    },
    // 头部数据展示
    titleList: {
      type: Array,
      default: function () {
        return [
          {
            title: "累计客流",
            data: "1345.98",
          },
          {
            title: "客流密度",
            data: "0.78%",
          },
        ];
      },
    },
    searchClick: {
      type: Function,
      default: null,
    },
    resetClick: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      echartsRadio: "1",
      options1: [
        {
          value: "选项1",
          label: "购物中心",
        },
        {
          value: "选项2",
          label: "商业街",
        },
        {
          value: "选项3",
          label: "轻资产",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "上海地区",
        },
        {
          value: "选项2",
          label: "华南区域",
        },
        {
          value: "选项3",
          label: "东北区域",
        },
        {
          value: "选项4",
          label: "西北区域",
        },
        {
          value: "选项5",
          label: "华北区域",
        },
        {
          value: "选项6",
          label: "西南区域",
        },
      ],
      monthValue: "",
      value1: "",
      value2: "",
      date: "",
    };
  },
  methods: {
    reset() {
      this.monthValue = this.value1 = this.value2 = this.date = "";
      this.resetClick();
    },
    search() {
      console.log("111999");
      this.searchClick();
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
}

.echarts-tabs {
  width: 100%;
  height: 32px;
  background: #e5e2de;
  border-radius: 16px;
  font-size: 14px;
  color: #050101;
  line-height: 32px;
  padding-left: 15px;
  box-sizing: border-box;
}

::v-deep .el-radio {
  margin-right: 10px;
}

/* 选中后的字体颜色 */
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #050101 !important;
}

/* 选中后小圆点的颜色 */
::v-deep .el-radio__input.is-checked .el-radio__inner {
  background: #1c4c7f !important;
  border-color: #1c4c7f !important;
}

::v-deep .el-radio__label {
  color: #050101;
}

.data-content {
  display: flex;
  align-items: center;

  .data-item {
    margin-right: 78px;
    margin-bottom: 17px;

    > p:nth-child(1) {
      font-size: $font-base-size;
      font-family: MicrosoftYaHei;
      color: #050101;
      margin-bottom: 10px;
    }

    > p:nth-child(2) {
      font-size: $font-record-size;
      font-family: MicrosoftYaHei;
      color: #050101;
      line-height: 24px;
    }
  }
}

.operate-wrap {
  margin-bottom: 12px;

  ::v-deep.el-select {
    margin-right: 10px;
  }

  ::v-deep.el-input__inner {
    border: none;
    min-width: 194px;
    width: 194px;
    height: 32px;
    background: #fdfcfa;
    border-radius: 18px;

    &::placeholder {
      font-size: $font-base-size;
      font-family: MicrosoftYaHei;
      color: #848382;
    }
  }

  ::v-deep.el-range-editor.el-input__inner {
    width: 250px;
  }

  ::v-deep.el-date-editor .el-range__icon {
    line-height: 27px;
  }

  ::v-deep.el-input__inner {
    color: #050101 !important;
  }

  ::v-deep.el-range-input {
    color: #050101 !important;
  }

  ::v-deep.el-range-separator {
    line-height: 28px;
    color: #050101 !important;
  }

  ::v-deep.el-input__icon {
    line-height: 34px;
  }

  ::v-deep.el-icon-arrow-up:before {
    content: "\e78f";
  }

  .blue-btn {
    width: 80px;
    height: 32px;
    background: #1c4c7f;
    border-radius: 16px;
    font-size: $font-base-size;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    margin: 0 16px 0 8px;
  }

  .reset-btn {
    background: transparent;
    font-size: $font-base-size;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
}
</style>
