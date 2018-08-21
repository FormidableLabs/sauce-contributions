import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Facets from '../components/facets'
import Contribution from '../components/contribution'
import FilterSummary from '../components/filter-summary'
import harvest from '../model/harvest'
import facets from '../model/facets'
import Markdown from 'react-remarkable'

import { Subhead, Flex, Box } from 'rebass'

class IndexPage extends React.Component {
  state = {
    filters: {},
  }

  applyFilter = option => {
    this.setState(({ filters }) => {
      const facet = option.facetId
      const options = filters[facet] || []

      // if it's already in, remove it
      const removed = options.filter(o => o.key !== option.key)
      if (removed.length < options.length) {
        return {
          filters: {
            ...filters,
            [facet]: removed,
          },
        }
      }

      // otherwise add it
      return {
        filters: {
          ...filters,
          [facet]: [...options, option],
        },
      }
    })
  }

  render() {
    const data = harvest(this.props.data.allHarvestCsv)
    const filters = this.state.filters

    // iterate over each item in data set, apply filters
    const filtered = data.contributions.filter(item =>
      // iterate over filter arrays by type (filterId)
      // using AND logic (every filter type must match)
      Object.values(filters).every(
        options =>
          // iterate over individual options of each filter
          // using OR logic (at least one option must match)
          options.length === 0 ||
          options.some(option => option.match(item, option.key))
      )
    )

    const ordered = [...filtered].reverse()

    return (
      <Layout>
        <Flex mx={-3} flexWrap="wrap">
          <Box width={[1, 1 / 3]} p={4}>
            <Subhead>Filter</Subhead>
            <Facets
              facets={facets(data)}
              filters={filters}
              applyFilter={this.applyFilter}
            />
          </Box>
          <Box width={[1, 2 / 3]} p={4}>
            <Subhead>Contributions</Subhead>
            <FilterSummary filters={filters} />
            {ordered.map((contrib, i) => (
              <Contribution key={i} {...contrib} />
            ))}
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default IndexPage

export const IndexQuery = graphql`
  query {
    allHarvestCsv {
      totalCount
      edges {
        node {
          Date
          First_Name
          Last_Name
          Notes
          Hours
        }
      }
    }
  }
`
