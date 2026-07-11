export const LINEAR_DIALOG_TRANSITION = Object.freeze({
  type: 'spring',
  bounce: 0.05,
  duration: 0.5,
});

export function projectDialogLayoutId(projectId) {
  return `project-dialog-${projectId}`;
}

export function projectDialogImageLayoutId(projectId) {
  return `project-dialog-image-${projectId}`;
}

export function projectDialogTitleLayoutId(projectId) {
  return `project-dialog-title-${projectId}`;
}
