import sortBy from 'lodash/fp/sortBy'
import identity from 'lodash/fp/identity'

const keyFn = item => item.name

export default {
  id: 'contributor',
  title: 'Contributor',
  accessor: identity,
  key: keyFn,
  label: item => item.name,
  count: () => 1,
  sort: sortBy('key'),
  countLabel: 'contributions',
  summaryLabel: 'by',
  match: (contribution, filterKey) => {
    return keyFn(contribution) === filterKey
  },
}
