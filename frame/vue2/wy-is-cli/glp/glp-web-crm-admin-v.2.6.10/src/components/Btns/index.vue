<template>
  <div class="btns">
    <el-button v-if="btnsProps.edit" size="small" type="primary" @click="btnsProps.edit.func">{{btnsProps.edit.text||'修改'}}</el-button>

    <el-button v-if="btnsProps.termination" size="small" type="primary" @click="btnsProps.termination.func">{{btnsProps.termination.text||'终止'}}</el-button>

    <el-button v-if="btnsProps.delete" size="small" type="primary" @click="btnsProps.delete.func">{{btnsProps.delete.text||'删除'}}</el-button>

    <el-button v-if="btnsProps.submit" size="small" type="primary" @click="btnsProps.submit.func">{{btnsProps.submit.text||'提交'}}</el-button>

    <el-button v-if="btnsProps.reject" size="small" type="danger" class="color-refuse-b" @click="btnsProps.reject.func">{{btnsProps.reject.text||'拒绝'}}</el-button>

    <el-button v-if="btnsProps.rebut" size="small" type="warning" @click="btnsProps.rebut.func">{{btnsProps.rebut.text||'驳回'}}</el-button>

    <el-button v-if="btnsProps.recheck" size="small" type="success" @click="btnsProps.recheck.func">{{btnsProps.recheck.text||'复核'}}</el-button>

    <el-button v-if="btnsProps.reset" size="small" @click="btnsProps.reset.func">{{btnsProps.reset.text||'重置'}}</el-button>

    <el-button v-if="btnsProps.transfer" size="small" type="primary" @click="btnsProps.transfer.func">{{btnsProps.transfer.text||'转让'}}</el-button>

    <el-button v-if="btnsProps.receive" size="small" type="primary" @click="btnsProps.receive.func">{{btnsProps.receive.text||'领用'}}</el-button>

    <el-button v-if="btnsProps.release" size="small" type="primary" @click="btnsProps.release.func">{{btnsProps.release.text||'释放'}}</el-button>

    <el-button v-if="btnsProps.share" size="small" type="primary" @click="btnsProps.share.func">{{btnsProps.share.text||'共享'}}</el-button>

    <el-button v-if="btnsProps.cancel" size="small" type="primary" @click="btnsProps.cancel.func">{{btnsProps.cancel.text||'重置'}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    btnsProps: {
      type: Object,
      default: function () {
        return {
          back: {
            text: "返回",
            func: function () {
              window.location.history.back();
            }
          }
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() { },
  mounted() { },
  watch: {},
  methods: {}
};
</script>

<style >
.btns {
  margin: 10px 0;
  text-align: center;
}
.btns button {
  border: none;
}
.card-header {
  color: #000;
  /* height: 40px; */
  line-height: 40px;
  background-color: #fafafa;
  font-size: 14px;
  padding-left: 10px;
  border-top-left-radius: 5px;
  margin-bottom: 10px;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  border-top-right-radius: 5px;
}
.title {
  line-height: 30px;
}
</style>
