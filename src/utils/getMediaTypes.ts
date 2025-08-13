import { MediaType } from './constants/MediaType';

export function getMediaType(fileType: string): string {
  if (!fileType) return MediaType.application;

  const [category] = fileType.split('/');

  if (Object.values(MediaType).includes(category as MediaType)) {
    return category as MediaType;
  }

  return MediaType.application; // default if unknown
}
