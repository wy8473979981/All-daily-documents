<template>
  <section class="choose-type">
    <el-card
      @click.native="chooseType(item.val)"
      :class="{'active': item.val === insertType}"
      shadow="hover"
      v-for="(item, index) in insertTypeList"
      :key="index"
    >
      <el-image fit="cover" :src="item.imgPath" alt></el-image>
      <strong style="padding-top: 10px; display: block;">{{item.label}}</strong>
    </el-card>
    <!-- <ys-modal-btn-group
      @goStep="goStep"
      @toggleModal="toggleModal"
      :step="step"
    /> -->
  </section>
</template>

<script>
export default {
  props: {
    insertType: {
      type: String
    }
  },
  data() {
    return {
      step: 0, // 本組件自己的步驟
      insertTypeList: [
        // {
        //   label: "元素",
        //   val: "elementComp",
        //   imgPath: require("@images/wd_logo.png")
        // },
        // {
        //   label: "集合",
        //   val: "groupComp",
        //   imgPath: require("@images/wd_logo.jpg")
        // },
        {
          label: "THML",
          val: "htmlComp",
          imgPath: require("@images/html.jpg")
        },
        // {
        //   label: "图片",
        //   val: "imageComp",
        //   imgPath: require("@images/wd_logo.jpg")
        // },
        {
          label: "组合数据",
          val: "objComp",
          imgPath: require("@images/combination.jpg")
        }
      ]
    };
  },
  methods: {
    toggleModal () {
      this.$emit("toggleModal")
    },
    goStep(val) {
      if (this.insertType === '' && val === 1) {
        this.$message.error('请选择要插入的数据类型')
        return
      }
      this.$emit('changeStep', 1)
    },
    // 选择插入类型
    chooseType(val) {
      // this.insertType = val
      this.$emit("sendInsertType", val);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-card.active {
  border: 1px solid #ababab;
}
</style>
