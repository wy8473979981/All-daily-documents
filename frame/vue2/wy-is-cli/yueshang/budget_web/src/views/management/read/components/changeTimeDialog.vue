<template>
  <el-dialog :title="title" :visible.sync="visible" @close="$emit('update:show', false)" width="500px" v-if="show" @submit.native.prevent>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-row>
        <el-col>
          <el-form-item label="">
            <el-radio-group v-model="form.type">
              <el-radio label="1">定时关闭</el-radio>
              <el-radio label="2">立即关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="请设置预算关闭的时间">
            <el-date-picker size="mini" v-model.trim="form.time" clearable type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="info" @click="visible = false">取 消</el-button>
      <el-button size="mini" type="success" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  name: 'startDialog',
  data: function () {
    return {
      title: null,
      contentTip: null,
      nextYear: null,
      visible: this.show,
      form: {
        type: null,
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
    this.title = `修改${this.nextYear}度预算编制关闭时间`
  },
  methods: {
    ok () {
      this.visible = false
      this.$emit('listenEvent', this.form)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
