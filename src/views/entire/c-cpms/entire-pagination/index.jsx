import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { PaginationWrapper } from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators'

const EntirePagination = memo(props => {
  const { totalCount, currentPage, roomList } = useSelector(
    state => ({
      totalCount: state.entire.totalCount,
      currentPage: state.entire.currentPage,
      roomList: state.entire.roomList
    }),
    shallowEqual
  )

  const totalPage = Math.ceil(totalCount / 20)
  const startCount = currentPage * 20 + 1
  let endCount = (currentPage + 1) * 20 > totalCount ? totalCount : (currentPage + 1) * 20

  const dispatch = useDispatch()
  /* 事件处理的逻辑 */
  function pageChangeHandle(event, pageCount) {
    //回到顶部
    window.scrollTo(0, 0)
    // 更新最新的页码: redux => currentPage
    // dispatch(changeCurrentPageAction(pageCount - 1)) // 这步操作已集成在了下面的调用中
    dispatch(fetchRoomListAction(pageCount - 1))
  }

  return (
    <PaginationWrapper>
      {!!roomList.length && (
        <div className='info'>
          <Pagination
            count={totalPage}
            onChange={pageChangeHandle}
          />
          <div className='desc'>
            第 {startCount} - {endCount} 个房源, 共超过 {totalCount} 个
          </div>
        </div>
      )}
    </PaginationWrapper>
  )
})

EntirePagination.propTypes = {}

export default EntirePagination
