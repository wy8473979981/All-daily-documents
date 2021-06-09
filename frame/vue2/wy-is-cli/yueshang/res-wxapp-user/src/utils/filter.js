// *
// *author: wjh
// *date：2020-11-24
// *desc：全局过滤器
// *
const timeFormat = (value, format) => {
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  let result = "";
  if (format == undefined) {
      result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
      h < 10 ? "0" + h : h
    }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
  }
  if (format == "yyyy-mm-dd") {
      result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }
  if (format == "yyyy-mm") {
      result = `${y}-${m < 10 ? "0" + m : m}`;
  }
  if (format == "mm-dd") {
      result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
  }
  if (format == "hh:mm") {
      result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
  }
  if (format == "yyyy") {
      result = `${y}`;
  }
  return result;
};


export {
  timeFormat
}