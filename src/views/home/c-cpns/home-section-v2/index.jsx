import PropTypes from 'prop-types'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { SectionV2Wrapper } from './style'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'
import SectionTabs from '@/components/section-tabs'
import SectionFooter from '@/components/section-footer'

const HomeSectionV2 = memo(props => {
  /** 从props获取数据 */
  console.log(props, 'sss')
  const { infoData } = props

  const tabNames = infoData.dest_address?.map(item => item.name)

  /* 定义内部的state */
  /* 如何设置这里的name的初始值。
     法一：父组件判断并让这个子组件初次渲染就有infoData,然后在组件初次渲染的时候（这里采用的是法一） */
  const initalName = Object.keys(infoData.dest_list)[0] // 获取数组的第一个作为初始值
  const [name, setName] = useState(initalName)

  /* 法二:直接副作用重新设置name 但是会重新渲染 */
  // useEffect(() => {
  //   setName('xxxxx')
  // }, [infoData])

  /** 事件处理函数 */
  /* 将函数传递给子组件，让组件去调用 */
  const tabClickHandle = useCallback(function (index, name) {
    setName(name)
  }, [])

  return (
    <SectionV2Wrapper>
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      />
      {/* tab栏 */}
      <SectionTabs
        tabNames={tabNames}
        tabClick={tabClickHandle}
      />
      <SectionRooms
        roomList={infoData.dest_list?.[name]}
        itemWidth='33.3333%'
      />
      <SectionFooter name={name} />
    </SectionV2Wrapper>
  )
})

HomeSectionV2.propTypes = {
  infoData: PropTypes.object
}

export default HomeSectionV2
