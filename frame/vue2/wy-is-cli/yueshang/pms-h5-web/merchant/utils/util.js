const numberFormat = (value, //number | string,
options = {} //{ precision: number; unit: string }
) => {
  const newValue = value.toString().replace(/[^\d.-]/g, '');

  if (isNaN(newValue) || ['', null, undefined].includes(newValue)) {
    return value;
  }

  if (typeof options.precision !== 'number') {
    const pointPoistion = newValue.toString().indexOf('.');

    if (~pointPoistion) {
      options.precision = newValue.toString().substr(pointPoistion + 1);
    }
  }

  const text = Number(newValue).toFixed(options.precision || 0);
  const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
  const format = text.replace(/\..*$/, '').split('').reverse().join('').replace(/\d{3}\B/g, function (_, c) {
    return _ + ',';
  }).split('').reverse().join('');
  return `${format}${bit}${options.unit || ''}`;
};

module.exports = {
  numberFormat
};