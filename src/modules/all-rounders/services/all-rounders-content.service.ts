import rawHighlights from '../data/fallback-highlights.json';
export interface RawAllRounderContent { name?:string; photo?:string; achievement?:string; description?:string; gallery?:string[]; galleryDir?:string; }
export interface RawMonthHighlightContent { month:string; year:string; allRounders:RawAllRounderContent[]; }
export function getFallbackAllRoundersContent(): RawMonthHighlightContent[] { return rawHighlights as RawMonthHighlightContent[]; }
