<template>
  <div class="container">
    <Title title="默认按钮" />
    <el-row>
      <el-button size="small" type="primary">主要按钮</el-button>
      <el-button size="small" type="success">信息按钮</el-button>
      <el-button size="small" type="warning">警告按钮</el-button>
      <el-button size="small" type="danger">危险按钮</el-button>
      <el-button size="small" >取消按钮</el-button>
    </el-row>
    <el-row>
      <Title title="按钮组" />
      <el-button-group>
        <el-button size="small" type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button size="small" type="primary">
          下一页
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
      <el-button-group>
        <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="small" type="primary" icon="el-icon-share"></el-button>
        <el-button size="small" type="primary" icon="el-icon-delete"></el-button>
      </el-button-group>
    </el-row>
  </div>
</template>

<script>
import Title from "@/components/Title";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    Title
  }
};
</script>

<style scoped>
button {
  margin-right: 25px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.container {
  padding: 20px 30px 30px;
}
</style>
