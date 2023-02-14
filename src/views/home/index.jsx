import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeWrapper } from './style'
import HomeBanner from './c-cpns/home-banner'
import { fetchHomeDataAction } from '@/store/modules/home'
import { isEmptyO } from '@/utils'
import HomeSectionV1 from './c-cpns/home-section-v1'
import HomeSectionV2 from './c-cpns/home-section-v2'
import HomeLongfor from './c-cpns/home-longfor'
import HomeSectionV3 from './c-cpns/home-section-v3'
import { changeHeaderConfigAction } from '@/store/modules/main'

const Home = memo(() => {
  /* 从redux中获取数据   */
  const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo, plusInfo } = useSelector(
    state => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
      plusInfo: state.home.plusInfo
    }),
    shallowEqual
  )
  /** 派发异步的事件: 发送网络请求 */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomeDataAction('xxxx'))
    //设置头部的配置
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: true }))
  }, [dispatch])
  return (
    <HomeWrapper>
      <HomeBanner />
      <div className='test'>
        {' '}
        <Link to='/home'>首页</Link>
        <Link to='/entire'>entire</Link>
        <Link to='/detail'>detail</Link>
      </div>

      <div className='content'>
        {/* 展示推荐区域 */}
        {!isEmptyO(recommendInfo) && <HomeSectionV2 infoData={recommendInfo} />}
        {/* 为什么需要判断一下!isEmptyO(discountInfo) 不为空对象呢？
           因为这个HomesectionV2组件第一次渲染的时候 里面的一个useState的初始化要有值，不能是空字符串。我们在父组件直接拦截一下让其渲染的时候直接有infoData数据，而且useState的初始话参数只对组件初次渲染的时候设置起作用，第二次设置不起作用了
        */}
        {/* 折扣区域 */}
        {/* {!isEmptyO(discountInfo) && <HomeSectionV2 infoData={discountInfo} />} */}
        {!isEmptyO(longforInfo) && <HomeLongfor infoData={longforInfo} />}
        {/* {!isEmptyO(goodPriceInfo) && <HomeSectionV1 infoData={goodPriceInfo} />} */}
        {/* {!isEmptyO(highScoreInfo) && <HomeSectionV1 infoData={highScoreInfo} />} */}

        {!isEmptyO(plusInfo) && <HomeSectionV3 infoData={plusInfo} />}
      </div>
    </HomeWrapper>
  )
})

export default Home
