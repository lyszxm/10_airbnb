import hyRequest from '..'

export function getHomeGoodPriceData() {
  return hyRequest.get({
    url: '/home/goodPrice'
  })
}
export function getHomeHighScoreData() {
  return hyRequest.get({
    url: '/home/highscore'
  })
}
/**
 * @description:折扣区域的数据
 * @return {*}
 */
export function getHomeDiscountData() {
  return hyRequest.get({
    url: '/home/discount'
  })
}
/**
 * @description:推荐区域的数据
 * @return {*}
 */
export function getHomeHotRecommendData() {
  return hyRequest.get({
    url: '/home/hotrecommenddest'
  })
}

/**
 * @description:向往城市区域的数据
 * @return {*}
 */
export function getHomeLongforData() {
  return hyRequest.get({
    url: '/home/longfor'
  })
}
/**
 * @description:plus房源区域的数据
 * @return {*}
 */
export function getHomePlusData() {
  return hyRequest.get({
    url: '/home/plus'
  })
}
