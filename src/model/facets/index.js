import flatten from 'lodash/flatten'
import contributor from './contributor'
import project from './project'
import organization from './organization'
const makeOption = (facet, item) => {
  return {
    facetId: facet.id,
    facetTitle: facet.title,
    key: facet.key(item),
    label: facet.label(item),
    match: facet.match,
    count: 0,
    countLabel: facet.countLabel,
    summaryLabel: facet.summaryLabel,
  }
}

const makeFacet = (facet, data) => {
  const options = {}

  const items = flatten(data.contributions.map(facet.accessor))
  for (const item of items) {
    const key = facet.key(item)
    const opt = options[key] || (options[key] = makeOption(facet, item))
    opt.count += facet.count(item)
  }

  return {
    id: facet.id,
    title: facet.title,
    options: facet.sort(Object.values(options)),
  }
}

const facets = [contributor, project, organization]

const makeFacets = data => {
  return facets.map(facet => makeFacet(facet, data))
}

export default makeFacets
