import clubs from '../data/clubs.json';
import type { Club, ClubType } from '../types/club';

export interface ClubRepository {
  getAll(): Club[];
  getActive(): Club[];
  getByType(type: ClubType): Club[];
}

export class JsonClubRepository implements ClubRepository {
  private readonly clubs = clubs as Club[];
  getAll() { return [...this.clubs]; }
  getActive() { return this.clubs.filter((club) => club.active); }
  getByType(type: ClubType) { return this.getActive().filter((club) => club.type === type).sort((a,b) => a.order-b.order); }
}
