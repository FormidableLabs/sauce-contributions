import React, { Fragment } from 'react'
import Contribution from './contribution'

const ContributionList = ({ items }) => (
  <Fragment>
    {items.map((contrib, i) => (
      <Contribution key={i} {...contrib} />
    ))}
  </Fragment>
)

export default ContributionList
