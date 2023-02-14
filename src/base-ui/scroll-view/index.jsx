import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ViewWrapper } from './style'
import IconArrowLeft from '@/assets/svg/icon_arrow_left'
import IconArrowRight from '@/assets/svg/icon_arrow_right'

const ScrollView = memo(props => {
  /* 定义组件内部状态 */
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setshowRight] = useState(false)
  const [posIndex, setPosIndex] = useState(0) // (positionIndex)存放可视区域的左边元素是tab中的第几个index 初始为0
  const totalDistanceRef = useRef() // 存好能滚动多少px

  /* 组件渲染完毕，判断是否显示右侧的按钮 */
  const scrollContentRef = useRef()
  useEffect(() => {
    const scrollWidth = scrollContentRef.current.scrollWidth // 获取tab栏的宽度，能滚动则包含超出部分，适中就与其clientWidth值一样

    const clientWidth = scrollContentRef.current.clientWidth //获取元素本身占据的宽度
    // console.log(scrollWidth, clientWidth)

    const totalDistance = scrollWidth - clientWidth // 得到最后能滚多少px
    totalDistanceRef.current = totalDistance
    setshowRight(totalDistance > 0)
  }, [props.children])

  useEffect(() => {
    setShowLeft(posIndex > 0) // 不是第一个就要显示
  }, [posIndex])

  /* 事件处理逻辑 */
  function controlClickHandle(isRight) {
    const newIndex = isRight ? posIndex + 1 : posIndex - 1
    const leftEle = scrollContentRef.current.children[newIndex]
    const newOffsetLeft = leftEle.offsetLeft
    scrollContentRef.current.style.transform = `translate(-${newOffsetLeft}px)`
    setPosIndex(newIndex)
    // 是否继续显示这个右侧按钮
    // console.log(totalDistanceRef.current, newOffsetLeft)
    setshowRight(totalDistanceRef.current - newOffsetLeft > 0)
  }
  return (
    <ViewWrapper>
      {showLeft && (
        <div
          className='control left'
          onClick={e => controlClickHandle(false)}
        >
          <IconArrowLeft />
        </div>
      )}

      {showRight && (
        <div
          className='control right'
          onClick={e => controlClickHandle(true)}
        >
          <IconArrowRight />
        </div>
      )}

      <div className='scroll'>
        <div
          className='scroll-content'
          ref={scrollContentRef}
        >
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  )
})

ScrollView.propTypes = {}

export default ScrollView
