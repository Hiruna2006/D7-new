import type { ProjectCategory } from '@/types/project';

export const PROJECT_CATEGORIES = [
  { value: 'meetings', label: 'Meetings' },
  { value: 'orientations', label: 'Orientations' },
  { value: 'youth', label: 'Youth' },
  { value: 'religious', label: 'Religious' },
  { value: 'service', label: 'Service Projects' },
  { value: 'events', label: 'Events' },
  { value: 'upcoming', label: 'Upcoming / Coming Soon' },
] as const satisfies readonly { value: ProjectCategory; label: string }[];

export const PROJECT_FILTERS = [
  { key: 'all', label: 'All' },
  ...PROJECT_CATEGORIES.map((item) => ({ key: item.value, label: item.value === 'upcoming' ? 'Coming Soon' : item.label })),
] as const;

export const VALID_PROJECT_CATEGORIES = PROJECT_CATEGORIES.map((item) => item.value) as readonly ProjectCategory[];
