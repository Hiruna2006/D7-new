import { redirect } from 'next/navigation';
import { SITE_CONFIG } from '@/src/core/config/site';

export default function LmsRedirectPage() {
  redirect(SITE_CONFIG.lmsUrl);
}
