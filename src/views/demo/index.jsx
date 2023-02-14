import Indicator from '@/base-ui/indicator'
import PropTypes from 'prop-types'
import React, { memo, useRef, useState, useEffect, forwardRef } from 'react'
import { DemoWrapper } from './style'
import classNames from 'classnames'
const Demo = memo(props => {
  const names = ['1', '2', 'nba', 'mba', 'aaa', 'bbb', 'ccc', 'ddd']

  const [selectIndex, setSelectIndex] = useState(0)

  function toggleClickHandle(isNext = true) {
    let newIndex = isNext ? selectIndex + 1 : selectIndex - 1
    if (newIndex < 0) newIndex = names.length - 1
    if (newIndex > names.length - 1) newIndex = 0
    setSelectIndex(newIndex)
  }

  return (
    <DemoWrapper>
      <div className='control'>
        <button onClick={e => toggleClickHandle(false)}>上一个</button>
        <button onClick={e => toggleClickHandle(true)}>下一个</button>
      </div>
      <div className='list'>
        <Indicator selectIndex={selectIndex}>
          {names.map((item, index) => {
            return (
              <button
                className={classNames({ active: index === selectIndex })}
                key={item}
              >
                {item}
              </button>
            )
          })}
        </Indicator>
      </div>
    </DemoWrapper>
  )
})

Demo.propTypes = {}

export default Demo
