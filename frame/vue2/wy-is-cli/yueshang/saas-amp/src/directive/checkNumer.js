import Vue from 'vue'

// 过滤输入值为数字+小数
export default {
  // bind: function(el) {
  //   const input = el.getElementsByTagName('input')[0]
  //   console.log(input)
  //   input.oninput = function(e) {
  //     // console.log(e)
  //     const v = input.value;
  //     // console.log(v)
  //     console.log(input.value)
  //     // if(input.value.indexOf('.') !== -1) {
  //     //   input.value = input.value.substring(0, input.value.indexOf('.') + 3);
  //     // }
  //     // input.value = input.value.replace(/[^\d.]/g, '');
  //     // input.dispatchEvent(new Event('input'))
  //   };
  //   input.onblur = function(e) {
  //     console.log(input.value)
  //     if(input.value.indexOf('.') !== -1) {
  //       input.value = input.value.substring(0, input.value.indexOf('.') + 3);
  //     }
  //     input.value = input.value.replace(/[^\d.]/g, '');
  //     console.log(input)
  //     input.dispatchEvent(new Event('input'))
  //   };
  // },
  bind: function(el,binding) {
    el.handler = function(e) {
      // e.target.value = e.target.value.replace(/\D+/, '')
      // console.log("el=====================",e);
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
  //   // el-input
  //   // console.log(el)
  //   el.children['0'].addEventListener("keypress",function(e){
  //     e = e || window.event;
  //     let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
  //     let re = /^\d*\.{0,1}\d{0,1}$/;
  //     if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
  //         if(e.preventDefault){
  //             e.preventDefault();
  //         }else{
  //             e.returnValue = false;
  //         }                            
  //     }
  //   });
  // }
}
