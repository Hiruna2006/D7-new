import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase/client';

export async function getUserDocument(uid: string) {
  if (!db) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function ensureUserProgressDocument(uid: string) {
  if (!db) throw new Error('Firebase is not configured');
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { progress: {}, createdAt: serverTimestamp() }, { merge: true });
    return { progress: {} };
  }
  return snap.data();
}

export async function updateCourseProgress(uid: string, courseId: string, progress: Record<string, unknown>) {
  if (!db) throw new Error('Firebase is not configured');
  await updateDoc(doc(db, 'users', uid), {
    [`progress.${courseId}`]: { ...progress, updatedAt: serverTimestamp() },
  });
}
