'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { subscribeToAllRounders } from '@/src/modules/all-rounders/services/all-rounders.service';
import { getFallbackAllRoundersContent } from '@/src/modules/all-rounders/services/all-rounders-content.service';
import type { AllRounder, MonthHighlight } from '@/types/all-rounder';
import { LEO_YEAR_MONTH_SEQUENCE } from '@/src/modules/all-rounders/config/all-rounders.config';

type RawAllRounder = {
  name?: string;
  photo?: string;
  achievement?: string;
  description?: string;
  gallery?: string[];
  galleryDir?: string;
};

type RawMonthData = {
  month: string;
  year: string;
  allRounders: RawAllRounder[];
};

const MONTH_SEQUENCE: readonly string[] = LEO_YEAR_MONTH_SEQUENCE;

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const normalizeRawAllRounder = (leo: RawAllRounder, highlightId: string, index: number): AllRounder => ({
  id: `${highlightId}-${slugify(leo.name ?? `leo-${index + 1}`)}`,
  name: leo.name ?? 'Outstanding Leo',
  photo: leo.photo ?? '/images/coming-soon.svg',
  achievement: leo.achievement ?? 'Milestone achievement',
  description: leo.description ?? 'Details coming soon.',
  gallery: Array.isArray(leo.gallery) ? leo.gallery.filter((src): src is string => typeof src === 'string') : [],
  galleryDir: leo.galleryDir ?? null,
});

const normalizeRawMonth = (month: RawMonthData, monthIndex: number): MonthHighlight => {
  const highlightId = `${month.year}-${slugify(month.month)}`;

  return {
    id: highlightId,
    month: month.month,
    year: month.year,
    monthIndex,
    allRounders: month.allRounders.map((leo, index) => normalizeRawAllRounder(leo, highlightId, index)),
  };
};

const sortHighlights = (items: MonthHighlight[]) =>
  items.slice().sort((a, b) => {
    const yearDelta = Number(a.year) - Number(b.year);
    if (yearDelta !== 0) return yearDelta;

    const aIndex = a.monthIndex ?? MONTH_SEQUENCE.indexOf(a.month);
    const bIndex = b.monthIndex ?? MONTH_SEQUENCE.indexOf(b.month);
    return aIndex - bIndex;
  });


const FALLBACK_HIGHLIGHTS: MonthHighlight[] = sortHighlights(
  getFallbackAllRoundersContent().map((month, index) => normalizeRawMonth(month, index)),
);

export const dynamic = 'force-dynamic';

