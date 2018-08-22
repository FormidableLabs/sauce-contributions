import React from 'react'
import Layout from '../components/layout'
import Facets from '../components/facets'
import ContributionList from '../components/contribution-list'
import FilterSummary from '../components/filter-summary'
import harvest from '../model/harvest'
import facets from '../model/facets'

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

  filterData(data, filters) {
    // iterate over each item in data set, apply filters
    return data.contributions.filter(item =>
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
  }

  render() {
    const data = harvest(this.props.data.allHarvestCsv)

    const filters = this.state.filters
    const filtered = this.filterData(data, filters)
    const ordered = [...filtered].reverse()
    const hours = ordered.reduce((sum, { hours }) => sum + hours, 0)

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
            <Subhead>Contributions ({hours.toFixed(1)} hours)</Subhead>
            <FilterSummary filters={filters} />
            <ContributionList items={ordered} />
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
