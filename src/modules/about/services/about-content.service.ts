import faqs from '../data/faqs.json';
export type Faq = { question: string; answer: string };
export function getFaqs(): Faq[] { return faqs as Faq[]; }
