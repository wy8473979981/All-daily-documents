<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" @close="$emit('update:show', false)" width="500px" v-if="show" @submit.native.prevent>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-row>
          <el-col>是否开启{{nextYear}}年度预算编制？开启后，自动为各个部门创建{{nextYear}}年度预算表并可进行预算编制；</el-col>
          <el-col :span="10">
            <el-form-item label="请设置预算关闭的时间">
              <el-date-picker size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" v-model.trim="form.time" clearable type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="info" @click="visible = false">暂不开启</el-button>
        <el-button size="mini" type="success" @click="ok">确定开启</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="successVisible" :close-on-click-modal="false" :show-close="false" width="500px" @submit.native.prevent>
      <el-row class="success">
        <el-col :span="24">
          <i class="el-icon-success"></i>
        </el-col>
        <el-col :span="24">
          <span class="tip1">开启成功</span>
        </el-col>
        <el-col :span="24">
          <span class="tip2">即时起至{{form.time}}，各部门可以进行{{nextYear}}年度预算编制</span>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import ReadApi from '@/apis/apis/readApi'
export default {
  name: 'startDialog',
  data: function () {
    return {
      title: null,
      contentTip: null,
      nextYear: null,
      visible: this.show,
      successVisible: false,
      form: {
        time: null
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  computed: {
    isShow: {
      get () {
        return this.visible
      },
      set () { }
    }
  },
  created () {
    var date = new Date()
    this.nextYear = date.getFullYear() + 1
    this.title = `开启${this.nextYear}年度预算编制`
  },
  methods: {
    async ok () {
      // this.successVisible = true;
      // setTimeout(() => {
      //   this.successVisible = false;
      // }, 1500)

      await ReadApi.openBudget().then(res => {
        if (res.code === 0) {
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.success {
  text-align: center;
  .el-col {
    margin: 15px 0;
  }
  .el-icon-success {
    font-size: 100px;
    color: #52c41a;
  }
  .tip1 {
    font-size: 34px;
    font-weight: bold;
    margin-right: 15px;
  }
}
</style>
