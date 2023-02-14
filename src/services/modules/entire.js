import hyRequest from '..'

/**
 * @description:
 * @param {*} offset  开始的第几条
 * @param {*} size   多少条
 * @return {*}
 */
export function getEntireRoomList(offset = 0, size = 20) {
  return hyRequest.get({
    url: 'entire/list',
    params: {
      offset,
      size
    }
  })
}
