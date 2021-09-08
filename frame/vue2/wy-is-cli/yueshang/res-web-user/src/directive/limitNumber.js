// 自定义保留小数位数，最多9位
export default {
  bind(el, binding) {
    var wins_0 = /[^\d]/g //整数判断
    var wins_1 = /[^\d^\.]/g //小数判断
    var flag = true;
    var points = 0;
    var lengths = 0
    var remainder = 0
    var no_int = 0
    const target = el instanceof HTMLInputElement ? el : el.querySelector("input");
    target.addEventListener("compositionstart", e => {
      flag = false;
    });
    target.addEventListener("compositionend", e => {
      flag = true;
    });
    target.addEventListener("input", e => {
      setTimeout(function() {
        if (flag) {
          if (binding.value == 0) {
            if (wins_0.test(e.target.value)) {
              e.target.value = e.target.value.replace(wins_0, "");
              e.target.dispatchEvent(new Event("input")) //手动更新v-model值
            }
          } else {
            if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
              remainder = true
            }
            if ((e.target.value.split('.')).length - 1 > 1) {
              points = true
            }
            if (e.target.value.toString().split(".")[1] != undefined) {
              if (e.target.value.toString().split(".")[1].length > Number(binding.value)) {
                lengths = true
              }
            }
            if (e.target.value.toString().indexOf(".") != -1) {
              no_int = false
            } else {
              no_int = true
            }
            if (wins_1.test(e.target.value) || lengths || points || remainder) {
              if (!no_int) {
                e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
                  '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
                  ".") + Number(binding.value) + 1)
              } else {
                e.target.value = e.target.value.replace(wins_0, "")
              }
              e.target.dispatchEvent(new Event("input"))
            }
          }
          // if (binding.value == 1) {
          //   if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
          //     remainder = true
          //   }
          //   if ((e.target.value.split('.')).length - 1 > 1) {
          //     points = true
          //   }
          //   if (e.target.value.toString().split(".")[1] != undefined) {
          //     if (e.target.value.toString().split(".")[1].length > 1) {
          //       lengths = true
          //     }
          //   }
          //   if (e.target.value.toString().indexOf(".") != -1) {
          //     no_int = false
          //   } else {
          //     no_int = true
          //   }
          //   if (wins_1.test(e.target.value) || lengths || points || remainder) {
          //     if (!no_int) {
          //       e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
          //         '$#$', '.').replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
          //         ".") + 2)
          //     } else {
          //       e.target.value = e.target.value.replace(wins_0, "")
          //     }
          //     e.target.dispatchEvent(new Event("input"))
          //   }
          // }


          // if (binding.value == 2) {
          //   if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
          //     remainder = true
          //   }
          //   if ((e.target.value.split('.')).length - 1 > 1) {
          //     points = true
          //   }
          //   if (e.target.value.toString().split(".")[1] != undefined) {
          //     if (e.target.value.toString().split(".")[1].length > 2) {
          //       lengths = true
          //     }
          //   }
          //   if (e.target.value.toString().indexOf(".") != -1) {
          //     no_int = false
          //   } else {
          //     no_int = true
          //   }
          //   if (wins_1.test(e.target.value) || lengths || points || remainder) {
          //     if (!no_int) {
          //       e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
          //         '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
          //         ".") + 3)
          //     } else {
          //       e.target.value = e.target.value.replace(wins_0, "")
          //     }
          //     e.target.dispatchEvent(new Event("input"))
          //   }
          // }

          // if (binding.value == 5) {
          //   if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
          //     remainder = true
          //   }
          //   if ((e.target.value.split('.')).length - 1 > 1) {
          //     points = true
          //   }
          //   if (e.target.value.toString().split(".")[1] != undefined) {
          //     if (e.target.value.toString().split(".")[1].length > 5) {
          //       lengths = true
          //     }
          //   }
          //   if (e.target.value.toString().indexOf(".") != -1) {
          //     no_int = false
          //   } else {
          //     no_int = true
          //   }
          //   if (wins_1.test(e.target.value) || lengths || points || remainder) {
          //     if (!no_int) {
          //       e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
          //         '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
          //         ".") + 6)
          //     } else {
          //       e.target.value = e.target.value.replace(wins_0, "")
          //     }
          //     e.target.dispatchEvent(new Event("input"))
          //   }
          // }
        }
      }, 0)
    })
  }
}
