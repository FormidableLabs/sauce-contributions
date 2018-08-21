import React from 'react'
import Markdown from 'react-remarkable'
import { Box, Text } from 'rebass'

const format = options => {
  const label = options[0].summaryLabel
  if (options.length > 1) {
    return `${label} ${options.map(opt => `**${opt.label}**`).join(' or ')}`
  }

  return `${label} **${options[0].label}**`
}

const FilterSummary = props => {
  const summary = []

  for (const key in props.filters) {
    const filter = props.filters[key]
    if (filter && filter.length) {
      summary.push(format(filter))
    }
  }

  return (
    <Box>
      <Text fontSize={1}>
        <Markdown>
          {summary.length ? summary.join(', ') : 'All contributions'}
        </Markdown>
        <Text />
      </Text>
    </Box>
  )
}

export default FilterSummary
