import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import uniqBy from 'lodash/fp/uniqBy'

const getProjects = notes => {
  const regex = /https?:\/\/github.com\/([\w-]*)\/([\w-]*)/gi
  const projects = []
  let project
  while ((project = regex.exec(notes))) {
    const [url, org, repo] = project
    projects.push({
      id: `${org}/${repo}`,
      url,
      org,
      repo,
    })
  }

  return uniqBy('id', projects)
}

const formatContribution = node => {
  const date = parseDate(node.Date)
  const notes = node.Notes

  return {
    name: `${node.First_Name} ${node.Last_Name}`,
    date,
    formattedDate: formatDate(date, 'dddd D MMMM'),
    hours: parseFloat(node.Hours),
    notes: notes || 'No comment.',
    projects: getProjects(notes),
  }
}

export default formatContribution
