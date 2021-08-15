<!-- 富文本编辑器 -->
<template>
  <div id="wangeditor" :class="{'hide': disabled}" style="width:calc(100%-160px)">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "richEditor",
  data() {
    return {
      editor: null,
    };
  },
  props: ['value','disabled'],
  watch: {
    disabled(val) {
      if (val) {
        // 禁用
        this.editor.disable();
      } else {
        // 启用
        this.editor.enable();
      }
    }
  },
  mounted() {
    // // 初始化
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = html => {
      // 把这个html通过catchData的方法传入父组件
      this.$emit('input',html);
    };
    this.editor.config.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.value);
    console.log(this.disabled)
    if(this.disabled) {
      this.editor.disable();
    }
  },
}
</script>

<style lang="scss">
#wangeditor {
  width: calc(100% - 160px);
  .w-e-toolbar {
    z-index: 201 !important;
  }
  .w-e-text-container {
    z-index: 200 !important;
  }
}
#wangeditor.hide {
  .w-e-toolbar {
    display: none;
  }
}
</style>