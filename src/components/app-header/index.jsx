import React, { memo, useRef, useState } from 'react'
import { HeaderWrapper, SearchAreaWrapper } from './style'
import HeaderLeft from './c-cpms/header-left'
import HeaderCenter from './c-cpms/header-center'
import HeaderRight from './c-cpms/header-right'
import classNames from 'classnames'
import { shallowEqual, useSelector } from 'react-redux'
import { useScrollPosition } from '@/hooks'
import { ThemeProvider } from 'styled-components'

const AppHeader = memo(() => {
  /** 定义组件内部的状态 */
  const [isSearch, setIsSearch] = useState(false) // 默认为搜索状态
  /** 从redux中获取数据 */
  const { headerConfig } = useSelector(
    state => ({
      headerConfig: state.main.headerConfig
    }),
    shallowEqual
  )
  const { isFixed, topAlpha } = headerConfig // 拿配置

  //如果打开了isSearch，让有一定的距离才让他isSearch为false收起来
  const { scrollY } = useScrollPosition() /** 监听滚动的监听 */
  const prevY = useRef(0)

  //在正常情况下（搜索框没有弹出来），不断记录值
  if (!isSearch) prevY.current = scrollY

  //在弹出搜索功能的情况下，滚动的距离大于之前记录的距离的30
  if (isSearch && Math.abs(scrollY - prevY.current) > 30) {
    setIsSearch(false)
  }

  /* 透明度的逻辑 */
  const isAlpha = topAlpha && scrollY === 0 //这里的isAlpha 到了顶部 就是true 后面可以用isAlpha来判读是否在当前页面的顶部

  return (
    <ThemeProvider theme={{ isAlpha }}>
      <HeaderWrapper className={classNames({ fixed: isFixed })}>
        <div className='content'>
          <div className='top'>
            <HeaderLeft />
            <HeaderCenter
              /* 是顶部的时候也要设置isSearch为true 这样就会自动展开搜索区域而不是再次点击了，怎么知道滚到了顶部呢？上面是有与的判断---isAlpha */
              isSearch={isAlpha || isSearch}
              searchBarClick={e => setIsSearch(true)}
            />
            <HeaderRight />
          </div>
          <SearchAreaWrapper isSearch={isAlpha || isSearch} />
        </div>
        {isSearch && (
          <div
            className='cover'
            onClick={e => setIsSearch(false)}
          ></div>
        )}
      </HeaderWrapper>
    </ThemeProvider>
  )
})

export default AppHeader
