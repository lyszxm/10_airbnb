import React, { memo, useRef, useState } from 'react'
import { CenterWrapper } from './style'
import SearchTitles from '@/assets/data/search_titles' // 假数据
import IconSearchBar from '@/assets/svg/icon_search_bar'
import SearchTabs from './c-cpns/search-tabs'
import SearchSections from './c-cpns/search-sections'
import { CSSTransition } from 'react-transition-group'
import detail from '@/store/modules/detail'

const HeaderCenter = memo(props => {
  const { isSearch, searchBarClick } = props

  const titles = SearchTitles.map(item => item.title)
  const [tabIndex, setTabIndex] = useState(0)
  const barRef = useRef(null)
  const detailRef = useRef(null)

  function searchBarClickHandle() {
    if (searchBarClick) searchBarClick()
  }

  return (
    <CenterWrapper>
      <CSSTransition
        in={!isSearch}
        classNames='bar'
        timeout={250}
        unmountOnExit={true}
        nodeRef={barRef}
      >
        <div
          className='search-bar'
          onClick={searchBarClickHandle}
          ref={barRef}
        >
          <div className='text'>搜索房源和体验</div>
          <div className='icon'>
            <IconSearchBar />
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={isSearch}
        classNames='detail'
        timeout={250}
        unmountOnExit={true}
        nodeRef={detailRef}
      >
        <div
          className='search-detail'
          ref={detailRef}
        >
          <SearchTabs
            titles={titles}
            tabClick={setTabIndex}
          />
          <div className='infos'>
            <SearchSections searchInfos={SearchTitles[tabIndex].searchInfos} />
          </div>
        </div>
      </CSSTransition>
    </CenterWrapper>
  )
})

export default HeaderCenter
