import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';
import type { CouncilSection } from '../types/council';

export function subscribeCouncilSections(
  fallback: CouncilSection[],
  onData: (sections: CouncilSection[]) => void,
  onError?: (error: Error) => void,
) {
  if (!db) { onData(fallback); return () => undefined; }
  return onSnapshot(doc(db, 'siteContent', 'council'), (snapshot) => {
    const sections = snapshot.data()?.sections;
    onData(Array.isArray(sections) && sections.length ? sections as CouncilSection[] : fallback);
  }, (error) => { onData(fallback); onError?.(error); });
}

export async function saveCouncilSections(sections: CouncilSection[]) {
  if (!db) throw new Error('Firebase is not configured');
  await setDoc(doc(db, 'siteContent', 'council'), { sections, updatedAt: serverTimestamp() }, { merge: true });
}
