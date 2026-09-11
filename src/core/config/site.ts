export const SITE_CONFIG = {
  name: 'Leo District 306 D7',
  shortName: 'D7 Leos',
  slogan: 'Forge the Future',
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://d7leos.org',
  lmsUrl: process.env.NEXT_PUBLIC_LMS_URL || 'https://lms.d7leos.org',
  adminPath: '/admin',
  logo: '/logos/dp.png',
} as const;

export const BRAND_COLORS = {
  petal: '#F7B1C8',
  rose: '#EC69A2',
  fuchsia: '#EA0880',
  crimson: '#C41D66',
  burgundy: '#710F38',
  burgundyDark: '#5A0C2D',
  sand: '#F7EAC1',
  gold: '#E1AD36',
  bronze: '#B2722A',
  deepRed: '#AA0D24',
  deepCrimson: '#900B1F',
  campaignBackground: '#0A0505',
  campaignSurface: '#1A0A0E',
} as const;
