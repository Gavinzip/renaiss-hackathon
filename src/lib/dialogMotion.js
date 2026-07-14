export const PROJECT_DIALOG_EXPAND_TRANSITION = Object.freeze({
  type: 'spring',
  bounce: 0.04,
  duration: 0.32,
});

export const PROJECT_DIALOG_RETURN_TRANSITION = Object.freeze({
  type: 'spring',
  bounce: 0.05,
  duration: 0.5,
});

export function projectDialogReturnPose(sourceRect, targetRect) {
  if (!sourceRect || !targetRect || !sourceRect.width || !sourceRect.height) return null;

  const sourceCenterX = sourceRect.left + (sourceRect.width / 2);
  const sourceCenterY = sourceRect.top + (sourceRect.height / 2);
  const targetCenterX = targetRect.left + (targetRect.width / 2);
  const targetCenterY = targetRect.top + (targetRect.height / 2);

  return {
    x: targetCenterX - sourceCenterX,
    y: targetCenterY - sourceCenterY,
    scaleX: targetRect.width / sourceRect.width,
    scaleY: targetRect.height / sourceRect.height,
    borderRadius: 18,
  };
}

export function projectDialogLayoutId(projectId) {
  return `project-dialog-${projectId}`;
}

export function projectDialogImageLayoutId(projectId) {
  return `project-dialog-image-${projectId}`;
}

export function projectDialogTitleLayoutId(projectId) {
  return `project-dialog-title-${projectId}`;
}
