import ErrorBoundary from '@/components/error-boundary';
import { getProjectsServer } from '@/src/modules/projects/services/project.service.server';
import type { Project, ProjectCategory } from '@/types/project';
import { VALID_PROJECT_CATEGORIES } from '@/src/modules/projects/config/project.config';
import ProjectsClient from './projects-client';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const FALLBACK_CATEGORY: ProjectCategory = 'service';
const VALID_CATEGORIES = VALID_PROJECT_CATEGORIES;

function isProjectCategory(value: unknown): value is ProjectCategory {
  return typeof value === 'string' && (VALID_CATEGORIES as readonly string[]).includes(value);
}

function normalizeProject(input: Record<string, unknown> & { id: string }): Project {
  const data = input;
  const rawDate = data.date;
  const date = typeof rawDate === 'string'
    ? rawDate
    : typeof rawDate === 'object' && rawDate !== null && 'toDate' in rawDate && typeof (rawDate as { toDate?: unknown }).toDate === 'function'
      ? (rawDate as { toDate: () => Date }).toDate().toISOString()
      : new Date().toISOString();

  const gallery = Array.isArray(data.gallery)
    ? data.gallery.filter((item: unknown): item is string => typeof item === 'string')
    : [];

  const image = typeof data.image === 'string' && data.image.length > 0
    ? data.image
    : gallery[0] ?? '/images/coming-soon.svg';

  return {
    id: input.id,
    title: typeof data.title === 'string' && data.title.trim() ? data.title : 'Untitled Project',
    category: isProjectCategory(data.category) ? data.category : FALLBACK_CATEGORY,
    description: typeof data.description === 'string' ? data.description : 'Description coming soon.',
    image,
    date,
    venue: typeof data.venue === 'string' ? data.venue : 'To be announced',
    impact: typeof data.impact === 'string' ? data.impact : 'Impact details coming soon.',
    gallery: gallery.length > 0 ? gallery : [image],
  } satisfies Project;
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const records = await getProjectsServer();
    return records.map(normalizeProject);
  } catch (error) {
    console.error('Failed to load projects from Firestore:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <ErrorBoundary>
      <ProjectsClient initialProjects={projects} />
    </ErrorBoundary>
  );
}