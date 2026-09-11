import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';

export async function getKpiPortalState(uid: string) {
  if (!db) return { profile: null, evaluation: null };
  const [profileSnap, legacyUserSnap, evaluationSnap] = await Promise.all([
    getDoc(doc(db, 'kpiProfiles', uid)),
    getDoc(doc(db, 'users', uid)),
    getDoc(doc(db, 'evaluations', uid)),
  ]);

  const profile = profileSnap.exists()
    ? profileSnap.data()
    : legacyUserSnap.exists() && legacyUserSnap.data()?.mappedRole
      ? { email: legacyUserSnap.data()?.email || '', mappedRole: legacyUserSnap.data()?.mappedRole }
      : null;

  return {
    profile,
    evaluation: evaluationSnap.exists() ? evaluationSnap.data() : null,
  };
}

export async function saveKpiProfile(uid: string, email: string, mappedRole: unknown) {
  if (!db) throw new Error('Firebase is not configured');
  const payload = { uid, email, mappedRole, updatedAt: serverTimestamp() };
  await setDoc(doc(db, 'kpiProfiles', uid), payload, { merge: true });
  return payload;
}

export async function saveKpiEvaluation(uid: string, payload: Record<string, unknown>) {
  if (!db) throw new Error('Firebase is not configured');
  const data = { ...payload, submittedAt: serverTimestamp() };
  await setDoc(doc(db, 'evaluations', uid), data, { merge: true });
  return data;
}
