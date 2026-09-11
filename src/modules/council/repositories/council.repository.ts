import data from '../data/council.json';
import type { CouncilSection } from '../types/council';
export interface CouncilRepository { getSections(): CouncilSection[]; }
export class JsonCouncilRepository implements CouncilRepository {
  getSections() { return data as CouncilSection[]; }
}
