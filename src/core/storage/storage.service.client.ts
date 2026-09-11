import { deleteObject, getDownloadURL, ref, uploadBytes, type UploadMetadata } from 'firebase/storage';
import { storage } from '@/src/core/firebase/client';

const requireStorage = () => {
  if (!storage) throw new Error('Firebase Storage is not configured');
  return storage;
};

export const storageService = {
  async upload(path: string, file: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata) {
    const result = await uploadBytes(ref(requireStorage(), path), file, metadata);
    return { path: result.ref.fullPath, url: await getDownloadURL(result.ref) };
  },
  getUrl(path: string) {
    return getDownloadURL(ref(requireStorage(), path));
  },
  remove(path: string) {
    return deleteObject(ref(requireStorage(), path));
  },
};
