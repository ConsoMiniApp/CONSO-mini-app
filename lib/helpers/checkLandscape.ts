export function isLandscape(height: number, width: number) {
  if (height < width) {
    return true;
  } else {
    return false;
  }
}
