import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef, useState } from 'react'
import { BrowserWrapper } from './style'
import IconClose from '@/assets/svg/icon_close'
import IconArrowLeft from '@/assets/svg/icon_arrow_left'
import IconArrowRight from '@/assets/svg/icon_arrow_right'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import IconTriangleArrowBottom from '@/assets/svg/icon-triangle-arrow-bottom'
import IconTriangleArrowTop from '@/assets/svg/icon-triangle-arrow-top'
import Indicator from '../indicator'
import classNames from 'classnames'

const PictureBrowser = memo(props => {
  const { pictureUrls, closeClick } = props

  // 组件状态
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isNext, setIsNext] = useState(true)
  const [showList, setShowList] = useState(true)
  const picRef = useRef()
  // 由于这个组件会被弹出来， 但是父亲组件内容较多撑开了页面会有滚动条
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  /* 事件监听的逻辑 */
  function closeBtnClickHandle(e) {
    closeClick && closeClick(e)
  }

  function controlClickHandle(isNext = true) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0) newIndex = pictureUrls.length - 1
    if (newIndex > pictureUrls.length - 1) newIndex = 0

    setCurrentIndex(newIndex)
    setIsNext(isNext)
  }

  function bottomItemClickHandle(index) {
    setIsNext(index > currentIndex) // 点击的时候也要管好做动画的方向
    setCurrentIndex(index)
  }

  return (
    <BrowserWrapper
      isNext={isNext}
      showList={showList}
    >
      <div className='top'>
        <div
          className='close-btn'
          onClick={closeBtnClickHandle}
        >
          <IconClose />
        </div>
      </div>

      <div className='slider'>
        <div className='control'>
          <div
            className='btn left'
            onClick={e => controlClickHandle(false)}
          >
            <IconArrowLeft
              width='77'
              height='77'
            />
          </div>
          <div
            className='btn right'
            onClick={e => controlClickHandle(true)}
          >
            <IconArrowRight
              width='77'
              height='77'
            />
          </div>
        </div>
        <div className='picture'>
          <SwitchTransition mode='out-in'>
            <CSSTransition
              key={pictureUrls[currentIndex]}
              classNames='pic'
              timeout={200}
              nodeRef={picRef}
              addEndListener={done => {
                // console.log(222)
                picRef.current.addEventListener('transitionend', function () {
                  // console.log('111111')
                  done()
                })
              }}
            >
              <img
                ref={picRef}
                src={pictureUrls[currentIndex]}
                alt=''
              />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>

      <div className='preview'>
        <div className='info'>
          <div className='desc'>
            <div className='count'>
              <span>
                {currentIndex + 1} / {pictureUrls.length}
              </span>
              <span>room apartment图 片{currentIndex + 1}</span>
            </div>
            <div
              className='toggle'
              onClick={e => setShowList(!showList)}
            >
              <span>{showList ? '隐藏' : '显示'}照片列表</span>
              {showList ? <IconTriangleArrowBottom /> : <IconTriangleArrowTop />}
            </div>
          </div>
          <div className='list'>
            <Indicator selectIndex={currentIndex}>
              {pictureUrls.map((item, index) => {
                return (
                  <div
                    key={item}
                    className={classNames('item', { active: currentIndex === index })}
                    onClick={e => bottomItemClickHandle(index)}
                  >
                    <img
                      src={item}
                      alt=''
                    />
                  </div>
                )
              })}
            </Indicator>
          </div>
        </div>
      </div>
    </BrowserWrapper>
  )
})

PictureBrowser.propTypes = { pictureUrls: PropTypes.array }

export default PictureBrowser
