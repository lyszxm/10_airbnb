import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

/* 写出这个indicator组件让父组件传递 你选中的index，然后其他效果都交给这个组件 */
const Indicator = memo(props => {
  const { selectIndex = 0 } = props
  const contentRef = useRef()

  useEffect(() => {
    // 1,获取selectIndex对应的item
    const selectItemEl = contentRef.current.children[selectIndex]
    const itemLeft = selectItemEl.offsetLeft
    const itemWidth = selectItemEl.clientWidth
    // 2.content的宽度
    const contentWidth = contentRef.current.clientWidth
    const contentScroll = contentRef.current.scrollWidth

    // 3.获取selectIndex所对应的这个元素要滚动的距离
    let distance = itemLeft + itemWidth * 0.5 - contentWidth * 0.5

    // 4. 特殊情况的处理
    if (distance < 0) distance = 0
    let totalDistance = contentScroll - contentWidth
    if (distance > totalDistance) distance = totalDistance

    // 5.改变位置即可
    contentRef.current.style.transform = `translate(${-distance}px)`
  }, [selectIndex])
  return (
    <IndicatorWrapper>
      <div
        className='i-content'
        ref={contentRef}
      >
        {props.children}
      </div>
    </IndicatorWrapper>
  )
})

Indicator.propTypes = { selectIndex: PropTypes.number }

export default Indicator
