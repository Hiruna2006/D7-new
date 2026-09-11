export interface CouncilMember {
  name: string;
  role?: string;
  photo?: string;
  biography?: string;
  gallery?: string[];
}
export interface CouncilSection { title: string; items: CouncilMember[]; }
