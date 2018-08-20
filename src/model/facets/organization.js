import sortBy from 'lodash/fp/sortBy'
export default {
  id: 'organization',
  title: 'Organization',
  accessor: item => item.projects,
  key: project => project.org,
  label: project => project.org,
  count: () => 1,
  sort: sortBy('key'),
  countLabel: 'contributions',
  summaryLabel: 'in org',
  match: (item, filterKey) => item.projects.some(p => p.org === filterKey),
}
