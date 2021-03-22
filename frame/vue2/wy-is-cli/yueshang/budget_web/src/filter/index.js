const filters = {
  blank: function (val) {
    if (val === null || val === undefined || val === '') {
      return '-'
    } else {
      return val
    }
  },
  slash: function (val) {
    if (val === null || val === undefined || val === '') {
      return '/'
    } else {
      return val
    }
  },
  percent: function (val) {
    if (val === null || val === undefined || val === '') {
      return '-'
    } else {
      return `${val *100}%`
    }
  },
  nonDelivery: function (val) {
    if (val === null || val === undefined || val === '') {
      return '未交付'
    } else {
      return val
    }
  },
  residence: function (val) {
    if (val === null || val === undefined || val === '' || val === 0) {
      return '未交付'
    } else {
      return val
    }
  },
  micrometerLevel: function (value, unit, precise) {
    if (unit === void 0) { unit = ''; }
    if (precise === void 0) { precise = 2; }
    if (isNaN(value) || [null,undefined,''].includes(value)) {
      return value;
    }
    var text = Number(value).toFixed(precise);
    var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
    var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
    return unit + f;
  }
}
export default filters;
