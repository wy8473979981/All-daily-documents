// 过滤输入值为数字
export default {
  bind: function(el,binding,vnode) {
    el.handler = function(e) {
      // e.target.value = e.target.value.replace(/\D+/, '')
      // console.log("el=====================",e);
      let val = e.target.value;
      // 清除"数字"和"."以外的字符
      val = val.replace(/[^\d]/g, '');
      // 只保留第一个, 清除多余的
      // val = val.replace(/\.{2,}/g, '.');
      // 第一个字符如果是.号，则补充前缀0
      // val = val.replace(/^\./g, '0.');
      // 只能输入两个小数
      // val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      // val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      // 控制的是如果没有小数点，首位不能为类似于 01、02
      // if (val.indexOf(".") < 0 && val != ""){
      //   val = parseFloat(val)
      // }
      // 去千分位分隔符
      // val = val.replace(/,/g, '')
      // 千分位分隔符
      // val = (parseFloat(val).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      // console.log((parseFloat(val).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
      // console.log(val)
      // console.log(vnode)
      // console.log(e)
      e.target.value = val;
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', val)
      } else {
        vnode.elm.dispatchEvent(new CustomEvent('input',val))
      }
    };
    el.addEventListener('input', el.handler)
  },
  unbind: function(el) {
    el.removeEventListener('input', el.handler)
  }
}
