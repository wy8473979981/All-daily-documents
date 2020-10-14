<template>
  <div class="container">
    <el-row>
      <Title title="消息" />
      <el-button type="success" size="small" :plain="true" @click="open2">成功</el-button>
      <el-button type="warning" size="small" :plain="true" @click="open3">警告</el-button>
      <el-button type="primary" size="small" :plain="true" @click="open1">消息</el-button>
      <el-button type="danger" size="small" :plain="true" @click="open4">错误</el-button>
    </el-row>
    <el-row>
      <Title title="通知" />
      <el-button type="success" size="small" @click="open5">成功</el-button>
      <el-button type="warning" size="small" @click="open6">警告</el-button>
      <el-button type="primary" size="small" @click="open7">消息</el-button>
      <el-button type="danger" size="small" @click="open8">错误</el-button>
    </el-row>
    <el-row>
      <Title title="提示弹窗1"/>
      <el-button type="success" size="small" @click="diagloTipVisable = true">表单提交成功/失败提示弹窗</el-button>
      <el-dialog  :visible.sync="diagloTipVisable"  width="420px">
        <el-form :model="form" :inline="true"  size="small" class="dialog-tip">
            <i class="el-notification_icon el-icon-success"></i>
            <h4>提交成功</h4>
            <p>这里是一些提示这里是一些提示</p>
        </el-form>
      </el-dialog>
    </el-row>
    <el-row>
      <Title title="提示弹窗2"/>
      <el-button type="success" size="small" @click="open">提示弹框</el-button>
    </el-row>
    <el-row>
      <Title title="内容表单弹窗" />
      <el-button type="success" size="small" @click="dialogFormVisible = true">内容表单提交弹窗</el-button>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible"  width="640px">
      <el-form :model="form" :inline="true" label-width="80px" size="small" class="dialog-label">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input
                v-model="form.name"
                placeholder="请输入活动名称"
                autocomplete="off"
                class="form-item"
              ></el-input>
            </el-form-item>
           </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型">
              <el-select v-model="form.region" placeholder="请选择活动类型">
                <el-option label="户外" value="shanghai"></el-option>
                <el-option label="室内" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input
                v-model="form.name"
                placeholder="请输入活动名称"
                autocomplete="off"
                class="form-item"
              ></el-input>
            </el-form-item>
           </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型">
              <el-select v-model="form.region" placeholder="请选择活动类型">
                <el-option label="户外" value="shanghai"></el-option>
                <el-option label="室内" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称">
              <el-input
                v-model="form.name"
                placeholder="请输入活动名称"
                autocomplete="off"
                class="form-item"
              ></el-input>
            </el-form-item>
           </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型">
              <el-select v-model="form.region" placeholder="请选择活动类型">
                <el-option label="户外" value="shanghai"></el-option>
                <el-option label="室内" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="btn-twofont">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" class="btn-twofont">确 定</el-button>
      </div>
    </el-dialog>
    </el-row>
    
  </div>
</template>

<script>
import Title from "@/components/Title";
export default {
  props: {},
  data() {
    return {
      diagloTipVisable:false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    openDialog() {},
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    open1() {
      this.$message("这是一条消息提示");
    },
    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },

    open3() {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning"
      });
    },

    open4() {
      this.$message.error("错了哦，这是一条错误消息");
    },

    open5() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success"
      });
    },

    open6() {
      this.$notify({
        title: "警告",
        message: "这是一条警告的提示消息",
        type: "warning"
      });
    },

    open7() {
      this.$notify.info({
        title: "消息",
        message: "这是一条消息的提示消息"
      });
    },

    open8() {
      this.$notify.error({
        title: "错误",
        message: "这是一条错误的提示消息"
      });
    }
  },
  components: {
    Title
  }
};
</script>

<style scoped >
.container {
  padding:0px 30px 30px;
}
/* .form-item {
  width: 200px;
} */
button {
  margin-right: 25px;
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>
