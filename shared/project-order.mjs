export function orderProjectsByVotes(projects, voteCounts) {
  return [...projects]
    .map((project) => ({
      projectId: project.id,
      votes: Number(voteCounts.get(project.id) || 0),
    }))
    .sort((left, right) => {
      const voteDifference = right.votes - left.votes
      if (voteDifference) return voteDifference

      const discoveryDifference = stableProjectOrder(left.projectId) - stableProjectOrder(right.projectId)
      return discoveryDifference || left.projectId.localeCompare(right.projectId)
    })
}

function stableProjectOrder(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
