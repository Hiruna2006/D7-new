import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import { merchandiseService } from '@/src/modules/merchandise/services/merchandise.service';
import { clubService } from '@/src/modules/clubs/services/club.service';
import { BRAND_COLORS, SITE_CONFIG } from '@/src/core/config/site';

export const runtime = 'nodejs';

const MAX_RECEIPT_BYTES = 8 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

type CartItem = { productId: string; size: string; quantity: number };

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const firebaseConfig: { projectId: string; clientEmail?: string; privateKey?: string } = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'd7leos',
  clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64) {
  const json = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64, 'base64').toString());
  firebaseConfig.projectId = json.project_id;
  firebaseConfig.clientEmail = json.client_email;
  firebaseConfig.privateKey = json.private_key;
}

if (!getApps().length && firebaseConfig.clientEmail && firebaseConfig.privateKey) {
  initializeApp({
    credential: cert({
      projectId: firebaseConfig.projectId,
      clientEmail: firebaseConfig.clientEmail,
      privateKey: firebaseConfig.privateKey,
    }),
  });
}


function validateCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) throw new Error('Invalid cart');
  const products = new Map(merchandiseService.getProducts().map((product) => [product.id, product]));
  const sizes = new Set(merchandiseService.getSizes());

  return raw.map((item) => {
    if (!item || typeof item !== 'object') throw new Error('Invalid cart item');
    const candidate = item as Partial<CartItem>;
    const quantity = Number(candidate.quantity);
    if (!candidate.productId || !products.has(candidate.productId)) throw new Error('Unknown product');
    if (!candidate.size || !sizes.has(candidate.size)) throw new Error('Invalid size');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new Error('Invalid quantity');
    return { productId: candidate.productId, size: candidate.size, quantity };
  });
}

