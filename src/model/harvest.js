import formatContribution from './contribution'

const mungeHarvestData = csv => {
  return {
    totalCount: csv.totalCount,
    contributions: csv.edges.map(edge => formatContribution(edge.node)),
  }
}

export default mungeHarvestData
