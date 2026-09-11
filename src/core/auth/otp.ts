import { createHmac, randomInt } from 'crypto';

const getSecret = () => {
  const secret = process.env.OTP_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== 'production') return 'd7-development-otp-secret';
  throw new Error('OTP_SECRET is not configured');
};

export const generateOtp = () => randomInt(100000, 1000000).toString();

export const hashOtp = (email: string, otp: string) =>
  createHmac('sha256', getSecret())
    .update(`${email.trim().toLowerCase()}:${otp}`)
    .digest('hex');
