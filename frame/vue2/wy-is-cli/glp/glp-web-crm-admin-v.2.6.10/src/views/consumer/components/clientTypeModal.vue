<template>
  <el-dialog
    title="请选择客户类型"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="400px"
    class="clientTypeModal"
    v-if="show"
  >
    <el-form :model="form" class="demo-form-inline">
      <el-row>
        <el-col :span="24">
          <el-form-item label>
            <el-radio-group v-model="form.type">
              <el-radio label="ENTERPRISE">企业客户</el-radio>
              <br />
              <el-radio label="INDIVIDUAL">个人客户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  components: {},
  name: "clientTypeModal",
  data: function() {
    return {
      visible: this.show,
      form: {
        type: ""
      },
      addPath: "/consumer/index/add"
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  computed: {
    isShow: {
      get() {
        return this.visible;
      },
      set() {}
    }
  },
  created() {},
  methods: {
    ok() {
      if (!this.form.type) {
        this.$message({ type: "warning", message: "请选择客户类型" });
        return true;
      }
      this.visible = false;
      this.$router.push({
        path: this.addPath,
        query: {
          currConsumerType: this.form.type
        }
      });
      // this.$router.push({
      //   name: "consumerAdd",
      //   params: {
      //     currConsumerType: this.form.type
      //   }
      // });
    }
  }
};
</script>

<style lang="scss">
.clientTypeModal {
  .el-dialog__body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-radio {
    margin-bottom: 30px;
    font-size: 24px;
    .el-radio__label {
      font-size: 24px;
    }
  }
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
}
</style>