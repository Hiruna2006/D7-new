import experts from '../data/experts.json';
import clubProjects from '../data/club-projects.json';
export type CityToSoilExpert = { name: string; title: string; org: string; image: string; email: string; message: string };
export type CityToSoilClubProject = { name: string; images: string[] };
export const cityToSoilService = {
  getExperts: () => experts as CityToSoilExpert[],
  getClubProjects: () => clubProjects as CityToSoilClubProject[],
};
