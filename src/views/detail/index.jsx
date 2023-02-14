import React, { memo, useEffect } from 'react'
import { DetailWrapper } from './style'
import DetailPictures from './c-cpms/detail-pictures'
import { useDispatch } from 'react-redux'
import { changeHeaderConfigAction } from '@/store/modules/main'

const Detail = memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeHeaderConfigAction({ isFixed: false, topAlpha: false }))
  }, [dispatch])

  return (
    <DetailWrapper>
      <DetailPictures />
    </DetailWrapper>
  )
})

export default Detail
