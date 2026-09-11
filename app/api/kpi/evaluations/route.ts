import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { authorizeRequest } from '@/src/core/auth/server-authorization';

export const dynamic = 'force-dynamic';

function serializeValue(value: unknown): unknown {
  if (!value) return value;
  if (typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, serializeValue(item)]),
    );
  }
  return value;
}

export async function GET(request: Request) {
  const user = await authorizeRequest(request, ['admin']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getAdminDb();
    if (!db) return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });

    const snapshot = await db.collection('evaluations').get();
    const evaluations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(serializeValue(doc.data()) as Record<string, unknown>),
    }));
    return NextResponse.json({ evaluations });
  } catch (error) {
    console.error('KPI evaluations API error:', error);
    return NextResponse.json({ error: 'Failed to load KPI evaluations' }, { status: 500 });
  }
}
