import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { FilterWrapper } from './style'
import filterData from '@/assets/data/filter_data.json' // 使用假数据
import classNames from 'classnames'

const EntireFilter = memo(props => {
  const [selectItems, setSelectItems] = useState([])

  function itemClickHandle(item) {
    const newItems = [...selectItems]

    if (selectItems.includes(item)) {
      // 移除操作
      const itemIndex = newItems.findIndex(filterItem => filterItem === item)
      newItems.splice(itemIndex, 1)
    } else {
      //添加操作
      newItems.push(item)
    }
    setSelectItems(newItems)
  }

  return (
    <FilterWrapper>
      <div className='filter'>
        {filterData.map(item => {
          return (
            <div
              className={classNames('item', { active: selectItems.includes(item) })}
              key={item}
              onClick={e => itemClickHandle(item)}
            >
              {item}
            </div>
          )
        })}
      </div>
    </FilterWrapper>
  )
})

EntireFilter.propTypes = {}

export default EntireFilter
