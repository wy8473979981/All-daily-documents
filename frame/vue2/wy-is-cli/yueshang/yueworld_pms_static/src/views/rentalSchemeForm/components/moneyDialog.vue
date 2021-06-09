
<template>
  <div class="dialogd">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="920px"
      :before-close="handleClose"
    >
      <el-divider></el-divider>
      <div>
        <el-form class="colum">
          <div class="dfhang">
            <div class="form">
              <el-form-item label="费项性质" required class="deleft">
                <el-select v-model="one" placeholder="请选择费项性质">
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
            
            <div class="formhang">
              <el-form-item label="合同费项名称" required class="deleft">
                <el-input
                    placeholder="请输入名称"
                    v-model="two"
                ></el-input>
              </el-form-item>
              <el-form-item label="费项类型" required class="deleft">
                <el-select v-model="three" placeholder="请选择费项类型">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应收规则" required class="deleft">
                <el-select v-model="four" placeholder="请选择应收规则">
                  <el-option
                    v-for="item in [{ id: 1, name: '分整月非整月' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="formhang">
              <el-form-item label="税率范围" required class="deleft">
                <el-select v-model="five" placeholder="可以定制的选择范围">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="税率" required class="deleft">
                <el-select v-model="six" placeholder="请选择初始默认值">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否必填" required class="deleft">
                <el-select v-model="seven" placeholder="请选择是否必填">
                  <el-option
                    v-for="item in [{ id: 1, name: '是' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="费项状态" required class="deleft">
                <el-select v-model="eight" placeholder="请选择费项状态">
                  <el-option
                    v-for="item in [{ id: 1, name: '正常' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="formhang">
              <el-form-item label="票据类型" required class="deleft">
                <el-select v-model="nine" placeholder="请选择票据类型">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排列编号" required class="deleft">
                <el-select v-model="ten" placeholder="00001">
                  <el-option
                    v-for="item in []"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否统计总金额" required class="deleft">
                <el-select v-model="oneone" placeholder="请选择是否统计总金额">
                  <el-option
                    v-for="item in [{ id: 1, name: '是' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="小数取值规则" required class="deleft">
                <el-select v-model="onetwo" placeholder="请选择小数取值规则">
                  <el-option
                    v-for="item in [{ id: 1, name: '四舍五入保留两位小数' }]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
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
      one: 1,
      two: '',
      three: '',
      four: 1,
      five: '',
      six: '',
      seven: 1,
      eight: 1,
      nine: '',
      ten: '',
      oneone: 1,
      onetwo: 1,
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

.dfhang {
  .form {
    width: 206px;
    margin-right: 15px;
  }
  .formhang{
      display: flex;
      .el-form-item{
          margin-right: 15px;
      }
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
</style>