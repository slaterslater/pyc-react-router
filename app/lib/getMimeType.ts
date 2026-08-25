export function getMimeType(mimeType: string | undefined) {
  if (!mimeType) return null;
  return mimeType.split('/')[0];
}