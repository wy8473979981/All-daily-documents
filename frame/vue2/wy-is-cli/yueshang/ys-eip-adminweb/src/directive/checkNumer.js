// 过滤输入值为数字+小数
export default {
  bind: function(el,binding) {
    el.handler = function(e) {
      let val = e.target.value;
      // 清除"数字"和"."以外的字符
      val = val.replace(/[^\d.]/g, '');
      // 只保留第一个, 清除多余的
      val = val.replace(/\.{2,}/g, '.');
      // 第一个字符如果是.号，则补充前缀0
      val = val.replace(/^\./g, '0.');
      // 只能输入两个小数
      val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      e.target.value = val
    };
    el.addEventListener('input', el.handler)
  },
  unbind: function(el) {
    el.removeEventListener('input', el.handler)
  },
  // inserted: function (el) {

  // }
}
