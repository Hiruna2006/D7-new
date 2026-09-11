import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';

export async function getQuizAttempts(): Promise<Array<Record<string, any> & { id: string }>> {
  if (!db) return [];
  const snapshot = await getDocs(collection(db, 'attempts'));
  return snapshot.docs.map((item) => {
    const data = item.data() as Record<string, any>;
    const at = data.at?.toDate?.() ?? data.at ?? '';
    return { id: item.id, ...data, at: at instanceof Date ? at.toISOString() : at };
  });
}
