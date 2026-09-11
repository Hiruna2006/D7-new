import type { Course } from '../../../../types/course';

export const COURSE_DIFFICULTIES: readonly Course['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced'];
export const COURSE_DISPLAY_ORDER = ['Beginner', 'Intermediate', 'Advanced', 'Supplementary'] as const;
