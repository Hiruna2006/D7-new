import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';
import type { Project } from '@/types/project';

type ProjectRecord = Record<string, unknown> & { id: string };
type Unsubscribe = () => void;
export function subscribeToProjects(onData: (projects: ProjectRecord[]) => void, onError?: (error: Error) => void): Unsubscribe {
  if (!db) { onData([]); return () => undefined; }
  const q = query(collection(db, 'projects'), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))), (error) => onError?.(error));
}
export async function saveProject(id: string, payload: Omit<Project,'id'> | Project, isExisting: boolean) {
  if (!db) throw new Error('Firebase is not configured');
  await setDoc(doc(db, 'projects', id), { ...payload, updatedAt: serverTimestamp(), ...(isExisting ? {} : { createdAt: serverTimestamp() }) }, { merge: true });
}
export async function removeProject(id: string) { if (!db) throw new Error('Firebase is not configured'); await deleteDoc(doc(db,'projects',id)); }
