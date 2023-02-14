/**
 * @description: 将传进得css字符串 转成 js对象形式
 * @param {*} styleStr
 * @return {*}
 */
function styleStrToObject(styleStr = '') {
  const obj = {}
  if (styleStr === '' || !styleStr) return obj
  // 替换有-的 并把-后的第一个字母大写
  const str = styleStr.toLowerCase().replace(/-(.)/g, function (m, g) {
    // 这些参数都是正则匹配到的 字符
    return g.toUpperCase()
  })

  // 去掉整个字符串最后边的分号和空格等特殊字符串，并生成根据: | ; 分割成数组
  const ary = str.replace(/;\s?$/g, '').split(/:|;/g)
  for (let i = 0; i < ary.length; i += 2) {
    // 将属性值去掉多余的空格，回车等 属性值去掉头部和尾部多余的空格，回车等
    obj[ary[i].replace(/\s/g, '')] = ary[i + 1].replace(/^\s+|\s+$/g, '')
  }

  return obj
}

export default styleStrToObject
