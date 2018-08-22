import React from 'react'
import { Box } from 'rebass'
import Facet from './facet'

const Facets = props => {
  return (
    <Box>
      {props.facets.map(facet => (
        <Facet
          key={facet.title}
          title={facet.title}
          options={facet.options}
          filters={props.filters[facet.id]}
          applyFilter={props.applyFilter}
        />
      ))}
    </Box>
  )
}

export default Facets
