import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { hashOtp } from '@/src/core/auth/otp';

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const otp = typeof body.otp === 'string' ? body.otp.trim() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'Email and a 6-digit OTP are required' }, { status: 400 });
    }

    const db = getAdminDb();
    const auth = getAdminAuth();
    if (!db || !auth) return NextResponse.json({ error: 'Service error' }, { status: 500 });

    const docRef = db.collection('otps').doc(email);
    const outcome = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(docRef);
      if (!snapshot.exists) return { error: 'Invalid or expired OTP', status: 400 } as const;

      const data = snapshot.data() ?? {};
      const expiresAt = data.expiresAt?.toDate?.();
      if (!(expiresAt instanceof Date) || Date.now() > expiresAt.getTime()) {
        transaction.delete(docRef);
        return { error: 'OTP has expired', status: 400 } as const;
      }

      const attempts = Number(data.attempts ?? 0);
      if (attempts >= MAX_ATTEMPTS) {
        transaction.delete(docRef);
        return { error: 'Too many attempts. Request a new code.', status: 429 } as const;
      }

      if (data.otpHash !== hashOtp(email, otp)) {
        transaction.update(docRef, { attempts: attempts + 1 });
        return { error: 'Incorrect OTP', status: 400 } as const;
      }

      transaction.delete(docRef);
      return { ok: true } as const;
    });

    if ('error' in outcome) return NextResponse.json({ error: outcome.error }, { status: outcome.status });

    const customToken = await auth.createCustomToken(email);
    return NextResponse.json({ success: true, token: customToken });
  } catch (error) {
    console.error('OTP Verify API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
