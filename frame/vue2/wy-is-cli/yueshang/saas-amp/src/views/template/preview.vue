<template>
  <el-dialog :visible="visible" :fullscreen="true" :show-close="false">
    <el-button
      size="mini"
      type="primary"
      @click="close"
      slot="title"
    >关闭</el-button>
    <el-row type="flex" :gutter="20" class="preview-main">
      <el-col :span="6">
        <section class="scroll-box">
          <ul>
            <li v-for="(item, index) in 10000" :key="index" style="border-bottom: 1px solid black; height: 50px;">hello, {{item}}</li>
          </ul>
        </section>
      </el-col>
      <el-col :span="18">
        <section class="scroll-box">
          <article class="content-preview" v-html="contractHtml" contenteditable="true"></article>
        </section>
      </el-col>
    </el-row>
      <!-- <el-button
        size="mini"
        type="primary"
        @click="close"
      >关闭</el-button>
      <el-divider></el-divider>
      <article class="content-preview" v-html="contractHtml"></article> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    contractHtml: {
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$emit('toggle', {name: 'preview', visible: false})
    }
  }
}
</script>

<style lang='scss' scoped>
div.preview-main{
  display: flex;
  .scroll-box{
    overflow-y: scroll;
    height: 500px;
  }
  .content-preview{
    min-height: 450px;
    border: 1px solid #333;
  }
}
</style>
