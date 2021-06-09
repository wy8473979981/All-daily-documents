
<template>
  <div class="dialogd">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="476px"
      :before-close="handleClose"
    >
      <el-divider></el-divider>
      <div>
        <el-form class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="费项" required class="deleft">
                <el-select v-model="one" placeholder="请选择费项">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="跨年计算" required class="deleft">
                <el-select v-model="two" placeholder="请选择跨年计算">
                  <el-option
                    v-for="item in [{ id: 1, name: '开始年' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="df" style="margin-top: -15px;">
            <div class="form">
              <el-form-item label="多铺位平均计算公式" required class="deleft">
                <el-select v-model="three" placeholder="请选择计算公式">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="一铺一价类型" required class="deleft">
                <el-select v-model="four" placeholder="请选择类型">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="df" style="margin-top: -15px;">
            <div class="form">
              <el-form-item label="状态" required class="deleft">
                <el-select v-model="five" placeholder="请选择状态">
                  <el-option
                    v-for="item in [{ id: 1, name: '保证金' },{id:2,name:'一次性'}]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="df" style="margin-top: -10px;">
            <div class="form">
              <el-form-item label="日单价" required class="deleft">
                <div class="kuang">
                  <p>日单价=不换算，月单价=申请价格*固定天数,月单价=申请价格*自然月 ，月单价=日单价*固定年/12</p>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="df" style="margin-top: -10px;">
            <div class="form">
              <el-form-item label="日单价" required class="deleft">
                <div class="kuang">
                  <p>日单价=不换算，月单价=申请价格*固定天数,月单价=申请价格*自然月 ，月单价=日单价*固定年/12</p>
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "moneyDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      one: '',
      two: 1,
      three: '',
      four: '',
      five: '',
      six: '',
      seven: '',
      visible: false,
    };
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    },
  },
  methods: {
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogd {
  ::v-deep.el-dialog__footer {
    margin-top: 45px;
  }

  ::v-deep.el-button--medium {
    padding: 10px 13px;
  }

  ::v-deep .el-dialog {
    background: #fdfcfa;
  }

  ::v-deep.el-icon-arrow-up:before {
    content: "\e78f";
  }

  p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    margin-top: 33px;
    padding-left: 8px;
    margin-bottom: 8px;
  }

  ::v-deep .el-dialog__body {
    padding: 0 24px 0 24px;
  }

  ::v-deep.el-dialog {
    border-radius: 20px;
  }

  ::v-deep.dialog-footer .el-button--primary {
    width: 86px;
    height: 32px;
    background: #1c4c7f !important;
    border-radius: 16px;
  }

  ::v-deep.dialog-footer .el-button {
    width: 86px;
    height: 32px;
    background: #e5e2de;
    border-radius: 16px;
    line-height: 0;
  }

  ::v-deep.el-divider--horizontal {
    padding: 0;
    margin: 8px;
  }

  ::v-deep .el-dialog__header {
    padding-bottom: 0;
    font-weight: bold;
  }
}

.df {
  display: flex;
  margin-top: 20px;

  .form {
    width: 206px;
    margin-right: 15px;
  }

  ::v-deep .el-input__inner {
    background-color: #efedea;
    border-radius: 16px;
    border: none;
    width: 206px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 14px;
    .el-input__suffix-inner {
      color: #050101;
    }
  }
}
.kuang{
  width: 428px;
  height: 60px;
  background: #EFEDEA;
  border-radius: 12px;
  font-size: 14px;
  margin-top: 35px;
  color: #848382;
  line-height: 22px;
  text-indent:-55px;
}


</style>