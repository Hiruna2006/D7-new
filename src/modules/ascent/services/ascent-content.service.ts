import fallbackIssues from '../data/fallback-issues.json';
import type { NewsletterIssue } from '@/types/newsletter';

export const ascentContentService = {
  getFallbackIssues: (): NewsletterIssue[] => fallbackIssues.map((issue) => ({ ...issue })),
};
