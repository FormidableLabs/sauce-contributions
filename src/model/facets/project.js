import sortBy from 'lodash/fp/sortBy'
export default {
  id: 'project',
  title: 'Project',
  accessor: item => item.projects,
  key: project => project.id,
  label: project => project.id,
  count: () => 1,
  sort: sortBy('key'),
  countLabel: 'contributions',
  summaryLabel: 'in project',
  match: (item, filterKey) => item.projects.some(p => p.id === filterKey),
}
