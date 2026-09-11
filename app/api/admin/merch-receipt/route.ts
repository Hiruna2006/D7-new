import { NextResponse } from 'next/server';
import { getStorage } from 'firebase-admin/storage';
import { authorizeRequest } from '@/src/core/auth/server-authorization';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const user = await authorizeRequest(request, ['admin']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '';
  if (!path.startsWith('merch_receipts/') || path.includes('..')) {
    return NextResponse.json({ error: 'Invalid receipt path' }, { status: 400 });
  }

  try {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const bucket = bucketName ? getStorage().bucket(bucketName) : getStorage().bucket();
    const [signedUrl] = await bucket.file(path).getSignedUrl({
      action: 'read',
      expires: Date.now() + 5 * 60 * 1000,
    });
    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error('[merch receipt] failed to sign receipt', error);
    return NextResponse.json({ error: 'Unable to open receipt' }, { status: 500 });
  }
}
