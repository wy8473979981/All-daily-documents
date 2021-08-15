// 驳回弹框组件
<template>
  <div>
    <el-dialog
      class="yjx"
      title="驳回到节点"
      :visible.sync="fast"
      width="450px"
      v-dialogDrag
      >
      <span v-if="list.length < 1" class="yjx-title">当前审批单将直接驳回到发起人</span>
      <div v-else>
        <span class="yjx-title">驳回到：</span>
        <el-select style="width:300px" clearable v-model="rejectStepId" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.stepId"
              :label="item.showStepName"
              :value="item.stepId">
            </el-option>
        </el-select>
        <span v-show="rejectStepId == ''" style="display:block;color:red;margin-top:10px;padding-left:100px">（选择空则驳回到发起人）</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fast = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import approval from '@/apis/apis/approval';
export default {
  name: 'Detail',
  props: ['showRejectDialog', 'currApproveStepId'],
  data() {
    return {
      list: [],
      rejectStepId: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        return this.showRejectDialog
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    fast(val) {
      if(val) {
        this.getDenyStepList();
      }
    }
  },
  methods: {
    cancel() {
      this.fast = false;
    },
    confirm() {
      this.$emit('confirm',{type: 'D', rejectStepId: this.rejectStepId});
    },
    getDenyStepList() {
      const param = {
        approveId: this.$route.query.id,
        currApproveStepId: this.currApproveStepId
      }
      approval.getDenyStepList(param).then(res => {
        if (res.code == 1) {
          this.list = res.data;
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .yjx-title {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>