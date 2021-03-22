// let maxRows = 10
// let maxCols = 5
// let tableOptions = []
// for (let r = 1; r <= maxRows; r++) {
//   for (let c = 1; c <= maxCols; c++) {
//     tableOptions.push('newtable_' + r + '_' + c)
//   }
// }

var options = {
  placeholder: '请输入合同模板内容...',
  theme: 'snow',
  bounds: '#editor'
}
const fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]

const toolbarOptions = [
  // [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
  // [{ size: [] }],
  // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  // [{ 'list': 'ordered' }, { 'list': 'bullet' },
  // { 'indent': '-1' }, { 'indent': '+1' }],

  // [{ 'table': tableOptions }], // new table (cursor needs to be out of table)
  // [{ 'table': 'append-row' }], // cursor needs to be in the table
  // [{ 'table': 'append-col' }], // cursor needs to be in the table
  // ['blockquote', 'code-block'], // 引用、代码块

  // [{ 'header': 1 }, { 'header': 2 }], // 标题、键值对的形式；1、2表示字体大小
  ['underline'], // 加粗、斜体、下划线、删除线
  [{ list: 'ordered' }, { list: 'bullet' }], // 列表
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 级标题
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{ 'script': 'sub' }, { 'script': 'super' }], // 上下标
  // [{ 'direction': 'rtl' }], // 文本方向

  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小

  // [{ 'color': [] }, { 'background': [] }], // 字体颜色、字体背景颜色
  // [{ 'font': fonts }], // 字体、把上面定义的字体数组放进来
  [{ align: [] }], // 对齐方式
  // ['image', 'video'] // 上传图片、上传视频
  ['link'] // 加减链接
  // ['clean'] // 清空
]

export default {
  options, toolbarOptions, fonts
}
