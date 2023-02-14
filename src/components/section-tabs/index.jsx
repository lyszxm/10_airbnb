import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { TabsWrapper } from './style'
import classNames from 'classnames'
import ScrollView from '@/base-ui/scroll-view'

const SectionTabs = memo(props => {
  const { tabNames = [], tabClick } = props
  const [currendIndex, setcurrendIndex] = useState(0)

  function itemClickHandle(index, item) {
    setcurrendIndex(index)
    /* 调用父组件传递的函数 实现子传父的操作 */
    tabClick(index, item)
  }
  return (
    <TabsWrapper>
      {/* 搞个scrollview 组件往里传入组件 在scrollview组件中使用props.children使用插槽的内容，然后写左右点击特效 */}
      <ScrollView>
        {tabNames.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames('item', { active: index === currendIndex })}
              onClick={e => itemClickHandle(index, item)}
            >
              {item}
            </div>
          )
        })}
      </ScrollView>
    </TabsWrapper>
  )
})

SectionTabs.propTypes = {
  tabNames: PropTypes.array,
  tabClick: PropTypes.func
}

export default SectionTabs
