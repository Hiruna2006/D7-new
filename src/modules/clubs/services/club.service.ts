import { JsonClubRepository } from '../repositories/club.repository';
import type { ClubType } from '../types/club';
const repository = new JsonClubRepository();
export const clubService = {
  getAll: () => repository.getAll(),
  getActive: () => repository.getActive(),
  getByType: (type: ClubType) => repository.getByType(type),
  getNamesByType: (type: ClubType) => repository.getByType(type).map((club) => club.name),
};
