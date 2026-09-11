import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/src/core/firebase/client';

export interface MerchOrderRecord {
  id: string;
  name?: string;
  email?: string;
  clubName?: string;
  cart?: Array<{ productId: string; size: string; quantity: number }>;
  totalAmount?: number;
  receiptUrl?: string;
  receiptPath?: string;
  colomboTime?: string;
  createdAtText?: string;
  [key: string]: unknown;
}

export async function getMerchOrders(): Promise<MerchOrderRecord[]> {
  if (!db) return [];
  const q = query(collection(db, 'merch_orders'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => {
    const data = item.data() as Record<string, unknown>;
    const createdAt = data.createdAt;
    const createdAtText = createdAt instanceof Timestamp ? createdAt.toDate().toLocaleString() : '';
    return { id: item.id, ...data, createdAtText } as MerchOrderRecord;
  });
}


export async function getMerchReceiptUrl(receiptPath: string): Promise<string> {
  if (!auth?.currentUser) throw new Error('Authentication required');
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`/api/admin/merch-receipt?path=${encodeURIComponent(receiptPath)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Unable to open receipt');
  const data = await response.json();
  return data.url as string;
}
