import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { DocLoadingWrapper } from './style'

const DocLoading = memo(props => {
  return (
    <DocLoadingWrapper>
      <div class='loader'>
        <div class='loader-inner'>
          <div class='loader-line-wrap'>
            <div class='loader-line'></div>
          </div>
          <div class='loader-line-wrap'>
            <div class='loader-line'></div>
          </div>
          <div class='loader-line-wrap'>
            <div class='loader-line'></div>
          </div>
          <div class='loader-line-wrap'>
            <div class='loader-line'></div>
          </div>
          <div class='loader-line-wrap'>
            <div class='loader-line'></div>
          </div>
        </div>
      </div>
    </DocLoadingWrapper>
  )
})

DocLoading.propTypes = {}

export default DocLoading
