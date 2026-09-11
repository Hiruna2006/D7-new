import type { NextRequest } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/src/core/firebase/admin';

export type ServerRole = 'member' | 'trainer' | 'admin' | 'superadmin';

export interface AuthorizedUser {
  uid: string;
  email: string | null;
  role: ServerRole;
}

const allowedRoles = new Set<ServerRole>(['member', 'trainer', 'admin', 'superadmin']);

export async function authorizeRequest(
  request: Request | NextRequest,
  roles: readonly ServerRole[],
): Promise<AuthorizedUser | null> {
  const header = request.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const auth = getAdminAuth();
  const db = getAdminDb();
  if (!auth || !db) return null;

  try {
    const token = await auth.verifyIdToken(match[1]);
    const profile = await db.collection('users').doc(token.uid).get();
    const rawRole = profile.data()?.role;
    const role: ServerRole = allowedRoles.has(rawRole) ? rawRole : 'member';
    if (role !== 'superadmin' && !roles.includes(role)) return null;

    return {
      uid: token.uid,
      email: token.email ?? null,
      role,
    };
  } catch (error) {
    console.warn('[authorization] rejected request', error);
    return null;
  }
}
