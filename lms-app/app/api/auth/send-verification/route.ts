import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminAuth } from '@d7/src/core/firebase/admin';
import { BRAND_COLORS, SITE_CONFIG } from '@d7/src/core/config/site';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { email, displayName } = await req.json();
    if (!email || typeof email !== 'string') return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const auth = getAdminAuth();
    if (!auth) return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });

    const lmsUrl = process.env.NEXT_PUBLIC_LMS_URL || SITE_CONFIG.lmsUrl;
    const link = await auth.generateEmailVerificationLink(email, { url: lmsUrl, handleCodeInApp: true });
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });

    const fromEmail = process.env.RESEND_FROM || 'noreply@d7leos.org';
    const resend = new Resend(resendKey);
    const from = fromEmail.includes('<') ? fromEmail : `Leo District 306 D7 <${fromEmail}>`;
    const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#fafafa;padding:24px"><div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6e6e6"><div style="background:${BRAND_COLORS.burgundy};padding:28px;text-align:center"><img src="${SITE_CONFIG.websiteUrl}/logos/dp.png" width="90" height="90" alt="D7"></div><div style="height:5px;background:${BRAND_COLORS.gold}"></div><div style="padding:36px;color:#333"><h2 style="color:${BRAND_COLORS.burgundy}">Welcome to the D7 LMS, ${displayName || 'Leo'}!</h2><p>Verify your email address to access your courses and learning progress.</p><p style="text-align:center;margin:28px 0"><a href="${link}" style="display:inline-block;background:${BRAND_COLORS.burgundy};color:white;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Verify Email Address</a></p><p>If you did not create this account, you can ignore this email.</p><p><strong>Forge the Future!</strong><br>Leo District 306 D7 Team</p></div></div></body></html>`;

    const { data, error } = await resend.emails.send({ from, to: email, subject: 'Verify Your Email - Leo District 306 D7 LMS', html });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error('[LMS verification API]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
