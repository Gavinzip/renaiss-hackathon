export function orderProjectsByPublicVoteOrder(projects, projectOrder) {
  if (!Array.isArray(projectOrder) || projectOrder.length === 0) return projects

  const orderByProjectId = new Map();
  projectOrder.forEach((projectId, index) => {
    if (!orderByProjectId.has(projectId)) orderByProjectId.set(projectId, index)
  });
  if (orderByProjectId.size === 0) return projects

  const originalIndexByProjectId = new Map(projects.map((project, index) => [project.id, index]));
  return [...projects].sort((left, right) => {
    const leftOrder = orderByProjectId.get(left.id) ?? originalIndexByProjectId.get(left.id);
    const rightOrder = orderByProjectId.get(right.id) ?? originalIndexByProjectId.get(right.id);
    return leftOrder - rightOrder;
  });
}
