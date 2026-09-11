import { JsonCouncilRepository } from '../repositories/council.repository';
import type { CouncilMember } from '../types/council';
const repository = new JsonCouncilRepository();
const leadershipRoles = [
  'District President',
  'Immediate Past District President / District Contest Director',
  'District Leo Club Chairperson',
  'District Vice President',
  'District Secretary',
  'District Treasurer',
];
export const councilService = {
  getSections: () => repository.getSections(),
  getMembers: (): CouncilMember[] => repository.getSections().flatMap((section) => section.items),
  getDistrictLeadership: (): CouncilMember[] => {
    const members = repository.getSections().flatMap((section) => section.items);
    return leadershipRoles.map((role) => members.find((member) => member.role === role)).filter(Boolean) as CouncilMember[];
  },
};

export { subscribeCouncilSections, saveCouncilSections } from '../repositories/council.repository.client';
