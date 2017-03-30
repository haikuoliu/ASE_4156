export function getReadableNumber(number) {
  const n = `${number}`
  if (n.indexOf('.') < 0) {
    return n.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
  }
  return n.replace(/(\d{1,3})(?=(\d{3})+\.)/g, '$1,')
}

export function getReadablePercent(percent, option = { decimal: 2 }) {
  if (!percent && percent !== 0) return ''
  return `${(percent * 100).toFixed(option.decimal)}%`
}

export function svg2img(svg, option = {}) {
  const svg64 = btoa(unescape(encodeURIComponent(svg)))
  const b64Start = 'data:image/svg+xml;base64,'
  const image64 = b64Start + svg64

  // set it as the source of the img element
  const img = new Image()
  img.src = image64
  img.width = option.width || '100'
  img.height = option.height || '100'
  return img
}

export function svg2canvas(svg, option = {}) { // eslint-disable-line no-unused-vars
  const img = svg2img(svg, option)
  const myCanvas = document.createElement('canvas')
  myCanvas.width = img.width
  myCanvas.height = img.height
  const myCanvasContext = myCanvas.getContext('2d')
  myCanvasContext.drawImage(img, 0, 0)
  return myCanvas
}

/**
   * 为数字加上单位：万或亿
   *
   * 例如：
   *      1000.01 => 1000.01
   *      10000 => 1万
   *      99000 => 9.9万
   *      566000 => 56.6万
   *      5660000 => 566万
   *      44440000 => 4444万
   *      11111000 => 1111.1万
   *      444400000 => 4.44亿
   *      40000000,00000000,00000000 => 4000万亿亿
   *      4,00000000,00000000,00000000 => 4亿亿亿
   *
   * @param {number} number 输入数字.
   * @param {number} decimalDigit 小数点后最多位数，默认为2
   * @return {string} 加上单位后的数字
   */

function getDigit(integer) {
  let digit = -1
  while (integer >= 1) {
    digit++
    integer = integer / 10 // eslint-disable-line no-param-reassign
  }
  return digit
}

function addWan(integer, number, mutiple, decimalDigit) {
  const digit = getDigit(integer)
  if (digit > 3) {
    let remainder = digit % 8
    if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
      remainder = 4
    }
    return `${Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit)}万`
  }
  return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit)
}

export function getChineseUnitNumber(number, decimalDigit) {
  decimalDigit = decimalDigit == null ? 2 : decimalDigit // eslint-disable-line no-param-reassign
  const integer = Math.floor(number)
  const digit = getDigit(integer)
  // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
  const unit = []
  if (digit > 3) {
    const multiple = Math.floor(digit / 8)
    if (multiple >= 1) {
      const tmp = Math.round(integer / Math.pow(10, 8 * multiple))
      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit))
      for (let i = 0; i < multiple; i++) {
        unit.push('亿')
      }
      return unit.join('')
    } else {
      return addWan(integer, number, 0, decimalDigit)
    }
  } else {
    return number
  }
}

/* eslint-disable */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    const context = this
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