export default function AllRoundersPage() {
  const [highlights, setHighlights] = useState<MonthHighlight[]>(FALLBACK_HIGHLIGHTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [selectedGallery, setSelectedGallery] = useState<{
    name: string;
    images: string[];
    index: number;
    description: string;
    achievement: string;
  } | null>(null);
  const [hoveredLeo, setHoveredLeo] = useState<string | null>(null);
  const [hoverImageIndex, setHoverImageIndex] = useState<Record<string, number>>({});
  const [discoveredGalleries, setDiscoveredGalleries] = useState<Record<string, string[]>>({});
  const preloaded = useRef<Record<string, HTMLImageElement[]>>({});
  const [portraitError, setPortraitError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsubscribe = subscribeToAllRounders(
      (items) => {
        setHighlights(items.length > 0 ? sortHighlights(items) : FALLBACK_HIGHLIGHTS);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Failed to load All Rounders highlights:', err);
        setError('Live data unavailable. Showing fallback content.');
        setHighlights(FALLBACK_HIGHLIGHTS);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  const years = useMemo(() => {
    const unique = new Set<string>(['All']);
    highlights.forEach((highlight) => unique.add(highlight.year));
    return Array.from(unique).sort();
  }, [highlights]);

  const filteredMonths = useMemo(() => {
    const byYear =
      yearFilter === 'All' ? highlights : highlights.filter((highlight) => highlight.year === yearFilter);
    const search = query.trim().toLowerCase();

    if (!search) {
      return byYear;
    }

    return byYear
      .map((highlight) => ({
        ...highlight,
        allRounders: highlight.allRounders.filter((leo) => leo.name.toLowerCase().includes(search)),
      }))
      .filter((highlight) => highlight.allRounders.length > 0);
  }, [highlights, yearFilter, query]);

  const leoKey = (month: string, year: string, leo: AllRounder) => `${month}-${year}-${leo.id}`;

  useEffect(() => {
    const loadForLeo = (key: string, leo: AllRounder) => {
      if (discoveredGalleries[key]) return;

      if (leo.gallery.length > 0) {
        setDiscoveredGalleries((prev) => ({ ...prev, [key]: leo.gallery }));
        preloaded.current[key] = leo.gallery.map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        });
      }
    };

    filteredMonths.forEach((highlight) => {
      highlight.allRounders.forEach((leo) => {
        const key = leoKey(highlight.month, highlight.year, leo);
        loadForLeo(key, leo);
      });
    });
  }, [filteredMonths, discoveredGalleries]);

  const handleMouseEnter = (key: string, images: string[]) => {
    if (images.length <= 1) return;
    setHoveredLeo(key);
    const interval = window.setInterval(() => {
      setHoverImageIndex((prev) => ({
        ...prev,
        [key]: ((prev[key] ?? 0) + 1) % images.length,
      }));
    }, 1200);
    (window as any)[`interval_${key}`] = interval;
  };

  const handleMouseLeave = (key: string) => {
    setHoveredLeo(null);
    const stored = (window as any)[`interval_${key}`];
    if (stored) {
      window.clearInterval(stored);
      delete (window as any)[`interval_${key}`];
    }
    setHoverImageIndex((prev) => ({ ...prev, [key]: 0 }));
  };

  const openGallery = (leo: AllRounder, images: string[]) => {
    const finalImages = images.length > 0 ? images : ['/images/coming-soon.svg'];
    setSelectedGallery({
      name: leo.name,
      images: finalImages,
      index: 0,
      description: leo.description,
      achievement: leo.achievement,
    });
  };

  const closeGallery = () => setSelectedGallery(null);

  const nextInGallery = () =>
    setSelectedGallery((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev));

  const prevInGallery = () =>
    setSelectedGallery((prev) =>
      prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : prev,
    );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl p-8 md:p-10 bg-gradient-to-r from-rose/20 via-fuchsia/10 to-crimson/20 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="heading-serif text-3xl md:text-4xl font-extrabold tracking-tight">D7 All-Rounders</h1>
            <p className="mt-2 opacity-90 text-sm md:text-base max-w-2xl">
              Celebrating outstanding achievements by Leos of District 306 D7 beyond Leoism — academics, sports, arts,
              service, and more.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-white/10">July 2025 – June 2026</span>
          </div>
        </div>
      </section>

      <section className="surface-card rounded-2xl p-4 md:p-6 space-y-4">
        {loading && (
          <div className="text-sm opacity-70">
            Loading latest highlights…
          </div>
        )}
        {error && !loading && (
          <div className="text-sm text-amber-300">
            {error}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm opacity-70">Year</label>
            <select
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-rose/40"
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
            >
              {years.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-rose/40"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60">🔎</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {filteredMonths.map((highlight) => (
          <div key={highlight.id} className="surface-card rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="heading-serif text-xl md:text-2xl font-semibold">
                  {highlight.month} {highlight.year}
                </h2>
                <p className="text-xs opacity-70">
                  {highlight.allRounders.length > 0 ? 'Recognizing excellence' : 'Coming soon'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-white/10">
                {highlight.allRounders.length} {highlight.allRounders.length === 1 ? 'Leo' : 'Leos'}
              </span>
            </div>

            {highlight.allRounders.length === 0 ? (
              <div className="text-center py-10 opacity-70">No entries for this month yet.</div>
            ) : (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlight.allRounders.map((leo) => {
                  const key = leoKey(highlight.month, highlight.year, leo);
                  const images = discoveredGalleries[key] ?? [];
                  const displayImage =
                    images.length > 0
                      ? hoveredLeo === key && images.length > 1
                        ? images[hoverImageIndex[key] ?? 0]
                        : images[0]
                      : '/images/coming-soon.svg';
                  const portraitFallback = leo.name.toLowerCase().includes('buwani')
                    ? '/images/portrait-placeholder.svg'
                    : '/images/coming-soon.svg';
                  const portraitSrc = portraitError[key] ? portraitFallback : leo.photo;

                  return (
                    <motion.div
                      key={leo.id}
                      whileHover={{ y: -2 }}
                      className="rounded-xl p-4 border border-white/10 surface-card cursor-pointer"
                      onClick={() => openGallery(leo, images)}
                    >
                      <div
                        className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-black/80"
                        onMouseEnter={() => handleMouseEnter(key, images)}
                        onMouseLeave={() => handleMouseLeave(key)}
                      >
                        <NextImage
                          src={displayImage}
                          alt={leo.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain transition-all duration-500"
                        />
                        {images.length > 1 && hoveredLeo === key && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, idx) => (
                              <div
                                key={`${key}-dot-${idx}`}
                                className={`w-2 h-2 rounded-full ${
                                  idx === (hoverImageIndex[key] ?? 0) ? 'bg-white' : 'bg-white/40'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex items-start gap-4">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                          <NextImage
                            src={portraitSrc}
                            alt={leo.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                            onError={() => setPortraitError((prev) => ({ ...prev, [key]: true }))}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base md:text-lg truncate">{leo.name}</h3>
                          <p className="text-rose font-medium text-sm md:text-[15px]">{leo.achievement}</p>
                          <p className="opacity-80 text-sm mt-2 line-clamp-3">{leo.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {filteredMonths.length === 0 && (
          <div className="surface-card rounded-2xl p-8 text-center opacity-70">
            No results found. Try a different year or search.
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass rounded-2xl p-4 sm:p-6 max-w-5xl w-full max-h-[90vh] overflow-auto"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="heading-serif text-lg sm:text-xl font-semibold">{selectedGallery.name}</h3>
                  <p className="text-sm opacity-80">{selectedGallery.achievement}</p>
                </div>
                <button onClick={closeGallery} className="px-3 py-1.5 rounded-lg glass hover:bg-white/10">
                  Close
                </button>
              </div>
              <div className="relative w-full aspect-video bg-black/90 rounded-xl overflow-hidden">
                <NextImage
                  src={selectedGallery.images[selectedGallery.index]}
                  alt={`${selectedGallery.name} ${selectedGallery.index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
                {selectedGallery.images.length > 1 && (
                  <>
                    <button
                      onClick={prevInGallery}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10"
                      title="Previous"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextInGallery}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10"
                      title="Next"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedGallery.images.map((_, index) => (
                        <div
                          key={`${selectedGallery.name}-gallery-dot-${index}`}
                          className={`w-2 h-2 rounded-full ${
                            index === selectedGallery.index ? 'bg-white' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-white/5 max-h-40 overflow-auto text-sm">
                {selectedGallery.description}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
