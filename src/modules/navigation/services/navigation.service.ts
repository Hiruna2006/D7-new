import navigation from '../data/navigation.json';
import { SITE_CONFIG } from '../../../core/config/site';

export type NavigationItem = {
  href: string;
  label: string;
  type: 'internal' | 'external' | 'lms';
};

export function getMainNavigation(): NavigationItem[] {
  return (navigation as NavigationItem[]).map((item) =>
    item.type === 'lms' ? { ...item, href: SITE_CONFIG.lmsUrl } : item,
  );
}
