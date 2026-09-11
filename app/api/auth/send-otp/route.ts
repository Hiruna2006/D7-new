import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { Resend } from 'resend';
import { BRAND_COLORS } from '@/src/core/config/site';
import { generateOtp, hashOtp } from '@/src/core/auth/otp';

const RESEND_COOLDOWN_MS = 60_000;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }
    const resend = new Resend(resendKey);

    const db = getAdminDb();
    if (!db) return NextResponse.json({ error: 'Database error' }, { status: 500 });

    const docRef = db.collection('otps').doc(email);
    const existing = await docRef.get();
    const existingCreatedAt = existing.data()?.createdAt?.toDate?.();
    if (existingCreatedAt && Date.now() - existingCreatedAt.getTime() < RESEND_COOLDOWN_MS) {
      return NextResponse.json({ error: 'Please wait before requesting another code.' }, { status: 429 });
    }

    const otp = generateOtp();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 10 * 60_000);

    await docRef.set({
      otpHash: hashOtp(email, otp),
      expiresAt,
      createdAt: now,
      attempts: 0,
    });

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@d7leos.org',
      to: email,
      subject: 'Your Login Code for D7 Leos KPI Portal',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
          <h2 style="color:${BRAND_COLORS.burgundy}">D7 Leos KPI Portal</h2>
          <p>Please use the following 6-digit code to securely log in:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:4px;padding:20px;background:#FFF4F8;color:${BRAND_COLORS.crimson};text-align:center;border-radius:8px;margin:20px 0">${otp}</div>
          <p>This code will expire in 10 minutes. You have a maximum of five verification attempts.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>`,
    });

    if (result.error) {
      await docRef.delete().catch(() => undefined);
      console.error('Resend error:', result.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Send API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
