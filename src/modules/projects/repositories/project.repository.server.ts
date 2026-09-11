import { getAdminDb } from '@/src/core/firebase/admin';
export async function getProjectsServer(): Promise<Array<Record<string, unknown> & { id: string }>> {
  const db = getAdminDb(); if (!db) return [];
  const snapshot = await db.collection('projects').orderBy('date','desc').get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
