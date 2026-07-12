export const PROJECT_DIALOG_EXPAND_TRANSITION = Object.freeze({
  type: 'spring',
  bounce: 0.04,
  duration: 0.32,
});

export const PROJECT_DIALOG_RETURN_TRANSITION = Object.freeze({
  type: 'spring',
  bounce: 0,
  duration: 0.22,
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
