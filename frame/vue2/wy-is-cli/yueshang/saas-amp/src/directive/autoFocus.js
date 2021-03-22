// input 在v-if 显隐切换时，自动focus
export default {
  insert: (el) => {
    // el.focus(); // input
    el.children[0].focus(); // el-input
  },
  update: (el) => {
    // el.focus(); // input
    el.children[0].focus(); // el-input
  }
}