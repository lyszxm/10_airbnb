import React, { memo } from 'react'
import { BannerWrapper } from './style'
// import coverImg from "@/assets/img/cover_01.jpeg"
const HomeBanner = memo(() => {
  return (
    <BannerWrapper>
      {/* 另外一种引入图片 */}
      {/* <img src={coverImg} alt="" /> */}
    </BannerWrapper>
  )
})

export default HomeBanner
