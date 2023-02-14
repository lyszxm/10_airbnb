import React, { memo, useEffect } from 'react'
import EntireFilter from './c-cpms/entire-filter'
import { EntireWrapper } from './style'
import EntireRooms from './c-cpms/entire-rooms'
import EntirePagination from './c-cpms/entire-pagination'
import { useDispatch } from 'react-redux'
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators'
import { changeHeaderConfigAction } from '@/store/modules/main'

const Entire = memo(() => {
  // 发送网络请求, 获取数据, 并且保存当前的页面等等.....
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoomListAction())

    //设置头部的配置
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: false }))
  }, [dispatch])
  return (
    <EntireWrapper>
      <EntireFilter />
      <EntireRooms />
      <EntirePagination />
    </EntireWrapper>
  )
})

export default Entire
