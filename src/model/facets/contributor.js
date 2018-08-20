import orderBy from 'lodash/fp/orderBy'
import identity from 'lodash/fp/identity'

const keyFn = item => item.name

export default {
  id: 'contributor',
  title: 'Contributor',
  accessor: identity,
  key: keyFn,
  label: item => item.name,
  count: item => item.hours,
  sort: orderBy(['count'], ['desc']),
  countLabel: 'hours',
  summaryLabel: 'by',
  match: (contribution, filterKey) => {
    return keyFn(contribution) === filterKey
  },
}
