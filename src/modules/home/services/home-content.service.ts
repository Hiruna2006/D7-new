import partnerLogos from '../data/partner-logos.json';
import heroSlides from '../data/hero-slides.json';

export type PartnerLogo = { src: string; alt: string };
export function getPartnerLogos(): PartnerLogo[] { return partnerLogos as PartnerLogo[]; }
export function getHeroSlides(): string[] { return heroSlides as string[]; }
