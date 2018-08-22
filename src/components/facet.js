import React from 'react'
import styled from 'styled-components'

import { Flex, Box, Text, ButtonCircle } from 'rebass'

const Item = styled(Box)`
  opacity: ${p => (p.disabled ? 0.5 : 1)};
`

const isDisabled = (filters, option) =>
  filters && filters.length && !filters.some(f => f.key === option.key)

const Facet = props => {
  return (
    <Box pt={3}>
      <Text fontSize={2} fontWeight="bold">
        {props.title}
      </Text>
      {props.options.map(option => (
        <Item key={option.key} disabled={isDisabled(props.filters, option)}>
          <Flex
            ml={3}
            mt={1}
            flexDirection="row"
            justifyContent="space-between"
            onClick={() => props.applyFilter(option)}
          >
            <Text fontSize={1}>{option.label}</Text>
            <ButtonCircle bg="#DE3C4B" fontSize={1}>
              {option.count}
            </ButtonCircle>
          </Flex>
        </Item>
      ))}
    </Box>
  )
}

export default Facet