export async function POST(req: NextRequest) {
  try {
    // Initialize Firestore lazily at request time. Next.js imports API route modules
    // during production builds, when server credentials may intentionally be absent.
    // Calling getFirestore() at module scope makes `next build` fail in that case.
    if (!getApps().length) {
      if (!firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
        console.error('[checkout] Firebase Admin credentials are not configured');
        return NextResponse.json({ error: 'Checkout service is temporarily unavailable' }, { status: 503 });
      }

      initializeApp({
        credential: cert({
          projectId: firebaseConfig.projectId,
          clientEmail: firebaseConfig.clientEmail,
          privateKey: firebaseConfig.privateKey,
        }),
      });
    }

    const db = getFirestore();

    // Resend must also be initialized lazily. Next.js imports API route modules
    // while collecting page data during `next build`, when RESEND_API_KEY may
    // intentionally be absent. Validate it before any order side effects occur.
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[checkout] RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Checkout email service is temporarily unavailable' }, { status: 503 });
    }
    const resend = new Resend(resendApiKey);

    const formData = await req.formData();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const clubType = String(formData.get('clubType') || '').trim();
    const clubName = String(formData.get('clubName') || '').trim();
    const cartJson = String(formData.get('cart') || '');
    const receipt = formData.get('receipt');

    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !clubName || !cartJson || !(receipt instanceof File)) {
      return NextResponse.json({ error: 'Invalid or missing required fields' }, { status: 400 });
    }

    const validClubs = new Set(clubService.getActive().map((club) => club.name));
    if (!validClubs.has(clubName)) return NextResponse.json({ error: 'Invalid Leo Club' }, { status: 400 });
    if (receipt.size <= 0 || receipt.size > MAX_RECEIPT_BYTES || !ALLOWED_RECEIPT_TYPES.has(receipt.type)) {
      return NextResponse.json({ error: 'Receipt must be a JPG, PNG, WEBP or PDF under 8 MB' }, { status: 400 });
    }

    const cart = validateCart(JSON.parse(cartJson));
    const products = new Map(merchandiseService.getProducts().map((product) => [product.id, product]));
    const totalAmount = merchandiseService.calculateTotal(cart);
    if (totalAmount <= 0) return NextResponse.json({ error: 'Invalid order total' }, { status: 400 });

    const colomboTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo', dateStyle: 'medium', timeStyle: 'medium',
    });

    // Private receipt upload. Admin SDK bypasses Storage Rules; no makePublic() call is used.
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${firebaseConfig.projectId}.firebasestorage.app`;
    const bucket = getStorage().bucket(storageBucket);
    const extension = receipt.type === 'application/pdf' ? 'pdf' : (receipt.type.split('/')[1] || 'bin').replace('jpeg', 'jpg');
    const safeClub = clubName.replace(/[^a-z0-9_-]+/gi, '_');
    const fileName = `merch_receipts/${safeClub}/${Date.now()}_${crypto.randomUUID()}.${extension}`;
    const file = bucket.file(fileName);
    await file.save(Buffer.from(await receipt.arrayBuffer()), {
      resumable: false,
      metadata: { contentType: receipt.type, cacheControl: 'private, max-age=0' },
    });

    // Short-lived signed link for the private operational Google Sheet; the canonical value is receiptPath.
    const [receiptUrl] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 7 * 24 * 60 * 60 * 1000 });

    await db.collection('merch_orders').add({
      createdAt: new Date(), colomboTime, name, email, clubType, clubName, cart,
      totalAmount, receiptPath: fileName, status: 'pending',
    });

    const grouped = new Map<string, CartItem[]>();
    for (const item of cart) {
      const color = products.get(item.productId)?.color || item.productId;
      grouped.set(color, [...(grouped.get(color) || []), item]);
    }
    const sheetRows = [...grouped.entries()].map(([color, items]) => {
      const summary = items.map((item) => `${item.size}(${item.quantity})`).join(', ');
      const subtotal = items.reduce((sum, item) => sum + (products.get(item.productId)?.price || 0) * item.quantity, 0);
      return [colomboTime, name, email, clubName, color, summary, subtotal, receiptUrl];
    });

    if (process.env.GOOGLE_SHEET_ID && firebaseConfig.clientEmail && firebaseConfig.privateKey) {
      const auth = new google.auth.GoogleAuth({
        credentials: { client_email: firebaseConfig.clientEmail, private_key: firebaseConfig.privateKey },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const sheets = google.sheets({ version: 'v4', auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        requestBody: { values: sheetRows },
      });
    }

    const safeName = escapeHtml(name);
    const safeClubName = escapeHtml(clubName);
    const cartItemsHtml = cart.map((item) => {
      const product = products.get(item.productId)!;
      const subtotal = product.price * item.quantity;
      return `<tr><td style="padding:12px;border-bottom:1px solid #eee;font-family:sans-serif;font-size:14px"><strong>${escapeHtml(product.name)}</strong><br><span style="color:#666;font-size:12px">Size: ${escapeHtml(item.size)}</span></td><td style="padding:12px;border-bottom:1px solid #eee;text-align:center;font-family:sans-serif;font-size:14px">${item.quantity}</td><td style="padding:12px;border-bottom:1px solid #eee;text-align:right;font-family:sans-serif;font-size:14px;font-weight:bold">Rs. ${subtotal.toLocaleString()}</td></tr>`;
    }).join('');

    const emailHtml = `<!doctype html><html><body><div style="font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:16px;overflow:hidden"><div style="background:${BRAND_COLORS.burgundy};padding:40px 20px;text-align:center"><img src="${SITE_CONFIG.websiteUrl}/logos/dp.png" alt="Leo District 306 D7" style="width:80px;height:auto"><h1 style="color:#fff;margin:20px 0 0;font-size:24px;text-transform:uppercase;letter-spacing:2px">Order Confirmed</h1></div><div style="height:6px;background:linear-gradient(to right,${BRAND_COLORS.burgundy},${BRAND_COLORS.gold})"></div><div style="padding:40px;background:#fff;color:#333;line-height:1.6"><div style="display:inline-block;padding:4px 12px;background:#fff8e1;color:#b2722a;border-radius:20px;font-size:12px;font-weight:bold;text-transform:uppercase">Payment Verification Pending</div><h2 style="color:${BRAND_COLORS.burgundy}">Hi ${safeName},</h2><p>Thank you for purchasing the official District 306 D7 merchandise. Your order has been recorded and is being processed.</p><div style="background:#fcfcfc;border:1px solid #f0f0f0;border-radius:12px;padding:20px;margin:20px 0"><h3 style="color:${BRAND_COLORS.burgundy}">Order Summary</h3><p><strong>Club:</strong> ${safeClubName}</p><table style="width:100%;border-collapse:collapse"><tbody>${cartItemsHtml}</tbody><tfoot><tr><td colspan="2" style="padding-top:20px;font-weight:bold;text-align:right">Total Amount</td><td style="padding-top:20px;font-weight:bold;text-align:right;color:${BRAND_COLORS.burgundy};font-size:18px">Rs. ${totalAmount.toLocaleString()}</td></tr></tfoot></table></div><p style="font-size:14px;color:#666">Our district officials will verify your bank slip. Once confirmed, we will process your order for delivery.</p><p style="font-weight:bold;color:${BRAND_COLORS.burgundy}">Forge the Future!</p><p style="font-size:14px;color:#999">Leo District 306 D7 — Sri Lanka</p></div></div></body></html>`;

    const fromEmail = process.env.RESEND_FROM || 'noreply@d7leos.org';
    const finalFrom = fromEmail.includes('<') ? fromEmail : `Leo District 306 D7 <${fromEmail}>`;
    await resend.emails.send({ from: finalFrom, to: email, subject: `Official Merch Order - ${clubName}`, html: emailHtml });

    return NextResponse.json({ success: true, totalAmount });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
