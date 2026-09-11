import links from '../data/admin-links.json';

export type AdminNavigationItem = { href: string; label: string; description: string };
export function getAdminNavigation(): AdminNavigationItem[] {
  return links as AdminNavigationItem[];
}
