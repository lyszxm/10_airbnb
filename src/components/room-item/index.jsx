import PropTypes from 'prop-types'
import React, { memo, useRef, useState } from 'react'
import { ItemWrapper } from './style'
import { Button, Space, Carousel } from 'antd'
import { Rating } from '@mui/material'
import IconArrowLeft from '@/assets/svg/icon_arrow_left'
import IconArrowRight from '@/assets/svg/icon_arrow_right'
import Indicator from '@/base-ui/indicator'
import classNames from 'classnames'
const RoomItem = memo(props => {
  const { itemData, itemWidth = '25%', itemClick } = props

  const [selectIndex, setSelectIndex] = useState(0)
  const sliderRef = useRef()

  /** --事件处理的逻辑 */
  function controlClickHandle(isRight = true, event) {
    event.stopPropagation()
    console.log(event.target)
    // console.log(sliderRef.current)
    //上一个面板/下一个面板
    isRight ? sliderRef.current.next() : sliderRef.current.prev()

    //获取最新的索引
    let newIndex = isRight ? selectIndex + 1 : selectIndex - 1
    const length = itemData.picture_urls.length
    if (newIndex < 0) newIndex = length - 1
    if (newIndex > length - 1) newIndex = 0

    setSelectIndex(newIndex)
  }

  function itemClickHandle() {
    // 不能要所有的room-item都能跳转
    if (itemClick) itemClick(itemData)
  }
  /**事件处理的逻辑-- */

  /* 子元素的赋值 */
  // 默认的一张图
  const pictureElement = (
    <div className='cover'>
      <img
        src={itemData.picture_url}
        alt=''
      />
    </div>
  )

  // 有轮播图
  const sliderElement = (
    <div className='slider'>
      <div className='control'>
        <div
          className='btn left'
          onClick={e => controlClickHandle(false, e)}
        >
          {/* 这个svg的颜色有个 fill:currentcolor 它是继承自父元素的color*/}
          <IconArrowLeft
            width='26'
            height='26'
          />
        </div>
        <div
          className='btn right'
          onClick={e => controlClickHandle(true, e)}
        >
          <IconArrowRight
            width='26'
            height='26'
          />
        </div>
      </div>
      <div className='indicator'>
        <Indicator selectIndex={selectIndex}>
          {itemData?.picture_urls?.map((item, index) => {
            return (
              <div
                className='item'
                key={item}
                test={String(selectIndex >= 3 && selectIndex <= itemData.picture_urls.length - 3)}
              >
                <span
                  className={classNames('dot', {
                    active: selectIndex === index,
                    active1:
                      selectIndex >= 1 &&
                      selectIndex < itemData.picture_urls.length - 1 &&
                      (selectIndex - 1 === index ||
                        selectIndex - 2 === index ||
                        selectIndex + 1 === index ||
                        selectIndex + 2 === index),
                    active2:
                      selectIndex >= 3 &&
                      selectIndex < itemData.picture_urls.length - 3 &&
                      (selectIndex - 3 === index || selectIndex + 3 === index)
                  })}
                ></span>
              </div>
            )
          })}
        </Indicator>
      </div>
      <Carousel
        dots={false}
        ref={sliderRef}
      >
        {itemData?.picture_urls?.map(item => {
          return (
            <div
              className='cover'
              key={item}
            >
              <img
                src={item}
                alt=''
              />
            </div>
          )
        })}
      </Carousel>
    </div>
  )

  return (
    <ItemWrapper
      itemWidth={itemWidth}
      verifyColor={itemData?.verify_info?.text_color || '#39576a'}
      onClick={itemClickHandle}
    >
      <div className='inner'>
        {/* 根据这个picture_urls的有无来判断是否需要轮播子元素 */}
        {!itemData.picture_urls ? pictureElement : sliderElement}

        <div className='desc'> {itemData.verify_info.messages.join(' · ')}</div>
        <div className='name'>{itemData.name}</div>
        <div className='price'>¥{itemData.price}/晚</div>

        <div className='bottom'>
          {/* 这个button是antd的 */}
          {/*      <Space wrap>
            <Button type='primary'>Primary Button</Button>
            <Button>Default Button</Button>
            <Button type='dashed'>Dashed Button</Button>
            <Button type='text'>Text Button</Button>
            <Button type='link'>Link Button</Button>
          </Space>
 */}
          <Rating
            value={itemData.star_rating ?? 5}
            precision={0.1}
            readOnly
            sx={{
              fontSize: '12px',
              color: itemData.star_rating_color ?? '#00848A',
              ml: '1px'
            }}
          />

          <span className='count'>{itemData.reviews_count}</span>

          {itemData.bottom_info && <span className='extra'>·{itemData.bottom_info?.content}</span>}
        </div>
      </div>
    </ItemWrapper>
  )
})

RoomItem.propTypes = { itemData: PropTypes.object }

export default RoomItem
