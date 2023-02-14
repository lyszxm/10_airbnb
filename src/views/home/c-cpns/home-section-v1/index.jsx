import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { SectionV1Wrapper } from './style'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'
import SectionTabs from '@/components/section-tabs'
import SectionFooter from '@/components/section-footer'

const HomeSectionV1 = memo(props => {
  const { infoData } = props

  const tabNames = infoData.dest_address?.map(item => item.name)

  return (
    <SectionV1Wrapper>
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      ></SectionHeader>
      <SectionTabs tabNames={tabNames} />
      <SectionRooms
        roomList={infoData.list}
        itemWidth='25%'
      />
      <SectionFooter />
    </SectionV1Wrapper>
  )
})

HomeSectionV1.propTypes = {
  infoData: PropTypes.object
}

export default HomeSectionV1
