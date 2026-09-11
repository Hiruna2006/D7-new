import knowledge from '../data/district-knowledge.json';
import { councilService } from '@/src/modules/council/services/council.service';
import { clubService } from '@/src/modules/clubs/services/club.service';

const plainText = (html?: string) => (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const findLeadership = (role: string) => councilService.getMembers().find((member) => member.role === role);
const normalizeLeader = (role: string) => {
  const member = findLeadership(role);
  return {
    name: member?.name ?? role,
    title: member?.role ?? role,
    contact: role === 'District President' ? knowledge.district.phone : '',
    theme: role === 'District President' ? knowledge.values.theme : undefined,
    bio: plainText(member?.biography),
    type: member?.role ?? role,
  };
};

export const chatbotContentService = {
  getDistrictKnowledge: () => ({
    ...knowledge,
    leadership: {
      president: normalizeLeader('District President'),
      vicePresident: normalizeLeader('District Vice President'),
      secretary: normalizeLeader('District Secretary'),
      treasurer: normalizeLeader('District Treasurer'),
      chairperson: normalizeLeader('District Leo Club Chairperson'),
    },
  }),
  getCouncilMembers: () => councilService.getMembers().map((member) => ({
    name: member.name,
    position: member.role ?? '',
    contact: member.role === 'District President' ? knowledge.district.phone : '',
    bio: plainText(member.biography),
    type: member.role ?? '',
    source: 'council-service',
  })),
  getClubs: () => clubService.getActive(),
};
