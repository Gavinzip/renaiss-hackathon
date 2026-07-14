// The trigger and dialog content must share the exact same transition so that
// Framer Motion can preserve the card's geometry in both directions.
export const PROJECT_DIALOG_SHARED_TRANSITION = Object.freeze({
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
